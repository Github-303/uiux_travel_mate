import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput,ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import NavigationMenu from '../components/NavigationMenu';

const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+81', country: 'Japan' },
  { code: '+82', country: 'Korea' },
  { code: '+84', country: 'Vietnam' },
  { code: '+86', country: 'China' },
  { code: '+91', country: 'India' },
  { code: '+225', country: 'Ivory Coast' },
  { code: '+234', country: 'Nigeria' },
  { code: '+966', country: 'Saudi Arabia' },
];

const Editprofile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [avatar, setAvatar] = useState(require('../assets/avt.png'));
  const [countryCode, setCountryCode] = useState('+225');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const pickImage = async () => {
    // Yêu cầu quyền truy cập thư viện ảnh
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Mở thư viện ảnh để chọn
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar({ uri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="angle-left" size={40} color="black" />
        <Text style={styles.title}>Edit profile</Text>
      </View>

      {/* Avatar Container */}
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image source={avatar} style={styles.avatar} />
        <Image source={require('../assets/mayanh.png')} style={styles.innerImage} resizeMode="contain" />
      </TouchableOpacity>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputWrapper}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      <View style={styles.separator} />

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Image source={require('../assets/email.png')} style={styles.icon1} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      <View style={styles.separator} />

      {/* Mobile Number Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.phoneInputWrapper}>
          <TouchableOpacity 
            style={styles.countryCodeButton}
            onPress={() => setShowCountryPicker(!showCountryPicker)}
          >
            <Text style={styles.countryCodeText}>{countryCode}</Text>
            <Image source={require('../assets/down.png')} style={styles.downIcon} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.phoneInput}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {showCountryPicker && (
        <View style={styles.pickerContainer}>
          <ScrollView style={styles.countryList}>
            {countryCodes.map((country, index) => (
              <TouchableOpacity
                key={index}
                style={styles.countryItem}
                onPress={() => {
                  setCountryCode(country.code);
                  setShowCountryPicker(false);
                }}
              >
                <Text style={styles.countryText}>
                  {country.country} ({country.code})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.separator} />

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton}>
        <LinearGradient
          colors={['#0099FF', '#00FFE0']}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.updateButtonText}>Update</Text>
        </LinearGradient>
      </TouchableOpacity>
      {/* Thêm NavigationMenu vào cuối màn hình */}
      <NavigationMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    position: 'relative',
  },
  avatar: {
    width: 158,
    height: 158,
    borderRadius: 79,
  },
  innerImage: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40,
    paddingHorizontal: 10,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 4,
  },
  downIcon: {
    width: 12,
    height: 12,
    tintColor: '#666',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: -16,
    marginBottom: 20,
    maxHeight: 200,
  },
  countryList: {
    padding: 8,
  },
  countryItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryText: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  icon1: {
    marginRight: 10,
  },
  icon2: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent',
  },
  updateButton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Editprofile;
