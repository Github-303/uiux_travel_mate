import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OtpVerificationScreen from './screens/OtpVerificationScreen';
import HomeScreen from './screens/HomeScreen';
import Hotelslist from './screens/Hotelslist';
import Amenities from './screens/Amenities';
import Review from './screens/Review';
import HotelPhotos from './screens/HotelPhotos';
import Nearby from './screens/Nearby';
import OrderConfirm from './screens/OrderConfirm';
import PaymentMethods from './screens/PaymentMethods';
import Thankyou from './screens/Thankyou';
import Fooddetails from './screens/Fooddetails';
import Foodcart from './screens/Foodcart';
import Ratingsreviews from './screens/Ratingsreviews';
import Redeemvoucher from './screens/Redeemvoucher';
import Orderfood from './screens/Orderfood';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import BookingDetailsScreen from './screens/BookingDetailsScreen';
import Addnewcard from './screens/Addnewcard';
import Editprofile from './screens/Editprofile';
import Myprofile from './screens/Myprofile';
import FilterScreen from './screens/FilterScreen';
import SortScreen from './screens/SortScreen';
import NavigationMenu from './components/NavigationMenu';
import CarBooking from './screens/CarBooking';
import TrackDriver from './screens/TrackDriver';
import SettingsScreen from './screens/SettingsScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import TermsScreen from './screens/TermsScreen';
import RatingScreen from './screens/RatingScreen';
import FAQScreen from './screens/FAQScreen';

// Suppress defaultProps warning from third-party libraries
LogBox.ignoreLogs([
  'Warning: Card: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
]);

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="HomeScreen" component={HomeScreen} />
        <MainStack.Screen name="Hotelslist" component={Hotelslist} />
        <MainStack.Screen name="Amenities" component={Amenities} />
        <MainStack.Screen name="Review" component={Review} />
        <MainStack.Screen name="HotelPhotos" component={HotelPhotos} />
        <MainStack.Screen name="Nearby" component={Nearby} />
        <MainStack.Screen name="OrderConfirm" component={OrderConfirm} />
        <MainStack.Screen name="PaymentMethods" component={PaymentMethods} />
        <MainStack.Screen name="Thankyou" component={Thankyou} />
        <MainStack.Screen name="Fooddetails" component={Fooddetails} />
        <MainStack.Screen name="Foodcart" component={Foodcart} />
        <MainStack.Screen name="Ratingsreviews" component={Ratingsreviews} />
        <MainStack.Screen name="Redeemvoucher" component={Redeemvoucher} />
        <MainStack.Screen name="Orderfood" component={Orderfood} />
        <MainStack.Screen name="BookingHistoryScreen" component={BookingHistoryScreen} />
        <MainStack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} />
        <MainStack.Screen name="Addnewcard" component={Addnewcard} />
        <MainStack.Screen name="Editprofile" component={Editprofile} />
        <MainStack.Screen name="Myprofile" component={Myprofile} />
        <MainStack.Screen name="FilterScreen" component={FilterScreen} />
        <MainStack.Screen name="SortScreen" component={SortScreen} />
        <MainStack.Screen name="CarBooking" component={CarBooking} />
        <MainStack.Screen name="TrackDriver" component={TrackDriver} />
        <MainStack.Screen name="Settings" component={SettingsScreen} />
        <MainStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <MainStack.Screen name="Terms" component={TermsScreen} />
        <MainStack.Screen name="Rating" component={RatingScreen} />
        <MainStack.Screen name="FAQ" component={FAQScreen} />
      </MainStack.Navigator>
      <NavigationMenu />
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
          <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
          <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <RootStack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
          <RootStack.Screen name="Main" component={MainNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
