import { GameResult, GameAnalysis } from '../types/game';

export class AnalysisService {
  static analyzeResults(results: GameResult[]): GameAnalysis {
    const analysis: GameAnalysis = {
      learningStyle: this.determineLearningStyle(results),
      attentionSpan: this.calculateAttentionSpan(results),
      strengths: this.identifyStrengths(results),
      areasForImprovement: this.identifyAreasForImprovement(results),
      recommendedActivities: this.generateRecommendations(results),
      specialNeedsIndicators: this.analyzeSpecialNeedsIndicators(results),
    };

    return analysis;
  }

  private static determineLearningStyle(results: GameResult[]): 'visual' | 'auditory' | 'kinesthetic' {
    const visualGames = results.filter(r => 
      ['pattern_recognition', 'color_matching', 'memory_match'].includes(r.gameType)
    );
    const languageGames = results.filter(r => 
      r.gameType === 'word_recognition'
    );

    if (visualGames.length > languageGames.length) {
      return 'visual';
    } else if (languageGames.length > visualGames.length) {
      return 'auditory';
    } else {
      return 'kinesthetic';
    }
  }

  private static calculateAttentionSpan(results: GameResult[]): number {
    const totalTime = results.reduce((acc, curr) => acc + curr.timeSpent, 0);
    const averageTime = totalTime / results.length;
    return Math.round(averageTime / 60); // Convert to minutes
  }

  private static identifyStrengths(results: GameResult[]): string[] {
    const strengths: string[] = [];
    
    // Analyze pattern recognition
    const patternGames = results.filter(r => r.gameType === 'pattern_recognition');
    if (patternGames.length > 0) {
      const patternAccuracy = patternGames.reduce((acc, curr) => 
        acc + (curr.correctAnswers / curr.totalQuestions), 0) / patternGames.length;
      if (patternAccuracy > 0.8) {
        strengths.push('Pattern Recognition');
      }
    }

    // Analyze color matching
    const colorGames = results.filter(r => r.gameType === 'color_matching');
    if (colorGames.length > 0) {
      const colorAccuracy = colorGames.reduce((acc, curr) => 
        acc + (curr.correctAnswers / curr.totalQuestions), 0) / colorGames.length;
      if (colorAccuracy > 0.8) {
        strengths.push('Color Recognition');
      }
    }

    // Analyze word recognition
    const wordGames = results.filter(r => r.gameType === 'word_recognition');
    if (wordGames.length > 0) {
      const wordAccuracy = wordGames.reduce((acc, curr) => 
        acc + (curr.correctAnswers / curr.totalQuestions), 0) / wordGames.length;
      if (wordAccuracy > 0.8) {
        strengths.push('Word Recognition');
      }
    }

    return strengths;
  }

  private static identifyAreasForImprovement(results: GameResult[]): string[] {
    const areas: string[] = [];
    
    // Analyze pattern recognition
    const patternGames = results.filter(r => r.gameType === 'pattern_recognition');
    if (patternGames.length > 0) {
      const patternAccuracy = patternGames.reduce((acc, curr) => 
        acc + (curr.correctAnswers / curr.totalQuestions), 0) / patternGames.length;
      if (patternAccuracy < 0.6) {
        areas.push('Pattern Recognition');
      }
    }

    // Analyze color matching
    const colorGames = results.filter(r => r.gameType === 'color_matching');
    if (colorGames.length > 0) {
      const colorAccuracy = colorGames.reduce((acc, curr) => 
        acc + (curr.correctAnswers / curr.totalQuestions), 0) / colorGames.length;
      if (colorAccuracy < 0.6) {
        areas.push('Color Recognition');
      }
    }

    // Analyze word recognition
    const wordGames = results.filter(r => r.gameType === 'word_recognition');
    if (wordGames.length > 0) {
      const wordAccuracy = wordGames.reduce((acc, curr) => 
        acc + (curr.correctAnswers / curr.totalQuestions), 0) / wordGames.length;
      if (wordAccuracy < 0.6) {
        areas.push('Word Recognition');
      }
    }

    return areas;
  }

  private static generateRecommendations(results: GameResult[]): string[] {
    const recommendations: string[] = [];
    const learningStyle = this.determineLearningStyle(results);
    const areasForImprovement = this.identifyAreasForImprovement(results);

    // Add style-specific recommendations
    if (learningStyle === 'visual') {
      recommendations.push('Use more visual aids and diagrams');
      recommendations.push('Practice with visual pattern recognition games');
    } else if (learningStyle === 'auditory') {
      recommendations.push('Use audio-based learning materials');
      recommendations.push('Practice with word recognition games');
    } else {
      recommendations.push('Use hands-on learning activities');
      recommendations.push('Practice with interactive games');
    }

    // Add improvement-specific recommendations
    areasForImprovement.forEach(area => {
      switch (area) {
        case 'Pattern Recognition':
          recommendations.push('Practice with simpler pattern recognition games');
          recommendations.push('Use visual pattern cards for practice');
          break;
        case 'Color Recognition':
          recommendations.push('Practice with basic color matching games');
          recommendations.push('Use color flashcards for practice');
          break;
        case 'Word Recognition':
          recommendations.push('Practice with basic word recognition games');
          recommendations.push('Use word flashcards for practice');
          break;
      }
    });

    return recommendations;
  }

  private static analyzeSpecialNeedsIndicators(results: GameResult[]): { type: string; confidence: number; recommendations: string[] }[] {
    const indicators: { type: string; confidence: number; recommendations: string[] }[] = [];

    // Analyze attention span
    const averageTime = results.reduce((acc, curr) => acc + curr.timeSpent, 0) / results.length;
    if (averageTime < 15) {
      indicators.push({
        type: 'Attention Deficit',
        confidence: 0.7,
        recommendations: [
          'Break activities into shorter segments',
          'Use visual timers',
          'Provide frequent breaks'
        ]
      });
    }

    // Analyze pattern recognition difficulties
    const patternGames = results.filter(r => r.gameType === 'pattern_recognition');
    if (patternGames.length > 0) {
      const patternAccuracy = patternGames.reduce((acc, curr) => 
        acc + (curr.correctAnswers / curr.totalQuestions), 0) / patternGames.length;
      if (patternAccuracy < 0.5) {
        indicators.push({
          type: 'Visual Processing',
          confidence: 0.6,
          recommendations: [
            'Use simpler visual patterns',
            'Provide more visual cues',
            'Practice with basic shape recognition'
          ]
        });
      }
    }

    // Analyze word recognition difficulties
    const wordGames = results.filter(r => r.gameType === 'word_recognition');
    if (wordGames.length > 0) {
      const wordAccuracy = wordGames.reduce((acc, curr) => 
        acc + (curr.correctAnswers / curr.totalQuestions), 0) / wordGames.length;
      if (wordAccuracy < 0.5) {
        indicators.push({
          type: 'Language Processing',
          confidence: 0.6,
          recommendations: [
            'Use simpler words',
            'Provide audio support',
            'Practice with basic word recognition'
          ]
        });
      }
    }

    return indicators;
  }
} 