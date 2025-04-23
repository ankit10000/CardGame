import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; 
import { LinearGradient } from 'expo-linear-gradient';
// <--- Add this import
import axios from 'axios';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletScreen from '../components/WallettScreen';

const { width } = Dimensions.get('window');
const COLORS = {
  primaryPurple: '#4D2D7A',
  lightPurple: '#6A359C',
  backgroundPurple: '#6A359C',
  cardBackground: '#5C2E85',
  textWhite: '#FFFFFF',
  textDark: '#333333',
  textPurple: '#4D2D7A',
  yellowGold: '#F7C04A',
  iconGreen: '#4CAF50',
  iconRed: '#F44336',
  iconOrange: '#FFA500',
  iconYellow: '#FFD700',
  barChartBlue: '#63C5DA',
  barChartYellow: '#F7C04A',
  notificationBadge: '#FF0000',
};


const marketData = [
  {
    id: '1',
    name: 'KALYAN MORNING',
    numbers: '126-94-248',
    open: '09:30 AM',
    close: '10:30 AM',
    status: 'Running',
  },
  {
    id: '2',
    name: 'MAIN BAZAR',
    numbers: '148-31-489',
    open: '10:00 AM',
    close: '11:00 AM',
    status: 'CLOSED',
  },
  {
    id: '3',
    name: 'KARNATAKA DAY',
    numbers: '889-53-256',
    open: '10:10 AM',
    close: '11:10 AM',
    status: 'CLOSED',
  },
  {
    id: '4',
    name: 'SRIDEVI MORNING',
    numbers: '489-15-348',
    open: '11:00 AM',
    close: '12:00 PM',
    status: 'CLOSED',
  },
  {
    id: '5',
    name: 'MADHUR MORNING',
    numbers: '190-03-139',
    open: '11:30 AM',
    close: '12:30 PM',
    status: 'Running',
  },
  {
    id: '6',
    name: 'PADMAVATI',
    numbers: '190-03-139',
    open: '11:30 AM',
    close: '12:30 PM',
    status: 'Running',
  },
  {
    id: '7',
    name: 'MILAN MORNING',
    numbers: '190-03-139',
    open: '11:30 AM',
    close: '12:30 PM',
    status: 'Running',
  },
];


