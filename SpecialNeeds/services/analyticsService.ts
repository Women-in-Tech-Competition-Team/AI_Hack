import { GameResult, GameType, Subject, AgeGroup } from '@/types/game';

interface PerformanceMetrics {
  averageTimePerQuestion: number;
  accuracyRate: number;
  completionRate: number;
  mistakeRate: number;
  attentionSpan: number;
}

interface SubjectProgress {
  subject: Subject;
  gamesPlayed: number;
  averageScore: number;
  improvementRate: number;
  masteredTopics: string[];
  challengingTopics: string[];
}

interface LearningAnalytics {
  overallMetrics: PerformanceMetrics;
  subjectProgress: SubjectProgress[];
  ageGroupPerformance: Record<AgeGroup, PerformanceMetrics>;
  gameTypePerformance: Record<GameType, PerformanceMetrics>;
  learningStyle: {
    visual: number;
    auditory: number;
    kinesthetic: number;
  };
  attentionPatterns: {
    averageSessionDuration: number;
    peakPerformanceTime: string;
    focusLevel: number;
  };
  specialNeedsIndicators: {
    attentionDeficit: number;
    processingSpeed: number;
    workingMemory: number;
    recommendations: string[];
  };
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private gameResults: GameResult[] = [];

  private constructor() {}

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  addGameResult(result: GameResult): void {
    this.gameResults.push(result);
  }

  getAnalytics(): LearningAnalytics {
    return {
      overallMetrics: this.calculateOverallMetrics(),
      subjectProgress: this.calculateSubjectProgress(),
      ageGroupPerformance: this.calculateAgeGroupPerformance(),
      gameTypePerformance: this.calculateGameTypePerformance(),
      learningStyle: this.analyzeLearningStyle(),
      attentionPatterns: this.analyzeAttentionPatterns(),
      specialNeedsIndicators: this.analyzeSpecialNeedsIndicators()
    };
  }

  private calculateOverallMetrics(): PerformanceMetrics {
    const totalGames = this.gameResults.length;
    if (totalGames === 0) {
      return this.getEmptyMetrics();
    }

    const totalTime = this.gameResults.reduce((sum, result) => sum + result.timeSpent, 0);
    const totalCorrect = this.gameResults.reduce((sum, result) => sum + result.correctAnswers, 0);
    const totalQuestions = this.gameResults.reduce((sum, result) => sum + result.totalQuestions, 0);
    const totalMistakes = this.gameResults.reduce((sum, result) => sum + result.mistakes.length, 0);

    return {
      averageTimePerQuestion: totalTime / totalQuestions,
      accuracyRate: (totalCorrect / totalQuestions) * 100,
      completionRate: (this.gameResults.filter(r => r.completed).length / totalGames) * 100,
      mistakeRate: (totalMistakes / totalQuestions) * 100,
      attentionSpan: this.calculateAverageAttentionSpan()
    };
  }

  private calculateSubjectProgress(): SubjectProgress[] {
    const subjects: Subject[] = ['math', 'english'];
    return subjects.map(subject => {
      const subjectResults = this.gameResults.filter(r => r.subject === subject);
      const totalGames = subjectResults.length;
      
      if (totalGames === 0) {
        return {
          subject,
          gamesPlayed: 0,
          averageScore: 0,
          improvementRate: 0,
          masteredTopics: [],
          challengingTopics: []
        };
      }

      const averageScore = subjectResults.reduce((sum, r) => sum + r.score, 0) / totalGames;
      const improvementRate = this.calculateImprovementRate(subjectResults);
      
      return {
        subject,
        gamesPlayed: totalGames,
        averageScore,
        improvementRate,
        masteredTopics: this.identifyMasteredTopics(subjectResults),
        challengingTopics: this.identifyChallengingTopics(subjectResults)
      };
    });
  }

  private calculateAgeGroupPerformance(): Record<AgeGroup, PerformanceMetrics> {
    const ageGroups: AgeGroup[] = ['pre-k', 'k-1', 'k-2', 'k-3', 'k-4', 'k-5'];
    return ageGroups.reduce((acc, ageGroup) => {
      acc[ageGroup] = this.calculateMetricsForAgeGroup(ageGroup);
      return acc;
    }, {} as Record<AgeGroup, PerformanceMetrics>);
  }

  private calculateGameTypePerformance(): Record<GameType, PerformanceMetrics> {
    const gameTypes = this.getUniqueGameTypes();
    return gameTypes.reduce((acc, gameType) => {
      acc[gameType] = this.calculateMetricsForGameType(gameType);
      return acc;
    }, {} as Record<GameType, PerformanceMetrics>);
  }

