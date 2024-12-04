import React, { useState } from 'react';
import { 
  Image, 
  ImageBackground, 
  StyleSheet,
  SafeAreaView, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationMenu from '../components/NavigationMenu';

// Image imports (keep existing imports)
const muiTen = require('../assets/muiten.png');
const anhnen = require('../assets/heden.jpg');
const map = require('../assets/map.png');
const star = require('../assets/Star.png');
const share = require('../assets/share.png');
const wifi = require('../assets/wifi.png');
const gym = require('../assets/gym.png');
const food = require('../assets/food.png');
const kid = require('../assets/kid.png');
const location = require('../assets/location.png');
const phone = require('../assets/phone.png');
const calendar = require('../assets/calendar.png');
const pool = require('../assets/pool.png');
const diningtable = require('../assets/dining-table.png');
const diamond = require('../assets/diamond.png');
const bed = require('../assets/bed.png');
const pawprint = require('../assets/pawprint.png');
const banh1 = require('../assets/banh1.png');
const banh2 = require('../assets/banh2.png');
const banh3 = require('../assets/banh3.png');
const banh4 = require('../assets/banh4.png');

const Review = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState('Review (106)');
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [isCheckinPickerVisible, setCheckinPickerVisibility] = useState(false);
  const [isCheckoutPickerVisible, setCheckoutPickerVisibility] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [isGuestsVisible, setIsGuestsVisible] = useState(false);

  const showCheckinPicker = () => setCheckinPickerVisibility(true);
  const showCheckoutPicker = () => setCheckoutPickerVisibility(true);
  
  const handleCheckinConfirm = (date) => {
    setCheckinDate(date);
    setCheckinPickerVisibility(false);
  };

  const handleCheckoutConfirm = (date) => {
    setCheckoutDate(date);
    setCheckoutPickerVisibility(false);
  };

  const handleIncrement = (type) => {
    if (type === 'adults') setAdults(adults + 1);
    if (type === 'children') setChildren(children + 1);
    if (type === 'rooms') setRooms(rooms + 1);
  };

  const handleDecrement = (type) => {
    if (type === 'adults' && adults > 0) setAdults(adults - 1);
    if (type === 'children' && children > 0) setChildren(children - 1);
    if (type === 'rooms' && rooms > 0) setRooms(rooms - 1);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={anhnen} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={muiTen} style={styles.backIcon} />
            <Text style={styles.headerTitle}>Heden Golf</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={share} style={styles.shareIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingBox}>
            <Image source={star} style={styles.starIcon} />
            <Text style={styles.ratingScore}>3.9</Text>
            <Text style={styles.ratingText}>85/100 people liked this</Text>
          </View>
          <View style={styles.locationBox}>
            <Image source={map} style={styles.mapIcon} />
            <Text style={styles.locationText}>Abidjan, Côte d'lvoire</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          {['Review (106)', 'Photo (10)', 'Near by (24)'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeButton === tab && styles.activeTab]}
              onPress={() => {
                setActiveButton(tab);
                if (tab === 'Review (106)') {
                  setModalVisible(true);
                } else if (tab === 'Photo (10)') {
                  navigation.navigate('HotelPhotos', { hotel: { image: anhnen } });
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

      <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>HOTEL DESCRIPTION</Text>
          <Text style={styles.descriptionText}>
            Set in landscaped gardens overlooking the Ébrié lagoon, this upscale hotel featuring contemporary local art and architectural touches is 3 km from Mosquée de la riviéra and 17 km from Banco National Park.
          </Text>
        </View>

        <View style={styles.facilitiesSection}>
          <Text style={styles.sectionTitle}>HOTEL FACILITIES</Text>
          <View style={styles.facilitiesGrid}>
            <View style={styles.facilityItem}>
              <Image source={wifi} style={styles.facilityIcon} />
              <Text style={styles.facilityText}>Free Wi-Fi</Text>
            </View>
            <View style={styles.facilityItem}>
              <Image source={gym} style={styles.facilityIcon} />
              <Text style={styles.facilityText}>Fitness Center</Text>
            </View>
            <View style={styles.facilityItem}>
              <Image source={food} style={styles.facilityIcon} />
              <Text style={styles.facilityText}>Free Breakfast</Text>
            </View>
            <View style={styles.facilityItem}>
              <Image source={kid} style={styles.facilityIcon} />
              <Text style={styles.facilityText}>Kid Friendly</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Image source={location} style={styles.infoIcon} />
            <Text style={styles.infoText}>Abidjan, Côte d'Ivoire</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={phone} style={styles.infoIcon} />
            <Text style={styles.infoText}>+225 22 48 26 26</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={calendar} style={styles.infoIcon} />
            <Text style={styles.infoText}>Checkin 12 PM</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={calendar} style={styles.infoIcon} />
            <Text style={styles.infoText}>Checkout 11 AM</Text>
          </View>
        </View>

        <View style={styles.amenitiesSection}>
          <View style={styles.amenitiesGrid}>
            <View style={styles.amenityItem}>
              <Image source={diningtable} style={styles.amenityIcon} />
              <Text style={styles.amenityText}>Great dining</Text>
            </View>
            <View style={styles.amenityItem}>
              <Image source={pawprint} style={styles.amenityIcon} />
              <Text style={styles.amenityText}>Pet friendly</Text>
            </View>
            <View style={styles.amenityItem}>
              <Image source={bed} style={styles.amenityIcon} />
              <Text style={styles.amenityText}>Great rooms</Text>
            </View>
            <View style={styles.amenityItem}>
              <Image source={pool} style={styles.amenityIcon} />
              <Text style={styles.amenityText}>Great pool</Text>
            </View>
            <View style={styles.amenityItem}>
              <Image source={diamond} style={styles.amenityIcon} />
              <Text style={styles.amenityText}>Luxurious vibe</Text>
            </View>
          </View>
        </View>

        <View style={styles.availabilitySection}>
          <Text style={styles.sectionTitle}>CHECK AVAILABILITY</Text>
          
          <TouchableOpacity style={styles.datePickerButton} onPress={showCheckinPicker}>
            <Image source={calendar} style={styles.dateIcon} />
            <Text style={styles.dateText}>
              {checkinDate ? checkinDate.toLocaleString() : 'Check-in date & time'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.datePickerButton} onPress={showCheckoutPicker}>
            <Image source={calendar} style={styles.dateIcon} />
            <Text style={styles.dateText}>
              {checkoutDate ? checkoutDate.toLocaleString() : 'Check-out date & time'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.guestsButton}
            onPress={() => setIsGuestsVisible(!isGuestsVisible)}
          >
            <FontAwesome name="users" size={16} color="#0090FF" />
            <Text style={styles.guestsText}>
              {adults} Adults, {children} Children, {rooms} Room
            </Text>
          </TouchableOpacity>

          {isGuestsVisible && (
            <View style={styles.guestsDropdown}>
              <View style={styles.guestRow}>
                <Text>Adults</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity onPress={() => handleDecrement('adults')}>
                    <Text style={styles.counterButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{adults}</Text>
                  <TouchableOpacity onPress={() => handleIncrement('adults')}>
                    <Text style={styles.counterButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Similar rows for Children and Rooms */}
            </View>
          )}
        </View>

        <View style={styles.foodSection}>
          <View style={styles.foodHeader}>
            <Text style={styles.sectionTitle}>FOOD</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.foodScroll}
          >
            <View style={styles.foodCard}>
              <Image source={banh1} style={styles.foodImage} />
              <Text style={styles.foodName}>Bagels with turkey and...</Text>
            </View>
            <View style={styles.foodCard}>
              <Image source={banh2} style={styles.foodImage} />
              <Text style={styles.foodName}>Gourmet croissant</Text>
            </View>
            <View style={styles.foodCard}>
              <Image source={banh3} style={styles.foodImage} />
              <Text style={styles.foodName}>Sandwich</Text>
            </View>
            <View style={styles.foodCard}>
              <Image source={banh4} style={styles.foodImage} />
              <Text style={styles.foodName}>Crispy mozza burger</Text>
            </View>
          </ScrollView>
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
          <LinearGradient
            colors={['#0099FF', '#00FFE0']}
            style={styles.cardContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          ></LinearGradient>
          <Text style={styles.bookButtonText}>BOOKING NOW</Text>
        </TouchableOpacity>
      </View>
      
      <DateTimePickerModal
        isVisible={isCheckinPickerVisible}
        mode="datetime"
        onConfirm={handleCheckinConfirm}
        onCancel={() => setCheckinPickerVisibility(false)}
      />

      <DateTimePickerModal
        isVisible={isCheckoutPickerVisible}
        mode="datetime"
        onConfirm={handleCheckoutConfirm}
        onCancel={() => setCheckoutPickerVisibility(false)}
      />

      <NavigationMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: 300,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '500',
  },
  shareIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  ratingScore: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 10,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  locationText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 'auto',
    marginBottom: -25,
    padding: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#0090FF',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
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
  contentScroll: {
    flex: 1,
    marginTop: 40,
  },
  contentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  facilitiesSection: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  facilityItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 15,
  },
  facilityIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  facilityText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  infoSection: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  amenitiesSection: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  amenityIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  amenityText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  availabilitySection: {
    padding: 20,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  dateIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  guestsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  guestsText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  guestsDropdown: {
    marginTop: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 20,
    paddingHorizontal: 15,
    color: '#0090FF',
  },
  counterText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  foodSection: {
    padding: 20,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllText: {
    color: '#0090FF',
    fontSize: 14,
  },
  foodScroll: {
    marginLeft: -20,
  },
  foodCard: {
    marginLeft: 20,
    width: 150,
  },
  foodImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  foodName: {
    fontSize: 12,
    color: '#333',
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
});

export default Review;