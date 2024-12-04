import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Addnewcard = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (text) => {
    const numericText = text.replace(/\D/g, '').slice(0, 16);
    const formattedText = numericText.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formattedText);
  };

  const formatExpiryDate = (text) => {
    const numericText = text.replace(/\D/g, '').slice(0, 4);
    if (numericText.length > 2) {
      setExpiryDate(`${numericText.slice(0, 2)}/${numericText.slice(2)}`);
    } else {
      setExpiryDate(numericText);
    }
  };

  const handleAddCard = () => {
    // Kiểm tra dữ liệu nhập
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Tạo object chứa thông tin thẻ mới
    const newCard = {
      cardNumber,
      cardHolder,
      expiryDate,
      cvv
    };

    // Chuyển về màn hình MyProfile với thông tin thẻ mới
    navigation.navigate('Myprofile', { newCard });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Card</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={formatCardNumber}
            maxLength={19}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Smith"
            value={cardHolder}
            onChangeText={setCardHolder}
            maxLength={50}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={formatExpiryDate}
              maxLength={5}
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="***"
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddCard}
        >
          <Text style={styles.addButtonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  addButton: {
    backgroundColor: '#0099FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Addnewcard;