  private analyzeLearningStyle(): { visual: number; auditory: number; kinesthetic: number } {
    const visualGames: GameType[] = ['pattern_recognition', 'shape_recognition', 'counting_objects'];
    const auditoryGames: GameType[] = ['phonics', 'word_recognition', 'sight_words'];
    const kinestheticGames: GameType[] = ['sentence_formation', 'basic_reading', 'vocabulary'];

    const visualScore = this.calculateStyleScore(visualGames);
    const auditoryScore = this.calculateStyleScore(auditoryGames);
    const kinestheticScore = this.calculateStyleScore(kinestheticGames);

    const total = visualScore + auditoryScore + kinestheticScore;
    return {
      visual: (visualScore / total) * 100,
      auditory: (auditoryScore / total) * 100,
      kinesthetic: (kinestheticScore / total) * 100
    };
  }

  private analyzeAttentionPatterns(): {
    averageSessionDuration: number;
    peakPerformanceTime: string;
    focusLevel: number;
  } {
    const sessionDurations = this.gameResults.map(r => r.completionTime - r.startTime);
    const averageDuration = sessionDurations.reduce((sum, duration) => sum + duration, 0) / sessionDurations.length;

    const timeSlots = this.gameResults.map(r => new Date(r.startTime).getHours());
    const peakHour = this.findPeakHour(timeSlots);

    const focusLevel = this.calculateFocusLevel();

    return {
      averageSessionDuration: averageDuration,
      peakPerformanceTime: `${peakHour}:00`,
      focusLevel
    };
  }

  private analyzeSpecialNeedsIndicators(): {
    attentionDeficit: number;
    processingSpeed: number;
    workingMemory: number;
    recommendations: string[];
  } {
    const attentionDeficit = this.calculateAttentionDeficitScore();
    const processingSpeed = this.calculateProcessingSpeed();
    const workingMemory = this.calculateWorkingMemoryScore();

    return {
      attentionDeficit,
      processingSpeed,
      workingMemory,
      recommendations: this.generateRecommendations(attentionDeficit, processingSpeed, workingMemory)
    };
  }

  private getEmptyMetrics(): PerformanceMetrics {
    return {
      averageTimePerQuestion: 0,
      accuracyRate: 0,
      completionRate: 0,
      mistakeRate: 0,
      attentionSpan: 0
    };
  }

  private calculateAverageAttentionSpan(): number {
    const completedGames = this.gameResults.filter(r => r.completed);
    if (completedGames.length === 0) return 0;

    const totalTime = completedGames.reduce((sum, r) => sum + (r.completionTime - r.startTime), 0);
    return totalTime / completedGames.length;
  }

  private calculateImprovementRate(results: GameResult[]): number {
    if (results.length < 2) return 0;

    const sortedResults = [...results].sort((a, b) => a.startTime - b.startTime);
    const firstScore = sortedResults[0].score;
    const lastScore = sortedResults[sortedResults.length - 1].score;

    return ((lastScore - firstScore) / firstScore) * 100;
  }

  private identifyMasteredTopics(results: GameResult[]): string[] {
    const topicScores = new Map<string, number[]>();
    
    results.forEach(result => {
      const topic = result.learningObjective;
      if (!topicScores.has(topic)) {
        topicScores.set(topic, []);
      }
      topicScores.get(topic)?.push(result.score);
    });

    return Array.from(topicScores.entries())
      .filter(([_, scores]) => {
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return average >= 80;
      })
      .map(([topic]) => topic);
  }

  private identifyChallengingTopics(results: GameResult[]): string[] {
    const topicScores = new Map<string, number[]>();
    
    results.forEach(result => {
      const topic = result.learningObjective;
      if (!topicScores.has(topic)) {
        topicScores.set(topic, []);
      }
      topicScores.get(topic)?.push(result.score);
    });

    return Array.from(topicScores.entries())
      .filter(([_, scores]) => {
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return average < 60;
      })
      .map(([topic]) => topic);
  }

  private calculateMetricsForAgeGroup(ageGroup: AgeGroup): PerformanceMetrics {
    const ageGroupResults = this.gameResults.filter(r => r.ageGroup === ageGroup);
    if (ageGroupResults.length === 0) {
      return this.getEmptyMetrics();
    }

    const totalTime = ageGroupResults.reduce((sum, r) => sum + r.timeSpent, 0);
    const totalCorrect = ageGroupResults.reduce((sum, r) => sum + r.correctAnswers, 0);
    const totalQuestions = ageGroupResults.reduce((sum, r) => sum + r.totalQuestions, 0);
    const totalMistakes = ageGroupResults.reduce((sum, r) => sum + r.mistakes.length, 0);

    return {
      averageTimePerQuestion: totalTime / totalQuestions,
      accuracyRate: (totalCorrect / totalQuestions) * 100,
      completionRate: (ageGroupResults.filter(r => r.completed).length / ageGroupResults.length) * 100,
      mistakeRate: (totalMistakes / totalQuestions) * 100,
      attentionSpan: this.calculateAverageAttentionSpan()
    };
  }

