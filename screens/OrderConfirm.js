import React, { useState } from 'react';
import { 
  Image, 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from '../components/NavigationMenu';

const OrderConfirm = () => {
  const [promoCode, setPromoCode] = useState('');
  const navigation = useNavigation();

  const handlePromoCodeInput = (text) => {
    setPromoCode(text);
  };

  const handleConfirmOrder = () => {
    navigation.navigate('PaymentMethods');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/heden.jpg')}
            style={styles.headerImage}
          />
          <View style={styles.headerContent}>
            <Text style={styles.hotelName}>Heden Golf</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ 3.9</Text>
              <Text style={styles.ratingText}>85/100 people liked this</Text>
            </View>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}> Abidjan, Côte d'ivoire</Text>
            </View>
          </View>
        </View>

        {/* Room Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ROOM INFO</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>No.of rooms</Text>
            <Text style={styles.value}>1</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Room type</Text>
            <Text style={styles.value}>Air conditioned</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Room</Text>
            <Text style={styles.value}>3 Nights ($127 x 3 = $381)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Taxes</Text>
            <Text style={styles.value}>$25</Text>
          </View>
          <View style={[styles.infoRow, styles.totalRow]}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.totalValue}>$406</Text>
          </View>
        </View>

        {/* Guest Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GUEST INFO</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>John smith</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>johnsmith@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mobile number</Text>
            <Text style={styles.value}>+225 698698966</Text>
          </View>
        </View>

        {/* Promo Code Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROMO CODE</Text>
          <Text style={styles.promoText}>If you have promo code please enter it below</Text>
          <TextInput
            style={styles.promoInput}
            placeholder="ENTER PROMO CODE"
            placeholderTextColor="#666"
            value={promoCode}
            onChangeText={handlePromoCodeInput}
          />
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
          <LinearGradient
            colors={['#0099FF', '#00FFE0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.confirmButtonText}>Confirm order</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      <NavigationMenu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  hotelName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    color: '#FFD700',
    fontSize: 16,
    marginRight: 10,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
  value: {
    color: '#333',
    fontSize: 14,
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  promoText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 10,
  },
  promoInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  confirmButton: {
    margin: 20,
    marginBottom: 80,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OrderConfirm;
