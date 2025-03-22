import { GameType, GameData, Subject, AgeGroup, Difficulty } from '@/types/game';

// Define interfaces for the game content types
interface WordContent {
  word: string;
  options: string[];
}

interface ShapeContent {
  shape: string;
  options: string[];
}

interface PatternContent {
  sequence: string[];
  answer: string;
}

interface CountingContent {
  count: number;
  objects: string[];
}

interface PhonicsContent {
  sound: string;
  options: string[];
}

interface ReadingContent {
  sentence: string;
  options: string[];
}

interface VocabularyContent {
  word: string;
  definition: string;
  options: string[];
}

interface SentenceContent {
  words: string[];
  correctOrder: number[];
}

// Define type-safe content maps
type WordMap = Record<AgeGroup, WordContent[]>;
type ShapeMap = Record<AgeGroup, ShapeContent[]>;
type PatternMap = Record<AgeGroup, PatternContent[]>;
type PhonicsMap = Record<AgeGroup, PhonicsContent[]>;
type ReadingMap = Record<AgeGroup, ReadingContent[]>;
type VocabularyMap = Record<AgeGroup, VocabularyContent[]>;
type SentenceMap = Record<AgeGroup, SentenceContent[]>;

export interface GameConfig {
  type: GameType;
  subject: Subject;
  ageGroup: AgeGroup;
  difficulty: Difficulty;
}

export class GameGenerator {
  static generateGame(config: GameConfig): GameData {
    switch (config.type) {
      // Math Games
      case 'number_recognition':
        return this.generateNumberRecognitionGame(config);
      case 'basic_addition':
        return this.generateBasicAdditionGame(config);
      case 'basic_subtraction':
        return this.generateBasicSubtractionGame(config);
      case 'shape_recognition':
        return this.generateShapeRecognitionGame(config);
      case 'pattern_recognition':
        return this.generatePatternRecognitionGame(config);
      case 'counting_objects':
        return this.generateCountingObjectsGame(config);
      case 'number_comparison':
        return this.generateNumberComparisonGame(config);
      // English Games
      case 'letter_recognition':
        return this.generateLetterRecognitionGame(config);
      case 'word_recognition':
        return this.generateWordRecognitionGame(config);
      case 'phonics':
        return this.generatePhonicsGame(config);
      case 'sight_words':
        return this.generateSightWordsGame(config);
      case 'basic_reading':
        return this.generateBasicReadingGame(config);
      case 'vocabulary':
        return this.generateVocabularyGame(config);
      case 'sentence_formation':
        return this.generateSentenceFormationGame(config);
      default:
        throw new Error('Unsupported game type');
    }
  }

  private static generateNumberRecognitionGame(config: GameConfig): GameData {
    const numbers = this.getNumbersForAgeGroup(config.ageGroup);
    const number = numbers[Math.floor(Math.random() * numbers.length)];
    
    return {
      type: 'number_recognition',
      subject: 'math',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'What number is this?',
      options: this.generateNumberOptions(number, numbers),
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Recognize and identify numbers'
    };
  }

  private static generateBasicAdditionGame(config: GameConfig): GameData {
    const { num1, num2 } = this.generateAdditionNumbers(config.ageGroup);
    
    return {
      type: 'basic_addition',
      subject: 'math',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: `${num1} + ${num2} = ?`,
      options: this.generateMathOptions(num1 + num2, config.ageGroup),
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Solve basic addition problems'
    };
  }

  private static generateBasicSubtractionGame(config: GameConfig): GameData {
    const { num1, num2 } = this.generateSubtractionNumbers(config.ageGroup);
    
    return {
      type: 'basic_subtraction',
      subject: 'math',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: `${num1} - ${num2} = ?`,
      options: this.generateMathOptions(num1 - num2, config.ageGroup),
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Solve basic subtraction problems'
    };
  }

  private static generateShapeRecognitionGame(config: GameConfig): GameData {
    const { shape, options } = this.getShapeForAgeGroup(config.ageGroup);
    
    return {
      type: 'shape_recognition',
      subject: 'math',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'What shape is this?',
      options: { shape, options },
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Recognize and identify basic shapes'
    };
  }

