import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (touched) {
      if (!text) {
        setError('Email is required');
      } else if (!validateEmail(text)) {
        setError('Please enter a valid email');
      } else {
        setError('');
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!email) {
      setError('Email is required');
    } else if (!validateEmail(email)) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Email is required');
      setTouched(true);
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      setTouched(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://twisty-roomy-tortoise.glitch.me/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success',
          'OTP has been sent to your email.',
          [
            { 
              text: 'OK', 
              onPress: () => navigation.navigate('ResetPasswordScreen', { email: email })
            }
          ]
        );
      } else {
        setError(data.message || 'Failed to process request. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#00FF94', '#0000FE']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      style={styles.background}
    >
      <Text style={styles.title}>Forgot Password?</Text>

      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Please enter your registered email address to recover your password
        </Text>

        <View style={[styles.inputContainer, error && styles.inputError]}>
          <FontAwesome name="envelope" size={20} color="#00BFFF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={handleBlur}
            editable={!isLoading}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleForgotPassword}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#00BFFF', '#00FF94']}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.buttonGradient}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        >
          <Text style={[styles.backButtonText, isLoading && styles.textDisabled]}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 30,
    width: '90%',
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    alignSelf: 'flex-start',
    width: '80%',
    paddingLeft: 70,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 20,
    marginLeft: 5,
  },
  button: {
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    alignItems: 'center',
  },
  backButtonText: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  textDisabled: {
    opacity: 0.5,
  },
});
