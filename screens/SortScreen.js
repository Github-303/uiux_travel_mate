import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const sortOptions = [
  { id: '1', name: 'Price: Low to High' },
  { id: '2', name: 'Price: High to Low' },
  { id: '3', name: 'Rating: High to Low' },
  { id: '4', name: 'Distance: Near to Far' },
  { id: '5', name: 'Most Popular' }
];

const SortScreen = ({ navigation }) => {
  const [selectedSort, setSelectedSort] = useState(null);

  const handleSortSelect = (sortId) => {
    setSelectedSort(sortId);
  };

  const applySort = () => {
    if (selectedSort) {
      navigation.navigate('Hotelslist', { 
        sortOption: selectedSort,
        filterType: 'sort'
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="angle-left" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Sort by</Text>
      </View>

      {/* Sort Options */}
      <View style={styles.optionsContainer}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedSort === option.id && styles.selectedOption
            ]}
            onPress={() => handleSortSelect(option.id)}
          >
            <Text style={[
              styles.optionText,
              selectedSort === option.id && styles.selectedOptionText
            ]}>
              {option.name}
            </Text>
            {selectedSort === option.id && (
              <Icon name="check" size={20} color="#0099FF" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={[
            styles.clearButton,
          ]} 
          onPress={() => setSelectedSort(null)}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.applyButton,
            !selectedSort && styles.disabledButton
          ]} 
          onPress={applySort}
          disabled={!selectedSort}
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
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: -30,
  },
  optionsContainer: {
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedOption: {
    backgroundColor: '#F5F5F5',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#0099FF',
    fontWeight: '500',
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
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
    backgroundColor: '#ccc',
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

export default SortScreen;
