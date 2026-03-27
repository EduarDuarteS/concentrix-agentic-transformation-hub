import React from 'react';
import { ShieldAlert, Cpu, Activity } from 'lucide-react';
import { useCanvasStore } from '@/store/useCanvasStore';

export default function CommandCenter() {
  // Al suscribir el log list exclusivamente a este componente "Hoja", el re-render
  // es asimétrico y ultra performante, aislado de la raíz de la app.
  const logs = useCanvasStore(state => state.logs);

  return (
    <div className="flex flex-col space-y-4 h-full">
      <header className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white">Telemetry Log</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Observe & Self-Heal</p>
        </div>
        <Activity className="text-green-500 w-4 h-4 animate-pulse" />
      </header>
      
      <div className="flex flex-col gap-4 flex-1">
        <div className="bg-card/30 border border-border/20 rounded-xl p-4 shadow-md flex-1 flex flex-col min-h-[400px]">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="text-blue-400 w-3 h-3" />
            <h3 className="text-white text-xs font-semibold">Redis Bus / WS Stream</h3>
          </div>
          <div className="flex items-center gap-2 text-green-400 text-xs font-medium mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
            Transient Node.js Proxy OK
          </div>
          
          <div className="mt-2 font-mono text-[10px] text-gray-400 break-words leading-relaxed overflow-y-auto space-y-2 flex-1 scrollbar-thin scrollbar-thumb-white/10">
            {logs.length === 0 ? (
              <div className="text-gray-600 animate-pulse">Escuchando telemetría WS...</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-2 bg-black/40 border-l-[3px] border-blue-500/50 rounded-r-md">
                  <div className="flex justify-between items-center mb-1 text-gray-500">
                    <span>
                      [{log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'SYS'}]
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider ${log.type === 'SYSTEM_EVENT' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {log.type || 'STREAM'}
                    </span>
                  </div>
                  <div className="text-zinc-300">
                    {log.payload ? JSON.stringify(log.payload, null, 2) : JSON.stringify(log, null, 2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
