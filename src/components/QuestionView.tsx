import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { Timer, ArrowLeft, Volume2, Eye } from 'lucide-react';

interface QuestionViewProps {
  question: Question;
  onBack: () => void;
  onExit: () => void;
  key?: string;
}

export default function QuestionView({ question, onBack, onExit }: QuestionViewProps) {
  const [timeLeft, setTimeLeft] = useState(20);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showAnswer) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowAnswer(true);
    }
  }, [timeLeft, showAnswer]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      className="fixed inset-0 z-50 bg-jeopardy-dark flex flex-col items-center justify-center p-8 text-center"
    >
      {/* Header Info */}
      <div className="absolute top-8 left-8 flex items-center gap-4 text-jeopardy-gold/60 font-display font-medium">
        <div className="bg-jeopardy-blue/20 px-4 py-2 rounded-full border border-jeopardy-blue/30">
          {question.category}
        </div>
        <div className="bg-jeopardy-blue/20 px-4 py-2 rounded-full border border-jeopardy-blue/30">
          ${question.points}
        </div>
      </div>

      {/* Timer */}
      <div className="absolute top-8 right-8 flex items-center gap-3">
        <Timer className={`w-8 h-8 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-jeopardy-gold'}`} />
        <span className={`text-3xl font-display font-bold tabular-nums ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}>
          {timeLeft}s
        </span>
      </div>

      {/* Question Content */}
      <div className="max-w-5xl w-full flex flex-col items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl text-blue-400 font-bold mb-4 uppercase tracking-[0.2em]">Translate to English:</h2>
          <p className="text-5xl md:text-7xl font-display font-bold leading-tight drop-shadow-lg break-keep px-4">
            "{question.question}"
          </p>
        </motion.div>

        <AnimatePresence>
          {showAnswer ? (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8 p-12 bg-jeopardy-blue rounded-3xl border-4 border-jeopardy-gold shadow-[0_0_50px_rgba(255,204,0,0.3)]"
            >
              <h3 className="text-xl text-jeopardy-gold/80 font-bold mb-4 uppercase tracking-[0.1em]">Natural English Answer:</h3>
              <p className="text-4xl md:text-6xl font-display font-bold italic">
                {question.answer}
              </p>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAnswer(true)}
              className="mt-12 bg-jeopardy-gold text-jeopardy-dark font-display font-bold px-10 py-4 rounded-full text-xl shadow-xl hover:bg-yellow-400 flex items-center gap-3 cursor-pointer"
            >
              <Eye className="w-6 h-6" />
              REVEAL ANSWER
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Back Button */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest text-sm">BACK TO BOARD</span>
        </button>

        <button
          onClick={onExit}
          className="text-[10px] font-bold text-white/20 hover:text-red-400 uppercase tracking-[0.3em] transition-colors cursor-pointer"
        >
          Exit Game
        </button>
      </div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </motion.div>
  );
}
