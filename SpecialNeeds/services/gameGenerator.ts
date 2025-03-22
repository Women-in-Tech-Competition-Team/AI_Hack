import { GameType, GameData, GameResult } from '../types/game';

export interface GameConfig {
  type: GameType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'visual' | 'language' | 'focus' | 'social';
}

export class GameGenerator {
  static generateGame(config: GameConfig): GameData {
    switch (config.type) {
      case 'pattern_recognition':
        return this.generatePatternRecognitionGame(config.difficulty);
      case 'color_matching':
        return this.generateColorMatchingGame(config.difficulty);
      case 'word_recognition':
        return this.generateWordRecognitionGame(config.difficulty);
      case 'memory_match':
        return this.generateMemoryMatchGame(config.difficulty);
      default:
        throw new Error('Unsupported game type');
    }
  }

  private static generatePatternRecognitionGame(difficulty: string): GameData {
    const patterns = {
      beginner: [
        { sequence: ['🔴', '🔵', '🔴', '🔵'], answer: '🔴' },
        { sequence: ['⭐', '⭐', '⭐', '⭐'], answer: '⭐' },
      ],
      intermediate: [
        { sequence: ['🔴', '🔵', '🟡', '🔴', '🔵'], answer: '🟡' },
        { sequence: ['⭐', '⭐', '⭐', '⭐', '⭐'], answer: '⭐' },
      ],
      advanced: [
        { sequence: ['🔴', '🔵', '🟡', '🟢', '🔴', '🔵'], answer: '🟡' },
        { sequence: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐'], answer: '⭐' },
      ],
    };

    return {
      type: 'pattern_recognition',
      difficulty,
      question: 'What comes next in the pattern?',
      options: patterns[difficulty][Math.floor(Math.random() * patterns[difficulty].length)],
      timeLimit: difficulty === 'beginner' ? 30 : difficulty === 'intermediate' ? 20 : 15,
    };
  }

  private static generateColorMatchingGame(difficulty: string): GameData {
    const colors = {
      beginner: ['🔴', '🔵', '🟡'],
      intermediate: ['🔴', '🔵', '🟡', '🟢'],
      advanced: ['🔴', '🔵', '🟡', '🟢', '🟣'],
    };

    const colorPairs = colors[difficulty].map(color => ({
      color,
      name: this.getColorName(color),
    }));

    return {
      type: 'color_matching',
      difficulty,
      question: 'Match the color with its name',
      options: colorPairs,
      timeLimit: difficulty === 'beginner' ? 30 : difficulty === 'intermediate' ? 20 : 15,
    };
  }

  private static generateWordRecognitionGame(difficulty: string): GameData {
    const words = {
      beginner: [
        { word: 'cat', options: ['cat', 'dog', 'bird', 'fish'] },
        { word: 'dog', options: ['dog', 'cat', 'bird', 'fish'] },
      ],
      intermediate: [
        { word: 'elephant', options: ['elephant', 'giraffe', 'lion', 'zebra'] },
        { word: 'giraffe', options: ['giraffe', 'elephant', 'lion', 'zebra'] },
      ],
      advanced: [
        { word: 'rhinoceros', options: ['rhinoceros', 'hippopotamus', 'crocodile', 'kangaroo'] },
        { word: 'hippopotamus', options: ['hippopotamus', 'rhinoceros', 'crocodile', 'kangaroo'] },
      ],
    };

    return {
      type: 'word_recognition',
      difficulty,
      question: 'Select the correct word',
      options: words[difficulty][Math.floor(Math.random() * words[difficulty].length)],
      timeLimit: difficulty === 'beginner' ? 30 : difficulty === 'intermediate' ? 20 : 15,
    };
  }

  private static generateMemoryMatchGame(difficulty: string): GameData {
    const pairs = {
      beginner: 4, // 2 pairs
      intermediate: 6, // 3 pairs
      advanced: 8, // 4 pairs
    };

    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const selectedEmojis = emojis.slice(0, pairs[difficulty]);
    const gamePairs = [...selectedEmojis, ...selectedEmojis].sort(() => Math.random() - 0.5);

    return {
      type: 'memory_match',
      difficulty,
      question: 'Find matching pairs',
      options: gamePairs,
      timeLimit: difficulty === 'beginner' ? 60 : difficulty === 'intermediate' ? 45 : 30,
    };
  }

  private static getColorName(emoji: string): string {
    const colorMap: { [key: string]: string } = {
      '🔴': 'Red',
      '🔵': 'Blue',
      '🟡': 'Yellow',
      '🟢': 'Green',
      '🟣': 'Purple',
    };
    return colorMap[emoji] || 'Unknown';
  }
} 