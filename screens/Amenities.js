import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const images = [
  { key: '1', name: 'Free Wi-Fi', image: require('../assets/wifi.png') },
  { key: '2', name: 'Fitness Center', image: require('../assets/barbell.png') },
  { key: '3', name: 'Free Breakfast', image: require('../assets/breakfast1.png') },
  { key: '4', name: 'Kid Friendly', image: require('../assets/pushchair.png') },
  { key: '5', name: 'Free Parking', image: require('../assets/parking.png') },
  { key: '6', name: 'Pet Friendly', image: require('../assets/pawprint.png') },
  { key: '7', name: 'Air Conditioned', image: require('../assets/air-conditioner.png') },
  { key: '8', name: 'Pool', image: require('../assets/swimming.png') },
  { key: '9', name: 'Bar', image: require('../assets/beer.png') },
  { key: '10', name: 'Restaurant', image: require('../assets/salad.png') },
];

const Screen13 = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleAmenity = (key) => {
    setSelectedAmenities(prev => {
      if (prev.includes(key)) {
        return prev.filter(k => k !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const clearAll = () => {
    setSelectedAmenities([]);
  };

  const applyFilters = () => {
    const selectedAmenitiesData = selectedAmenities.map(key => 
      images.find(img => img.key === key)
    );
    navigation.navigate('Hotelslist', { 
      amenities: selectedAmenitiesData,
      filterType: 'amenities'
    });
  };

  const filteredImages = images.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderImageItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.imageWrapper,
        selectedAmenities.includes(item.key) && styles.selectedAmenity
      ]}
      onPress={() => toggleAmenity(item.key)}
    >
      <Image source={item.image} style={styles.imageIcon} resizeMode="contain" />
      <Text style={styles.imageName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hotels</Text>
        <Icon name="map-marker" size={24} color="#000" />
      </View>

      {/* Filter Options */}
      <View style={styles.filterOptions}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.filterButtonText}>Amenities</Text>
          <Icon name="chevron-down" size={12} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter by</Text>
          <Icon name="chevron-down" size={12} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Sort by</Text>
          <Icon name="chevron-down" size={12} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#0090FF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by amenity"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={clearSearch} style={styles.xmarkIcon}>
            <Icon name="times" size={20} color="#0090FF" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Amenities Grid */}
      <View style={styles.imageListContainer}>
        <FlatList
          data={filteredImages}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.key}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.applyButton,
            selectedAmenities.length === 0 && styles.disabledButton
          ]} 
          onPress={applyFilters}
          disabled={selectedAmenities.length === 0}
        >
          <LinearGradient
            colors={['#0099FF', '#00FFE0']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterButtonText: {
    marginRight: 4,
    fontSize: 14,
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: '#0090FF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#EBF1F5',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  xmarkIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageListContainer: {
    flex: 1,
    marginBottom: 80,
  },
  listContent: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  imageWrapper: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff', 
    borderRadius: 10,
    borderWidth: 1, 
    borderColor: '#0090FF', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 2, 
    width: '48%', 
    height: 65, 
    marginBottom: 10,
  },
  imageIcon: {
    width: '100%', 
    height: '50%', 
  },
  imageName: {
    marginTop: 5,
    fontWeight: '300',
    color: '#000',
    textAlign: 'center',
  },
  selectedAmenity: {
    backgroundColor: '#E3F2FD',
    borderColor: '#0090FF',
    borderWidth: 2,
  },
  bottomButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 70,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 16,
  },
  clearButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 8,
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
  },
  applyButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.5,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Screen13;
