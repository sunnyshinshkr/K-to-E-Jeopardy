import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GAME_DATA } from './constants';
import { Category, Question, GameState, Score, FinalJeopardy } from './types';
import Lobby from './components/Lobby';
import ScoreBoard from './components/ScoreBoard';
import Tile from './components/Tile';
import QuestionView from './components/QuestionView';
import { RefreshCw, Sparkles, Loader2, Trophy, Eye, Home, LogOut } from 'lucide-react';
import { generateGameBoard } from './services/gemini';

const DEFAULT_FINAL: FinalJeopardy = {
  category: "LIFE VALUES",
  question: "어떤 일이 있어도 포기하지 마세요.",
  answer: "Never give up, no matter what happens."
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [categories, setCategories] = useState<Category[]>(GAME_DATA);
  const [finalJeopardy, setFinalJeopardy] = useState<FinalJeopardy>(DEFAULT_FINAL);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [scores, setScores] = useState<Score>({ team1: 0, team2: 0 });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFinalAnswer, setShowFinalAnswer] = useState(false);

  const handleTileClick = (question: Question) => {
    setCurrentQuestion(question);
    setGameState('QUESTION');
  };

  const handleBackToBoard = () => {
    if (currentQuestion) {
      setCategories(prev => prev.map(cat => ({
        ...cat,
        questions: cat.questions.map(q => 
          q.id === currentQuestion.id ? { ...q, isUsed: true } : q
        )
      })));
    }
    setGameState('BOARD');
    setCurrentQuestion(null);
  };

  const updateScore = (team: 'team1' | 'team2', amount: number) => {
    setScores(prev => ({
      ...prev,
      [team]: Math.max(0, prev[team] + amount)
    }));
  };

  const startNewGame = async (useAI: boolean = false, topic?: string) => {
    setShowFinalAnswer(false);
    if (useAI) {
      setIsGenerating(true);
      try {
        const board = await generateGameBoard(topic);
        setCategories(board.categories);
        setFinalJeopardy(board.finalJeopardy);
      } catch (error) {
        console.error(error);
        alert("AI Generation failed. This usually happens if you are offline or if the API Key is missing locally.\n\nTo use AI locally, get a key from aistudio.google.com and ensure you have an internet connection.");
        setCategories(GAME_DATA.map(c => ({...c, questions: c.questions.map(q => ({...q, isUsed: false}))})));
        setFinalJeopardy(DEFAULT_FINAL);
      } finally {
        setIsGenerating(false);
      }
    } else {
      setCategories(GAME_DATA.map(c => ({...c, questions: c.questions.map(q => ({...q, isUsed: false}))})));
      setFinalJeopardy(DEFAULT_FINAL);
    }
    
    setScores({ team1: 0, team2: 0 });
    setGameState('BOARD');
  };

  const resetToLobby = () => {
    setGameState('LOBBY');
  };

  return (
    <div className="min-h-screen bg-jeopardy-dark text-white p-4 md:p-8 selection:bg-jeopardy-gold selection:text-jeopardy-dark">
      <AnimatePresence mode="wait">
        {isGenerating && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-jeopardy-dark flex flex-col items-center justify-center space-y-8"
          >
            <div className="relative">
              <Loader2 className="w-24 h-24 text-jeopardy-gold animate-spin" />
              <Sparkles className="absolute -top-2 -right-2 w-10 h-10 text-jeopardy-gold animate-bounce" />
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-display font-bold italic text-white mb-2">GENERATING NEW BOARD</h2>
              <p className="text-blue-400 font-bold tracking-[0.3em] animate-pulse">AI IS WRITING QUESTIONS...</p>
            </div>
          </motion.div>
        )}

        {gameState === 'LOBBY' && !isGenerating && (
          <Lobby 
            key="lobby" 
            onStart={() => startNewGame(true)} 
          />
        )}

        {gameState === 'BOARD' && (
          <motion.div
            key="board"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-7xl mx-auto"
          >
            {/* Header Area */}
            <div className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-6">
                <button 
                  onClick={resetToLobby}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all cursor-pointer font-bold text-sm uppercase tracking-widest border border-red-500/20 group"
                  title="Exit Game"
                >
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Home / Exit</span>
                </button>

                <h1 className="text-2xl md:text-3xl font-display font-bold italic text-white tracking-tight">
                  K-<span className="text-jeopardy-gold">JEOPARDY</span>
                </h1>
              </div>
              
              <div className="hidden md:flex items-center gap-2 text-white/30 text-xs font-bold tracking-[0.2em] uppercase">
                <Trophy className="w-4 h-4" />
                Live Translation Session
              </div>
            </div>

            <ScoreBoard scores={scores} onUpdateScore={updateScore} />

            {/* Game Grid */}
            <div className="grid grid-cols-5 gap-3 md:gap-6 bg-blue-900/20 p-6 rounded-3xl border-4 border-blue-900/50 backdrop-blur-md shadow-inner">
              {/* Category Headers */}
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  className="bg-jeopardy-blue border-b-4 border-white/20 p-4 md:p-6 flex items-center justify-center text-center rounded-t-xl min-h-[100px] md:min-h-[140px] shadow-lg"
                >
                  <h3 className="text-lg md:text-2xl font-display font-bold uppercase tracking-wider leading-tight drop-shadow-md">
                    {cat.title}
                  </h3>
                </div>
              ))}

              {/* Tiles Grid - Transposed to show by points visually */}
              {[0, 1, 2, 3, 4].map(idx => (
                categories.map(cat => (
                  <Tile 
                    key={cat.questions[idx].id} 
                    question={cat.questions[idx]} 
                    onClick={handleTileClick} 
                  />
                ))
              ))}
            </div>

            {/* Final Jeopardy Trigger */}
            <div className="mt-12 flex flex-col items-center gap-8">
               <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameState('FINAL')}
                className="bg-black/40 border-2 border-jeopardy-gold/30 hover:border-jeopardy-gold text-jeopardy-gold/80 hover:text-jeopardy-gold px-8 py-3 rounded-full font-display font-bold text-sm tracking-[0.3em] uppercase transition-all flex items-center gap-3 cursor-pointer"
               >
                 Final Jeopardy
               </motion.button>

               <div className="flex flex-col items-center gap-1 opacity-20 hover:opacity-50 transition-opacity">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase">Built by Sunny Shin</p>
                  <p className="text-[8px] tracking-[0.2em] uppercase">&copy; {new Date().getFullYear()} K-JEOPARDY</p>
               </div>
            </div>
          </motion.div>
        )}

        {gameState === 'QUESTION' && currentQuestion && (
          <QuestionView 
            key="question" 
            question={currentQuestion} 
            onBack={handleBackToBoard} 
            onExit={resetToLobby}
          />
        )}

        {gameState === 'FINAL' && (
          <motion.div
             key="final"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black flex flex-col items-center justify-center p-8 text-center z-[100]"
          >
             <h1 className="text-6xl md:text-8xl font-display font-bold text-jeopardy-gold mb-8 animate-pulse italic">
               FINAL JEOPARDY
             </h1>
             <p className="text-2xl text-white/50 mb-12 tracking-widest uppercase">Place your wagers now...</p>
             
             <div className="bg-jeopardy-blue p-12 rounded-3xl border-4 border-jeopardy-gold max-w-4xl w-full">
               <div className="mb-6 flex justify-center">
                 <div className="bg-white/10 px-6 py-2 rounded-full border border-white/20 text-jeopardy-gold font-bold tracking-[0.3em] uppercase text-sm">
                   {finalJeopardy.category}
                 </div>
               </div>
               
               <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-4">
                 "{finalJeopardy.question}"
               </h2>
               <p className="text-blue-300 text-xl font-bold uppercase tracking-widest">Translate to idiomatic English</p>
               
               <AnimatePresence>
                 {showFinalAnswer ? (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-12 p-8 bg-black/40 rounded-2xl border-2 border-jeopardy-gold"
                    >
                       <p className="text-3xl md:text-5xl font-display font-bold italic text-white">
                         {finalJeopardy.answer}
                       </p>
                    </motion.div>
                 ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowFinalAnswer(true)}
                      className="mt-12 bg-jeopardy-gold text-jeopardy-dark px-12 py-4 rounded-full font-display font-bold text-xl flex items-center gap-3 mx-auto cursor-pointer"
                    >
                      <Eye className="w-6 h-6" />
                      REVEAL FINAL ANSWER
                    </motion.button>
                 )}
               </AnimatePresence>

               <div className="mt-12 flex flex-col items-center gap-4">
                 <button
                   onClick={() => setGameState('BOARD')}
                   className="text-white/40 hover:text-white px-8 py-3 rounded-full font-bold cursor-pointer transition-colors"
                 >
                   BACK TO BOARD
                 </button>
                 
                 <button
                   onClick={resetToLobby}
                   className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-red-500/20 text-white/30 hover:text-red-400 rounded-xl transition-all cursor-pointer font-bold text-sm uppercase tracking-widest border border-white/10 hover:border-red-500/30"
                 >
                   <LogOut className="w-4 h-4" />
                   END GAME & EXIT
                 </button>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Background Elements */}
      <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none -z-10" />
    </div>
  );
}
