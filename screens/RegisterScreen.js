import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const validators = {
    fullName: (value) => {
      if (!value) return 'Full name is required';
      if (value.length < 2) return 'Full name must be at least 2 characters';
      if (!/^[a-zA-Z\s]*$/.test(value)) return 'Full name can only contain letters and spaces';
      return null;
    },
    email: (value) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
      return null;
    },
    mobile: (value) => {
      if (!value) return 'Mobile number is required';
      if (!/^0\d{9}$/.test(value)) return 'Please enter a valid mobile number (e.g., 0845924299)';
      return null;
    },
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      if (!/(?=.*[0-9])/.test(value)) return 'Password must contain at least one number';
      if (!/(?=.*[a-zA-Z])/.test(value)) return 'Password must contain at least one letter';
      return null;
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validators[field](value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validators[field](formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    setErrors(prev => ({ ...prev, terms: !isChecked ? null : 'You must accept the terms and conditions' }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(validators).forEach(field => {
      const error = validators[field](formData[field]);
      if (error) newErrors[field] = error;
    });
    if (!isChecked) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      mobile: true,
      password: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch('https://twisty-roomy-tortoise.glitch.me/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            mobile: formData.mobile
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Registration successful, pass token to OTP screen
          navigation.navigate('OtpVerificationScreen', { token: data.token });
        } else {
          setErrors(prev => ({
            ...prev,
            submit: data.message || 'Registration failed. Please try again.'
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
    }
  };

  return (
    <LinearGradient
      colors={['#00FF94', '#0000FE']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      style={styles.background}
    >
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.container}>
        <View style={[styles.inputContainer, errors.fullName && styles.inputError]}>
          <FontAwesome name="user" size={20} color="#0090FF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Full Name"
            value={formData.fullName}
            onChangeText={(text) => handleChange('fullName', text)}
            onBlur={() => handleBlur('fullName')}
            editable={!isLoading}
          />
        </View>
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

        <View style={[styles.inputContainer, errors.email && styles.inputError]}>
          <FontAwesome name="envelope" size={20} color="#0090FF" style={styles.icon} />
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

        <View style={[styles.inputContainer, errors.mobile && styles.inputError]}>
          <FontAwesome name="phone" size={20} color="#0090FF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Mobile Number (e.g., 0845924299)" 
            keyboardType="phone-pad"
            value={formData.mobile}
            onChangeText={(text) => handleChange('mobile', text)}
            onBlur={() => handleBlur('mobile')}
            editable={!isLoading}
            maxLength={10}
          />
        </View>
        {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

        <View style={[styles.inputContainer, errors.password && styles.inputError]}>
          <FontAwesome name="lock" size={20} color="#0090FF" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            onBlur={() => handleBlur('password')}
            editable={!isLoading}
          />
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {errors.submit && <Text style={[styles.errorText, styles.submitError]}>{errors.submit}</Text>}

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#0090FF','#00FF94' ]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.buttonGradient}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.orText}>or sign In using</Text>

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

        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checkboxChecked, errors.terms && styles.checkboxError]}
            onPress={toggleCheckbox}
          >
            {isChecked && <FontAwesome name="check" size={18} color="white" />}
          </TouchableOpacity>
          <Text style={styles.termsText}>By creating an account, you are agree to our</Text>
        </View>
        {errors.terms && <Text style={[styles.errorText, styles.termsError]}>{errors.terms}</Text>}

        <Text style={styles.loginText}>
          Already have an account?
          <Text onPress={() => navigation.navigate('LoginScreen')} style={styles.linkText}>
            Sign In
          </Text>
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
    height: '85%',
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
  termsError: {
    textAlign: 'center',
    marginTop: -5,
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
  orText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    backgroundColor: '#D14426',
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#00BFFF',
  },
  checkboxError: {
    borderColor: '#FF3B30',
  },
  termsText: {
    color: '#999',
    marginLeft: 5,
  },
  loginText: {
    textAlign: 'center',
    color: '#999',
  },
  linkText: {
    color: '#00BD6B',
    fontWeight: 'bold',
  },
  submitError: {
    textAlign: 'center',
    marginBottom: 10,
  },
});
