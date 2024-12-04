import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Card = ({ cardNumber, cardHolder, expiryDate, cvv }) => {
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#0099FF', '#00FFE0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <Image 
            source={require('../assets/team.png')}
            style={styles.chipIcon}
          />
          <Image 
            source={require('../assets/visa.png')}
            style={styles.visaLogo}
          />
        </View>

        {/* Card Details */}
        <View style={styles.cardDetails}>
          <Text style={styles.cardLabel}>Card Number</Text>
          <Text style={styles.cardNumber}>{cardNumber}</Text>
          
          <View style={styles.cardInfo}>
            <View style={styles.infoSection}>
              <Text style={styles.cardLabel}>Card Holder Name</Text>
              <Text style={styles.cardText}>{cardHolder}</Text>
            </View>
            
            <View style={styles.expirySection}>
              <View style={styles.infoSection}>
                <Text style={styles.cardLabel}>Expiry Date</Text>
                <Text style={styles.cardText}>{expiryDate}</Text>
              </View>
              
              <View style={styles.infoSection}>
                <Text style={styles.cardLabel}>CVV</Text>
                <Text style={styles.cardText}>{cvv}</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

// Default props
Card.defaultProps = {
  cardNumber: '0000 0000 0000 0000',
  cardHolder: 'CARD HOLDER',
  expiryDate: 'MM/YY',
  cvv: '***'
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginBottom: 15,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    height: 200,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  chipIcon: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },
  visaLogo: {
    width: 60,
    height: 20,
    resizeMode: 'contain',
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardLabel: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoSection: {
    flex: 1,
  },
  expirySection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Card;