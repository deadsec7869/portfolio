import { useState, useEffect } from 'react';
import { Bot, Navigation, RefreshCw, Play, RotateCcw } from 'lucide-react';

const GRID_SIZE = 8;

export function RobotCommandVisual() {
  const [startPos] = useState({ r: 1, c: 1 });
  const [targetPos, setTargetPos] = useState({ r: 6, c: 6 });
  const [obstacles, setObstacles] = useState<Set<string>>(
    new Set(['2-2', '2-3', '3-3', '4-3', '4-4', '5-4', '3-5'])
  );
  
  // Robot simulated position along the path
  const [robotStepIndex, setRobotStepIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);

  // Compute Manhattan A* Path
  const computePath = () => {
    const path: { r: number; c: number }[] = [];
    let curR = startPos.r;
    let curC = startPos.c;
    path.push({ r: curR, c: curC });

    let attempts = 0;
    while ((curR !== targetPos.r || curC !== targetPos.c) && attempts < 40) {
      attempts++;
      const moves = [
        { r: curR + 1, c: curC },
        { r: curR - 1, c: curC },
        { r: curR, c: curC + 1 },
        { r: curR, c: curC - 1 }
      ].filter(
        (m) =>
          m.r >= 0 &&
          m.r < GRID_SIZE &&
          m.c >= 0 &&
          m.c < GRID_SIZE &&
          !obstacles.has(`${m.r}-${m.c}`)
      );

      if (moves.length === 0) break;

      moves.sort((a, b) => {
        const distA = Math.abs(a.r - targetPos.r) + Math.abs(a.c - targetPos.c);
        const distB = Math.abs(b.r - targetPos.r) + Math.abs(b.c - targetPos.c);
        return distA - distB;
      });

      const next = moves[0];
      if (path.some((p) => p.r === next.r && p.c === next.c)) {
        if (moves.length > 1) {
          curR = moves[1].r;
          curC = moves[1].c;
        } else {
          curR = next.r;
          curC = next.c;
        }
      } else {
        curR = next.r;
        curC = next.c;
      }
      path.push({ r: curR, c: curC });
    }
    return path;
  };

  const path = computePath();
  const pathKeys = new Set(path.map((p) => `${p.r}-${p.c}`));

  useEffect(() => {
    if (!isSimulating || path.length <= 1) return;
    const timer = setInterval(() => {
      setRobotStepIndex((prev) => (prev + 1) % path.length);
    }, 450);
    return () => clearInterval(timer);
  }, [isSimulating, path.length]);

  const currentRobotPos = path[robotStepIndex] || startPos;

  const toggleCell = (r: number, c: number) => {
    if ((r === startPos.r && c === startPos.c) || (r === targetPos.r && c === targetPos.c)) return;
    const key = `${r}-${c}`;
    const nextObs = new Set(obstacles);
    if (nextObs.has(key)) {
      nextObs.delete(key);
    } else {
      nextObs.add(key);
    }
    setObstacles(nextObs);
    setRobotStepIndex(0);
  };

  const setTargetCell = (r: number, c: number) => {
    if (obstacles.has(`${r}-${c}`)) {
      const nextObs = new Set(obstacles);
      nextObs.delete(`${r}-${c}`);
      setObstacles(nextObs);
    }
    setTargetPos({ r, c });
    setRobotStepIndex(0);
  };

  const resetGrid = () => {
    setObstacles(new Set(['2-2', '2-3', '3-3', '4-3', '4-4', '5-4', '3-5']));
    setTargetPos({ r: 6, c: 6 });
    setRobotStepIndex(0);
  };

  return (
    <div className="w-full bg-[#1e1e2a] rounded-[12px] p-6 md:p-8 flex flex-col justify-between border-0 shadow-none relative overflow-hidden group text-[#ededf3]">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 z-10 border-b border-[#70707d]/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#272735] border border-[#70707d]/20 flex items-center justify-center text-[#ededf3]">
            <Bot className="w-5 h-5 text-[#5266eb]" />
          </div>
          <div>
            <h4 className="text-sm font-display font-[480] text-[#ededf3] tracking-wide">
              AI ROBOT COMMAND CENTER // UNIT-07
            </h4>
            <p className="text-[11px] font-mono-tech text-[#c3c3cc]">
              A* HEURISTIC PATHFINDING &amp; WAYPOINT TELEMETRY
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#272735] hover:bg-[#323244] border border-[#70707d]/25 text-[11px] font-mono-tech text-[#ededf3] transition-colors cursor-pointer"
          >
            {isSimulating ? <RotateCcw className="w-3.5 h-3.5 text-[#5266eb]" /> : <Play className="w-3.5 h-3.5 text-[#ededf3]" />}
            <span>{isSimulating ? 'PAUSE ROVER' : 'RUN SIM'}</span>
          </button>

          <button
            onClick={resetGrid}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#272735] hover:bg-[#323244] border border-[#70707d]/25 text-[11px] font-mono-tech text-[#ededf3] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET MAP</span>
          </button>
        </div>
      </div>

      {/* Center Interactive Grid & Telemetry HUD */}
      <div className="my-6 z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Interactive 8x8 Grid */}
        <div className="md:col-span-7 flex flex-col items-center">
          <div className="grid grid-cols-8 gap-1.5 p-3 rounded-[12px] bg-[#171721] border border-[#70707d]/20 shadow-none">
            {Array.from({ length: GRID_SIZE }).map((_, r) =>
              Array.from({ length: GRID_SIZE }).map((_, c) => {
                const isStart = r === startPos.r && c === startPos.c;
                const isTarget = r === targetPos.r && c === targetPos.c;
                const isRoverHere = r === currentRobotPos.r && c === currentRobotPos.c;
                const isObstacle = obstacles.has(`${r}-${c}`);
                const isPath = pathKeys.has(`${r}-${c}`) && !isStart && !isTarget;

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => toggleCell(r, c)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setTargetCell(r, c);
                    }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center text-[10px] font-mono-tech transition-all cursor-pointer ${
                      isRoverHere
                        ? 'bg-[#5266eb] text-[#ffffff] font-extrabold shadow-none scale-105 z-10'
                        : isStart
                        ? 'bg-[#272735] text-[#ededf3] font-bold'
                        : isTarget
                        ? 'bg-[#5266eb]/30 border border-[#5266eb] text-[#ffffff] font-bold'
                        : isObstacle
                        ? 'bg-[#272735] border border-[#70707d]/30 text-[#70707d]'
                        : isPath
                        ? 'bg-[#5266eb]/15 border border-[#5266eb]/30 text-[#ededf3]'
                        : 'bg-[#171721] hover:bg-[#272735] border border-[#70707d]/15 text-[#70707d]'
                    }`}
                    title={
                      isRoverHere
                        ? `Active Rover Unit [${r}, ${c}]`
                        : isStart
                        ? 'Origin Base'
                        : isTarget
                        ? 'Target Waypoint'
                        : isObstacle
                        ? 'Obstacle Wall (Click to remove)'
                        : 'Open Sector (Click to place wall, Right-click to set Target)'
                    }
                  >
                    {isRoverHere ? '●' : isStart ? '▲' : isTarget ? '★' : isObstacle ? '✕' : isPath ? '·' : ''}
                  </button>
                );
              })
            )}
          </div>
          <span className="text-[10px] font-mono-tech text-[#70707d] mt-2">
            CLICK TO TOGGLE WALLS &middot; RIGHT-CLICK TO RELOCATE TARGET
          </span>
        </div>

        {/* Live Metrics Cockpit */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="p-4 rounded-[12px] bg-[#171721] border border-[#70707d]/20 font-mono-tech text-xs space-y-2 shadow-none text-[#ededf3]">
            <div className="flex justify-between text-[#c3c3cc]">
              <span>ROVER COORD:</span>
              <span className="text-[#ededf3] font-[480]">[{currentRobotPos.r}, {currentRobotPos.c}]</span>
            </div>
            <div className="flex justify-between text-[#c3c3cc]">
              <span>PATH NODES:</span>
              <span className="text-[#5266eb] font-[480]">{path.length} NODES</span>
            </div>
            <div className="flex justify-between text-[#c3c3cc]">
              <span>A* LATENCY:</span>
              <span className="text-[#ededf3]">&lt; 1.8ms</span>
            </div>
            <div className="flex justify-between text-[#c3c3cc]">
              <span>ALGORITHM:</span>
              <span className="text-[#ededf3]">MANHATTAN HEURISTIC</span>
            </div>
          </div>

          <div className="p-3.5 rounded-[12px] bg-[#272735] border border-[#70707d]/20 text-[11px] font-mono-tech text-[#ededf3] flex items-center gap-2">
            <Navigation className="w-4 h-4 shrink-0 text-[#5266eb] animate-pulse" />
            <span>WAYPOINT TARGET LOCK: ({targetPos.r}, {targetPos.c})</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="z-10 text-xs font-mono-tech text-[#70707d] flex items-center justify-between border-t border-[#70707d]/20 pt-3">
        <span>GRID SYSTEM: 64 ACTIVE MATRIX SECTORS</span>
        <span className="text-[#ededf3] font-[480]">STATUS: PATH LOCKED</span>
      </div>
    </div>
  );
}
