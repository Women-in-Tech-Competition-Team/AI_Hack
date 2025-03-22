import { Stack } from 'expo-router';
import { View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen 
          name="login" 
          options={{ 
            title: 'Login'
          }} 
        />
        <Stack.Screen 
          name="register" 
          options={{ 
            title: 'Register'
          }} 
        />
      </Stack>
    </View>
  );
} 