import React, { useState } from 'react';
import { 
  Image, 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import NavigationMenu from '../components/NavigationMenu';

const muiTen = require('../assets/muiten.png');
const closeIcon = require('../assets/+.png');
const anhnen = require('../assets/heden.jpg');
const map = require('../assets/map.png');
const star = require('../assets/Star.png');
const share = require('../assets/share.png');
const line = require('../assets/Line.png');
const rate1 = require('../assets/rate1.png');
const camera = require('../assets/camera.png');
const subway = require('../assets/subway.png');
const plane = require('../assets/plane.png');
const direction1 = require('../assets/direction1.png');
const direction2 = require('../assets/direction2.png');
const car = require('../assets/car.png');
const anhR1 = require('../assets/anhR1.png');
const anhR2 = require('../assets/anhR2.png');

const Nearby = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState('Near by (24)');

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <ImageBackground source={anhnen} style={styles.backgroundImage}>
          <View style={styles.overlay} />
          
          <View style={styles.headerContent}>
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={muiTen} style={styles.backIcon} />
                <Text style={styles.headerTitle}>Heden Golf</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={share} style={styles.shareIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.ratingContainer}>
                <Image source={star} style={styles.starIcon} />
                <Text style={styles.rating}>3.9</Text>
                <Text style={styles.ratingText}>85/100 people liked this</Text>
              </View>
              
              <View style={styles.locationContainer}>
                <Image source={map} style={styles.mapIcon} />
                <Text style={styles.locationText}>Abidjan, Côte d'lvoire</Text>
              </View>
            </View>
          </View>

          <View style={styles.tabBar}>
            <TouchableOpacity 
              style={[styles.tab, activeButton === 'Review (106)' ? styles.inactiveTab : null]}
              onPress={() => navigation.navigate('Review')}
            >
              <Text style={styles.tabText}>Review (106)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeButton === 'Photo (10)' ? styles.inactiveTab : null]}
              onPress={() => navigation.navigate('HotelPhotos')}
            >
              <Text style={styles.tabText}>Photo (10)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeButton === 'Near by (24)' ? styles.activeTab : null]}
            >
              <Text style={[styles.tabText, activeButton === 'Near by (24)' ? styles.activeTabText : null]}>
                Near by (24)
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <SafeAreaView style={{ flex:1 }}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LOCATION OVER VIEW</Text>
            <Text style={styles.description}>
              Set in landscaped gardens overlooking the Ébrié lagoon, this upscale hotel featuring contemporary local art and architectural touches is 3 km from Mosquée de la riviéra and 17 km from Banco National Park.
            </Text>
          </View>

          <View style={styles.locationScoreSection}>
            <Text style={styles.sectionTitle}>HOTEL LOCATION SCORE</Text>
            <Text style={styles.scoreSubtitle}>
              Good location overall for sightseeing, recreation, and getting around
            </Text>
            
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNumber}>3.9</Text>
            </View>

            <View style={styles.scoreDetails}>
              <View style={styles.scoreRow}>
                <Image source={camera} style={styles.scoreIcon} />
                <Text style={styles.scoreText}>3.8 Great for proximity things to do.</Text>
              </View>
              <View style={styles.scoreRow}>
                <Image source={subway} style={styles.scoreIcon} />
                <Text style={styles.scoreText}>0.0 No nearby transit options.</Text>
              </View>
              <View style={styles.scoreRow}>
                <Image source={plane} style={styles.scoreIcon} />
                <Text style={styles.scoreText}>2.2 OK for Airport access.</Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <Text style={styles.locationName}>Abidjan, Côte d'Ivoire</Text>
              <TouchableOpacity style={styles.directionsButton}>
                <Text style={styles.directionsText}>Directions</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.thingsToDo}>
            <Text style={styles.sectionTitle}>THINGS TO DO</Text>
            
            <View style={styles.placeCard}>
              <Image source={anhR1} style={styles.placeImage} />
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>St. Paul's Cathedral, Abidjan</Text>
                <Text style={styles.placeDescription}>
                  This contemporary, landmark cathedral features unique architecture, regular mass services
                </Text>
                <View style={styles.placeDetails}>
                  <View style={styles.ratingBox}>
                    <Image source={star} style={styles.smallStar} />
                    <Text style={styles.placeRating}>4.4</Text>
                    <Text style={styles.ratingCount}>Rating (1,649)</Text>
                  </View>
                  <View style={styles.distanceBox}>
                    <Image source={car} style={styles.carIcon} />
                    <Text style={styles.distance}>6 min</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.placeCard}>
              <Image source={anhR2} style={styles.placeImage} />
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>Banco National Park</Text>
                <Text style={styles.placeDescription}>
                  Tranquil old-growth forest in the heart of Abidjan featuring a variety of plants & animals.
                </Text>
                <View style={styles.placeDetails}>
                  <View style={styles.ratingBox}>
                    <Image source={star} style={styles.smallStar} />
                    <Text style={styles.placeRating}>4.4</Text>
                    <Text style={styles.ratingCount}>Rating (1,649)</Text>
                  </View>
                  <View style={styles.distanceBox}>
                    <Image source={car} style={styles.carIcon} />
                    <Text style={styles.distance}>27 min</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 5.3600,  // Abidjan coordinates
                longitude: -4.0083,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: 5.3600,
                  longitude: -4.0083,
                }}
                title="Heden Golf Hotel"
                description="Luxury Hotel in Abidjan"
              />
            </MapView>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.bottomBar}>
        <View style={styles.priceSection}>
          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>$150</Text>
            <Text style={styles.currentPrice}>$127</Text>
          </View>
          <Text style={styles.priceLabel}>AVG/NIGHT</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('OrderConfirm')}
        >
          <Text style={styles.bookButtonText}>BOOKING NOW</Text>
        </TouchableOpacity>
      </View>

      <NavigationMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    height: 250,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerContent: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 12,
    height: 16,
    tintColor: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  shareIcon: {
    width: 20,
    height: 27,
    tintColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#0090FF',
    marginBottom: -25,
    zIndex: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: '#0090FF',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    color: '#0090FF',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 40,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  locationScoreSection: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#0090FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0090FF',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  scoreIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  scoreText: {
    fontSize: 14,
    color: '#333',
  },
  placeCard: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  placeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  placeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  placeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: 60,
  },
  priceSection: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#00D1FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginLeft: 15,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 300,
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -40,
  },
  scrollViewContent: {
    paddingTop: 20,
  },
  rating: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 13,
    marginLeft: 5,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 13,
    marginLeft: 5,
  },
});

export default Nearby;
