import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const theme = useTheme();

  const progressData = {
    completedLessons: 5,
    totalLessons: 10,
    streak: 3,
    nextLesson: 'Alphabet Recognition',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Icon name="star-circle" size={60} color={theme.colors.primary} />
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Let's learn something new today!</Text>
      </View>

      {/* Progress Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Your Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressItem}>
              <Icon name="check-circle" size={30} color={theme.colors.primary} />
              <Text style={styles.progressText}>
                {progressData.completedLessons}/{progressData.totalLessons} Lessons
              </Text>
            </View>
            <View style={styles.progressItem}>
              <Icon name="fire" size={30} color={theme.colors.primary} />
              <Text style={styles.progressText}>{progressData.streak} Day Streak</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Next Lesson Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Next Lesson</Text>
          <View style={styles.nextLessonContainer}>
            <Icon name="book-open-variant" size={40} color={theme.colors.primary} />
            <Text style={styles.nextLessonText}>{progressData.nextLesson}</Text>
          </View>
          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.startButton}
            labelStyle={styles.buttonLabel}
          >
            Start Learning
          </Button>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.actionButton}
            icon="book-open-variant"
          >
            Continue Learning
          </Button>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.actionButton}
            icon="chart-bar"
          >
            View Progress
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  card: {
    margin: 16,
    elevation: 4,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressText: {
    marginTop: 5,
    fontSize: 16,
    color: '#666',
  },
  nextLessonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  nextLessonText: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  startButton: {
    marginTop: 10,
    borderRadius: 25,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
  quickActions: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionButton: {
    flex: 1,
    margin: 5,
    borderRadius: 25,
  },
});

export default HomeScreen; 