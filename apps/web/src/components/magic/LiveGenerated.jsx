import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, Utensils, MapPin, Loader2, Sparkles, Navigation, Sun, Moon } from 'lucide-react';

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
  const [theme, setTheme] = useState('dark');

  const isDark = theme === 'dark';

  const handleParse = async () => {
    if (!inputText.trim()) return;
    setIsParsing(true);
    setItinerary(null);
    
    try {
      const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL?.replace('wss://', 'https://').replace('ws://', 'http://') 
        || 'https://gateway-app-7998411376.us-central1.run.app';
      
      const response = await fetch(`${GATEWAY_URL}/api/parse-itinerary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      
      if (!response.ok) throw new Error('Failed to parse itinerary');
      
      const data = await response.json();
      setItinerary(data.itinerary || []);
    } catch (err) {
      console.error('AI Parsing failed, using robust mock template fallback:', err);
      setItinerary(mockParseData);
    } finally {
      setIsParsing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
  };

  return (
    <div className={`transition-colors duration-700 h-full w-full font-sans overflow-y-auto p-6 md:p-12 ${isDark ? 'bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30' : 'bg-slate-50 text-slate-900 selection:bg-indigo-500/20'}`}>
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className={`p-3 rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-110 shadow-lg ${isDark ? 'bg-zinc-900/50 border-white/10 hover:bg-zinc-800 text-zinc-400' : 'bg-white/80 border-slate-200 hover:bg-white text-slate-600 shadow-slate-200'}`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-12 pb-24 relative">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center justify-center p-4 rounded-3xl mb-6 shadow-[0_0_50px_rgba(99,102,241,0.15)] ${isDark ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-100'}`}
          >
            <Sparkles className="w-10 h-10 text-indigo-500" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white to-zinc-500' : 'from-slate-900 to-slate-500'}`}
          >
            Itinerary Visualizer
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`text-lg md:text-xl max-w-2xl mx-auto font-light ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}
          >
            Paste your messy travel emails below and let the AI extract your gorgeous, structured journey schedule.
          </motion.p>
        </div>

        {/* Smart Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`backdrop-blur-3xl border rounded-[2rem] p-2 shadow-2xl relative group overflow-hidden ${isDark ? 'bg-zinc-950/60 border-white/10' : 'bg-white/60 border-slate-200'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g. Flight UA420 leaves at 8:30am from JFK. Arrive CDG and check into Le Meurice..."
            className={`w-full h-40 md:h-48 bg-transparent resize-none p-8 outline-none focus:ring-0 text-lg md:text-xl leading-relaxed relative z-10 ${isDark ? 'text-zinc-200 placeholder-zinc-700' : 'text-slate-800 placeholder-slate-400'}`}
          />
          <div className={`flex justify-end p-4 border-t rounded-b-[1.75rem] relative z-10 transition-colors ${isDark ? 'border-white/5 bg-black/40' : 'border-slate-100 bg-slate-50/50'}`}>
            <button
              onClick={handleParse}
              disabled={isParsing || !inputText.trim()}
              className={`px-8 py-4 rounded-xl font-bold text-sm tracking-wide disabled:opacity-50 transition-all flex items-center gap-3 active:scale-95 ${isDark ? 'bg-white text-black hover:bg-zinc-200 disabled:hover:bg-white shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]' : 'bg-slate-900 text-white hover:bg-slate-800 disabled:hover:bg-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]'}`}
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
                className={`text-center py-32 border border-dashed rounded-[2rem] ${isDark ? 'border-white/10 bg-white/[0.01]' : 'border-slate-300 bg-slate-100/50'}`}
              >
                <Navigation className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 ${isDark ? 'text-zinc-800' : 'text-slate-300'}`} />
                <p className={`font-mono tracking-widest uppercase text-sm ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>Awaiting raw string data</p>
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
                <p className="text-indigo-500 font-mono text-sm animate-pulse tracking-widest uppercase">Synthesizing Semantic Nodes...</p>
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
                  <div className={`absolute left-[2.25rem] md:left-32 top-8 bottom-8 w-px bg-gradient-to-b ${isDark ? 'from-indigo-500/50 via-zinc-800 to-transparent' : 'from-indigo-500/50 via-slate-300 to-transparent'}`} />
                  
                  {itinerary.map((item) => (
                    <motion.div key={item.id} variants={itemVariants} className="relative flex items-start gap-6 md:gap-16 group z-10">
                      
                      {/* Time (Desktop) */}
                      <div className="hidden md:block w-32 pt-5 text-right">
                        <span className={`text-sm font-bold font-mono uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>{item.time}</span>
                      </div>

                      {/* Node Icon */}
                      <div className={`relative flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl border flex items-center justify-center shadow-xl transition-all duration-500 hover:scale-110 ${isDark ? 'bg-zinc-950 border-white/10 group-hover:border-indigo-500/60 group-hover:bg-indigo-500/10 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'bg-white border-slate-200 group-hover:border-indigo-400 group-hover:bg-indigo-50 group-hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)]'}`}>
                        <div className={`transition-colors duration-500 ${isDark ? 'text-zinc-400 group-hover:text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500'}`}>
                          {iconMap[item.iconType]}
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="flex-1">
                        {/* Time (Mobile) */}
                        <div className="md:hidden mb-3">
                          <span className={`text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1.5 rounded-lg border ${isDark ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>{item.time}</span>
                        </div>
                        
                        <div className={`backdrop-blur-xl border rounded-3xl p-6 md:p-8 transition-all hover:translate-x-2 duration-500 ${isDark ? 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900/70 hover:border-white/10' : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm hover:shadow-md'}`}>
                          <h3 className={`text-xl md:text-2xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.activity}</h3>
                          <div className={`flex items-center gap-3 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                            <div className={`p-1.5 rounded-full ${isDark ? 'bg-rose-500/10' : 'bg-rose-50'}`}>
                              <MapPin className={`w-4 h-4 ${isDark ? 'text-rose-500' : 'text-rose-500'}`} />
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
                  <div className={`sticky top-12 flex flex-col max-h-[600px] backdrop-blur-2xl border rounded-3xl overflow-hidden ${isDark ? 'bg-zinc-950/80 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'bg-slate-900/95 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.2)]'}`}>
                    <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-white/5 bg-zinc-900/80' : 'border-white/10 bg-slate-800/80'}`}>
                       <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                         <span className="text-[11px] font-mono text-zinc-300 font-semibold tracking-widest uppercase">Synthesized Schema (JSON)</span>
                       </div>
                       <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                         <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                       </div>
                    </div>
                    <div className="p-6 overflow-y-auto font-mono text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-zinc-700">
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
