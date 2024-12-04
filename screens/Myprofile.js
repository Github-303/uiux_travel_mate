import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text, Dimensions, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationMenu from '../components/NavigationMenu';
import Card from '../components/Card';

const MyProfile = ({ navigation, route }) => {
  const screenHeight = Dimensions.get('window').height;
  const [showMenu, setShowMenu] = useState(false);
  const [cards, setCards] = useState([
    {
      id: '1',
      cardNumber: '0085 7789 2236 3685',
      cardHolder: 'John Smith',
      expiryDate: '06/22',
      cvv: '321'
    }
  ]);

  useEffect(() => {
    if (route.params?.newCard) {
      const newCard = {
        id: String(cards.length + 1),
        ...route.params.newCard
      };
      setCards(prevCards => [...prevCards, newCard]);
      navigation.setParams({ newCard: null });
    }
  }, [route.params?.newCard]);

  const MenuModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showMenu}
      onRequestClose={() => setShowMenu(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1} 
        onPress={() => setShowMenu(false)}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              setShowMenu(false);
              navigation.navigate('BookingDetailsScreen');
            }}
          >
            <Icon name="description" size={24} color="#00BA88" />
            <Text style={styles.menuItemText}>Booking Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              setShowMenu(false);
              navigation.navigate('BookingHistoryScreen');
            }}
          >
            <Icon name="history" size={24} color="#00BA88" />
            <Text style={styles.menuItemText}>History</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <ImageBackground
            source={require('../assets/anhnen.png')}
            style={styles.profileBackground}
          >
            <View style={styles.profileContent}>
              <Image 
                source={require('../assets/anhnen.png')} 
                style={styles.profilePhoto}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.nameText}>John Smith</Text>
                <Text style={styles.emailText}>johnsmith@gmail.com</Text>
                <Text style={styles.phoneText}>+225 698698966</Text>
              </View>
              {/* Menu Button */}
              <TouchableOpacity 
                style={[styles.iconButton, styles.menuButton]}
                onPress={() => setShowMenu(true)}
              >
                <Icon name="menu" size={20} color="white" />
              </TouchableOpacity>
              {/* Edit Button */}
              <TouchableOpacity 
                style={[styles.iconButton, styles.editButton]}
                onPress={() => navigation.navigate('Editprofile')}
              >
                <Icon name="edit" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.cardsSection}>
          {cards.map((card) => (
            <View key={card.id} style={styles.cardWrapper}>
              <Card 
                cardNumber={card.cardNumber}
                cardHolder={card.cardHolder}
                expiryDate={card.expiryDate}
                cvv={card.cvv}
              />
            </View>
          ))}
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Addnewcard')}
            style={styles.addCardButton}
          >
            <Text style={styles.addCardText}>+ ADD NEW CARD</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <MenuModal />
      <NavigationMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginTop: 80,
    marginLeft: 20,
    padding: 10,
    borderRadius: 10,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  profileSection: {
    height: 300,
  },
  profileBackground: {
    width: '100%',
    height: '400',
  },
  profileContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    width: '90%',
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
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  phoneText: {
    fontSize: 16,
    color: '#666',
  },
  iconButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButton: {
    top: 40,
    left: 30,
    backgroundColor: '#00BA88',
  },
  editButton: {
    top: 200,
    right: 30,
    backgroundColor: '#00BA88',
  },
  cardsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  addCardButton: {
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 80,
  },
  addCardText: {
    color: '#0099FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyProfile;