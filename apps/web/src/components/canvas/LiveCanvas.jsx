import React from 'react';

const LiveCanvas = () => {
  return (
    <div className="h-[calc(100vh-160px)] rounded-[3rem] bg-zinc-950 border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden animate-in zoom-in-95 duration-1000">
      <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
      
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full"></div>

      <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-zinc-800 to-zinc-700 mb-10 flex items-center justify-center shadow-2xl relative z-10 group">
        <svg className="w-12 h-12 text-zinc-500 group-hover:text-indigo-400 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <div className="relative z-10 space-y-4">
        <h2 className="text-3xl font-bold text-white tracking-tight">The Live Canvas</h2>
        <p className="text-zinc-500 max-w-lg mx-auto text-lg leading-relaxed">
          Este es el espacio de ejecución en tiempo real. La factoría está en espera de una exportación de <span className="text-indigo-400 font-semibold italic">Stitch (VibeDesign)</span> para iniciar el ensamblaje autónomo del microservicio.
        </p>
      </div>

      <div className="mt-12 flex gap-4 relative z-10">
        <div className="px-6 py-2 rounded-full bg-white/5 border border-white/5 text-xs font-mono text-zinc-600 uppercase tracking-widest">
          Handshake: Awaiting
        </div>
        <div className="px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 uppercase tracking-widest">
          MCP Stream: Idle
        </div>
      </div>
    </div>
  );
};

export default LiveCanvas;
