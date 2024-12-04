import React, { useState } from 'react';
import { 
  Image, 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Modal 
} from 'react-native';
import Swiper from 'react-native-swiper';
import NavigationMenu from '../components/NavigationMenu';
// Image imports
const muiTen = require('../assets/muiten.png');
const closeIcon = require('../assets/+.png');
const anhnen = require('../assets/heden.jpg');
const map = require('../assets/map.png');
const star = require('../assets/Star.png');
const share = require('../assets/share.png');
const line = require('../assets/Line.png');
const Rectangle31 = require('../assets/Rectangle3.1.png');
const Rectangle34 = require('../assets/Rectangle3.4.png');
const Rectangle35 = require('../assets/Rectangle3.5.png');
const Rectangle36 = require('../assets/Rectangle3.6.png');
const Rectangle37 = require('../assets/Rectangle3.7.png');
const Rectangle38 = require('../assets/Rectangle3.8.png');
const Rectangle39 = require('../assets/Rectangle3.9.png');
const Rectangle310 = require('../assets/Rectangle3.10.png');
const Rectangle311 = require('../assets/Rectangle3.11.png');
const Rectangle312 = require('../assets/Rectangle3.12.png');
const Rectangle313 = require('../assets/Rectangle3.13.png');
const Rectangle314 = require('../assets/Rectangle3.14.png');
// Image imports
const hotel = require('../assets/hotel.jpg');
const hotel1 = require('../assets/hotel1.jpg');
const hotel2 = require('../assets/hotel2.jpg');
const hotel3 = require('../assets/hotel3.jpg');
const hotel4 = require('../assets/hotel4.jpg');
const hotel5 = require('../assets/hotel5.jpg');
const hotel6 = require('../assets/hotel6.jpg');
const hotel7 = require('../assets/hotel7.jpg');
const hotel8 = require('../assets/hotel8.jpg');
const hotel9 = require('../assets/hotel9.jpg');
const hotel10 = require('../assets/hotel10.jpg');
const hotel11 = require('../assets/hotel11.jpg');

const HotelPhotos = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState('Photo (10)');
  const [modalVisible, setModalVisible] = useState(false);

  const images = [
    hotel, hotel1, hotel2, 
    hotel3, hotel4, hotel5, 
    hotel6, hotel7, hotel8, 
    hotel9, hotel10, hotel11
  ];

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
            {['Review (106)', 'Photo (10)', 'Near by (24)'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeButton === tab && styles.activeTab]}
                onPress={() => {
                  setActiveButton(tab);
                  if (tab === 'Review (106)') {
                    navigation.navigate('Review');
                  } else if (tab === 'Near by (24)') {
                    navigation.navigate('Nearby');
                  }
                }}
              >
                <Text style={[styles.tabText, activeButton === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ImageBackground>
      </View>

      <ScrollView style={styles.photoGrid}>
        <View style={styles.gridContainer}>
          {[Rectangle31, Rectangle34, Rectangle35, Rectangle36, Rectangle37, Rectangle38, 
            Rectangle39, Rectangle310, Rectangle311, Rectangle312, Rectangle313, Rectangle314]
            .map((image, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.gridItem}
                onPress={() => setModalVisible(true)}
              >
                <Image source={image} style={styles.gridImage} />
              </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Swiper style={styles.wrapper} showsButtons={true}>
            {images.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={image} style={styles.sliderImage} />
              </View>
            ))}
          </Swiper>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setModalVisible(false)}
          >
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      </Modal>

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
    height: '35%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
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
  infoContainer: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starIcon: {
    width: 17,
    height: 17,
  },
  rating: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapIcon: {
    width: 17,
    height: 23,
  },
  locationText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 5,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#0090FF',
    marginTop: 'auto',
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
  tabText: {
    color: '#0090FF',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
  },
  photoGrid: {
    flex: 1,
    marginTop: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

export default HotelPhotos;