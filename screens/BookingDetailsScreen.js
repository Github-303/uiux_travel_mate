import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import NavigationMenu from '../components/NavigationMenu';

export default function BookingDetailsScreen({ navigation }) {
  const bookingDetails = [
    {
      id: '1',
      title: 'Room details',
      details: [
        { label: 'Checkin date & time', value: '23 July 2019, 10:00 AM' },
        { label: 'Checkout date & time', value: '25 July 2019, 10:00 AM' },
        { label: 'No.of Adults', value: '2' },
        { label: 'No.of Children', value: '2' },
        { label: 'No.of room', value: '1' },
        { label: 'Price', value: '$125' },
        { label: 'Tax', value: '$20' },
        { label: 'Total', value: '$145', isTotal: true },
      ],
    },
    {
      id: '2',
      title: 'Food details',
      details: [
        { label: 'Bagels with turkey and bacon', value: '$10' },
        { label: 'Sandwich', value: '$5' },
        { label: 'Sub total', value: '$15' },
        { label: 'Service tax', value: '$2' },
        { label: 'Total', value: '$17', isTotal: true },
      ],
    },
  ];

  const renderBookingSection = ({ item }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      {item.details.map((detail, index) => (
        <View key={index} style={styles.detailRow}>
          <Text style={detail.isTotal ? styles.labelBold : styles.label}>
            {detail.label}
          </Text>
          <Text style={detail.isTotal ? styles.valueBold : styles.value}>
            {detail.value}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking details</Text>
      </View>

      <FlatList
        data={bookingDetails}
        renderItem={renderBookingSection}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('PaymentMethods')}
        >
          <LinearGradient
            colors={['#0099FF', '#00FFE0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.bookButtonText}>BOOK AGAIN</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#0099FF',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },
  labelBold: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  valueBold: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  bookButton: {
    overflow: 'hidden',
    borderRadius: 25,
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
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});