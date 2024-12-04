import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from '../components/NavigationMenu';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import QRCode from 'react-native-qrcode-svg';

const { width, height } = Dimensions.get('window');
const cardWidth = width - 40;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

// Import images
const Muiten = require('../assets/menu.png');
const Rectangle = require('../assets/muiten.png');
const Rectangle2 = require('../assets/Rectangle2.png');
const Rectangle21 = require('../assets/Rectangle2.1.png');
const Rectangle22 = require('../assets/Rectangle2.2.png');
const Rectangle23 = require('../assets/Rectangle2.3.png');
const Rectangle24 = require('../assets/Rectangle2.4.png');
const Rectangle3 = require('../assets/Rectangle3.png');
const visa = require('../assets/visa-pay-logo.png');
const Vector21 = require('../assets/Vector2.1.png');
const Vector2 = require('../assets/Vector2.png');
const paymentImage = require('../assets/payment.png');

class PaymentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Payment Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorBoundary}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => this.setState({ hasError: false })}
          >
            <Text style={styles.resetButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const PaymentMethods = () => {
  const navigation = useNavigation();
  const [showPayPal, setShowPayPal] = useState(false);
  const [amount, setAmount] = useState('127');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const paypalHTML = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            margin: 0; 
            padding: 16px; 
            background-color: #f5f5f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          }
          #paypal-button-container { 
            width: 100%;
            min-height: 150px;
          }
          .error-message {
            color: #ff0000;
            text-align: center;
            padding: 20px;
            display: none;
          }
          .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
          }
        </style>
      </head>
      <body>
        <div id="paypal-button-container"></div>
        <div id="error-message" class="error-message">
          Failed to load PayPal. Please try again.
        </div>
        <script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"></script>
        <script>
          window.onerror = function(msg, url, line) {
            document.getElementById('error-message').style.display = 'block';
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'error',
              error: msg
            }));
            return true;
          };

          paypal.Buttons({
            style: {
              layout: 'vertical',
              color:  'blue',
              shape:  'rect',
              label:  'pay'
            },
            createOrder: function(data, actions) {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '${(parseFloat(amount) / 23000).toFixed(2)}'
                  }
                }]
              });
            },
            onApprove: function(data, actions) {
              return actions.order.capture().then(function(details) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'success',
                  details: details
                }));
              });
            },
            onError: function(err) {
              document.getElementById('error-message').style.display = 'block';
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'error',
                error: err
              }));
            }
          }).render('#paypal-button-container')
            .catch(function(error) {
              document.getElementById('error-message').style.display = 'block';
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'error',
                error: error.message
              }));
            });
        </script>
      </body>
    </html>
  `;

  const handlePayPalMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'success') {
        navigation.navigate('Thankyou');
      } else if (data.type === 'error') {
        console.error('PayPal Error:', data.error);
        setHasError(true);
      }
    } catch (error) {
      console.error('Error parsing PayPal message:', error);
      setHasError(true);
    }
  };

  const handleWebViewError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleWebViewLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const retryPayment = () => {
    setHasError(false);
    setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent 
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image source={Rectangle} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment methods</Text>
          <TouchableOpacity 
            style={styles.menuButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image source={Muiten} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <PaymentErrorBoundary>
            <View style={styles.paymentOptions}>
              <TouchableOpacity onPress={() => setShowPayPal(false)}>
                <Image source={Rectangle2} style={styles.paymentIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPayPal(true)}>
                <Image source={Rectangle21} style={styles.paymentIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={Rectangle22} style={styles.paymentIcon} />
              </TouchableOpacity>
              <View style={styles.rectangle24Container}>
                <Image source={Rectangle23} style={styles.overlayIcon} />
              </View>
            </View>

            {showPayPal ? (
              <View style={styles.paypalContainer}>
                {isLoading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0099FF" />
                    <Text style={styles.loadingText}>Loading PayPal...</Text>
                  </View>
                )}
                
                <WebView
                  source={{ html: paypalHTML }}
                  style={[
                    styles.webview, 
                    isLoading && styles.hidden,
                    Platform.OS === 'ios' && styles.iosWebView
                  ]}
                  onMessage={handlePayPalMessage}
                  onError={handleWebViewError}
                  onLoad={handleWebViewLoad}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  scalesPageToFit={true}
                  scrollEnabled={false}
                  bounces={false}
                />

                {hasError && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Failed to load PayPal</Text>
                    <TouchableOpacity 
                      style={styles.retryButton} 
                      onPress={retryPayment}
                    >
                      <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.qrContainer}>
                  <Text style={styles.qrTitle}>Scan to pay with PayPal</Text>
                  <View style={styles.qrWrapper}>
                    <QRCode
                      value={`https://www.paypal.com/paypalme/yourPayPalUsername/${(parseFloat(amount) / 23000).toFixed(2)}`}
                      size={150}
                      backgroundColor="white"
                      color="#000"
                    />
                  </View>
                  <Text style={styles.amountText}>
                    Amount: ${(parseFloat(amount) / 23000).toFixed(2)} USD
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.cardContainer}>
                <LinearGradient
                  colors={['#0099FF', '#00FFE0']}
                  style={styles.cardContent}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View style={styles.chipContainer}>
                    <Image source={Rectangle3} style={styles.chipIcon} />
                    <Image source={Vector2} style={styles.chipOverlay1} />
                    <Image source={Vector21} style={styles.chipOverlay2} />
                  </View>
                  
                  <View style={styles.cardDetails}>
                    <Text style={styles.cardLabel}>Card Number</Text>
                    <Text style={styles.cardNumber}>0085 7789 2236 3685</Text>
                    
                    <Text style={styles.cardLabel}>Card Holder Name</Text>
                    <Text style={styles.cardValue}>John smith</Text>
                    
                    <View style={styles.cardBottomRow}>
                      <View style={styles.expiryDate}>
                        <Text style={styles.cardLabel}>Expiry date</Text>
                        <Text style={styles.cardValue}>06/22</Text>
                      </View>
                      
                      <View style={styles.cvv}>
                        <Text style={styles.cardLabel}>CVV</Text>
                        <Text style={styles.cardValue}>321</Text>
                      </View>
                    </View>
                  </View>
                  
                  <Image source={visa} style={styles.visaLogo} />
                </LinearGradient>
              </View>
            )}
          </PaymentErrorBoundary>
        </View>
      </SafeAreaView>
      <NavigationMenu />
      <TouchableOpacity 
        style={styles.finishButton} 
        onPress={() => navigation.navigate('Thankyou')}
      >
        <LinearGradient
          colors={['#0099FF', '#00FFE0']}
          style={styles.finishButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.finishButtonText}>Finish Order</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  paypalContainer: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
  webview: {
    height: Platform.OS === 'ios' ? 280 : 250,
    backgroundColor: 'transparent',
  },
  qrContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  qrTitle: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  amountText: {
    marginTop: 15,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  paymentIcon: {
    width: 70,
    height: 40,
    resizeMode: 'contain',
  },
  finishButton: {
    marginBottom: Platform.OS === 'ios' ? 90 : 70,
    marginHorizontal: 10,
  },
  finishButtonGradient: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 15 : 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  cardContainer: {
    width: cardWidth,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
    height: 200,
    borderRadius: 20,
  },
  chipContainer: {
    marginTop: 10,
    marginLeft: 10,
    width: 40,
    height: 30,
  },
  chipIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  chipOverlay1: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    left: 0,
  },
  chipOverlay2: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    right: 0,
  },
  cardDetails: {
    marginTop: 30,
  },
  cardLabel: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 5,
  },
  cardNumber: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 20,
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 20,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: 5,
  },
  expiryDate: {
    marginRight: 20,
  },
  cvv: {
    marginLeft: 20,
  },
  visaLogo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 60,
    height: 20,
    resizeMode: 'contain',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  hidden: {
    opacity: 0,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#0099FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  errorBoundary: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    color: '#ff0000',
    marginBottom: 15,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#0099FF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  iosWebView: {
    marginTop: 10,
  },
  qrWrapper: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default PaymentMethods;