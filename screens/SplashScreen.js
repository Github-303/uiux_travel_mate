import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 3000); // Chuyển sang màn hình Login sau 3 giây

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#00F2A9', '#00C8CA', '#0066FF']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.cityBackground}>
            {/* Các tòa nhà background */}
            <View style={[styles.building, { height: 60, left: '10%' }]} />
            <View style={[styles.building, { height: 80, left: '30%' }]} />
            <View style={[styles.building, { height: 100, left: '50%' }]} />
            <View style={[styles.building, { height: 70, left: '70%' }]} />
          </View>
          
          {/* Icon location */}
          <View style={styles.locationPin}>
            <View style={styles.pinOuter}>
              <View style={styles.pinInner} />
            </View>
            <View style={styles.pinShadow} />
          </View>
          
          {/* Clouds */}
          <View style={[styles.cloud, { left: '20%', top: '10%' }]} />
          <View style={[styles.cloud, { left: '60%', top: '20%' }]} />
        </View>

        <Text style={styles.title}>Find Hotel</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cityBackground: {
    width: '100%',
    height: 120,
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
  },
  building: {
    width: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  locationPin: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pinOuter: {
    width: 60,
    height: 60,
    backgroundColor: '#FFA500',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pinInner: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  pinShadow: {
    width: 40,
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    marginTop: 10,
  },
  cloud: {
    width: 40,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    position: 'absolute',
  },
  title: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
