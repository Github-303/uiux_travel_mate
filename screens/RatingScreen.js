import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const RatingScreen = ({ navigation }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [review, setReview] = useState('');

  const emojis = ['😀', '😃', '😐', '🙁', '☹️'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} color="#000" />
          <Text style={styles.headerTitle}>Give rating & Review</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.emojiContainer}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedRating(index)}
              style={[
                styles.emojiButton,
                selectedRating === index && styles.selectedEmoji,
              ]}
            >
              <Text style={styles.emojiText}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.reviewInput}
          placeholder="Write your review"
          multiline
          value={review}
          onChangeText={setReview}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.submitButton}>
          <LinearGradient
            colors={['#0099FF', '#00D1FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.submitText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    marginLeft: 8,
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  emojiButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 32,
  },
  selectedEmoji: {
    transform: [{ scale: 1.2 }],
  },
  reviewInput: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    height: 200,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RatingScreen;