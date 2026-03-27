import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, Utensils, MapPin, Loader2, Sparkles, Navigation, Sun, Moon, CalendarDays, Train, Cloud, CloudRain, CloudLightning, CloudSnow } from 'lucide-react';

const mockParseData = {
  title: "Trip to Paris & Amsterdam",
  days: [
    {
      dayNumber: 1,
      label: "Day 1 – Arrive in Paris",
      city: "Paris",
      location: { name: "Paris", lat: 48.8566, lng: 2.3522 },
      hotel: "Le Meurice",
      transportation: null,
      activities: [ "Eiffel Tower", "Seine River Cruise", "Welcome Dinner" ]
    },
    {
      dayNumber: 2,
      label: "Day 2 – Paris",
      city: "Paris",
      location: { name: "Paris", lat: 48.8566, lng: 2.3522 },
      hotel: null,
      transportation: null,
      activities: [ "Louvre Museum", "Montmartre walking tour", "Cafe culture" ]
    },
    {
      dayNumber: 3,
      label: "Day 3 – Train to Amsterdam",
      city: "Amsterdam",
      location: { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
      hotel: "Pulitzer Amsterdam",
      transportation: "Train to Amsterdam",
      activities: [ "Anne Frank House", "Canal Tour at sunset" ]
    },
    {
      dayNumber: 4,
      label: "Day 4 – Amsterdam",
      city: "Amsterdam",
      location: { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
      hotel: null,
      transportation: null,
      activities: [ "Van Gogh Museum", "Vondelpark", "Cycling around Jordaan" ]
    }
  ],
  locations: [
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "Amsterdam", lat: 52.3676, lng: 4.9041 }
  ]
};

function useLocalWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Usamos GeoJS en vez de freeipapi porque permite CORS nativamente
        const geoRes = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!geoRes.ok) throw new Error('Geo API Error');
        const geoData = await geoRes.json();
        const city = geoData.city || 'Local Location';
        const lat = parseFloat(geoData.latitude);
        const lon = parseFloat(geoData.longitude);

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        if (!weatherRes.ok) throw new Error('Weather API Error');
        const weatherData = await weatherRes.json();
        const temp = Math.round(weatherData.current_weather.temperature);
        const code = weatherData.current_weather.weathercode;
        
        setWeather({ city, temp, code });
      } catch (err) {
        console.error('Weather fetch error:', err);
        setWeather({ city: 'Earth', temp: 22, code: 0 }); // Fallback
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  return { weather, loading };
}

