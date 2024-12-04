import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavigationMenu from '../components/NavigationMenu';

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {
            // Navigate to LoginScreen
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            });
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    );
  };

  const toggleNotification = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const settingsItems = [
    {
      id: 'notification',
      title: 'Notification',
      type: 'toggle',
      value: notificationsEnabled,
      onValueChange: toggleNotification,
    },
    {
      id: 'darkMode',
      title: 'Dark Mode',
      type: 'toggle',
      value: darkModeEnabled,
      onValueChange: toggleDarkMode,
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      type: 'arrow',
      onPress: () => navigation.navigate('PrivacyPolicy'),
      icon: 'shield'
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      type: 'arrow',
      onPress: () => navigation.navigate('Terms'),
      icon: 'file-text-o'
    },
    {
      id: 'rate',
      title: 'Rate App',
      type: 'arrow',
      onPress: () => navigation.navigate('Rating'),
      icon: 'star'
    },
    {
      id: 'faq',
      title: 'FAQ',
      type: 'arrow',
      onPress: () => navigation.navigate('FAQ'),
      icon: 'question-circle'
    },
    {
      id: 'logout',
      title: 'Logout',
      type: 'button',
      onPress: handleLogout,
      icon: 'sign-out'
    },
  ];

  const renderSettingItem = (item, index) => {
    if (item.type === 'arrow') {
      return (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.settingItem,
            index === 0 && styles.firstItem,
            index === settingsItems.length - 1 && styles.lastItem,
          ]}
          onPress={item.onPress}
        >
          <View style={styles.settingItemLeft}>
            <Text style={styles.settingText}>{item.title}</Text>
          </View>
          <FontAwesome name="angle-right" size={24} color="#999" />
        </TouchableOpacity>
      );
    }

    if (item.type === 'toggle') {
      return (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.settingItem,
            index === 0 && styles.firstItem,
            index === settingsItems.length - 1 && styles.lastItem,
          ]}
          onPress={item.onPress}
        >
          <Text style={styles.settingText}>{item.title}</Text>
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: '#D1D1D6', true: '#34C759' }}
            thumbColor="#FFFFFF"
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
          />
        </TouchableOpacity>
      );
    }

    if (item.type === 'button') {
      return (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.settingItem,
            index === 0 && styles.firstItem,
            index === settingsItems.length - 1 && styles.lastItem,
          ]}
          onPress={item.onPress}
        >
          <View style={styles.settingItemLeft}>
            <Text style={[styles.settingText, { color: '#FF3B30' }]}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {settingsItems.map(renderSettingItem)}
      </ScrollView>

      <View style={styles.bottomSpacing} />
      <NavigationMenu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  settingsContainer: {
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  firstItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastItem: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: 35,
  },
  settingText: {
    fontSize: 17,
    color: '#000000',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSpacing: {
    height: 60, // Height of the NavigationMenu
  },
});

export default SettingsScreen;