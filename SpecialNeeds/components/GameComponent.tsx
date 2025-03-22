import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { GameData, GameResult } from '../types/game';

interface GameComponentProps {
  gameData: GameData;
  onComplete: (result: GameResult) => void;
}

export const GameComponent: React.FC<GameComponentProps> = ({ gameData, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(gameData.timeLimit);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<{ type: string; count: number }[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = checkAnswer(answer);
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      const mistakeType = getMistakeType(answer);
      setMistakes(prev => {
        const existing = prev.find(m => m.type === mistakeType);
        if (existing) {
          return prev.map(m => 
            m.type === mistakeType ? { ...m, count: m.count + 1 } : m
          );
        }
        return [...prev, { type: mistakeType, count: 1 }];
      });
    }
  };

  const checkAnswer = (answer: string): boolean => {
    switch (gameData.type) {
      case 'pattern_recognition':
        return answer === gameData.options.answer;
      case 'color_matching':
        return answer === gameData.options.find((opt: any) => opt.color === answer)?.name;
      case 'word_recognition':
        return answer === gameData.options.word;
      case 'memory_match':
        return answer === gameData.options[0];
      default:
        return false;
    }
  };

  const getMistakeType = (answer: string): string => {
    switch (gameData.type) {
      case 'pattern_recognition':
        return 'pattern_error';
      case 'color_matching':
        return 'color_error';
      case 'word_recognition':
        return 'word_error';
      case 'memory_match':
        return 'memory_error';
      default:
        return 'unknown_error';
    }
  };

  const handleGameComplete = () => {
    const result: GameResult = {
      gameType: gameData.type,
      difficulty: gameData.difficulty,
      score,
      timeSpent: gameData.timeLimit - timeLeft,
      correctAnswers: score,
      totalQuestions: 1,
      mistakes,
      completionTime: new Date(),
    };
    setIsComplete(true);
    onComplete(result);
  };

  const renderGameContent = () => {
    switch (gameData.type) {
      case 'pattern_recognition':
        return (
          <View style={styles.patternContainer}>
            <Text style={styles.patternSequence}>
              {gameData.options.sequence.join(' ')}
            </Text>
            <View style={styles.optionsContainer}>
              {['🔴', '🔵', '🟡', '🟢'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswer(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'color_matching':
        return (
          <View style={styles.colorContainer}>
            {gameData.options.map((option: any) => (
              <TouchableOpacity
                key={option.color}
                style={[
                  styles.colorButton,
                  selectedAnswer === option.color && styles.selectedOption,
                ]}
                onPress={() => handleAnswer(option.color)}
              >
                <Text style={styles.colorText}>{option.color}</Text>
                <Text style={styles.colorName}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'word_recognition':
        return (
          <View style={styles.wordContainer}>
            <Text style={styles.wordQuestion}>{gameData.options.word}</Text>
            <View style={styles.optionsContainer}>
              {gameData.options.options.map((option: string) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswer(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'memory_match':
        return (
          <View style={styles.memoryContainer}>
            <View style={styles.memoryGrid}>
              {gameData.options.map((option: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.memoryCard,
                    selectedAnswer === option && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswer(option)}
                >
                  <Text style={styles.memoryText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
        <Text style={styles.question}>{gameData.question}</Text>
        {renderGameContent()}
        {isComplete && (
          <Button mode="contained" onPress={handleGameComplete} style={styles.completeButton}>
            Complete Game
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  question: {
    fontSize: 20,
    marginBottom: 24,
  },
  patternContainer: {
    alignItems: 'center',
  },
  patternSequence: {
    fontSize: 24,
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    minWidth: 60,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 24,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  colorButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  colorText: {
    fontSize: 24,
  },
  colorName: {
    fontSize: 16,
    marginTop: 4,
  },
  wordContainer: {
    alignItems: 'center',
  },
  wordQuestion: {
    fontSize: 24,
    marginBottom: 16,
  },
  memoryContainer: {
    alignItems: 'center',
  },
  memoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  memoryCard: {
    width: 60,
    height: 60,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoryText: {
    fontSize: 24,
  },
  completeButton: {
    marginTop: 16,
  },
}); 