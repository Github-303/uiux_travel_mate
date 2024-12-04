import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import NavigationMenu from '../components/NavigationMenu';

const CarBooking = () => {
  const navigation = useNavigation();
  const [selectedCarType, setSelectedCarType] = useState('Saloon');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const drivers = [
    {
      id: 1,
      name: 'Winston',
      rating: '5.00',
      phone: '+225 22 43 15 89',
      image: require('../assets/Ellipse2.1.png'),
      location: {
        latitude: 5.3364,
        longitude: -4.0267,
      },
    },
    {
      id: 2,
      name: 'James',
      rating: '4.95',
      phone: '+225 22 44 16 90',
      image: require('../assets/Ellipse2.1.png'),
      location: {
        latitude: 5.3314,
        longitude: -4.0287,
      },
    },
    {
      id: 3,
      name: 'Michael',
      rating: '4.85',
      phone: '+225 22 45 17 91',
      image: require('../assets/Ellipse2.1.png'),
      location: {
        latitude: 5.3394,
        longitude: -4.0247,
      },
    },
    {
      id: 4,
      name: 'David',
      rating: '4.90',
      phone: '+225 22 46 18 92',
      image: require('../assets/Ellipse2.1.png'),
      location: {
        latitude: 5.3334,
        longitude: -4.0297,
      },
    },
    {
      id: 5,
      name: 'Robert',
      rating: '4.92',
      phone: '+225 22 47 19 93',
      image: require('../assets/Ellipse2.1.png'),
      location: {
        latitude: 5.3384,
        longitude: -4.0237,
      },
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book a car</Text>
        <TouchableOpacity>
          <Image source={require('../assets/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      {/* Location Inputs */}
      <View style={styles.locationContainer}>
        <View style={styles.locationInput}>
          <Image source={require('../assets/location.png')} style={styles.locationIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Abidjan, Airport"
            placeholderTextColor="#000"
          />
        </View>
        <View style={styles.locationInput}>
          <Image source={require('../assets/location.png')} style={styles.locationIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Abidjan, Côte d'ivoire"
            placeholderTextColor="#000"
          />
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 5.3364,
            longitude: -4.0267,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}
        >
          {drivers.map((driver) => (
            <Marker
              key={driver.id}
              coordinate={driver.location}
              title={driver.name}
              description={`Rating: ${driver.rating}`}
            >
              <Image source={require('../assets/driver.png')} style={styles.taxiMarker} />
            </Marker>
          ))}
        </MapView>
      </View>

      {/* Driver Details */}
      <View style={styles.driverContainer}>
        <Image source={drivers[0].image} style={styles.driverImage} />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{drivers[0].name}</Text>
          <Text style={styles.driverRating}>{drivers[0].rating}</Text>
        </View>
        <TouchableOpacity 
          style={styles.callButton}
          onPress={() => navigation.navigate('TrackDriver', { driver: drivers[0] })}
        >
          <Image source={require('../assets/call.png')} style={styles.callIcon} />
        </TouchableOpacity>
      </View>

      {/* Car Type and Language Selection */}
      <View style={styles.selectionContainer}>
        <View style={styles.dropdown}>
          <Text>Car type</Text>
          <TouchableOpacity style={styles.select}>
            <Text>{selectedCarType}</Text>
            <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.dropdown}>
          <Text>Language</Text>
          <TouchableOpacity style={styles.select}>
            <Text>{selectedLanguage}</Text>
            <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Menu */}
      <NavigationMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  locationContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 15,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  mapContainer: {
    flex: 1,
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  taxiMarker: {
    width: 30,
    height: 30,
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverRating: {
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    backgroundColor: '#0099FF',
    padding: 10,
    borderRadius: 20,
  },
  callIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 80,
  },
  dropdown: {
    flex: 1,
    marginHorizontal: 5,
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  arrowIcon: {
    width: 12,
    height: 12,
  },
});

export default CarBooking;
