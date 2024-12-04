import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavigationMenu from '../components/NavigationMenu';

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} color="#000" />
          <Text style={styles.headerTitle}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Privacy Policy</Text>
        
        <Text style={styles.paragraph}>
          built the Find hotel app as a Commercial app. This SERVICE is provided by us and is intended for use as is.
        </Text>

        <Text style={styles.paragraph}>
          This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
        </Text>

        <Text style={styles.paragraph}>
          If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
        </Text>

        <Text style={styles.paragraph}>
          The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Find hotel unless otherwise defined in this Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>Information Collection and Use</Text>

        <Text style={styles.paragraph}>
          For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.
        </Text>

        <Text style={styles.paragraph}>
          The app does use third party services that may collect information used to identify you.
        </Text>

        <Text style={styles.linkText}>
          Link to privacy policy of third party service providers used by the app
        </Text>

        <Text style={styles.sectionTitle}>Log Data</Text>

        <Text style={styles.paragraph}>
          We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol ("IP") address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
        </Text>

        <Text style={styles.sectionTitle}>Cookies</Text>

        <Text style={styles.paragraph}>
          Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
        </Text>
      </ScrollView>

      <View style={styles.bottomSpacing} />
      <NavigationMenu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontWeight: '400',
    marginLeft: 8,
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  bottomSpacing: {
    height: 60, // Height of the NavigationMenu
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    marginTop: 24,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333333',
    marginBottom: 16,
  },
  linkText: {
    fontSize: 15,
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
});

export default PrivacyPolicyScreen;