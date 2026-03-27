import React, { useEffect, useRef } from 'react';
import { useCanvasStore } from '../store/useCanvasStore';

export default function LiveCanvas() {
  const logContainerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = useCanvasStore.subscribe(
      (state) => state.transientState.latestTrace,
      (latestTrace) => {
        if (latestTrace && logContainerRef.current) {
          const div = document.createElement('div');
          div.className = "text-primary text-[11px] font-mono mb-2 p-1.5 bg-black/40 rounded border border-white/5";
          div.textContent = `[${new Date().toISOString().split('T')[1].slice(0, -1)}] ${latestTrace.message}`;
          logContainerRef.current.appendChild(div);
          logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
      }
    );

    const interval = setInterval(() => {
      useCanvasStore.getState().setTransientTrace({
        id: Date.now(),
        message: 'SENTINEL NODE: Packet successfully forwarded via Redis PUB/SUB...'
      });
    }, 1500);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-black/20 rounded-md relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40"></div>
      
      <div 
        ref={logContainerRef} 
        className="h-full w-full overflow-y-auto p-4 z-10 relative pt-12"
      >
        <div className="text-muted-foreground text-[11px] font-mono mb-4 px-2 py-1 bg-white/5 rounded">
          // Antigravity TACTICAL MAP Engine Booted.<br/>
          // Waiting for visual graph nodes injection...<br/>
          // Rendering transient WS feed overlay instead.
        </div>
      </div>
    </div>
  );
}
