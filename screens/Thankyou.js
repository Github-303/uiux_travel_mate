import React, { useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../assets/Rectangle.png'); 
const overlayImage = require('../assets/bed.png'); // Replace with your overlay image path

const Thankyou = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Redeemvoucher');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>THANK YOU</Text>
          <Text style={styles.subText}>YOUR ORDER IS </Text>
          <Text style={styles.subText}>SUCCESSFUL</Text>
        </View>
        <Image source={overlayImage} style={styles.overlayImage} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  subText: {
    color: 'white',
    fontSize: 24, 
    fontWeight: 'normal',
  },
  overlayImage: {
    position: 'absolute', 
    top: 136, 
    left: '41%', 
    transform: [{ translateX: -50 }], 
    width: 158, 
    height: 158, 
    
  },
});

export default Thankyou;
