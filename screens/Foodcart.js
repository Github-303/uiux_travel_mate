import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationMenu from '../components/NavigationMenu';

const Foodcart = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Bagels with turkey and bacon',
      price: 10,
      quantity: 1,
      image: require('../assets/Rectangle3.4.png')
    },
    {
      id: 2,
      name: 'sandwich',
      price: 5,
      quantity: 1,
      image: require('../assets/Rectangle3.4.png')
    }
  ]);
  const handleConfirmOrder = () => {
    navigation.navigate('PaymentMethods');
  };
  const handleQuantityChange = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const serviceTax = 2;
  const total = subtotal + serviceTax;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="angle-left" size={24} color="#000" />
            <Text style={styles.headerTitle}>Food cart</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryHeader}>
          <Text style={styles.summaryText}>{cartItems.length} Items added</Text>
          <Text style={styles.summaryText}>Total : ${total}</Text>
        </View>

        <ScrollView style={styles.cartItemsContainer}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
              <View style={styles.quantityControl}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, -1)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.timeSelector}>
            <Text style={styles.timeSelectorLabel}>Select Time</Text>
            <TouchableOpacity style={styles.timePickerButton}>
              <Text style={styles.timePickerText}>00 : 00 : 00</Text>
              <Icon name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.orderSummary}>
            <Text style={styles.summaryTitle}>ORDER SUMMARY</Text>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.summaryItem}>
                <Text style={styles.summaryItemName}>{item.name}</Text>
                <Text style={styles.summaryItemPrice}>${item.price * item.quantity}</Text>
              </View>
            ))}
            <View style={styles.summaryLine}>
              <Text style={styles.summaryLabel}>Sub total</Text>
              <Text style={styles.summaryValue}>${subtotal}</Text>
            </View>
            <View style={styles.summaryLine}>
              <Text style={styles.summaryLabel}>Service tax</Text>
              <Text style={styles.summaryValue}>${serviceTax}</Text>
            </View>
            <View style={styles.totalLine}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total}</Text>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity 
          style={styles.proceedButton}
          onPress={() => navigation.navigate('PaymentMethods')}
        >
          <LinearGradient
            colors={['#0099FF', '#00FFE0']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
          >
            <Text style={styles.proceedButtonText} onPress={handleConfirmOrder}>PROCEED TO PAYMENT</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      <NavigationMenu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    marginBottom: 60, // Để tạo khoảng trống cho NavigationMenu
  },
  header: {
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
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
  },
  cartItemsContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#00C2FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 16,
  },
  timeSelector: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  timeSelectorLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  timePickerText: {
    fontSize: 16,
    color: '#000',
  },
  orderSummary: {
    padding: 15,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryItemName: {
    fontSize: 14,
    color: '#666',
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  proceedButton: {
    margin: 15,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20, // Tăng margin bottom để tránh bị che bởi NavigationMenu
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Foodcart;
