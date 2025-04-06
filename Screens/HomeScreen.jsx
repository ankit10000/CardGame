import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Linking } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const COLORS = {
  primaryPurple: '#5d2f8e',
  lightPurple: '#7e4ab5',
  backgroundPink: '#b96b67',
  cardPink: '#9E5353',
  textWhite: '#ffffff',
  textDark: '#333333',
  textGray: '#555555',
  closedRed: '#fff',
  gradientStart: '#f7d977',
  gradientEnd: '#e5a550',
  iconGreen: '#4CAF50',
  iconRed: '#F44336',
};

const marketData = [
  {
    id: '1',
    name: 'SRIDEVI MORNING',
    numbers: '126-94-248',
    open: '09:30 AM',
    close: '10:30 AM',
    status: 'CLOSED',
  },
  {
    id: '2',
    name: 'KARNATAKA DAY',
    numbers: '148-31-489',
    open: '10:00 AM',
    close: '11:00 AM',
    status: 'CLOSED',
  },
  {
    id: '3',
    name: 'MILAN MORNING',
    numbers: '889-53-256',
    open: '10:10 AM',
    close: '11:10 AM',
    status: 'CLOSED',
  },
  {
    id: '4',
    name: 'KALYAN MORNING',
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
    status: 'CLOSED',
  },
];

const MarketItem = ({ item }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.8}>
    <View style={styles.cardIconContainer}>
      <Ionicons name="stats-chart" size={30} color={COLORS.textWhite} />
    </View>
    <View style={styles.cardDetails}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardNumbers}>{item.numbers}</Text>
      <View style={styles.cardTimes}>
        <Text style={styles.cardTimeText}>Open: {item.open}</Text>
        <Text style={styles.cardTimeSeparator}>|</Text>
        <Text style={styles.cardTimeText}>Close: {item.close}</Text>
      </View>
    </View>
    <View style={styles.cardStatusContainer}>
      <View style={styles.closedIconCircle}>
        <Icon name="close" size={20} color={COLORS.closedRed} />
      </View>
      <Text style={{ color: "#fff", fontSize: 10 }}>{item.status}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {

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
      .catch((err) => console.error('Error:', err));
  };

  const handleCall = () => {
    const phoneNumber = 'tel:+911234567890';
    Linking.openURL(phoneNumber).catch((err) => console.error('Error:', err));
  };



  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#313332" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Milaan matka 777</Text>
        <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate('AddFund')}>
          <View style={styles.walletContainer}>
            <Icon name="account-balance-wallet" size={20} color={COLORS.gradientEnd} />
            <Text style={styles.walletText}>0</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.bannerContainer}>
          <Image
            source={require('../assets/slide1.png')}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => navigation.navigate('AddFund')}>
            <Icon name="account-balance-wallet" size={20} color={COLORS.iconGreen} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Add Fund</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => navigation.navigate('Withdraw')}>
            <Ionicons name="card-outline" size={20} color={COLORS.iconRed} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={20} color={COLORS.iconGreen} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Chat Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleCall}>
            <Icon name="call" size={20} color={COLORS.iconGreen} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Call Now</Text>
          </TouchableOpacity>
        </View>


        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
            style={styles.starlineBar}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Text style={styles.starlineText}>Starline</Text>
            <View style={styles.arrowCircle}>
              <Icon name="arrow-forward-ios" size={16} color={COLORS.primaryPurple} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <FlatList
          data={marketData}
          renderItem={({ item }) => <MarketItem item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundPink,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#934b47",
    paddingHorizontal: 15,
    paddingVertical: 12,
    height: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.textWhite,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  headerRight: {
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textWhite,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  walletText: {
    color: COLORS.textDark,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  bannerTextContainer: {
  },
  bannerTextLine1: {
    backgroundColor: '#c83737',
    color: COLORS.textWhite,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  bannerTextLine2: {
    backgroundColor: '#c83737',
    color: COLORS.textWhite,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  bannerImage: {
    width: 380,
    height: 90,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginTop: 15,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryPurple,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: 15,
    fontWeight: '500',
  },
  starlineBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  starlineText: {
    color: COLORS.primaryPurple,
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowCircle: {
    backgroundColor: COLORS.textWhite,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: COLORS.cardPink,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardIconContainer: {
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginBottom: 4,
  },
  cardNumbers: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginBottom: 8,
  },
  cardTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTimeText: {
    fontSize: 12,
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
  },
  closedIconCircle: {
    backgroundColor: "#e31202",

    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  closedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.closedRed,
  },
  bottomSection: {
    backgroundColor: COLORS.cardPink,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  bottomSectionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
});

export default HomeScreen;