import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to SpecialNeeds Education</Text>
        <Text style={styles.subtitle}>Supporting every child's learning journey</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Icon name="book-open-variant" size={40} color="#6200ee" />
          <Text style={styles.cardTitle}>Start Learning</Text>
          <Text style={styles.cardDescription}>Begin your educational journey</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Icon name="chart-line" size={40} color="#6200ee" />
          <Text style={styles.cardTitle}>Progress</Text>
          <Text style={styles.cardDescription}>Track your learning progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Icon name="account-group" size={40} color="#6200ee" />
          <Text style={styles.cardTitle}>Community</Text>
          <Text style={styles.cardDescription}>Connect with other learners</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  cardContainer: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default HomeScreen; 