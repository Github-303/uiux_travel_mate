import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ResetPasswordScreen() {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigation = useNavigation();
  const route = useRoute();
  
  // If email is passed from forgot password screen
  useEffect(() => {
    if (route.params?.email) {
      setFormData(prev => ({ ...prev, email: route.params.email }));
    }
  }, [route.params?.email]);

  const validators = {
    email: (value) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
      return null;
    },
    otp: (value) => {
      if (!value) return 'OTP is required';
      if (!/^\d{4}$/.test(value)) return 'OTP must be 4 digits';
      return null;
    },
    newPassword: (value) => {
      if (!value) return 'New password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      if (!/(?=.*[0-9])/.test(value)) return 'Password must contain at least one number';
      if (!/(?=.*[a-zA-Z])/.test(value)) return 'Password must contain at least one letter';
      return null;
    },
    confirmPassword: (value) => {
      if (!value) return 'Please confirm your password';
      if (value !== formData.newPassword) return 'Passwords do not match';
      return null;
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validators[field](value);
      setErrors(prev => ({ ...prev, [field]: error }));
      
      // Special case for confirm password
      if (field === 'newPassword' && touched.confirmPassword) {
        const confirmError = validators.confirmPassword(formData.confirmPassword);
        setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      }
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validators[field](formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(validators).forEach(field => {
      const error = validators[field](formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    setTouched({
      email: true,
      otp: true,
      newPassword: true,
      confirmPassword: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://twisty-roomy-tortoise.glitch.me/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success',
          'Your password has been reset successfully.',
          [
            { 
              text: 'Login', 
              onPress: () => navigation.navigate('LoginScreen')
            }
          ]
        );
      } else {
        setErrors(prev => ({
          ...prev,
          submit: data.message || 'Failed to reset password. Please try again.'
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Network error. Please check your connection and try again.'
      }));
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
      <Text style={styles.title}>Reset Password</Text>

      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Enter your email, OTP, and new password to reset your account password
        </Text>

        <View style={[styles.inputContainer, errors.email && styles.inputError]}>
          <FontAwesome name="envelope" size={20} color="#00BFFF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            onBlur={() => handleBlur('email')}
            editable={!isLoading}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View style={[styles.inputContainer, errors.otp && styles.inputError]}>
          <FontAwesome name="key" size={20} color="#00BFFF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Enter OTP"
            keyboardType="number-pad"
            maxLength={4}
            value={formData.otp}
            onChangeText={(text) => handleChange('otp', text)}
            onBlur={() => handleBlur('otp')}
            editable={!isLoading}
          />
        </View>
        {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}

        <View style={[styles.inputContainer, errors.newPassword && styles.inputError]}>
          <FontAwesome name="lock" size={20} color="#00BFFF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="New Password"
            secureTextEntry={!showPassword}
            value={formData.newPassword}
            onChangeText={(text) => handleChange('newPassword', text)}
            onBlur={() => handleBlur('newPassword')}
            editable={!isLoading}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            <FontAwesome 
              name={showPassword ? "eye-slash" : "eye"} 
              size={20} 
              color="#00BFFF" 
            />
          </TouchableOpacity>
        </View>
        {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

        <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
          <FontAwesome name="lock" size={20} color="#00BFFF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            onBlur={() => handleBlur('confirmPassword')}
            editable={!isLoading}
          />
          <TouchableOpacity 
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
          >
            <FontAwesome 
              name={showConfirmPassword ? "eye-slash" : "eye"} 
              size={20} 
              color="#00BFFF" 
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        {errors.submit && <Text style={[styles.errorText, styles.submitError]}>{errors.submit}</Text>}

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleResetPassword}
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
              <Text style={styles.buttonText}>Reset Password</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        >
          <Text style={[styles.backButtonText, isLoading && styles.textDisabled]}>
            Back
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
    paddingLeft: 15,
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
    paddingRight: 10,
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
  submitError: {
    textAlign: 'center',
    marginTop: 10,
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
