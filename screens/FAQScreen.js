import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FAQScreen = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqItems = [
    {
      question: 'Do I have to buy the Mobile App?',
      answer: 'No. Our Mobile App is completely free to download and install.',
    },
    {
      question: 'How do I get the Mobile App for my phone?',
      answer: '',
    },
    {
      question: 'What features does the Mobile App have?',
      answer: '',
    },
    {
      question: 'Is the Mobile App secure?',
      answer: '',
    },
    {
      question: 'How current is the account information ...',
      answer: '',
    },
    {
      question: 'How do I find your offices and payment locations?',
      answer: '',
    },
  ];

  const renderFAQItem = (item, index) => {
    const isExpanded = index === expandedIndex;

    return (
      <TouchableOpacity
        key={index}
        style={styles.faqItem}
        onPress={() => setExpandedIndex(isExpanded ? null : index)}
      >
        <View style={styles.questionRow}>
          <Text style={styles.questionText}>{item.question}</Text>
          <FontAwesome
            name={isExpanded ? 'angle-down' : 'angle-right'}
            size={20}
            color="#999"
          />
        </View>
        {isExpanded && (
          <Text style={styles.answerText}>{item.answer}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} color="#000" />
          <Text style={styles.headerTitle}>Faq</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {faqItems.map((item, index) => renderFAQItem(item, index))}
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
    padding: 16,
  },
  faqItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 15,
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
});

export default FAQScreen;