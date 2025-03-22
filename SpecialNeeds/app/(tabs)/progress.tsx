import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

export default function ProgressScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Progress Tracking</Text>

      {/* Development Milestones */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Development Milestones" />
        <Card.Content>
          <Text>• Visual Recognition: Advanced</Text>
          <Text>• Language Skills: Intermediate</Text>
          <Text>• Focus Duration: Improving</Text>
          <Text>• Social Interaction: Developing</Text>
        </Card.Content>
      </Card>

      {/* AI Analysis */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="AI Analysis" />
        <Card.Content>
          <Text>Learning Style: Visual-Kinesthetic</Text>
          <Text>Attention Span: 15-20 minutes</Text>
          <Text>Preferred Activities: Pattern Recognition</Text>
          <Text>Areas for Improvement: Language Development</Text>
        </Card.Content>
      </Card>

      {/* Progress History */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Progress History" />
        <Card.Content>
          <Text>• Week 1: Basic Pattern Recognition</Text>
          <Text>• Week 2: Color Matching</Text>
          <Text>• Week 3: Shape Sorting</Text>
          <Text>• Week 4: Memory Games</Text>
        </Card.Content>
      </Card>

      {/* Recommendations */}
      <Card>
        <Card.Title title="Recommendations" />
        <Card.Content>
          <Text>• Continue with visual learning activities</Text>
          <Text>• Introduce more language-based games</Text>
          <Text>• Gradually increase activity duration</Text>
          <Text>• Focus on social interaction games</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