const MarketItem = ({ item, navigation }) => (
  <View style={styles.card}>

    <TouchableOpacity onPress={() => navigation.navigate('PanelChart', { item })} style={styles.cardIconContainer}>

      <FontAwesome5 name="chart-bar" size={35} color={COLORS.barChartBlue} />


    </TouchableOpacity>


    <View style={styles.cardDetails}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardNumbers}>{item.numbers}</Text>
      <View style={styles.cardTimes}>
        <Text style={styles.cardTimeText}>Open: {item.open}</Text>
        <Text style={styles.cardTimeSeparator}>|</Text>
        <Text style={styles.cardTimeText}>Close: {item.close}</Text>
      </View>
    </View>

    {item.status === 'CLOSED' ? (
      <TouchableOpacity style={styles.cardStatusContainer} >
        <View style={styles.closeIconCircle}>
          <Ionicons name="close" size={22} color={COLORS.textWhite} />
        </View>
        <Text style={styles.closeText}>{item.status.toUpperCase()}</Text>
      </TouchableOpacity>) : (
      <TouchableOpacity style={styles.cardStatusContainer} >
        <View style={styles.playIconCircle}>
          <Ionicons name="play" size={22} color={COLORS.textWhite} onPress={() => navigation.navigate('Games', { item })} />
        </View>
        <Text style={styles.runningText}>{item.status.toUpperCase()}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [dpImages, setDpImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDpImages = async () => {
    try {
      const res = await axios.get('https://mtka-api-production.up.railway.app/api/homedp/all-dpimage');
      setDpImages(res.data.data);
    } catch (err) {
      console.error('Error fetching DP images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDpImages();
  }, []);


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleWhatsApp = () => {
    const phoneNumber = '+911234567890';
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          alert('WhatsApp is not installed on your device');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('Error opening WhatsApp:', err));
  };

  const handleCall = () => {
    const phoneNumber = 'tel:+911234567890';
    Linking.openURL(phoneNumber).catch((err) => console.error('Error making call:', err));
  };


  const fetchData = () => {
    console.log("Refreshing data...");

  };


  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar barStyle="light-content" backgroundColor="#313332" />



      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.headerIcon}>
          <Ionicons name="menu" size={30} color={COLORS.textWhite} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Milaan Matka 777</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
            <WalletScreen />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>

        <View style={styles.bannerContainer}>

          <Swiper autoplay showsPagination={true} dotColor="#ccc" activeDotColor="#000">
            {dpImages.map((item, index) => (
              <Image
                key={index}
                source={{ uri: `https://mtka-api-production.up.railway.app/uploads/homedp/${item.image}` }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </Swiper>

        </View>
        <ImageBackground
          source={require('../assets/bg.jpg')} // or use a URL with { uri: 'https://...' }
          style={styles.background}
          resizeMode="cover"
        >

          <Text style={styles.welcomeText}>
            WELCOME TO INDIA NO.1 TRUSTED MILAAN MATKA 777 APP
          </Text>


          <View style={styles.buttonRow}>
            {/* Add Fund Button */}
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AddFund')}>
              <LinearGradient
                colors={["#551e82", "#8039bb", "#551e82"]} // Green -> White -> Purple
                start={{ x: 0.5, y: 0 }} // Vertical gradient start (top)
                end={{ x: 0.5, y: 1 }}   // Vertical gradient end (bottom)
                style={styles.gradientButton}
              >
                <FontAwesome name="plus-circle" size={22} color={"#71d64c"} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Add Fund</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Withdraw Button */}
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Withdraw')}>
              <LinearGradient
                colors={["#551e82", "#8039bb", "#551e82"]} // Yellow -> White -> Light Purple
                start={{ x: 0.5, y: 0 }} // Vertical gradient start (top)
                end={{ x: 0.5, y: 1 }}   // Vertical gradient end (bottom)
                style={styles.gradientButton}
              >
                <MaterialCommunityIcons name="bank-transfer-out" size={24} color={"#fabe24"} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Withdraw</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            {/* Chat Now Button */}
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.8}
              onPress={handleWhatsApp}>
              <LinearGradient
                colors={["#551e82", "#8039bb", "#551e82"]} // WhatsApp Green -> White -> Darker Green
                start={{ x: 0.5, y: 0 }} // Vertical gradient start (top)
                end={{ x: 0.5, y: 1 }}   // Vertical gradient end (bottom)
                style={styles.gradientButton}
              >
                <Ionicons name="logo-whatsapp" size={24} color={'#71d64c'} style={styles.buttonIcon} />
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>Chat Now</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Call Now Button */}
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.8}
              onPress={handleCall}>
              <LinearGradient
                colors={["#551e82", "#8039bb", "#551e82"]} // Orange -> White -> Darker Orange
                start={{ x: 0.5, y: 0 }} // Vertical gradient start (top)
                end={{ x: 0.5, y: 1 }}   // Vertical gradient end (bottom)
                style={styles.gradientButton}
              >
                <Ionicons name="call" size={22} color={'#f59a75'} style={styles.buttonIcon} />
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>Call Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>



          <TouchableOpacity style={styles.gamesBar} activeOpacity={0.8} onPress={() => navigation.navigate('Games1')}>
            <Text style={styles.gamesBarText}>GALI DISAWAR GAMES</Text>
            <View style={styles.arrowCircle}>
              <Icon name="arrow-forward-ios" size={16} color={COLORS.textWhite} />
            </View>
          </TouchableOpacity>



          <FlatList
            data={marketData}
            renderItem={({ item }) => <MarketItem item={item} navigation={navigation} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            refreshing={false}
            onRefresh={fetchData}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  image: {
    width: width,
    height: 150,
  },

  background: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundPurple,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primaryPurple,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 60,
  },
  headerIcon: {
    padding: 5,
    position: 'relative',
  },
  headerTitle: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.notificationBadge,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.textWhite,
  },
  notificationCount: {
    color: COLORS.textWhite,
    fontSize: 10,
    fontWeight: 'bold',
  },
  coinIconContainer: {
    backgroundColor: COLORS.yellowGold,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
  },
  coinIcon: {
    marginRight: 4,
    color: COLORS.primaryPurple,
  },
  coinText: {
    color: COLORS.primaryPurple,
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  bannerContainer: {

    marginHorizontal: 0,
    marginTop: 0,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    color: COLORS.textWhite,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.primaryPurple,
    marginVertical: 5,
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryPurple,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },

  gamesBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.yellowGold,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
  },
  gamesBarText: {
    color: "red",
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowCircle: {
    backgroundColor: COLORS.primaryPurple,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  card: {
    backgroundColor: "transparent",
    borderColor: COLORS.primaryPurple,
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardIconContainer: {

    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
  },

  barStyle: {
    width: 8,
    marginHorizontal: 1,
    backgroundColor: COLORS.barChartBlue,
  },
  cardDetails: {
    flex: 1,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginBottom: 2,
    textAlign: 'center',
  },
  cardNumbers: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginBottom: 5,
    textAlign: 'center',
  },
  cardTimes: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardTimeText: {
    fontSize: 11,
    color: COLORS.textWhite,
    opacity: 0.9,
  },
  cardTimeSeparator: {
    fontSize: 12,
    color: COLORS.textWhite,
    marginHorizontal: 5,
    opacity: 0.9,
  },
  cardStatusContainer: {
    alignItems: 'center',
    paddingLeft: 10,
  },
  playIconCircle: {
    backgroundColor: "green",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    borderWidth: 1,
    borderColor: COLORS.primaryPurple,
  },
  closeIconCircle: {
    backgroundColor: "#e31202",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    borderWidth: 1,
    borderColor: COLORS.primaryPurple,
  },
  runningText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.iconGreen,
  },
  closeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: "#e31202",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10, // Keep horizontal margin for the row
    marginTop: 15,
  },
  buttonContainer: { // Style for the TouchableOpacity wrapper
    flex: 1,
    marginHorizontal: 8, // Margin between buttons
    borderRadius: 25, // Apply border radius to the touchable for ripple effect (Android) and clipping
    // Add shadow/elevation to the container for better effect
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradientButton: { // Style for the LinearGradient component
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25, // Match container's border radius
    width: '100%', // Ensure gradient fills the container
  },
  buttonIcon: {
    marginRight: 8,
    // We'll set color individually per button now if needed, or keep a default
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#ffffff", // Default text color, can override inline
  },
});

export default HomeScreen;