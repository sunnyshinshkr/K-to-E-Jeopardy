import { motion } from 'motion/react';
import { Question } from '../types';

interface TileProps {
  question: Question;
  onClick: (q: Question) => void;
  key?: string;
}

export default function Tile({ question, onClick }: TileProps) {
  return (
    <motion.button
      whileHover={!question.isUsed ? { scale: 1.05, zIndex: 10 } : {}}
      whileTap={!question.isUsed ? { scale: 0.95 } : {}}
      onClick={() => !question.isUsed && onClick(question)}
      disabled={question.isUsed}
      className={`
        relative aspect-[4/3] flex items-center justify-center
        rounded-lg border-2 text-3xl font-display font-bold tracking-widest
        transition-all duration-500 perspective-1000
        ${question.isUsed 
          ? 'bg-jeopardy-dark border-blue-900 text-blue-900 opacity-50 cursor-not-allowed' 
          : 'bg-jeopardy-blue border-blue-400 text-jeopardy-gold shadow-[0_0_15px_rgba(6,12,233,0.5)] cursor-pointer hover:shadow-[0_0_25px_rgba(6,12,233,0.8)]'
        }
      `}
    >
      <div className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        {question.isUsed ? '' : `$${question.points}`}
      </div>
      
      {/* Visual Glint Effect */}
      {!question.isUsed && (
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 rounded-lg" />
      )}
    </motion.button>
  );
}
