import React from 'react';
import { ShieldAlert, Cpu } from 'lucide-react';

export default function CommandCenter() {
  return (
    <div className="flex flex-col space-y-4 h-full">
      <header className="mb-2">
        <h2 className="text-sm font-bold text-white">Telemetry Log</h2>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Observe & Self-Heal</p>
      </header>
      
      <div className="flex flex-col gap-4">
        <div className="bg-card/30 border border-red-900/30 rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="text-red-400 w-3 h-3" />
            <h3 className="text-white text-xs font-semibold">Heal Alerts</h3>
          </div>
          <div className="space-y-2">
            <div className="bg-black/50 p-2 rounded-md text-[10px] text-gray-300 border-l-4 border-yellow-500 font-mono break-words leading-tight">
              [WARN] Worker latency spike detected. Scaling invoke...
            </div>
            <div className="bg-black/50 p-2 rounded-md text-[10px] text-gray-300 border-l-4 border-green-500 font-mono break-words leading-tight">
              [INFO] Global Event Bus is stable.
            </div>
          </div>
        </div>

        <div className="bg-card/30 border border-border/20 rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="text-blue-400 w-3 h-3" />
            <h3 className="text-white text-xs font-semibold">Redis Bus</h3>
          </div>
          <div className="flex items-center gap-2 text-green-400 text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Gateway OK
          </div>
          <div className="mt-4 font-mono text-[9px] text-gray-500 break-words leading-relaxed">
            > NODE [AG-X1]: UP<br/>
            > HASHING: 0x93FA8B20...<br/>
            > SUBSCRIPTION 1: ACTIVE<br/>
            > LISTENING WAOK STREAMS...
          </div>
        </div>
      </div>
    </div>
  );
}
