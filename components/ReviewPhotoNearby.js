import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ReviewPhotoNearby = ({ navigation, activeButton, setActiveButton, currentScreen }) => {
  const handlePress = (label) => {
    setActiveButton(label);
    if (currentScreen !== 'Review' && label === 'Review (106)') {
      navigation.navigate('Review');
    } else if (currentScreen !== 'HotelPhotos' && label === 'Photo (10)') {
      navigation.navigate('HotelPhotos');
    } else if (currentScreen !== 'Nearby' && label === 'Near by (24)') {
      navigation.navigate('Nearby');
    }
  };

  return (
    <View style={styles.roundedButton}>
      {['Review (106)', 'Photo (10)', 'Near by (24)'].map((label, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.roundedButtonSection,
            activeButton === label && styles.activeButtonSection,
          ]}
          onPress={() => handlePress(label)}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === label && styles.activeButtonText,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  roundedButton: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  roundedButtonSection: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButtonSection: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#666',
    fontSize: 14,
  },
  activeButtonText: {
    color: '#FFF',
  },
});

export default ReviewPhotoNearby;
