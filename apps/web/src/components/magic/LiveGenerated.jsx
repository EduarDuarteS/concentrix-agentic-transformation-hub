import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, Utensils, MapPin, Loader2, Sparkles, Navigation } from 'lucide-react';

const mockParseData = [
  { id: 1, time: '08:30 AM', activity: 'Flight UA 420 to Paris', location: 'JFK Terminal 4', iconType: 'Plane' },
  { id: 2, time: '12:15 PM', activity: 'Arrival & Baggage Claim', location: 'CDG Airport', iconType: 'MapPin' },
  { id: 3, time: '02:00 PM', activity: 'Check-in: Le Meurice', location: '228 Rue de Rivoli', iconType: 'Hotel' },
  { id: 4, time: '05:30 PM', activity: 'Sunset Seine River Cruise', location: 'Eiffel Tower Dock', iconType: 'Navigation' },
  { id: 5, time: '08:00 PM', activity: 'Dinner at Le Jules Verne', location: 'Alain Ducasse Restaurant', iconType: 'Utensils' }
];

const iconMap = {
  Plane: <Plane className="w-5 h-5" />,
  Hotel: <Hotel className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Navigation: <Navigation className="w-5 h-5" />
};

export default function TravelVisualizer() {
  const [inputText, setInputText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const handleParse = () => {
    if (!inputText.trim()) return;
    setIsParsing(true);
    setItinerary(null);
    
    setTimeout(() => {
      setItinerary(mockParseData);
      setIsParsing(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
  };

  return (
    <div className="h-full w-full bg-[#09090b] text-zinc-100 p-6 md:p-12 overflow-y-auto font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto space-y-12 pb-24">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 mb-6 shadow-[0_0_50px_rgba(99,102,241,0.15)]"
          >
            <Sparkles className="w-10 h-10 text-indigo-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500"
          >
            Itinerary Visualizer
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Paste your messy travel emails below and let the AI extract your gorgeous, structured journey schedule.
          </motion.p>
        </div>

        {/* Smart Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-950/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-2 shadow-2xl relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g. Flight UA420 leaves at 8:30am from JFK. Arrive CDG and check into Le Meurice..."
            className="w-full h-40 md:h-48 bg-transparent text-zinc-200 placeholder-zinc-700 resize-none p-8 outline-none focus:ring-0 text-lg md:text-xl leading-relaxed relative z-10"
          />
          <div className="flex justify-end p-4 border-t border-white/5 bg-black/40 rounded-b-[1.75rem] relative z-10">
            <button
              onClick={handleParse}
              disabled={isParsing || !inputText.trim()}
              className="px-8 py-4 rounded-xl bg-white text-black font-bold text-sm tracking-wide hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-white transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95"
            >
              {isParsing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isParsing ? 'EXTRACTING VIBES...' : 'PARSE ITINERARY'}
            </button>
          </div>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="relative pt-12 md:px-8">
          <AnimatePresence mode="wait">
            {!itinerary && !isParsing && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-32 border border-dashed border-white/10 rounded-[2rem] bg-white/[0.01]"
              >
                <Navigation className="w-12 h-12 md:w-16 md:h-16 mx-auto text-zinc-800 mb-6" />
                <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm">Awaiting raw string data</p>
              </motion.div>
            )}
            
            {isParsing && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-32 flex flex-col items-center justify-center gap-8"
              >
                <div className="w-20 h-20 rounded-full border-t-2 border-indigo-500 border-r-2 border-r-transparent animate-spin" />
                <p className="text-indigo-400 font-mono text-sm animate-pulse tracking-widest uppercase">Synthesizing Semantic Nodes...</p>
              </motion.div>
            )}

            {itinerary && (
              <motion.div
                key="timeline-and-json"
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
              >
                {/* Vertical Timeline */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="relative space-y-8"
                >
                  {/* Vertical Line */}
                  <div className="absolute left-[2.25rem] md:left-32 top-8 bottom-8 w-px bg-gradient-to-b from-indigo-500/50 via-zinc-800 to-transparent" />
                  
                  {itinerary.map((item) => (
                    <motion.div key={item.id} variants={itemVariants} className="relative flex items-start gap-6 md:gap-16 group z-10">
                      
                      {/* Time (Desktop) */}
                      <div className="hidden md:block w-32 pt-5 text-right">
                        <span className="text-sm font-bold text-zinc-500 font-mono uppercase tracking-widest">{item.time}</span>
                      </div>

                      {/* Node Icon */}
                      <div className="relative flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-xl group-hover:border-indigo-500/60 group-hover:bg-indigo-500/10 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-500">
                        <div className="text-zinc-400 group-hover:text-indigo-400 transition-colors duration-500 scale-110">
                          {iconMap[item.iconType]}
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="flex-1">
                        {/* Time (Mobile) */}
                        <div className="md:hidden mb-3">
                          <span className="text-[10px] font-bold text-indigo-400 font-mono uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg">{item.time}</span>
                        </div>
                        
                        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-zinc-900/70 hover:border-white/10 transition-all hover:translate-x-2 duration-500">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{item.activity}</h3>
                          <div className="flex items-center gap-3 text-zinc-400">
                            <div className="p-1.5 rounded-full bg-rose-500/10">
                              <MapPin className="w-4 h-4 text-rose-500" />
                            </div>
                            <span className="text-base font-medium">{item.location}</span>
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </motion.div>

                {/* JSON Data Schema Panel */}
                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.6, duration: 0.8 }}
                   className="h-full"
                >
                  <div className="sticky top-12 flex flex-col max-h-[600px] bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <div className="px-6 py-4 border-b border-white/5 bg-zinc-900/80 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[11px] font-mono text-zinc-300 font-semibold tracking-widest uppercase">Synthesized Schema (JSON)</span>
                       </div>
                       <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                         <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                       </div>
                    </div>
                    <div className="p-6 overflow-y-auto font-mono text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800">
                      <pre><code className="text-indigo-300/90">{JSON.stringify(itinerary, null, 2)}</code></pre>
                    </div>
                  </div>
                </motion.div>
                
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
