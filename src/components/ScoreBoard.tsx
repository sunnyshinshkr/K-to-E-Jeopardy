import { motion } from 'motion/react';

interface ScoreProps {
  scores: { team1: number; team2: number };
  onUpdateScore: (team: 'team1' | 'team2', amount: number) => void;
}

export default function ScoreBoard({ scores, onUpdateScore }: ScoreProps) {
  return (
    <div className="flex justify-between w-full max-w-4xl mx-auto mb-8 gap-4">
      <TeamScore 
        name="TEAM A" 
        score={scores.team1} 
        onPlus={() => onUpdateScore('team1', 100)}
        onMinus={() => onUpdateScore('team1', -100)}
        color="border-blue-500"
      />
      <div className="flex items-center text-4xl font-display font-bold text-jeopardy-gold italic tracking-widest px-8">
        VS
      </div>
      <TeamScore 
        name="TEAM B" 
        score={scores.team2} 
        onPlus={() => onUpdateScore('team2', 100)}
        onMinus={() => onUpdateScore('team2', -100)}
        color="border-red-500"
      />
    </div>
  );
}

function TeamScore({ name, score, onPlus, onMinus, color }: { name: string, score: number, onPlus: () => void, onMinus: () => void, color: string }) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-black/50 border-4 ${color} rounded-xl p-4 flex flex-col items-center min-w-[200px] shadow-2xl backdrop-blur-sm`}
    >
      <h3 className="text-xl font-display font-bold mb-1 tracking-wider">{name}</h3>
      <div className="text-5xl font-display font-bold text-jeopardy-gold mb-2 tabular-nums">
        ${score.toLocaleString()}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onMinus}
          className="bg-red-500/20 hover:bg-red-500/40 text-red-100 px-3 py-1 rounded text-sm font-bold transition-colors cursor-pointer"
        >
          -100
        </button>
        <button 
          onClick={onPlus}
          className="bg-green-500/20 hover:bg-green-500/40 text-green-100 px-3 py-1 rounded text-sm font-bold transition-colors cursor-pointer"
        >
          +100
        </button>
      </div>
    </motion.div>
  );
}
