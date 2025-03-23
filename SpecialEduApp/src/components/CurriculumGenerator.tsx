import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, TextInput, ActivityIndicator, useTheme } from 'react-native-paper';
import AIService from '../services/aiService';

interface CurriculumGeneratorProps {
  onCurriculumGenerated: (curriculum: any) => void;
}

const CurriculumGenerator: React.FC<CurriculumGeneratorProps> = ({ onCurriculumGenerated }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');

  const generateCurriculum = async () => {
    try {
      setLoading(true);
      const aiService = AIService.getInstance();
      
      const curriculum = await aiService.generatePersonalizedLesson(
        grade,
        subject,
        learningStyle,
        specialNeeds.split(',').map(need => need.trim())
      );

      onCurriculumGenerated(curriculum);
    } catch (error) {
      console.error('Error generating curriculum:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Generate Personalized Curriculum</Text>
          
          <TextInput
            label="Grade Level"
            value={grade}
            onChangeText={setGrade}
            style={styles.input}
            placeholder="e.g., Grade 1"
          />

          <TextInput
            label="Subject"
            value={subject}
            onChangeText={setSubject}
            style={styles.input}
            placeholder="e.g., Mathematics"
          />

          <TextInput
            label="Learning Style"
            value={learningStyle}
            onChangeText={setLearningStyle}
            style={styles.input}
            placeholder="e.g., Visual, Auditory, Kinesthetic"
          />

          <TextInput
            label="Special Needs (comma-separated)"
            value={specialNeeds}
            onChangeText={setSpecialNeeds}
            style={styles.input}
            placeholder="e.g., ADHD, Dyslexia, Autism"
            multiline
          />

          <Button
            mode="contained"
            onPress={generateCurriculum}
            style={styles.button}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.surface} />
            ) : (
              'Generate Curriculum'
            )}
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 8,
    borderRadius: 25,
    paddingVertical: 8,
  },
});

export default CurriculumGenerator; 