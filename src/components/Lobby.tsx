import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Play, Sparkles, MessageSquare } from 'lucide-react';

interface LobbyProps {
  onStart: (useAI: boolean, topic?: string) => void;
  key?: string;
}

export default function Lobby({ onStart }: LobbyProps) {
  const [topic, setTopic] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative mb-12"
      >
        <div className="absolute -inset-8 bg-jeopardy-blue/20 blur-3xl rounded-full" />
        <h1 className="relative text-7xl md:text-9xl font-display font-bold italic tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">
          K-<span className="text-jeopardy-gold">JEOPARDY</span>
        </h1>
        <p className="mt-4 text-2xl font-display font-medium text-blue-400 tracking-[0.3em] uppercase">
          English Master Edition
        </p>
      </motion.div>

      <div className="max-w-2xl text-white/70 mb-8 space-y-4 leading-relaxed">
        <p className="text-xl">
          Welcome to the ultimate Korean-to-English translation challenge!
        </p>
        <p>
          Generate a fresh board with <strong>Gemini AI</strong> for unique questions and natural expressions every time.
        </p>
      </div>

      {/* AI Settings */}
      <div className="w-full max-w-md mb-12 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
        <label className="block text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
          Board Subject (Optional)
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Slang, Workplace, Dating, Travel..."
            className="w-full bg-black/40 border-2 border-white/10 focus:border-jeopardy-gold/50 rounded-2xl py-4 pl-12 pr-4 text-white outline-none transition-all placeholder:text-white/20"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,12,233,0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStart(true, topic)}
          className="bg-jeopardy-blue hover:bg-blue-600 text-white font-display font-bold text-3xl px-12 py-6 rounded-2xl shadow-2xl flex items-center gap-4 cursor-pointer group border-b-8 border-blue-900 active:border-b-2 active:translate-y-1 transition-all"
        >
          <Sparkles className="w-10 h-10 text-jeopardy-gold fill-current" />
          GENERATE GAME
        </motion.button>

        <button
          onClick={() => onStart(false)}
          className="text-white/40 hover:text-white/80 font-bold tracking-widest text-sm transition-colors cursor-pointer border-b border-transparent hover:border-white/40"
        >
          PLAY CLASSIC BOARD
        </button>
      </div>

      <div className="mt-20 flex flex-col items-center gap-4">
        <div className="flex gap-8 items-center text-white/30 font-bold uppercase tracking-widest text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            5 CATEGORIES
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full" />
          <div>25 QUESTIONS</div>
          <div className="w-1 h-1 bg-white/30 rounded-full" />
          <div>2 TEAMS</div>
        </div>
        
        <div className="text-white/20 text-xs font-medium tracking-widest uppercase mt-4">
          Built by <span className="text-white/40 font-bold">Sunny Shin</span>
        </div>
        <div className="text-white/10 text-[10px] uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </div>
      </div>
    </div>
  );
}
