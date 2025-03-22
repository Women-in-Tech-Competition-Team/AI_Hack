import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>WITNEED</Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD', // Light blue background
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976D2', // Darker blue for text
    marginBottom: 20,
    letterSpacing: 2,
  },
}); 