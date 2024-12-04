import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Mảng chứa thông tin về icon và màn hình tương ứng
const menuItems = [
  { 
    source: require('../assets/hotel.png'), 
    size: 20, 
    label: 'Rooms',
    screen: 'HomeScreen'
  },
  { 
    source: require('../assets/car.png'), 
    size: 20, 
    label: 'Car Booking',
    screen: 'CarBooking'
  },
  { 
    source: require('../assets/Vector1.png'), 
    size: 20, 
    label: 'Orderfood',
    screen: 'Orderfood'
  },
  { 
    source: require('../assets/avticon.png'), 
    size: 20, 
    label: 'Profile',
    screen: 'Myprofile'
  },
  { 
    source: require('../assets/setiing.png'), 
    size: 20, 
    label: 'Setting',
    screen: 'Settings'
  },
];

const NavigationMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Tìm index của màn hình hiện tại
  const currentScreenIndex = menuItems.findIndex(item => item.screen === route.name);
  const [selectedIcon, setSelectedIcon] = useState(currentScreenIndex !== -1 ? currentScreenIndex : 0);

  // Hàm xử lý khi nhấn vào icon
  const handleIconPress = (index) => {
    setSelectedIcon(index);
    const screenName = menuItems[index].screen;
    
    // Sử dụng CommonActions.reset để điều hướng trong nested navigator
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              routes: [{ name: screenName }]
            }
          }
        ]
      })
    );
  };

  return (
    <LinearGradient
      colors={['#0099FF', '#00FFE0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.iconContainer}
          onPress={() => handleIconPress(index)}
        >
          <Image
            source={item.source}
            style={[
              styles.icon,
              { width: item.size, height: item.size },
              selectedIcon === index && styles.selectedIcon
            ]}
          />
          <Text style={[
            styles.label,
            selectedIcon === index && styles.selectedLabel
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: '#666666',
    marginBottom: 4,
  },
  selectedIcon: {
    tintColor: '#ffffff',
  },
  label: {
    color: '#666666',
    fontSize: 12,
  },
  selectedLabel: {
    color: '#ffffff',
  },
});

export default NavigationMenu;
