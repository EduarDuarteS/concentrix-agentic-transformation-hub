import React from 'react';
import { Sparkles } from 'lucide-react';

export default function LiveGenerated() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] animate-in fade-in zoom-in-95 duration-700">
      <div className="w-32 h-32 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.2)] animate-pulse mb-8">
        <Sparkles className="text-indigo-400 w-12 h-12" />
      </div>
      <h2 className="text-3xl font-bold text-white tracking-widest uppercase mb-4">Awaiting VibeDesign Ingestion...</h2>
      <p className="text-zinc-500 max-w-md text-center leading-relaxed">
        El código de React Glassmorphic generado por Stitch aparecerá mágicamente en esta ruta tan pronto como sobrescribas este archivo con el componente final.
      </p>
    </div>
  );
}
