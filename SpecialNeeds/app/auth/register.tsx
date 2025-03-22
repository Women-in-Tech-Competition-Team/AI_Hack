import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import * as SecureStore from 'expo-secure-store';

// Password validation rules
const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
};

const validatePassword = (password: string): string | null => {
  if (password.length < PASSWORD_RULES.minLength) {
    return `Password must be at least ${PASSWORD_RULES.minLength} characters long`;
  }
  if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (PASSWORD_RULES.requireNumber && !/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  if (PASSWORD_RULES.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character';
  }
  return null;
};

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    hipaaAgreement: false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!/^\+?[\d\s-()]{10,}$/.test(formData.phoneNumber)) {
      setError('Please enter a valid phone number');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.hipaaAgreement) {
      setError('You must agree to the HIPAA agreement');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      setIsLoading(true);
      setError(null);

      // Here you would typically:
      // 1. Send the form data to your backend
      // 2. Create user in your database
      // 3. Set authentication state
      // 4. Navigate to main app
      
      // For now, we'll just simulate a successful registration
      await SecureStore.setItemAsync('auth_token', 'dummy_token');
      router.replace('/(tabs)');
      
    } catch (err) {
      setError('An error occurred during registration');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Register' }} />
      
      <Text style={styles.title}>Create Account</Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {/* Registration Form */}
      <View style={styles.form}>
        <View style={styles.nameContainer}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            editable={!isLoading}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity 
          style={[styles.dateButton, isLoading && styles.disabledButton]}
          onPress={() => setShowDatePicker(true)}
          disabled={isLoading}
        >
          <Text>Date of Birth: {formData.dateOfBirth.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={formData.dateOfBirth}
            mode="date"
            display="default"
            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFormData({ ...formData, dateOfBirth: selectedDate });
              }
            }}
          />
        )}

        <TextInput
          style={[styles.input, isLoading && styles.disabledButton]}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          editable={!isLoading}
        />

        <TextInput
          style={[styles.input, isLoading && styles.disabledButton]}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={formData.phoneNumber}
          onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
          editable={!isLoading}
        />

        <TextInput
          style={[styles.input, isLoading && styles.disabledButton]}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => {
            setFormData({ ...formData, password: text });
            setPasswordError(validatePassword(text));
          }}
          editable={!isLoading}
        />

        {passwordError && (
          <Text style={styles.passwordErrorText}>{passwordError}</Text>
        )}

        <TextInput
          style={[styles.input, isLoading && styles.disabledButton]}
          placeholder="Confirm Password"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          editable={!isLoading}
        />

        <View style={styles.hipaaContainer}>
          <Checkbox
            value={formData.hipaaAgreement}
            onValueChange={(value: boolean) => setFormData({ ...formData, hipaaAgreement: value })}
            disabled={isLoading}
          />
          <Text style={styles.hipaaText}>
            I agree to the HIPAA agreement and terms of service
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!formData.hipaaAgreement || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.disabledButton]}
          onPress={() => router.push('/auth/login')}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  passwordErrorText: {
    color: '#c62828',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
  form: {
    padding: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  hipaaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  hipaaText: {
    marginLeft: 10,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    padding: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
}); 