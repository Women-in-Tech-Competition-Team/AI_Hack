import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Welcome!</Text>
      
      {/* Child Progress Section */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Child's Progress" />
        <Card.Content>
          <Text>Current Level: Beginner</Text>
          <Text>Activities Completed: 5</Text>
          <Text>Time Spent: 2 hours</Text>
        </Card.Content>
      </Card>

      {/* AI Recommendations Section */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="AI Recommendations" />
        <Card.Content>
          <Text>Based on recent activities:</Text>
          <Text>• Focus on visual learning activities</Text>
          <Text>• Try more interactive games</Text>
          <Text>• Consider shorter activity sessions</Text>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card>
        <Card.Title title="Quick Actions" />
        <Card.Content>
          <Text>• Start New Activity</Text>
          <Text>• View Progress Report</Text>
          <Text>• Update Profile</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}