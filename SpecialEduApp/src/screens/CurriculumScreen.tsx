import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, List, useTheme } from 'react-native-paper';
import CurriculumGenerator from '../components/CurriculumGenerator';

const CurriculumScreen = () => {
  const theme = useTheme();
  const [curriculum, setCurriculum] = useState<any>(null);

  const handleCurriculumGenerated = (generatedCurriculum: any) => {
    setCurriculum(generatedCurriculum);
  };

  return (
    <ScrollView style={styles.container}>
      <CurriculumGenerator onCurriculumGenerated={handleCurriculumGenerated} />
      
      {curriculum && (
        <Card style={styles.curriculumCard}>
          <Card.Content>
            <Text style={styles.title}>{curriculum.title}</Text>
            
            <Text style={styles.sectionTitle}>Learning Objectives</Text>
            {curriculum.objectives.map((objective: string, index: number) => (
              <List.Item
                key={index}
                title={objective}
                left={props => <List.Icon {...props} icon="check-circle" />}
                style={styles.listItem}
              />
            ))}

            <Text style={styles.sectionTitle}>Activities</Text>
            {curriculum.activities.map((activity: any, index: number) => (
              <Card key={index} style={styles.activityCard}>
                <Card.Content>
                  <Text style={styles.activityTitle}>{activity.name}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  <Text style={styles.activityDuration}>Duration: {activity.duration}</Text>
                  
                  <Text style={styles.materialsTitle}>Materials Needed:</Text>
                  {activity.materials.map((material: string, matIndex: number) => (
                    <List.Item
                      key={matIndex}
                      title={material}
                      left={props => <List.Icon {...props} icon="circle-small" />}
                      style={styles.materialItem}
                    />
                  ))}
                </Card.Content>
              </Card>
            ))}

            <Text style={styles.sectionTitle}>Assessment</Text>
            <Text style={styles.assessmentType}>Type: {curriculum.assessment.type}</Text>
            {curriculum.assessment.questions.map((question: string, index: number) => (
              <List.Item
                key={index}
                title={question}
                left={props => <List.Icon {...props} icon="help-circle" />}
                style={styles.listItem}
              />
            ))}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  curriculumCard: {
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: '#333',
  },
  listItem: {
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  activityCard: {
    marginVertical: 8,
    elevation: 2,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  activityDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  activityDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  materialsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
  },
  materialItem: {
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  assessmentType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
});

export default CurriculumScreen; 