export type AgeGroup = 'pre-k' | 'k-1' | 'k-2' | 'k-3' | 'k-4' | 'k-5';
export type Subject = 'math' | 'english';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type GameType = 
  // Math Games
  | 'number_recognition'
  | 'basic_addition'
  | 'basic_subtraction'
  | 'shape_recognition'
  | 'pattern_recognition'
  | 'counting_objects'
  | 'number_comparison'
  // English Games
  | 'letter_recognition'
  | 'word_recognition'
  | 'phonics'
  | 'sight_words'
  | 'basic_reading'
  | 'vocabulary'
  | 'sentence_formation';

// Game-specific option types
type NumberRecognitionOptions = number[];
type BasicMathOptions = number[];
type ShapeRecognitionOptions = {
  shape: string;
  options: string[];
};
type PatternRecognitionOptions = {
  sequence: string[];
  answer: string;
};
type CountingObjectsOptions = {
  count: number;
  objects: string[];
};
type NumberComparisonOptions = [number, number];
type LetterRecognitionOptions = string[];
type WordRecognitionOptions = {
  word: string;
  options: string[];
};
type PhonicsOptions = {
  sound: string;
  options: string[];
};
type SightWordsOptions = {
  word: string;
  options: string[];
};
type BasicReadingOptions = {
  sentence: string;
  options: string[];
};
type VocabularyOptions = {
  word: string;
  definition: string;
  options: string[];
};
type SentenceFormationOptions = {
  words: string[];
  correctOrder: number[];
};

// Union type for all possible game options
type GameOptions = 
  | NumberRecognitionOptions
  | BasicMathOptions
  | ShapeRecognitionOptions
  | PatternRecognitionOptions
  | CountingObjectsOptions
  | NumberComparisonOptions
  | LetterRecognitionOptions
  | WordRecognitionOptions
  | PhonicsOptions
  | SightWordsOptions
  | BasicReadingOptions
  | VocabularyOptions
  | SentenceFormationOptions;

export interface GameData {
  type: GameType;
  subject: Subject;
  ageGroup: AgeGroup;
  difficulty: Difficulty;
  question: string;
  options: GameOptions;
  timeLimit: number;
  learningObjective: string;
}

export interface GameResult {
  type: GameType;
  subject: Subject;
  ageGroup: AgeGroup;
  score: number;
  timeSpent: number;
  correctAnswers: number;
  totalQuestions: number;
  mistakes: Array<{
    questionIndex: number;
    type: string;
    correctAnswer: string | number;
    userAnswer: string | number;
  }>;
  learningObjective: string;
  completed: boolean;
  startTime: number;
  completionTime: number;
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
  subjectProgress: {
    math: {
      completedTopics: string[];
      masteryLevel: number;
      nextRecommendedTopic: string;
    };
    english: {
      completedTopics: string[];
      masteryLevel: number;
      nextRecommendedTopic: string;
    };
  };
} 