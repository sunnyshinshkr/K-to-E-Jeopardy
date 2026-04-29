export interface Question {
  id: string;
  category: string;
  points: number;
  question: string; // Korean
  answer: string; // English
  isUsed: boolean;
}

export interface FinalJeopardy {
  category: string;
  question: string;
  answer: string;
}

export interface Category {
  id: string;
  title: string;
  questions: Question[];
}

export type GameState = 'LOBBY' | 'BOARD' | 'QUESTION' | 'FINAL';

export interface Score {
  team1: number;
  team2: number;
}
