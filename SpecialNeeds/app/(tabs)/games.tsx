import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { GameComponent } from '@/components/GameComponent';
import { GameGenerator } from '@/services/gameGenerator';
import { GameResult } from '@/types/game';
import { AnalysisService } from '@/services/analysisService';

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export default function GamesScreen() {
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const startGame = (type: string, difficulty: Difficulty) => {
    const gameData = GameGenerator.generateGame({
      type,
      difficulty,
      category: 'visual', // This can be expanded based on game type
    });
    setCurrentGame(gameData);
    setShowAnalysis(false);
  };

  const handleGameComplete = (result: GameResult) => {
    setGameResults([...gameResults, result]);
    setCurrentGame(null);
    setShowAnalysis(true);
  };

  const renderGameCategories = () => (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Learning Activities</Text>

      {/* Visual Learning Activities */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Visual Learning" />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => startGame('pattern_recognition', 'beginner')}
            style={{ marginBottom: 8 }}
          >
            Pattern Recognition
          </Button>
          <Button
            mode="contained"
            onPress={() => startGame('color_matching', 'beginner')}
            style={{ marginBottom: 8 }}
          >
            Color Matching
          </Button>
          <Button
            mode="contained"
            onPress={() => startGame('memory_match', 'beginner')}
          >
            Memory Match
          </Button>
        </Card.Content>
      </Card>

      {/* Language Development */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Language Development" />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => startGame('word_recognition', 'beginner')}
          >
            Word Recognition
          </Button>
        </Card.Content>
      </Card>

      {/* Focus Activities */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Focus Activities" />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => startGame('pattern_recognition', 'intermediate')}
            style={{ marginBottom: 8 }}
          >
            Pattern Recognition (Advanced)
          </Button>
          <Button
            mode="contained"
            onPress={() => startGame('memory_match', 'intermediate')}
          >
            Memory Match (Advanced)
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );

  const renderAnalysis = () => {
    const analysis = AnalysisService.analyzeResults(gameResults);
    
    return (
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Analysis Results</Text>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Learning Style" />
          <Card.Content>
            <Text>Primary Learning Style: {analysis.learningStyle}</Text>
            <Text>Average Attention Span: {analysis.attentionSpan} minutes</Text>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Strengths" />
          <Card.Content>
            {analysis.strengths.map((strength, index) => (
              <Text key={index}>• {strength}</Text>
            ))}
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Areas for Improvement" />
          <Card.Content>
            {analysis.areasForImprovement.map((area, index) => (
              <Text key={index}>• {area}</Text>
            ))}
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Recommendations" />
          <Card.Content>
            {analysis.recommendedActivities.map((activity, index) => (
              <Text key={index}>• {activity}</Text>
            ))}
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title title="Special Needs Indicators" />
          <Card.Content>
            {analysis.specialNeedsIndicators.map((indicator, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: 'bold' }}>{indicator.type}</Text>
                <Text>Confidence: {Math.round(indicator.confidence * 100)}%</Text>
                <Text>Recommendations:</Text>
                {indicator.recommendations.map((rec, recIndex) => (
                  <Text key={recIndex}>• {rec}</Text>
                ))}
              </View>
            ))}
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => setShowAnalysis(false)}
          style={{ marginTop: 16 }}
        >
          Try Another Activity
        </Button>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {currentGame ? (
        <GameComponent gameData={currentGame} onComplete={handleGameComplete} />
      ) : showAnalysis ? (
        renderAnalysis()
      ) : (
        renderGameCategories()
      )}
    </View>
  );
}