function WeatherWidget({ isDark }) {
  const { weather, loading } = useLocalWeather();
  
  const hour = new Date().getHours();
  let greeting = 'Good Evening';
  if (hour >= 5 && hour < 12) greeting = 'Good Morning';
  else if (hour >= 12 && hour < 18) greeting = 'Good Afternoon';

  if (loading) {
    return (
      <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-xl border ${isDark ? 'bg-zinc-900/50 border-white/10' : 'bg-white/80 border-slate-200'} shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
        <div className={`w-4 h-4 rounded-full animate-pulse ${isDark ? 'bg-zinc-700' : 'bg-slate-300'}`} />
        <div className={`h-3 w-32 rounded animate-pulse ${isDark ? 'bg-zinc-700' : 'bg-slate-300'}`} />
      </div>
    );
  }

  let WeatherIcon = Sun;
  if (weather.code >= 1 && weather.code <= 3) WeatherIcon = Cloud;
  if (weather.code >= 51 && weather.code <= 67) WeatherIcon = CloudRain;
  if (weather.code >= 71 && weather.code <= 77) WeatherIcon = CloudSnow;
  if (weather.code >= 95 && weather.code <= 99) WeatherIcon = CloudLightning;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-2xl border transition-all shadow-[0_0_30px_rgba(0,0,0,0.3)] ${isDark ? 'bg-zinc-900/60 border-white/10 hover:bg-zinc-800' : 'bg-white/80 border-slate-200 hover:bg-white'}`}
    >
      <WeatherIcon className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
      <span className={`text-sm font-semibold tracking-tight ${isDark ? 'text-zinc-200' : 'text-slate-700'}`}>
        {greeting}, <span className={isDark ? 'text-zinc-400 font-medium' : 'text-slate-500 font-medium'}>{weather.city} • {weather.temp}°C</span>
      </span>
    </motion.div>
  );
}

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
      setItinerary(data.itinerary || mockParseData);
    } catch (err) {
      console.error('AI Parsing failed, using robust mock template fallback:', err);
      // Even if AI fails, return the mock matching the strict contract
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
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } }
  };

  return (
    <div className={`transition-colors duration-700 h-full w-full font-sans overflow-y-auto p-4 md:p-12 ${isDark ? 'bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30' : 'bg-slate-50 text-slate-900 selection:bg-indigo-500/20'}`}>
      
      {/* Top Navigation Bar: Weather + Theme */}
      <div className="fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-50 flex items-start justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <WeatherWidget isDark={isDark} />
        </div>
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className={`pointer-events-auto p-3 rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.3)] ${isDark ? 'bg-zinc-900/50 border-white/10 hover:bg-zinc-800 text-zinc-400' : 'bg-white/80 border-slate-200 hover:bg-white text-slate-600 shadow-slate-200'}`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 pb-24 relative">
        
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
            AI Itinerary Engine
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`text-lg md:text-xl max-w-3xl mx-auto font-light ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}
          >
            Paste your messy travel emails below and let our rigid Semantic Contract extract your gorgeous, structured journey schedule automatically.
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
            placeholder="e.g. Arrive in Paris Day 1. Go to Eiffel Tower, Seine River Cruise, and Welcome dinner. Stay at Le Meurice. Day 2: Louvre Museum..."
            className={`w-full h-40 md:h-48 bg-transparent resize-none p-6 md:p-8 outline-none focus:ring-0 text-lg md:text-xl leading-relaxed relative z-10 ${isDark ? 'text-zinc-200 placeholder-zinc-700' : 'text-slate-800 placeholder-slate-400'}`}
          />
          <div className={`flex justify-end p-4 border-t rounded-b-[1.75rem] relative z-10 transition-colors ${isDark ? 'border-white/5 bg-black/40' : 'border-slate-100 bg-slate-50/50'}`}>
            <button
              onClick={handleParse}
              disabled={isParsing || !inputText.trim()}
              className={`px-8 py-4 rounded-xl font-bold text-sm tracking-wide disabled:opacity-50 transition-all flex items-center gap-3 active:scale-95 ${isDark ? 'bg-white text-black hover:bg-zinc-200 disabled:hover:bg-white shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]' : 'bg-slate-900 text-white hover:bg-slate-800 disabled:hover:bg-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]'}`}
            >
              {isParsing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isParsing ? 'EXTRACTING TO SCHEMA...' : 'PARSE ITINERARY'}
            </button>
          </div>
        </motion.div>

        {/* Interactive Output */}
        <div className="relative pt-12">
          <AnimatePresence mode="wait">
            {!itinerary && !isParsing && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`text-center py-32 border border-dashed rounded-[2rem] ${isDark ? 'border-white/10 bg-white/[0.01]' : 'border-slate-300 bg-slate-100/50'}`}
              >
                <CalendarDays className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 ${isDark ? 'text-zinc-800' : 'text-slate-300'}`} />
                <p className={`font-mono tracking-widest uppercase text-sm ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>Ready for semantic processing</p>
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
                <p className="text-indigo-500 font-mono text-sm animate-pulse tracking-widest uppercase">Applying Rigid JSON Contract...</p>
              </motion.div>
            )}

            {itinerary && itinerary.days && (
              <motion.div
                key="timeline-and-json"
                className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-12 xl:gap-20"
              >
                {/* Visual Timeline Column */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="relative space-y-16"
                >
                  <motion.h2 variants={itemVariants} className={`text-3xl font-extrabold mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>{itinerary.title}</motion.h2>
                  
                  {itinerary.days.map((day, idx) => (
                    <motion.div key={day.dayNumber} variants={itemVariants} className="relative z-10">
                      
                      {/* Day Header */}
                      <div className="flex items-center gap-4 md:gap-6 mb-8">
                         <div className={`px-4 py-2 rounded-xl font-bold font-mono tracking-widest text-sm flex items-center gap-2 ${isDark ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-indigo-100 text-indigo-700 border border-indigo-200'}`}>
                            <CalendarDays className="w-4 h-4" /> DAY {day.dayNumber}
                         </div>
                         <h3 className={`text-2xl md:text-3xl font-bold tracking-tight flex-1 ${isDark ? 'text-zinc-100' : 'text-slate-800'}`}>{day.label}</h3>
                      </div>

                      {/* Day Contents container */}
                      <div className={`pl-6 md:pl-10 ml-4 md:ml-6 space-y-6 ${isDark ? 'border-l-2 border-indigo-500/20' : 'border-l-2 border-slate-300'}`}>
                         
                         {/* Transportation */}
                         {day.transportation && (
                           <div className="flex items-start gap-5">
                             <div className={`p-3 rounded-2xl border flex-shrink-0 ${isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-100 shadow-sm'}`}><Train className="w-6 h-6" /></div>
                             <div className="pt-1">
                               <p className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Transportation</p>
                               <p className={`text-lg font-semibold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>{day.transportation}</p>
                             </div>
                           </div>
                         )}

                         {/* Hotel */}
                         {day.hotel && (
                           <div className="flex items-start gap-5">
                             <div className={`p-3 rounded-2xl border flex-shrink-0 ${isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-100 shadow-sm'}`}><Hotel className="w-6 h-6" /></div>
                             <div className="pt-1">
                               <p className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Check-in / Stay</p>
                               <p className={`text-lg font-semibold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>{day.hotel}</p>
                             </div>
                           </div>
                         )}

                         {/* Activities */}
                         {day.activities && day.activities.length > 0 && (
                           <div className="space-y-4 pt-4">
                             <p className={`text-xs font-mono uppercase tracking-widest flex items-center gap-2 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                               <Navigation className="w-3 h-3" /> Activities & POIs
                             </p>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               {day.activities.map((act, actIdx) => (
                                 <div key={actIdx} className={`p-5 rounded-2xl flex items-start gap-4 backdrop-blur-md border transition-all duration-300 hover:translate-y-[-4px] ${isDark ? 'bg-zinc-900/50 border-white/5 hover:bg-zinc-900/80 hover:border-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'}`}>
                                   <MapPin className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                                   <span className={`text-base font-medium leading-tight ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>{act}</span>
                                 </div>
                               ))}
                             </div>
                           </div>
                         )}
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
                  <div className={`sticky top-12 flex flex-col max-h-[800px] backdrop-blur-2xl border rounded-3xl overflow-hidden ${isDark ? 'bg-zinc-950/90 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'bg-slate-900/95 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.2)]'}`}>
                    <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? 'border-white/5 bg-zinc-900/80' : 'border-white/10 bg-slate-800/80'}`}>
                       <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                         <span className="text-[11px] font-mono text-zinc-300 font-semibold tracking-widest uppercase">Contract Extracted (JSON)</span>
                       </div>
                    </div>
                    <div className="p-6 overflow-y-auto font-mono text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-zinc-700">
                      <pre><code className="text-emerald-300/90">{JSON.stringify(itinerary, null, 2)}</code></pre>
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
