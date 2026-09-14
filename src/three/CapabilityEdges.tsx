import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { CapabilityNode, CapabilityEdge } from '../data/graphData';
import { STUDIO_COLORS } from './materials/materials';

interface CapabilityEdgesProps {
  nodes: CapabilityNode[];
  edges: CapabilityEdge[];
  activeNodeId: string | null;
  hoveredNodeId: string | null;
}

export function CapabilityEdges({
  nodes,
  edges,
  activeNodeId,
  hoveredNodeId,
}: CapabilityEdgesProps) {
  const nodeMap = useMemo(() => {
    const map = new Map<string, CapabilityNode>();
    for (const n of nodes) {
      map.set(n.id, n);
    }
    return map;
  }, [nodes]);

  const targetActiveId = hoveredNodeId || activeNodeId;

  // Active connected node IDs
  const activeConnectedSet = useMemo(() => {
    if (!targetActiveId) return new Set<string>();
    const set = new Set<string>([targetActiveId]);
    const activeNode = nodeMap.get(targetActiveId);
    if (activeNode) {
      for (const conn of activeNode.connections) {
        set.add(conn);
      }
    }
    return set;
  }, [targetActiveId, nodeMap]);

  return (
    <group>
      {edges.map((edge) => {
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);
        if (!sourceNode || !targetNode) return null;

        const isDirectlyActive =
          Boolean(targetActiveId) &&
          (edge.source === targetActiveId || edge.target === targetActiveId);

        const isConnectedActive =
          Boolean(targetActiveId) &&
          activeConnectedSet.has(edge.source) &&
          activeConnectedSet.has(edge.target);

        const key = `${edge.source}--${edge.target}`;

        return (
          <SingleEdge
            key={key}
            start={sourceNode.position}
            end={targetNode.position}
            isDirectlyActive={isDirectlyActive}
            isConnectedActive={isConnectedActive}
            hasAnyActive={Boolean(targetActiveId)}
            weight={edge.weight}
          />
        );
      })}
    </group>
  );
}

interface SingleEdgeProps {
  start: [number, number, number];
  end: [number, number, number];
  isDirectlyActive: boolean;
  isConnectedActive: boolean;
  hasAnyActive: boolean;
  weight: 'primary' | 'secondary';
}

function SingleEdge({
  start,
  end,
  isDirectlyActive,
  isConnectedActive,
  hasAnyActive,
  weight,
}: SingleEdgeProps) {
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const points = useMemo(() => {
    const p1 = new THREE.Vector3(...start);
    const p2 = new THREE.Vector3(...end);
    return new Float32Array([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z]);
  }, [start, end]);

  // Smooth visual transition for line opacity and color
  useFrame((_, delta) => {
    if (!materialRef.current) return;

    let targetOpacity = 0.22;
    let targetColor = '#111111';

    if (isDirectlyActive) {
      targetOpacity = 0.85;
      targetColor = STUDIO_COLORS.accent; // #FF5A36
    } else if (isConnectedActive) {
      targetOpacity = 0.5;
      targetColor = '#111111';
    } else if (hasAnyActive) {
      targetOpacity = 0.06;
      targetColor = '#85857D';
    } else {
      targetOpacity = weight === 'primary' ? 0.24 : 0.14;
      targetColor = '#111111';
    }

    materialRef.current.opacity = THREE.MathUtils.damp(
      materialRef.current.opacity,
      targetOpacity,
      12,
      delta
    );
    materialRef.current.color.lerp(new THREE.Color(targetColor), 0.15);
  });

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        color={new THREE.Color(isDirectlyActive ? STUDIO_COLORS.accent : '#111111')}
        transparent
        opacity={weight === 'primary' ? 0.24 : 0.14}
        depthWrite={false}
      />
    </line>
  );
}
