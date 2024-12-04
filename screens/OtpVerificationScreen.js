import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function OtpVerificationScreen() {
  const [otp, setOtp] = useState(['5', '5', '3', '5']); // Set default OTP to 9999
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const handleOtpChange = (index, value) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <LinearGradient
      colors={['#00FF94', '#0000FE']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      style={styles.background}
    >
      {/* Tiêu đề nằm ngoài container */}
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
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
            />
          ))}
        </View>

        <Text style={styles.notReceivedText}>Don't receive OTP?</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.resendButton}
            disabled={isResendDisabled}
          >
            <Text style={styles.resendButtonText}>Resend in 30s</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.changeNumberButton}>
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
    justifyContent: 'flex-start', // Thay đổi để căn trên cùng
    alignItems: 'center',
    paddingTop: '20%', // Thêm khoảng cách ở trên
  },
  container: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 30,
    width: '90%', // Đặt chiều rộng thành 90% để mở rộng hơn
    height: '90%', // Đặt chiều cao thành 60% để tăng kích thước
    elevation: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white', // Đặt màu chữ thành trắng
    marginBottom: 20, // Điều chỉnh khoảng cách
    alignSelf: 'flex-start', // Căn trái
    width: '80%', // Đặt chiều rộng phù hợp
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
});
