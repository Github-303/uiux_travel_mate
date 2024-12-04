import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (touched.email) {
      if (!text) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!validateEmail(text)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      } else {
        setErrors(prev => ({ ...prev, email: null }));
      }
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (touched.password) {
      if (!text) {
        setErrors(prev => ({ ...prev, password: 'Password is required' }));
      } else if (!validatePassword(text)) {
        setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
      } else {
        setErrors(prev => ({ ...prev, password: null }));
      }
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'email') {
      if (!email) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!validateEmail(email)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      }
    }
    if (field === 'password') {
      if (!password) {
        setErrors(prev => ({ ...prev, password: 'Password is required' }));
      } else if (!validatePassword(password)) {
        setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
      }
    }
  };

  const handleLogin = async () => {
    // Validate both fields
    const emailError = !email ? 'Email is required' : !validateEmail(email) ? 'Please enter a valid email' : null;
    const passwordError = !password ? 'Password is required' : !validatePassword(password) ? 'Password must be at least 6 characters' : null;
    
    setErrors({
      email: emailError,
      password: passwordError
    });
    
    setTouched({
      email: true,
      password: true
    });

    // If no errors, proceed with API call
    if (!emailError && !passwordError) {
      setIsLoading(true);
      try {
        const response = await fetch('https://twisty-roomy-tortoise.glitch.me/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Login successful
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } else {
          // Login failed
          setErrors(prev => ({ ...prev, login: data.message || 'Invalid email or password' }));
        }
      } catch (error) {
        setErrors(prev => ({ ...prev, login: 'Network error. Please try again.' }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#00FF94', '#0000FE']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      style={styles.background}
    >
      <Text style={styles.title}>Sign In</Text>

      <View style={styles.container}>
        <View style={[styles.inputContainer, errors.email && styles.inputError]}>
          <FontAwesome name="envelope" size={20} color="#00BFFF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={() => handleBlur('email')}
            editable={!isLoading}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View style={[styles.inputContainer, errors.password && styles.inputError]}>
          <FontAwesome name="lock" size={20} color="#00BFFF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            secureTextEntry={true}
            value={password}
            onChangeText={handlePasswordChange}
            onBlur={() => handleBlur('password')}
            editable={!isLoading}
          />
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TouchableOpacity disabled={isLoading}>
          <Text onPress={() => navigation.navigate('ForgotPasswordScreen')} style={[styles.forgotPassword, isLoading && styles.disabledText]}>Forgot Password?</Text>
        </TouchableOpacity>

        {errors.login && <Text style={[styles.errorText, styles.loginError]}>{errors.login}</Text>}

        <TouchableOpacity style={[styles.button, isLoading && styles.disabledButton]} onPress={handleLogin} disabled={isLoading}>
          <LinearGradient
            colors={['#00BFFF', '#00FF94']}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.buttonGradient}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.orText}>or sign in using</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.facebookButton}>
            <FontAwesome name="facebook" size={20} color="white" />
            <Text style={styles.socialButtonText}> Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton}>
            <FontAwesome name="google" size={20} color="white" />
            <Text style={styles.socialButtonText}> Google</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.registerText}>
          By creating an account, you agree to our
          <Text style={styles.linkText}> Terms</Text>
        </Text>

        <Text style={styles.registerText}>
          Don't have an account? 
          <Text onPress={() => navigation.navigate('RegisterScreen')} style={styles.linkText}> Sign Up</Text>
        </Text>
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
    height: '82%',
    elevation: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    alignSelf: 'flex-start',
    width: '80%',
    paddingLeft: 15,
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
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  loginError: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#FF4500',
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    marginBottom: 30,
    overflow: 'hidden',
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
  orText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  facebookButton: {
    backgroundColor: '#266AD1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  googleButton: {
    backgroundColor: '#DD4B39',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  socialButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  registerText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 10,
  },
  linkText: {
    color: '#00BD6B',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});
