import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TermsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} color="#000" />
          <Text style={styles.headerTitle}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Terms & Conditions</Text>

        <Text style={styles.paragraph}>
          By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You're not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You're not allowed to attempt to extract the source code of the app, and you also shouldn't try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to.
        </Text>

        <Text style={styles.paragraph}>
          It is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you're paying for.
        </Text>

        <Text style={styles.paragraph}>
          At some point, we may wish to update the app. The app is currently available on iOS – the requirements for system (and for any additional systems we decide to extend the availability of the app to) may change, and you'll need to download the updates if you want to keep using the app. does not promise that it will always update the app so that it is relevant to you and/or works with the iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you. We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.
        </Text>

        <Text style={styles.sectionTitle}>Changes to This Terms and Conditions</Text>

        <Text style={styles.paragraph}>
          We may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms and Conditions on this page. These changes are effective immediately after they are posted on this page.
        </Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>

        <Text style={styles.paragraph}>
          If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at +225.
        </Text>
      </ScrollView>
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
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    color: '#000',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 16,
  },
});

export default TermsScreen;