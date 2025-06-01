import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import apiService from '../services/apiService';
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


const MarketItem = ({ item, navigation }) => (
  <View style={styles.card}>

    <TouchableOpacity onPress={() => navigation.navigate('PanelChart', { item })} style={styles.cardIconContainer}>

      <FontAwesome5 name="chart-bar" size={35} color={COLORS.barChartBlue} />


    </TouchableOpacity>


    <View style={styles.cardDetails}>
      <Text style={styles.cardTitle}>{item.gameName}</Text>
      <Text style={styles.cardNumbers}>
        {item.result?.openDigits || '***'} - {item.result?.jodiResult || '**'} - {item.result?.closeDigits || '***'}
      </Text>
      <View style={styles.cardTimes}>
        <Text style={styles.cardTimeText}>Open: {item.openTime}</Text>
        <Text style={styles.cardTimeSeparator}>|</Text>
        <Text style={styles.cardTimeText}>Close: {item.closeTime}</Text>
      </View>
    </View>

    {item?.status?.toUpperCase() === 'CLOSED' ? (
      <TouchableOpacity style={styles.cardStatusContainer}>
        <View style={styles.closeIconCircle}>
          <Ionicons name="close" size={22} color={COLORS.textWhite} />
        </View>
        <Text style={styles.closeText}>{item.status?.toUpperCase() || 'close'}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.cardStatusContainer} onPress={() => navigation.navigate('Games', { item })}>
        <View style={styles.playIconCircle}>
          <Ionicons name="play" size={22} color={COLORS.textWhite} />
        </View>
        <Text style={styles.runningText}>{item.status?.toUpperCase() || 'Running'}</Text>
      </TouchableOpacity>
    )}

  </View>
);

const HomeScreen = () => {
  const [marketData, setMarketData] = useState([]);

  // const [marketData, setMarketData] = useState([]);
 const fetchMarketData = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await apiService.get('/starline/game/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'

    const updatedData = res.data.data.map((game) => {
      const gameDate = new Date(game.gameDate);
      const gameDateString = gameDate.toISOString().split('T')[0];

      const [openHour, openMinute] = game.openTime.split(':').map(Number);
      const [closeHour, closeMinute] = game.closeTime.split(':').map(Number);

      const openTime = new Date(gameDate);
      openTime.setHours(openHour, openMinute, 0, 0);

      const closeTime = new Date(gameDate);
      closeTime.setHours(closeHour, closeMinute, 0, 0);

      let status = 'Closed';
      if (now < openTime) {
        status = 'Running';
      } else if (now >= openTime && now < closeTime) {
        status = 'Running';
      }

      return {
        ...game,
        gameDateString,
        isToday: gameDateString === today,
        status,
        result: {
          openDigits: game.result?.openDigits || '***',
          closeDigits: game.result?.closeDigits || '***',
          openResult: game.result?.openResult || '***',
          closeResult: game.result?.closeResult || '***',
          jodiResult: game.result?.jodiResult || '***',
        }
      };
    });

    // Sort so today's games come first
    updatedData.sort((a, b) => {
      if (a.isToday && !b.isToday) return -1;
      if (!a.isToday && b.isToday) return 1;
      return new Date(a.gameDate) - new Date(b.gameDate); // fallback sort by date
    });

    setMarketData(updatedData);
  } catch (error) {
    console.error('Error fetching market data:', error);
  }
};



  const navigation = useNavigation();
  const [dpImages, setDpImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDpImages = async () => {
    try {
      const res = await apiService.get('/homedp/all-dpimage');
      setDpImages(res.data.data);
    } catch (err) {
      console.error('Error fetching DP images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDpImages();
    fetchMarketData();
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

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchMarketData(), fetchDpImages()]);
    setRefreshing(false);
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
                source={{ uri: `https://mtka-api.vercel.app/uploads/homedp/${item.image}` }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </Swiper>

        </View>
        <ImageBackground
          source={require('../assets/bg.jpg')}
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
                colors={["#551e82", "#8039bb", "#551e82"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
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
                colors={["#551e82", "#8039bb", "#551e82"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
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
                colors={["#551e82", "#8039bb", "#551e82"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
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
                colors={["#551e82", "#8039bb", "#551e82"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradientButton}
              >
                <Ionicons name="call" size={22} color={'#f59a75'} style={styles.buttonIcon} />
                <Text style={[styles.buttonText, { color: '#ffffff' }]}>Call Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>



          <TouchableOpacity
            style={styles.gamesBarContainer}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Games1')}>
            <LinearGradient
              colors={[COLORS.yellowGold, '#DAA520']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gamesBarGradient}
            >
              <Text style={styles.gamesBarText}>GALI DISAWAR GAMES</Text>
              <View style={styles.arrowCircle}>
                <Icon name="arrow-forward-ios" size={16} color={COLORS.textWhite} />
              </View>
            </LinearGradient>
          </TouchableOpacity>



          <FlatList
            data={marketData}
            renderItem={({ item }) => <MarketItem item={item} navigation={navigation} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}

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
    fontSize: 12,
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
    marginHorizontal: 5,
    marginTop: 5,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 25,

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
  },
  buttonIcon: {
    marginRight: 8,

  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#ffffff",
  },
  gamesBarContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },


  gamesBarGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,

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
});

export default HomeScreen;
