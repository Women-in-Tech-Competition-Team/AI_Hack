import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button, SegmentedButtons } from 'react-native-paper';
import { GameComponent } from '@/components/GameComponent';
import { GameGenerator } from '@/services/gameGenerator';
import { GameResult, AgeGroup, Subject, GameType } from '@/types/game';
import { AnalysisService } from '@/services/analysisService';

export default function GamesScreen() {
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>('pre-k');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('math');

  const startGame = (type: GameType, ageGroup: AgeGroup, subject: Subject) => {
    const gameData = GameGenerator.generateGame({
      type,
      ageGroup,
      subject,
      difficulty: 'beginner',
    });
    setCurrentGame(gameData);
    setShowAnalysis(false);
  };

  const handleGameComplete = (result: GameResult) => {
    setGameResults([...gameResults, result]);
    setCurrentGame(null);
    setShowAnalysis(true);
  };

  const renderMathGames = () => (
    <Card style={{ marginBottom: 16 }}>
      <Card.Title title="Math Games" />
      <Card.Content>
        <Button
          mode="contained"
          onPress={() => startGame('number_recognition' as GameType, selectedAgeGroup, 'math')}
          style={{ marginBottom: 8 }}
        >
          Number Recognition
        </Button>
        <Button
          mode="contained"
          onPress={() => startGame('basic_addition' as GameType, selectedAgeGroup, 'math')}
          style={{ marginBottom: 8 }}
        >
          Basic Addition
        </Button>
        <Button
          mode="contained"
          onPress={() => startGame('shape_recognition' as GameType, selectedAgeGroup, 'math')}
          style={{ marginBottom: 8 }}
        >
          Shape Recognition
        </Button>
        <Button
          mode="contained"
          onPress={() => startGame('counting_objects' as GameType, selectedAgeGroup, 'math')}
        >
          Counting Objects
        </Button>
      </Card.Content>
    </Card>
  );

  const renderEnglishGames = () => (
    <Card style={{ marginBottom: 16 }}>
      <Card.Title title="English Games" />
      <Card.Content>
        <Button
          mode="contained"
          onPress={() => startGame('letter_recognition' as GameType, selectedAgeGroup, 'english')}
          style={{ marginBottom: 8 }}
        >
          Letter Recognition
        </Button>
        <Button
          mode="contained"
          onPress={() => startGame('word_recognition' as GameType, selectedAgeGroup, 'english')}
          style={{ marginBottom: 8 }}
        >
          Word Recognition
        </Button>
        <Button
          mode="contained"
          onPress={() => startGame('phonics' as GameType, selectedAgeGroup, 'english')}
          style={{ marginBottom: 8 }}
        >
          Phonics
        </Button>
        <Button
          mode="contained"
          onPress={() => startGame('sight_words' as GameType, selectedAgeGroup, 'english')}
        >
          Sight Words
        </Button>
      </Card.Content>
    </Card>
  );

  const renderGameCategories = () => (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Learning Activities</Text>

      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text style={{ marginBottom: 8 }}>Age Group:</Text>
          <SegmentedButtons
            value={selectedAgeGroup}
            onValueChange={value => setSelectedAgeGroup(value as AgeGroup)}
            buttons={[
              { value: 'pre-k', label: 'Pre-K' },
              { value: 'k-1', label: 'K-1' },
              { value: 'k-2', label: 'K-2' },
              { value: 'k-3', label: 'K-3' },
              { value: 'k-4', label: 'K-4' },
              { value: 'k-5', label: 'K-5' },
            ]}
          />
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text style={{ marginBottom: 8 }}>Subject:</Text>
          <SegmentedButtons
            value={selectedSubject}
            onValueChange={value => setSelectedSubject(value as Subject)}
            buttons={[
              { value: 'math', label: 'Math' },
              { value: 'english', label: 'English' },
            ]}
          />
        </Card.Content>
      </Card>

      {selectedSubject === 'math' ? renderMathGames() : renderEnglishGames()}
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
          <Card.Title title="Progress" />
          <Card.Content>
            <Text style={{ fontWeight: 'bold' }}>Math Progress:</Text>
            <Text>Mastery Level: {Math.round(analysis.subjectProgress.math.masteryLevel * 100)}%</Text>
            <Text>Next Topic: {analysis.subjectProgress.math.nextRecommendedTopic}</Text>
            
            <Text style={{ fontWeight: 'bold', marginTop: 8 }}>English Progress:</Text>
            <Text>Mastery Level: {Math.round(analysis.subjectProgress.english.masteryLevel * 100)}%</Text>
            <Text>Next Topic: {analysis.subjectProgress.english.nextRecommendedTopic}</Text>
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