  private calculateMetricsForGameType(gameType: GameType): PerformanceMetrics {
    const gameTypeResults = this.gameResults.filter(r => r.type === gameType);
    if (gameTypeResults.length === 0) {
      return this.getEmptyMetrics();
    }

    const totalTime = gameTypeResults.reduce((sum, r) => sum + r.timeSpent, 0);
    const totalCorrect = gameTypeResults.reduce((sum, r) => sum + r.correctAnswers, 0);
    const totalQuestions = gameTypeResults.reduce((sum, r) => sum + r.totalQuestions, 0);
    const totalMistakes = gameTypeResults.reduce((sum, r) => sum + r.mistakes.length, 0);

    return {
      averageTimePerQuestion: totalTime / totalQuestions,
      accuracyRate: (totalCorrect / totalQuestions) * 100,
      completionRate: (gameTypeResults.filter(r => r.completed).length / gameTypeResults.length) * 100,
      mistakeRate: (totalMistakes / totalQuestions) * 100,
      attentionSpan: this.calculateAverageAttentionSpan()
    };
  }

  private getUniqueGameTypes(): GameType[] {
    return Array.from(new Set(this.gameResults.map(r => r.type)));
  }

  private calculateStyleScore(gameTypes: GameType[]): number {
    return this.gameResults
      .filter(r => gameTypes.includes(r.type))
      .reduce((sum, r) => sum + r.score, 0);
  }

  private findPeakHour(hours: number[]): number {
    const hourCounts = new Map<number, number>();
    hours.forEach(hour => {
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });

    let peakHour = 0;
    let maxCount = 0;

    hourCounts.forEach((count, hour) => {
      if (count > maxCount) {
        maxCount = count;
        peakHour = hour;
      }
    });

    return peakHour;
  }

  private calculateFocusLevel(): number {
    const completedGames = this.gameResults.filter(r => r.completed);
    if (completedGames.length === 0) return 0;

    const focusScores = completedGames.map(r => {
      const timePerQuestion = r.timeSpent / r.totalQuestions;
      const accuracy = r.correctAnswers / r.totalQuestions;
      return (accuracy * 100) - (timePerQuestion * 10);
    });

    const averageFocus = focusScores.reduce((sum, score) => sum + score, 0) / focusScores.length;
    return Math.max(0, Math.min(100, averageFocus));
  }

  private calculateAttentionDeficitScore(): number {
    const completedGames = this.gameResults.filter(r => r.completed);
    if (completedGames.length === 0) return 0;

    const attentionScores = completedGames.map(r => {
      const timePerQuestion = r.timeSpent / r.totalQuestions;
      const mistakeRate = r.mistakes.length / r.totalQuestions;
      return 100 - (timePerQuestion * 5) - (mistakeRate * 100);
    });

    return Math.max(0, Math.min(100, attentionScores.reduce((sum, score) => sum + score, 0) / attentionScores.length));
  }

  private calculateProcessingSpeed(): number {
    const completedGames = this.gameResults.filter(r => r.completed);
    if (completedGames.length === 0) return 0;

    const speedScores = completedGames.map(r => {
      const timePerQuestion = r.timeSpent / r.totalQuestions;
      return 100 - (timePerQuestion * 10);
    });

    return Math.max(0, Math.min(100, speedScores.reduce((sum, score) => sum + score, 0) / speedScores.length));
  }

  private calculateWorkingMemoryScore(): number {
    const completedGames = this.gameResults.filter(r => r.completed);
    if (completedGames.length === 0) return 0;

    const memoryScores = completedGames.map(r => {
      const accuracy = r.correctAnswers / r.totalQuestions;
      const mistakeRate = r.mistakes.length / r.totalQuestions;
      return (accuracy * 100) - (mistakeRate * 50);
    });

    return Math.max(0, Math.min(100, memoryScores.reduce((sum, score) => sum + score, 0) / memoryScores.length));
  }

  private generateRecommendations(
    attentionDeficit: number,
    processingSpeed: number,
    workingMemory: number
  ): string[] {
    const recommendations: string[] = [];

    if (attentionDeficit < 60) {
      recommendations.push('Consider implementing shorter, more focused learning sessions');
      recommendations.push('Add visual aids and interactive elements to maintain engagement');
    }

    if (processingSpeed < 60) {
      recommendations.push('Provide additional time for completing tasks');
      recommendations.push('Break down complex problems into smaller steps');
    }

    if (workingMemory < 60) {
      recommendations.push('Use repetition and reinforcement techniques');
      recommendations.push('Implement memory-building exercises');
    }

    return recommendations;
  }
} 