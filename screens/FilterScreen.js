import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const priceRanges = [
  { id: '1', name: 'Under $50', min: 0, max: 50 },
  { id: '2', name: '$50 - $100', min: 50, max: 100 },
  { id: '3', name: '$100 - $200', min: 100, max: 200 },
  { id: '4', name: 'Over $200', min: 200, max: Infinity },
];

const ratings = [
  { id: '1', name: '5 Stars', value: 5 },
  { id: '2', name: '4+ Stars', value: 4 },
  { id: '3', name: '3+ Stars', value: 3 },
];

const locations = [
  { id: '1', name: 'City Center' },
  { id: '2', name: 'Beach Front' },
  { id: '3', name: 'Business District' },
  { id: '4', name: 'Suburbs' },
];

const FilterScreen = ({ navigation }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const clearAll = () => {
    setSelectedPrice(null);
    setSelectedRating(null);
    setSelectedLocation(null);
  };

  const applyFilters = () => {
    const filters = {
      price: priceRanges.find(p => p.id === selectedPrice),
      rating: ratings.find(r => r.id === selectedRating),
      location: locations.find(l => l.id === selectedLocation),
    };
    navigation.navigate('Hotelslist', { 
      filters,
      filterType: 'filters'
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hotels</Text>
        <Icon name="map-marker" size={24} color="#000" />
      </View>

      {/* Filter Options */}
      <View style={styles.filterOptions}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Amenities</Text>
          <Icon name="chevron-down" size={12} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.filterButtonText}>Filter by</Text>
          <Icon name="chevron-down" size={12} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Sort by</Text>
          <Icon name="chevron-down" size={12} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Price Range */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Range</Text>
        <View style={styles.optionsGrid}>
          {priceRanges.map((price) => (
            <TouchableOpacity
              key={price.id}
              style={[
                styles.optionItem,
                selectedPrice === price.id && styles.selectedOption
              ]}
              onPress={() => setSelectedPrice(price.id)}
            >
              <Text style={[
                styles.optionText,
                selectedPrice === price.id && styles.selectedOptionText
              ]}>
                {price.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Rating */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rating</Text>
        <View style={styles.optionsGrid}>
          {ratings.map((rating) => (
            <TouchableOpacity
              key={rating.id}
              style={[
                styles.optionItem,
                selectedRating === rating.id && styles.selectedOption
              ]}
              onPress={() => setSelectedRating(rating.id)}
            >
              <Text style={[
                styles.optionText,
                selectedRating === rating.id && styles.selectedOptionText
              ]}>
                {rating.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.optionsGrid}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.optionItem,
                selectedLocation === location.id && styles.selectedOption
              ]}
              onPress={() => setSelectedLocation(location.id)}
            >
              <Text style={[
                styles.optionText,
                selectedLocation === location.id && styles.selectedOptionText
              ]}>
                {location.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={applyFilters}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
  },
  optionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
    borderColor: '#0090FF',
  },
  optionText: {
    color: '#666',
    fontSize: 14,
  },
  selectedOptionText: {
    color: '#0090FF',
    fontWeight: 'bold',
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

export default FilterScreen;
