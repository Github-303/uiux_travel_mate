import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isAirConditioned, setIsAirConditioned] = useState(true);
  const [isFan, setIsFan] = useState(false);
  const [activeTab, setActiveTab] = useState('Hotels');
  const [location, setLocation] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  
  const [checkinDate, setCheckinDate] = useState(null);
  const [showCheckinDatePicker, setShowCheckinDatePicker] = useState(false);
  const [showCheckinTimePicker, setShowCheckinTimePicker] = useState(false);

  const [checkoutDate, setCheckoutDate] = useState(null);
  const [showCheckoutDatePicker, setShowCheckoutDatePicker] = useState(false);
  const [showCheckoutTimePicker, setShowCheckoutTimePicker] = useState(false);
  
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(0);
  
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const bestPlaces = [
    { name: 'Ivory Coast', image: require('../assets/hotel1.jpg') },
    { name: 'Senegal', image: require('../assets/hotel2.jpg') },
    { name: 'Ville', image: require('../assets/hotel3.jpg') },
    { name: 'Lagos', image: require('../assets/hotel4.jpg') },
  ];

  const bestHotels = [
    { name: 'Heden golf', image: require('../assets/Heden.png') },
    { name: 'Onomo', image: require('../assets/Onomo.png') },
    { name: 'Adagio', image: require('../assets/Adagio.png') },
    { name: 'Sofitel', image: require('../assets/Sotitel.png') },
  ];

  const locationSuggestions = [
    {
      id: '1',
      name: 'Abidjan',
      address: 'Côte d\'Ivoire'
    },
    {
      id: '2',
      name: 'Abids',
      address: 'Hyderabad, Telangana, India'
    },
    {
      id: '3',
      name: 'Abidos Hotel Apartment Dubai Land',
      address: 'Dubai, Dubai Emirate, United Arab Emirates'
    },
    {
      id: '4',
      name: 'Hotel Abi d\'Oru',
      address: 'Porto Rotondo, Sardinia, Italy'
    },
    {
      id: '5',
      name: 'Abidos Hotel Apartment Al Barsha',
      address: 'Dubai, Dubai Emirate, United Arab Emirates'
    }
  ];

  const filteredLocations = locationSuggestions.filter(item => 
    item.name.toLowerCase().includes(location.toLowerCase()) ||
    item.address.toLowerCase().includes(location.toLowerCase())
  );

  const handleLocationSelect = (item) => {
    setLocation(item.name);
    setShowLocationSuggestions(false);
  };

  const handleCheckinDateChange = (event, selectedDate) => {
    setShowCheckinDatePicker(false);
    if (selectedDate) {
      setCheckinDate(selectedDate);
      setShowCheckinTimePicker(true);
    }
  };

  const handleCheckinTimeChange = (event, selectedTime) => {
    setShowCheckinTimePicker(false);
    if (selectedTime) {
      setCheckinDate(selectedTime);
    }
  };

  const handleCheckoutDateChange = (event, selectedDate) => {
    setShowCheckoutDatePicker(false);
    if (selectedDate) {
      setCheckoutDate(selectedDate);
      setShowCheckoutTimePicker(true);
    }
  };

  const handleCheckoutTimeChange = (event, selectedTime) => {
    setShowCheckoutTimePicker(false);
    if (selectedTime) {
      setCheckoutDate(selectedTime);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Find room</Text>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Hotels' && styles.activeTab]}
            onPress={() => setActiveTab('Hotels')}>
            <Text style={[styles.tabText, activeTab === 'Hotels' && styles.activeTabText]}>Hotels</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Villas' && styles.activeTab]}
            onPress={() => setActiveTab('Villas')}>
            <Text style={[styles.tabText, activeTab === 'Villas' && styles.activeTabText]}>Villas</Text>
          </TouchableOpacity>
        </View>

        {/* Search Form */}
        <View style={styles.searchForm}>
          {/* Location */}
          <View style={styles.locationContainer}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="location-on" size={24} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Where do you want"
                value={location}
                onChangeText={(text) => {
                  setLocation(text);
                  setShowLocationSuggestions(true);
                }}
              />
              {location.length > 0 && (
                <TouchableOpacity onPress={() => {
                  setLocation('');
                  setShowLocationSuggestions(false);
                }}>
                  <MaterialIcons name="close" size={24} color="#666" />
                </TouchableOpacity>
              )}
            </View>

            {/* Location Suggestions */}
            {showLocationSuggestions && location.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <FlatList
                  data={filteredLocations}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <TouchableOpacity 
                      style={styles.suggestionItem}
                      onPress={() => handleLocationSelect(item)}
                    >
                      <MaterialIcons name="location-on" size={20} color="#666" />
                      <View style={styles.suggestionText}>
                        <Text style={styles.suggestionTitle}>{item.name}</Text>
                        <Text style={styles.suggestionAddress}>{item.address}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>

          {/* Check-in */}
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowCheckinDatePicker(true)}>
            <MaterialIcons name="calendar-today" size={24} color="#666" />
            <Text style={styles.inputText}>
              {checkinDate ? checkinDate.toLocaleString() : 'Checkin date & time'}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
          </TouchableOpacity>

          {/* Check-out */}
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowCheckoutDatePicker(true)}>
            <MaterialIcons name="calendar-today" size={24} color="#666" />
            <Text style={styles.inputText}>
              {checkoutDate ? checkoutDate.toLocaleString() : 'Checkout date & time'}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
          </TouchableOpacity>

          {/* Guests & Rooms */}
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowGuestsDropdown(!showGuestsDropdown)}>
            <MaterialIcons name="people" size={24} color="#666" />
            <Text style={styles.inputText}>
              {`${adults} Adults, ${children} Children, ${rooms} room`}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
          </TouchableOpacity>

          {/* Guests Dropdown */}
          {showGuestsDropdown && (
            <View style={styles.guestsDropdown}>
              {/* Headers */}
              <View style={styles.guestsHeader}>
                <Text style={styles.guestHeaderText}>Adults</Text>
                <Text style={styles.guestHeaderText}>Children</Text>
                <Text style={styles.guestHeaderText}>Rooms</Text>
              </View>

              {/* Number Selector */}
              <View style={styles.numberSelectorContainer}>
                {/* Adults Column */}
                <View style={styles.numberColumn}>
                  <TouchableOpacity 
                    style={styles.arrowButton}
                    onPress={() => adults < 10 && setAdults(adults + 1)}>
                    <MaterialIcons name="keyboard-arrow-up" size={24} color="#666" />
                  </TouchableOpacity>
                  <View style={styles.numberDisplay}>
                    <Text style={styles.numberText}>{adults}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.arrowButton}
                    onPress={() => adults > 0 && setAdults(adults - 1)}>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                {/* Children Column */}
                <View style={styles.numberColumn}>
                  <TouchableOpacity 
                    style={styles.arrowButton}
                    onPress={() => children < 10 && setChildren(children + 1)}>
                    <MaterialIcons name="keyboard-arrow-up" size={24} color="#666" />
                  </TouchableOpacity>
                  <View style={styles.numberDisplay}>
                    <Text style={styles.numberText}>{children}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.arrowButton}
                    onPress={() => children > 0 && setChildren(children - 1)}>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                {/* Rooms Column */}
                <View style={styles.numberColumn}>
                  <TouchableOpacity 
                    style={styles.arrowButton}
                    onPress={() => rooms < 5 && setRooms(rooms + 1)}>
                    <MaterialIcons name="keyboard-arrow-up" size={24} color="#666" />
                  </TouchableOpacity>
                  <View style={styles.numberDisplay}>
                    <Text style={styles.numberText}>{rooms}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.arrowButton}
                    onPress={() => rooms > 0 && setRooms(rooms - 1)}>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Room Features */}
          <View style={styles.featuresContainer}>
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => setIsFan(!isFan)}>
              <MaterialIcons 
                name={isFan ? "check-box" : "check-box-outline-blank"} 
                size={24} 
                color={isFan ? "#007AFF" : "#666"} 
              />
              <Text style={styles.featureText}>Fan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => setIsAirConditioned(!isAirConditioned)}>
              <MaterialIcons 
                name={isAirConditioned ? "check-box" : "check-box-outline-blank"} 
                size={24} 
                color={isAirConditioned ? "#007AFF" : "#666"} 
              />
              <Text style={styles.featureText}>Air conditioned</Text>
            </TouchableOpacity>
          </View>

          {/* Search Button */}
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => navigation.navigate('Hotelslist')}>
            <LinearGradient
              colors={['#0099FF', '#00FFE0']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradient}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Best Places Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>BEST PLACES</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bestPlaces.map((place, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('Review')} style={styles.placeCard}>
                <Image source={place.image} style={styles.placeImage} />
                <Text style={styles.placeName}>{place.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Best Hotels Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>BEST HOTELS</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bestHotels.map((hotel, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('Review')} style={styles.hotelCard}>
                <Image source={hotel.image} style={styles.hotelImage} />
                <Text style={styles.hotelName}>{hotel.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="hotel" size={24} color="#007AFF" />
          <Text style={styles.navText}>Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="calendar-today" size={24} color="#666" />
          <Text style={styles.navText}>Car booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="local-taxi" size={24} color="#666" />
          <Text style={styles.navText}>Live tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="#666" />
          <Text style={styles.navText}>My profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color="#666" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {showCheckinDatePicker && (
        <DateTimePicker
          value={checkinDate || new Date()}
          mode="date"
          onChange={handleCheckinDateChange}
        />
      )}
      {showCheckinTimePicker && (
        <DateTimePicker
          value={checkinDate || new Date()}
          mode="time"
          onChange={handleCheckinTimeChange}
        />
      )}
      {showCheckoutDatePicker && (
        <DateTimePicker
          value={checkoutDate || new Date()}
          mode="date"
          onChange={handleCheckoutDateChange}
        />
      )}
      {showCheckoutTimePicker && (
        <DateTimePicker
          value={checkoutDate || new Date()}
          mode="time"
          onChange={handleCheckoutTimeChange}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: '#666',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
  },
  searchForm: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  inputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  searchButton: {
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 20,
    marginHorizontal: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 30,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
  },
  placeCard: {
    marginRight: 15,
    width: 120,
  },
  placeImage: {
    width: 120,
    height: 80,
    borderRadius: 10,
  },
  placeName: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  hotelCard: {
    marginRight: 15,
    width: 120,
  },
  hotelImage: {
    width: 120,
    height: 80,
    borderRadius: 10,
  },
  hotelName: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  locationContainer: {
    position: 'relative',
    zIndex: 1,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    marginLeft: 10,
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    color: '#333',
  },
  suggestionAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  guestsDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
    padding: 15,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  guestsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  guestHeaderText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'center',
  },
  numberSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  numberColumn: {
    alignItems: 'center',
    width: 80,
  },
  arrowButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberDisplay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  numberText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});
