import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Redeemvoucher = () => {
  const navigation = useNavigation();

  const handleRedeemVoucher = () => {
    navigation.navigate('Ratingsreviews');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={require('../assets/Rectangle.png')} style={styles.background}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>REDEEM VOUCHER</Text>
          <Text style={styles.instructions}>If you have the voucher, please enter the code here</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.voucherCode}>1254-mhu589-698</Text>
            <View style={styles.underline} />
          </View>
          <TouchableOpacity style={styles.redeemButton} onPress={handleRedeemVoucher}>
            <LinearGradient
              colors={['#0099FF', '#00FFE0']}
              style={styles.redeemButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.redeemButtonText}>Redeem Voucher</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.pageIndicator}>
          <View style={styles.dot} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '300',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  voucherCode: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  underline: {
    height: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  redeemButton: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  redeemButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  redeemButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  pageIndicator: {
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 40,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
});

export default Redeemvoucher;
