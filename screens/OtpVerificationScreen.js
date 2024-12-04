import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function OtpVerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params;
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://twisty-roomy-tortoise.glitch.me/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          otp: otpValue
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Verification successful
        Alert.alert('Success', 'OTP verified successfully', [
          { text: 'OK', onPress: () => navigation.navigate('Main') }
        ]);
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    setIsResendDisabled(true);
    setOtp(['', '', '', '']);
    // You can add API call here to resend OTP
  };

  return (
    <LinearGradient
      colors={['#00FF94', '#0000FE']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      style={styles.background}
    >
      <Text style={styles.title}>Verify Account</Text>

      <View style={styles.container}>
        <Text style={styles.subTitle}>Verify Mobile Number</Text>
        <Text style={styles.description}>
          OTP has been sent to you on your mobile number, please enter it below
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputRefs.current[index] = ref}
              style={[styles.otpInput, isLoading && styles.inputDisabled]}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
              editable={!isLoading}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.verifyButton, isLoading && styles.buttonDisabled]}
          onPress={verifyOtp}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#0090FF', '#00FF94']}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.buttonGradient}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.notReceivedText}>Don't receive OTP?</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.resendButton, isResendDisabled && styles.buttonDisabled]}
            onPress={handleResend}
            disabled={isResendDisabled}
          >
            <Text style={styles.resendButtonText}>
              {isResendDisabled ? `Resend in ${timeLeft}s` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.changeNumberButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.changeNumberButtonText}>Change number</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '20%',
  },
  container: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 30,
    width: '90%',
    height: '90%',
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
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#f9f9f9',
  },
  inputDisabled: {
    opacity: 0.5,
  },
  verifyButton: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 10,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notReceivedText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resendButton: {
    backgroundColor: '#00BD6B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  resendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  changeNumberButton: {
    backgroundColor: '#0090FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  changeNumberButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
