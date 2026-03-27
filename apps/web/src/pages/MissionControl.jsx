import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Zap, LayoutTemplate } from 'lucide-react';
import BusinessDashboard from "./BusinessDashboard";
import CommandCenter from "./CommandCenter";
import LiveCanvas from "./LiveCanvas";

export default function MissionControl() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col font-sans">
      {/* Global Header */}
      <header className="h-12 border-b border-border/40 bg-card backdrop-blur-md flex flex-shrink-0 items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-primary/20 border border-primary/30 shadow-[0_0_10px_rgba(var(--primary),0.3)]">
            <Zap className="text-primary w-3 h-3" />
          </div>
          <h1 className="text-xs font-bold tracking-tight text-foreground uppercase">
            Sifu 5.2 <span className="text-muted-foreground font-medium lowercase tracking-normal ml-1">// autonomous command hub</span>
          </h1>
        </div>
        <div className="flex flex-1 justify-center">
            <div className="px-3 py-1 rounded-full bg-secondary/50 text-[10px] font-medium border border-border/50 text-muted-foreground flex items-center gap-2">
                <LayoutTemplate className="w-3 h-3" />
                <span>IDE BENTO LAYOUT ACTIVE</span>
            </div>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono">
           <span className="text-muted-foreground hidden md:inline">CPU: 12%</span>
           <span className="text-muted-foreground hidden md:inline">MEM: 1.4GB</span>
           <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-green-950/30 border border-green-900/30">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
             <span className="text-green-500 tracking-wider">WS CONNECTED</span>
           </div>
           <ShieldAlert size={14} className="text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
      </header>
      
      {/* Triple-Pane True IDE Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-2 gap-2 bg-[#020202]">
        
        {/* LEFT PANE: Business Dashboard */}
        <aside className="w-full md:w-[320px] lg:w-[340px] flex flex-col border border-border/20 rounded-xl bg-card overflow-hidden shadow-2xl relative">
          <ScrollArea className="h-full w-full">
            <div className="p-5">
              <BusinessDashboard />
            </div>
          </ScrollArea>
        </aside>
        
        {/* CENTER PANE: Live Canvas (The Tactical Map) */}
        <main className="flex-1 flex flex-col border border-border/20 rounded-xl bg-gradient-to-br from-black to-zinc-950/80 relative overflow-hidden shadow-2xl ring-1 ring-white/5">
          <div className="absolute top-4 left-4 z-10">
             <Badge variant="outline" className="bg-black/60 backdrop-blur-xl text-[10px] border-white/10 text-zinc-300 px-3 py-1 shadow-xl">
               SPACE 1 :: TACTICAL EVENT MAP
             </Badge>
          </div>
          <div className="h-full w-full p-2">
             <LiveCanvas />
          </div>
        </main>
          
        {/* RIGHT PANE: Command Center Logs */}
        <aside className="w-full md:w-[300px] lg:w-[320px] flex flex-col border border-border/20 rounded-xl bg-[#09090b] relative overflow-hidden shadow-2xl">
           <div className="absolute top-4 left-4 z-10">
             <Badge variant="outline" className="bg-black/60 backdrop-blur-xl text-[10px] border-white/10 text-zinc-400 px-3 py-1 shadow-xl">
               SPACE 2 :: TELEMETRY FEED
             </Badge>
          </div>
          <ScrollArea className="h-full w-full">
            <div className="p-5 pt-14 h-full">
              <CommandCenter />
            </div>
          </ScrollArea>
        </aside>
          
      </div>
    </div>
  );
}