  private static generatePatternRecognitionGame(config: GameConfig): GameData {
    const pattern = this.generatePatternForAgeGroup(config.ageGroup);
    
    return {
      type: 'pattern_recognition',
      subject: 'math',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'What comes next in the pattern?',
      options: pattern,
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Recognize and complete patterns'
    };
  }

  private static generateCountingObjectsGame(config: GameConfig): GameData {
    const { count, objects } = this.generateCountingObjectsForAgeGroup(config.ageGroup);
    
    return {
      type: 'counting_objects',
      subject: 'math',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'How many objects are there?',
      options: { count, objects },
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Count objects accurately'
    };
  }

  private static generateNumberComparisonGame(config: GameConfig): GameData {
    const { num1, num2 } = this.generateComparisonNumbers(config.ageGroup);
    
    return {
      type: 'number_comparison',
      subject: 'math',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'Which number is greater?',
      options: [num1, num2],
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Compare numbers and understand greater/less than'
    };
  }

  private static generatePhonicsGame(config: GameConfig): GameData {
    const { sound, options } = this.getPhonicsForAgeGroup(config.ageGroup);
    
    return {
      type: 'phonics',
      subject: 'english',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'Which word has the same sound?',
      options: { sound, options },
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Recognize and match phonics sounds'
    };
  }

  private static generateSightWordsGame(config: GameConfig): GameData {
    const { word, options } = this.getSightWordForAgeGroup(config.ageGroup);
    
    return {
      type: 'sight_words',
      subject: 'english',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'Select the correct sight word',
      options: { word, options },
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Recognize and read sight words'
    };
  }

  private static generateBasicReadingGame(config: GameConfig): GameData {
    const { sentence, options } = this.getReadingForAgeGroup(config.ageGroup);
    
    return {
      type: 'basic_reading',
      subject: 'english',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'Read the sentence and select the correct picture',
      options: { sentence, options },
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Read and comprehend simple sentences'
    };
  }

  private static generateVocabularyGame(config: GameConfig): GameData {
    const { word, definition, options } = this.getVocabularyForAgeGroup(config.ageGroup);
    
    return {
      type: 'vocabulary',
      subject: 'english',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'What does this word mean?',
      options: { word, definition, options },
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Understand and use new vocabulary words'
    };
  }

  private static generateSentenceFormationGame(config: GameConfig): GameData {
    const { words, correctOrder } = this.getSentenceFormationForAgeGroup(config.ageGroup);
    
    return {
      type: 'sentence_formation',
      subject: 'english',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'Arrange the words to form a correct sentence',
      options: { words, correctOrder },
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Form grammatically correct sentences'
    };
  }

  private static generateLetterRecognitionGame(config: GameConfig): GameData {
    const letter = this.getRandomLetter();
    
    return {
      type: 'letter_recognition',
      subject: 'english',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'What letter is this?',
      options: this.generateLetterOptions(letter),
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Recognize and identify letters'
    };
  }

  private static generateWordRecognitionGame(config: GameConfig): GameData {
    const { word, options } = this.getWordForAgeGroup(config.ageGroup);
    
    return {
      type: 'word_recognition',
      subject: 'english',
      ageGroup: config.ageGroup,
      difficulty: config.difficulty,
      question: 'Select the correct word',
      options: { word, options },
      timeLimit: this.getTimeLimit(config.ageGroup),
      learningObjective: 'Recognize and read basic words'
    };
  }

  private static getNumbersForAgeGroup(ageGroup: AgeGroup): number[] {
    switch (ageGroup) {
      case 'pre-k':
        return [1, 2, 3, 4, 5];
      case 'k-1':
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      case 'k-2':
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      default:
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    }
  }

  private static generateAdditionNumbers(ageGroup: AgeGroup): { num1: number; num2: number } {
    const maxSum = ageGroup === 'pre-k' ? 5 : ageGroup === 'k-1' ? 10 : 20;
    const num1 = Math.floor(Math.random() * (maxSum - 1)) + 1;
    const num2 = Math.floor(Math.random() * (maxSum - num1)) + 1;
    return { num1, num2 };
  }

