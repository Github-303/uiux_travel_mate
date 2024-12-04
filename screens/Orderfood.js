import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const cartIcon = require('../assets/feather-shopping-bag.png'); 
const foodItems = [
  { id: 1, name: 'Breakfast', image: require('../assets/breakfast.png') },
  { id: 2, name: 'Burger', image: require('../assets/burger.png') },
  { id: 3, name: 'Pizza', image: require('../assets/pizza.png') },
  { id: 4, name: 'Side items', image: require('../assets/side_items.png') },
  { id: 5, name: 'Chinese', image: require('../assets/chinese.png') },
  { id: 6, name: 'Salads', image: require('../assets/salads.png') },
];
import NavigationMenu from '../components/NavigationMenu';
const initialItems = [
  {
    key: '1',
    name: 'Bagels with turkey and bacon',
    rating: 3.9,
    reviews: 200,
    description: 'Neque, amet blandit tincidunt vulputate',
    discount: '25% OFF',
    price: 10,
    image: require('../assets/Rectangle3.4.png'),
  },
  {
    key: '2',
    name: 'Gourmet croissant, scrambled eggs..',
    rating: 4.2,
    reviews: 150,
    description: 'Neque, amet blandit tincidunt vulputate',
    discount: '15% OFF',
    price: 5,
    image: require('../assets/Rectangle3.5.png'),
  },
  {
    key: '3',
    name: 'Sandwich',
    rating: 4.0,
    reviews: 180,
    description: 'Neque, amet blandit tincidunt vulputate',
    discount: '10% OFF',
    price: 5,
    image: require('../assets/Rectangle3.6.png'),
  },
  {
    key: '4',
    name: 'Crispy mozza burger',
    rating: 4.5,
    reviews: 220,
    description: 'Neque, amet blandit tincidunt vulputate',
    discount: '20% OFF',
    price: 8,
    image: require('../assets/Rectangle361.png'),
  },
];

const Screen3 = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (price) => {
    setTotalItems(totalItems + 1); 
    setTotalPrice(totalPrice + price); 
  };

  const handleFoodItemPress = (item) => {
    navigation.navigate('Fooddetails', { foodItem: item });
  };

  const handleViewCart = () => {
    navigation.navigate('Foodcart', {
      totalItems: totalItems,
      totalPrice: totalPrice
    });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleFoodItemPress(item)}>
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              <Icon name="star" size={12} color="#FFD700" />
            </View>
            <Text style={styles.itemRating}>{item.rating}</Text>
            <Text style={styles.itemReviews}>Reviews ({item.reviews})</Text>
          </View>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.itemDiscount}>{item.discount}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <TouchableOpacity onPress={(e) => {
              e.stopPropagation();
              addItemToCart(item.price);
            }}>
              <LinearGradient
                colors={['#0099FF', '#00FFE0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {index < initialItems.length - 1 && <View style={styles.line} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="angle-left" size={24} color="#000" />
          <Text style={styles.headerTitle}>Food</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {foodItems.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => setSelectedId(category.id)}
          >
            <Image source={category.image} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={initialItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.checkoutContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total items added: {totalItems}</Text>
          <Text style={styles.totalText}>Total price: ${totalPrice}</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewCartButton}
          onPress={handleViewCart}
        >
          <LinearGradient
            colors={['#0099FF', '#00FFE0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.viewCartText}>View Cart</Text>
          </LinearGradient>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000',
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemRating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
  itemReviews: {
    fontSize: 12,
    color: '#666',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemDiscount: {
    fontSize: 12,
    color: '#FF6B00',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  addButton: {
    borderRadius: 20,
    overflow: 'hidden',
    width: 70,
    height: 30,
  },
  gradient: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 4,
  },
  line: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 10,
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 60,
  },
  totalContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  viewCartButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  viewCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});

export default Screen3;
