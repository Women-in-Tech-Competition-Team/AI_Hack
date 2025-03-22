export type GameType = 'pattern_recognition' | 'color_matching' | 'word_recognition' | 'memory_match';

export interface GameData {
  type: GameType;
  difficulty: string;
  question: string;
  options: any;
  timeLimit: number;
}

export interface GameResult {
  gameType: GameType;
  difficulty: string;
  score: number;
  timeSpent: number;
  correctAnswers: number;
  totalQuestions: number;
  mistakes: {
    type: string;
    count: number;
  }[];
  completionTime: Date;
}

export interface GameAnalysis {
  learningStyle: 'visual' | 'auditory' | 'kinesthetic';
  attentionSpan: number; // in minutes
  strengths: string[];
  areasForImprovement: string[];
  recommendedActivities: string[];
  specialNeedsIndicators: {
    type: string;
    confidence: number;
    recommendations: string[];
  }[];
} 