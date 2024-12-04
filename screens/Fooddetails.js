import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationMenu from '../components/NavigationMenu';

const Fooddetails = ({ route, navigation }) => {
  const { foodItem } = route.params;

  const handleAddToBag = () => {
    navigation.navigate('Orderfood', {
      addedItem: foodItem,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Food details</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={foodItem.image}
          style={styles.foodImage}
          resizeMode="cover"
        />

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="angle-left" size={30} color="#000" />
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={styles.foodName}>{foodItem.name}</Text>
          
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{foodItem.rating}</Text>
            <Text style={styles.reviews}>Reviews ({foodItem.reviews})</Text>
          </View>

          <Text style={styles.description}>
            {foodItem.description}
          </Text>

          <View style={styles.priceSection}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price : </Text>
              <Text style={styles.price}>${foodItem.price}</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddToBag}
      >
        <LinearGradient
          colors={['#0099FF', '#00FFE0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}
        >
          <Text style={styles.addButtonText}>ADD TO BAG</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.navigationContainer}>
        <NavigationMenu />
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: '#666',
    fontWeight: '400',
  },
  content: {
    flex: 1,
  },
  foodImage: {
    width: '100%',
    height: height * 0.35,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  foodName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    marginRight: 10,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  priceSection: {
    marginTop: 'auto',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 24,
    color: '#000',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  addButton: {
    marginHorizontal: 20,
    marginBottom: 70,
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2,
  },
  gradient: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default Fooddetails;