  private static generateSubtractionNumbers(ageGroup: AgeGroup): { num1: number; num2: number } {
    const maxNum = ageGroup === 'pre-k' ? 5 : ageGroup === 'k-1' ? 10 : 20;
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * num1);
    return { num1, num2 };
  }

  private static getRandomLetter(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  }

  private static getWordForAgeGroup(ageGroup: AgeGroup): WordContent {
    const words: WordMap = {
      'pre-k': [
        { word: 'cat', options: ['cat', 'dog', 'bird', 'fish'] },
        { word: 'dog', options: ['dog', 'cat', 'bird', 'fish'] },
      ],
      'k-1': [
        { word: 'book', options: ['book', 'pen', 'desk', 'chair'] },
        { word: 'tree', options: ['tree', 'flower', 'grass', 'leaf'] },
      ],
      'k-2': [
        { word: 'house', options: ['house', 'home', 'building', 'apartment'] },
        { word: 'water', options: ['water', 'drink', 'liquid', 'rain'] },
      ],
      'k-3': [
        { word: 'computer', options: ['computer', 'laptop', 'tablet', 'phone'] },
        { word: 'garden', options: ['garden', 'park', 'yard', 'field'] },
      ],
      'k-4': [
        { word: 'mountain', options: ['mountain', 'hill', 'valley', 'cliff'] },
        { word: 'ocean', options: ['ocean', 'sea', 'lake', 'river'] },
      ],
      'k-5': [
        { word: 'universe', options: ['universe', 'galaxy', 'planet', 'star'] },
        { word: 'civilization', options: ['civilization', 'society', 'culture', 'community'] },
      ],
    };

    const ageGroupWords = words[ageGroup];
    return ageGroupWords[Math.floor(Math.random() * ageGroupWords.length)];
  }

  private static generateNumberOptions(correct: number, available: number[]): number[] {
    const options = [correct];
    while (options.length < 4) {
      const random = available[Math.floor(Math.random() * available.length)];
      if (!options.includes(random)) {
        options.push(random);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }

  private static generateMathOptions(correct: number, ageGroup: AgeGroup): number[] {
    const options = [correct];
    const range = ageGroup === 'pre-k' ? 2 : ageGroup === 'k-1' ? 3 : 5;
    
    while (options.length < 4) {
      const random = correct + (Math.floor(Math.random() * range * 2) - range);
      if (random > 0 && !options.includes(random)) {
        options.push(random);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }

  private static generateLetterOptions(correct: string): string[] {
    const options = [correct];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    while (options.length < 4) {
      const random = letters[Math.floor(Math.random() * letters.length)];
      if (!options.includes(random)) {
        options.push(random);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }

  private static getTimeLimit(ageGroup: AgeGroup): number {
    switch (ageGroup) {
      case 'pre-k':
        return 30;
      case 'k-1':
        return 25;
      case 'k-2':
        return 20;
      default:
        return 15;
    }
  }

  private static getShapeForAgeGroup(ageGroup: AgeGroup): ShapeContent {
    const shapes: ShapeMap = {
      'pre-k': [
        { shape: 'circle', options: ['circle', 'square', 'triangle', 'star'] },
        { shape: 'square', options: ['square', 'circle', 'triangle', 'star'] },
      ],
      'k-1': [
        { shape: 'rectangle', options: ['rectangle', 'circle', 'square', 'triangle'] },
        { shape: 'triangle', options: ['triangle', 'circle', 'square', 'rectangle'] },
      ],
      'k-2': [
        { shape: 'hexagon', options: ['hexagon', 'pentagon', 'octagon', 'circle'] },
        { shape: 'pentagon', options: ['pentagon', 'hexagon', 'octagon', 'circle'] },
      ],
      'k-3': [
        { shape: 'octagon', options: ['octagon', 'hexagon', 'pentagon', 'circle'] },
        { shape: 'oval', options: ['oval', 'circle', 'ellipse', 'round'] },
      ],
      'k-4': [
        { shape: 'diamond', options: ['diamond', 'rhombus', 'square', 'rectangle'] },
        { shape: 'trapezoid', options: ['trapezoid', 'parallelogram', 'rectangle', 'square'] },
      ],
      'k-5': [
        { shape: 'parallelogram', options: ['parallelogram', 'rectangle', 'rhombus', 'square'] },
        { shape: 'rhombus', options: ['rhombus', 'diamond', 'square', 'rectangle'] },
      ],
    };

    const ageGroupShapes = shapes[ageGroup];
    return ageGroupShapes[Math.floor(Math.random() * ageGroupShapes.length)];
  }

  private static generatePatternForAgeGroup(ageGroup: AgeGroup): PatternContent {
    const patterns: PatternMap = {
      'pre-k': [
        { sequence: ['🔴', '🔵', '🔴', '🔵'], answer: '🔴' },
        { sequence: ['⭐', '⭐', '⭐', '⭐'], answer: '⭐' },
      ],
      'k-1': [
        { sequence: ['🔴', '🔵', '🟡', '🔴', '🔵'], answer: '🟡' },
        { sequence: ['⭐', '⭐', '⭐', '⭐', '⭐'], answer: '⭐' },
      ],
      'k-2': [
        { sequence: ['🔴', '🔵', '🟡', '🟢', '🔴', '🔵'], answer: '🟡' },
        { sequence: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐'], answer: '⭐' },
      ],
      'k-3': [
        { sequence: ['🔴', '🔵', '🟡', '🟢', '🟣', '🔴', '🔵'], answer: '🟡' },
        { sequence: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'], answer: '⭐' },
      ],
      'k-4': [
        { sequence: ['🔴', '🔵', '🟡', '🟢', '🟣', '⚪', '🔴', '🔵'], answer: '🟡' },
        { sequence: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'], answer: '⭐' },
      ],
      'k-5': [
        { sequence: ['🔴', '🔵', '🟡', '🟢', '🟣', '⚪', '⚫', '🔴', '🔵'], answer: '🟡' },
        { sequence: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'], answer: '⭐' },
      ],
    };

    const ageGroupPatterns = patterns[ageGroup];
    return ageGroupPatterns[Math.floor(Math.random() * ageGroupPatterns.length)];
  }

  private static generateCountingObjectsForAgeGroup(ageGroup: AgeGroup): { count: number; objects: string[] } {
    const maxCount = ageGroup === 'pre-k' ? 5 : ageGroup === 'k-1' ? 10 : 20;
    const count = Math.floor(Math.random() * maxCount) + 1;
    const objects = Array(count).fill('🍎');
    return { count, objects };
  }

  private static generateComparisonNumbers(ageGroup: AgeGroup): { num1: number; num2: number } {
    const maxNum = ageGroup === 'pre-k' ? 5 : ageGroup === 'k-1' ? 10 : 20;
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    return { num1, num2 };
  }

  private static getPhonicsForAgeGroup(ageGroup: AgeGroup): PhonicsContent {
    const phonics: PhonicsMap = {
      'pre-k': [
        { sound: 'cat', options: ['cat', 'bat', 'hat', 'rat'] },
        { sound: 'dog', options: ['dog', 'log', 'fog', 'hog'] },
      ],
      'k-1': [
        { sound: 'ship', options: ['ship', 'shop', 'shed', 'shut'] },
        { sound: 'fish', options: ['fish', 'dish', 'wish', 'hush'] },
      ],
      'k-2': [
        { sound: 'rain', options: ['rain', 'train', 'pain', 'gain'] },
        { sound: 'book', options: ['book', 'look', 'took', 'hook'] },
      ],
      'k-3': [
        { sound: 'light', options: ['light', 'night', 'right', 'sight'] },
        { sound: 'star', options: ['star', 'car', 'far', 'bar'] },
      ],
      'k-4': [
        { sound: 'cloud', options: ['cloud', 'loud', 'proud', 'shroud'] },
        { sound: 'moon', options: ['moon', 'soon', 'tune', 'spoon'] },
      ],
      'k-5': [
        { sound: 'storm', options: ['storm', 'form', 'warm', 'swarm'] },
        { sound: 'wind', options: ['wind', 'find', 'kind', 'mind'] },
      ],
    };

    const ageGroupPhonics = phonics[ageGroup];
    return ageGroupPhonics[Math.floor(Math.random() * ageGroupPhonics.length)];
  }

  private static getSightWordForAgeGroup(ageGroup: AgeGroup): WordContent {
    const sightWords: WordMap = {
      'pre-k': [
        { word: 'the', options: ['the', 'and', 'a', 'to'] },
        { word: 'and', options: ['and', 'the', 'a', 'to'] },
      ],
      'k-1': [
        { word: 'said', options: ['said', 'sad', 'seed', 'side'] },
        { word: 'have', options: ['have', 'gave', 'save', 'wave'] },
      ],
      'k-2': [
        { word: 'could', options: ['could', 'cold', 'cloud', 'cook'] },
        { word: 'would', options: ['would', 'wood', 'world', 'word'] },
      ],
      'k-3': [
        { word: 'about', options: ['about', 'above', 'across', 'after'] },
        { word: 'their', options: ['their', 'there', 'they', 'them'] },
      ],
      'k-4': [
        { word: 'through', options: ['through', 'though', 'thought', 'thorough'] },
        { word: 'people', options: ['people', 'person', 'peoples', 'peoples'] },
      ],
      'k-5': [
        { word: 'because', options: ['because', 'became', 'become', 'before'] },
        { word: 'different', options: ['different', 'difference', 'differ', 'differed'] },
      ],
    };

    const ageGroupSightWords = sightWords[ageGroup];
    return ageGroupSightWords[Math.floor(Math.random() * ageGroupSightWords.length)];
  }

  private static getReadingForAgeGroup(ageGroup: AgeGroup): ReadingContent {
    const reading: ReadingMap = {
      'pre-k': [
        { sentence: 'The cat is sleeping.', options: ['🐱', '🐶', '🐭', '🐹'] },
        { sentence: 'The dog is running.', options: ['🐶', '🐱', '🐭', '🐹'] },
      ],
      'k-1': [
        { sentence: 'The bird is flying in the sky.', options: ['🦅', '🐦', '🦆', '🦉'] },
        { sentence: 'The fish is swimming in the water.', options: ['🐠', '🐟', '🐡', '🦈'] },
      ],
      'k-2': [
        { sentence: 'The children are playing in the park.', options: ['👥', '👤', '👣', '👢'] },
        { sentence: 'The teacher is reading a book.', options: ['👩‍🏫', '👨‍🏫', '👩‍💼', '👨‍💼'] },
      ],
      'k-3': [
        { sentence: 'The scientist is conducting an experiment.', options: ['🔬', '🔭', '📚', '✏️'] },
        { sentence: 'The artist is painting a beautiful picture.', options: ['🎨', '🎭', '🎪', '🎯'] },
      ],
      'k-4': [
        { sentence: 'The astronaut is exploring outer space.', options: ['🚀', '🌍', '🌙', '⭐'] },
        { sentence: 'The chef is cooking delicious food.', options: ['👨‍🍳', '🍳', '🍽️', '🍴'] },
      ],
      'k-5': [
        { sentence: 'The engineer is designing a new building.', options: ['🏗️', '🏢', '🏠', '🏭'] },
        { sentence: 'The doctor is helping sick patients.', options: ['👨‍⚕️', '🏥', '💊', '🩺'] },
      ],
    };

    const ageGroupReading = reading[ageGroup];
    return ageGroupReading[Math.floor(Math.random() * ageGroupReading.length)];
  }

  private static getVocabularyForAgeGroup(ageGroup: AgeGroup): VocabularyContent {
    const vocabulary: VocabularyMap = {
      'pre-k': [
        { word: 'happy', definition: 'Feeling joy or pleasure', options: ['happy', 'sad', 'angry', 'tired'] },
        { word: 'big', definition: 'Large in size', options: ['big', 'small', 'tall', 'short'] },
      ],
      'k-1': [
        { word: 'quick', definition: 'Moving fast', options: ['quick', 'slow', 'fast', 'swift'] },
        { word: 'bright', definition: 'Giving out or reflecting a lot of light', options: ['bright', 'dark', 'light', 'shiny'] },
      ],
      'k-2': [
        { word: 'brave', definition: 'Ready to face and endure danger or pain', options: ['brave', 'scared', 'fearful', 'timid'] },
        { word: 'clever', definition: 'Quick to understand, learn, and devise solutions', options: ['clever', 'smart', 'wise', 'bright'] },
      ],
      'k-3': [
        { word: 'curious', definition: 'Eager to know or learn something', options: ['curious', 'interested', 'inquisitive', 'nosy'] },
        { word: 'generous', definition: 'Showing a readiness to give more of something', options: ['generous', 'kind', 'giving', 'charitable'] },
      ],
      'k-4': [
        { word: 'determined', definition: 'Having made a firm decision and being resolved not to change it', options: ['determined', 'resolute', 'firm', 'stubborn'] },
        { word: 'confident', definition: 'Feeling or showing certainty about something', options: ['confident', 'sure', 'certain', 'assured'] },
      ],
      'k-5': [
        { word: 'perseverance', definition: 'Persistence in doing something despite difficulty', options: ['perseverance', 'persistence', 'determination', 'tenacity'] },
        { word: 'resilience', definition: 'The capacity to recover quickly from difficulties', options: ['resilience', 'strength', 'toughness', 'flexibility'] },
      ],
    };

    const ageGroupVocabulary = vocabulary[ageGroup];
    return ageGroupVocabulary[Math.floor(Math.random() * ageGroupVocabulary.length)];
  }

  private static getSentenceFormationForAgeGroup(ageGroup: AgeGroup): SentenceContent {
    const sentences: SentenceMap = {
      'pre-k': [
        { words: ['is', 'cat', 'the', 'sleeping'], correctOrder: [2, 1, 0, 3] },
        { words: ['dog', 'the', 'running', 'is'], correctOrder: [1, 0, 3, 2] },
      ],
      'k-1': [
        { words: ['bird', 'the', 'flying', 'sky', 'in', 'is', 'the'], correctOrder: [1, 0, 5, 3, 4, 6, 2] },
        { words: ['fish', 'the', 'swimming', 'water', 'in', 'is', 'the'], correctOrder: [1, 0, 5, 3, 4, 6, 2] },
      ],
      'k-2': [
        { words: ['children', 'the', 'playing', 'park', 'in', 'are', 'the'], correctOrder: [1, 0, 5, 3, 4, 6, 2] },
        { words: ['teacher', 'the', 'reading', 'book', 'a', 'is'], correctOrder: [1, 0, 5, 3, 4, 2] },
      ],
      'k-3': [
        { words: ['scientist', 'the', 'experiment', 'conducting', 'an', 'is'], correctOrder: [1, 0, 5, 3, 4, 2] },
        { words: ['artist', 'the', 'painting', 'picture', 'beautiful', 'a', 'is'], correctOrder: [1, 0, 6, 3, 5, 4, 2] },
      ],
      'k-4': [
        { words: ['astronaut', 'the', 'space', 'exploring', 'outer', 'is'], correctOrder: [1, 0, 5, 3, 4, 2] },
        { words: ['chef', 'the', 'cooking', 'food', 'delicious', 'is'], correctOrder: [1, 0, 5, 3, 4, 2] },
      ],
      'k-5': [
        { words: ['engineer', 'the', 'building', 'designing', 'new', 'a', 'is'], correctOrder: [1, 0, 6, 3, 5, 4, 2] },
        { words: ['doctor', 'the', 'helping', 'patients', 'sick', 'is'], correctOrder: [1, 0, 5, 3, 4, 2] },
      ],
    };

    const ageGroupSentences = sentences[ageGroup];
    return ageGroupSentences[Math.floor(Math.random() * ageGroupSentences.length)];
  }
} 