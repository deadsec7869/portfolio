import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  CAPABILITY_NODES,
  CAPABILITY_EDGES,
} from '../data/graphData';
import type { CapabilityNode as CapabilityNodeType } from '../data/graphData';
import { CapabilityNode } from './CapabilityNode';
import { CapabilityEdges } from './CapabilityEdges';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CapabilityGraphProps {
  selectedNode: CapabilityNodeType | null;
  onSelectNode: (node: CapabilityNodeType) => void;
  isPaused?: boolean;
}

export function CapabilityGraph({
  selectedNode,
  onSelectNode,
  isPaused = false,
}: CapabilityGraphProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Active target node ID
  const activeId = selectedNode?.id || null;

  // Slow autonomous breathing & drift
  useFrame((_, delta) => {
    if (!rootGroupRef.current || prefersReducedMotion || isPaused) return;

    // Very gentle continuous orbital drift
    rootGroupRef.current.rotation.y += delta * 0.08;
    rootGroupRef.current.rotation.x = Math.sin(rootGroupRef.current.rotation.y * 0.5) * 0.05;
  });

  // Ambient system coordinate data points (low count, subtle depth)
  const [ambientPositions] = useMemo(() => {
    const count = 75;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.5 + (i % 6) * 1.2;
      const theta = (i / count) * Math.PI * 2 + (i % 3) * 0.5;
      const phi = ((i % 11) / 11) * Math.PI - Math.PI / 2;

      pos[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * 0.6;
      pos[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);
    }
    return [pos];
  }, []);

  return (
    <group ref={rootGroupRef}>
      {/* Ambient System Coordinates Dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ambientPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#111111"
          transparent
          opacity={0.22}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* 3D Interconnected Relationship Edges */}
      <CapabilityEdges
        nodes={CAPABILITY_NODES}
        edges={CAPABILITY_EDGES}
        activeNodeId={activeId}
        hoveredNodeId={hoveredNodeId}
      />

      {/* 3D Capability Node Meshes */}
      {CAPABILITY_NODES.map((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNodeId === node.id;
        const isDimmed =
          Boolean(activeId || hoveredNodeId) &&
          !isSelected &&
          !isHovered &&
          !selectedNode?.connections.includes(node.id) &&
          !(hoveredNodeId && CAPABILITY_NODES.find(n => n.id === hoveredNodeId)?.connections.includes(node.id));

        return (
          <CapabilityNode
            key={node.id}
            node={node}
            isSelected={isSelected}
            isHovered={isHovered}
            isDimmed={isDimmed}
            onHover={setHoveredNodeId}
            onSelect={onSelectNode}
          />
        );
      })}
    </group>
  );
}
