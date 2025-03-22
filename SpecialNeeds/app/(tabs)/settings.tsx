import { View, Text, ScrollView } from 'react-native';
import { Card, Switch, List } from 'react-native-paper';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Settings</Text>

      {/* Account Settings */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Account Settings" />
        <Card.Content>
          <List.Item
            title="Profile Information"
            description="Update child's profile"
            left={(props: any) => <List.Icon {...props} icon="account" />}
          />
          <List.Item
            title="Parent/Guardian Info"
            description="Manage guardian details"
            left={(props: any) => <List.Icon {...props} icon="account-group" />}
          />
        </Card.Content>
      </Card>

      {/* Preferences */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Preferences" />
        <Card.Content>
          <List.Item
            title="Notifications"
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
              />
            )}
          />
          <List.Item
            title="Dark Mode"
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            )}
          />
          <List.Item
            title="Sound Effects"
            right={() => (
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Accessibility */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Accessibility" />
        <Card.Content>
          <List.Item
            title="Text Size"
            description="Adjust text size for better readability"
            left={(props: any) => <List.Icon {...props} icon="text-size" />}
          />
          <List.Item
            title="Color Contrast"
            description="Adjust color contrast settings"
            left={(props: any) => <List.Icon {...props} icon="palette" />}
          />
        </Card.Content>
      </Card>

      {/* About & Support */}
      <Card>
        <Card.Title title="About & Support" />
        <Card.Content>
          <List.Item
            title="Help Center"
            description="Get help and support"
            left={(props: any) => <List.Icon {...props} icon="help-circle" />}
          />
          <List.Item
            title="Privacy Policy"
            description="View privacy settings"
            left={(props: any) => <List.Icon {...props} icon="shield-account" />}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
} 