import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from '../components/NavigationMenu';
const TrackDriver = ({ route }) => {
  const navigation = useNavigation();
  const { driver } = route.params;

  // Định nghĩa tọa độ điểm đầu và điểm cuối
  const startPoint = {
    latitude: 5.3364,
    longitude: -4.0267,
  };
  
  const endPoint = {
    latitude: 5.3314,
    longitude: -4.0287,
  };

  // Tạo đường đi giả lập
  const routeCoordinates = [
    startPoint,
    { latitude: 5.3344, longitude: -4.0277 },
    { latitude: 5.3334, longitude: -4.0282 },
    endPoint,
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../assets/back.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track driver</Text>
        <Text style={styles.eta}>ETA : 00:15:46</Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...startPoint,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}
        >
          {/* Điểm đầu */}
          <Marker coordinate={startPoint}>
            <Image source={require('../assets/location-pin.png')} style={styles.markerIcon} />
          </Marker>

          {/* Điểm cuối */}
          <Marker coordinate={endPoint}>
            <Image source={require('../assets/location-pin.png')} style={styles.markerIcon} />
          </Marker>

          {/* Vị trí xe */}
          <Marker coordinate={routeCoordinates[2]}>
            <Image source={require('../assets/driver.png')} style={styles.carMarker} />
          </Marker>

          {/* Đường đi */}
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#4A89F3"
            strokeWidth={4}
          />
        </MapView>

        {/* Driver Info Card */}
        <View style={styles.driverCard}>
          <Image source={driver.image} style={styles.driverImage} />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{driver.rating}</Text>
              <Text style={styles.reviews}>Reviews ({driver.reviews || '200'})</Text>
            </View>
            <Text style={styles.phone}>{driver.phone}</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Image source={require('../assets/call.png')} style={styles.callIcon} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  eta: {
    fontSize: 16,
    color: '#000',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  markerIcon: {
    width: 30,
    height: 30,
  },
  carMarker: {
    width: 40,
    height: 40,
  },
  driverCard: {
    position: 'absolute',
    bottom: 80, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#FFB800',
    marginRight: 5,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  phone: {
    fontSize: 14,
    color: '#000',
  },
  callButton: {
    backgroundColor: '#0099FF',
    padding: 12,
    borderRadius: 25,
  },
  callIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});

export default TrackDriver;
