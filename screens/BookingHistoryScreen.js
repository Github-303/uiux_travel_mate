import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, Animated, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationMenu from '../components/NavigationMenu';

export default function BookingHistoryScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [bookings, setBookings] = useState([
    {
      id: '1',
      name: 'Heden golf',
      rating: 3.9,
      reviews: 200,
      bookedOn: '23 July 2019',
      discount: '25% OFF',
      price: '$127',
      image: require('../images/Hedengolf.jpg'),
    },
    {
      id: '2',
      name: 'Onomo',
      rating: 4.3,
      reviews: 150,
      bookedOn: '18 March 2019',
      price: '$120',
      image: require('../images/Onomo.jpg'),
    },
    {
      id: '3',
      name: 'Heden golf',
      rating: 3.9,
      reviews: 200,
      bookedOn: '8 March 2019',
      discount: '25% OFF',
      price: '$127',
      image: require('../images/Hedengolf.jpg'),
    },
  ]);

  const deleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const renderBooking = ({ item }) => {
    const fadeAnim = new Animated.Value(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity onPress={() => deleteBooking(item.id)} style={styles.deleteButton}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <FontAwesome name="trash" size={24} color="white" />
            </Animated.View>
          </TouchableOpacity>
        )}
      >
        <View style={styles.bookingCard}>
          <Image source={item.image} style={styles.hotelImage} />
          <View style={styles.bookingInfo}>
            <Text style={styles.hotelName}>{item.name}</Text>
            <View style={styles.ratingRow}>
              <FontAwesome name="star" size={12} color="#FFC107" />
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.reviews}>Reviews ({item.reviews})</Text>
            </View>
            <Text style={styles.bookingDate}>Booked on : {item.bookedOn}</Text>
            <View style={styles.priceRow}>
              {item.discount && (
                <Text style={styles.discount}>{item.discount}</Text>
              )}
              <Text style={styles.price}>{item.price}</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity 
                  style={styles.reviewButton}
                  onPress={() => navigation.navigate('Review')}
                >
                  <Text style={styles.reviewButtonText}>Review</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.bookAgainButton}
                  onPress={() => navigation.navigate('PaymentMethods')}
                >
                  <LinearGradient
                    colors={['#0099FF', '#00FFE0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                  >
                    <Text style={styles.bookAgainText}>Book again</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking history</Text>
        <TouchableOpacity>
          <Text style={styles.clearAll}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <FontAwesome name="search" size={16} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <FontAwesome name="times" size={16} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingList}
        showsVerticalScrollIndicator={false}
      />

      <NavigationMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  clearAll: {
    fontSize: 14,
    color: '#0099FF',
    fontWeight: '500',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  bookingList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 80,
  },
  bookingCard: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  hotelImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  bookingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  bookingDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discount: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 'auto',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#0099FF',
  },
  reviewButtonText: {
    fontSize: 12,
    color: '#0099FF',
    fontWeight: '500',
  },
  bookAgainButton: {
    overflow: 'hidden',
    borderRadius: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bookAgainText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    marginLeft: 8,
    borderRadius: 8,
  },
});