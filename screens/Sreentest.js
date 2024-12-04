import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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

const Screen12 = () => {

  const renderItem = ({ item, index }) => (
    <View>
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
            <TouchableOpacity style={styles.addButton} onPress={() => addItemToCart(item.price)}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Đường kẻ ngang giữa các món */}
      {index < initialItems.length - 1 && <View style={styles.line} />}
    </View>
  );
  
  

  return (
    <View style={styles.container}>
      <FlatList
        data={initialItems}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        style={styles.list}
      />

        {/* Thêm NavigationMenu vào cuối màn hình */}
        <NavigationMenu />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    list: {
      marginBottom: 80,
    },
    line: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginVertical: 10,
    },
    itemContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 0,
      marginVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemDetails: {
      flex: 1,
      marginLeft: 10,
    },
    itemImage: {
      width: 100,
      height: 80,
      borderRadius: 8,
    },
    itemName: {
      fontSize: 12.5,
      fontWeight: '400',
    },
    itemDescription: {
      fontSize: 11,
      color: 'black',
    },
    itemDiscount: {
      fontSize: 14,
      color: '#EBA731',
      fontWeight: '700',
    },
    itemPrice: {
      fontSize: 14,
      fontWeight: '700',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 2,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
      marginTop: 8,
    },
    itemRating: {
      fontSize: 10,
      color: '#888',
      marginLeft: 5,
    },
    itemReviews: {
      fontSize: 12,
      color: '#888',
      marginLeft: 20,
    },
    addButton: {
      backgroundColor: '#00C8CA',
      borderRadius: 10,
      paddingVertical: 3,
      paddingHorizontal: 12,
      marginLeft: 40,
    },
    addButtonText: {
      color: '#fff',
    },
    checkoutContainer: {
      padding: 10,
      borderTopWidth: 2,
      borderColor: '#EBF1F5',
      backgroundColor: '#fff',
      marginTop: 10,
    },
    checkoutText: {
      fontSize: 12,
      fontWeight: '400',
      marginVertical: 5,
    },
  });

export default Screen12;
