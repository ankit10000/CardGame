import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const games = [
    { title: 'SRIDEVI MORNING', numbers: '250-78-440', open: '09:30 AM', close: '10:30 AM' },
    { title: 'KARNATAKA DAY', numbers: '679-22-138', open: '10:00 AM', close: '11:00 AM' },
    { title: 'MILAN MORNING', numbers: '178-60-460', open: '10:10 AM', close: '11:10 AM' },
    { title: 'KALYAN MORNING', numbers: '468-81-119', open: '11:00 AM', close: '12:00 PM' },
  ];
  // Inside your HomeScreen component, before return:
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = scrollX.interpolate({
    inputRange: [0, 1],
    outputRange: [300, -300], // You can adjust based on text width
  });


  return (
    <View style={{ flex: 1, backgroundColor: '#2E2E2E', marginTop: 50 }}>
      {/* Top Header */}
      <View style={styles.header}>
        {/* Drawer Icon */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#FFD700" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>Welcome</Text>

        {/* Right Side Icons */}
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <FontAwesome5 name="wallet" size={16} color="#FFD700" />
            <Text style={styles.headerButtonText}>Add Fund</Text>
          </TouchableOpacity>

        </View>
      </View>

      <ScrollView style={styles.container}>
        {/* Subheader */}
        <View style={{ overflow: 'hidden', height: 40, marginBottom: 12 }}>
          <Animated.Text
            style={[
              styles.subHeader,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            Kitni Bar Bhi Withdrawal le skte hai
          </Animated.Text>
        </View>


        {/* Banner Image */}
        <Image
          source={{ uri: 'https://img.freepik.com/free-photo/indian-hindu-goddess-durga-statue-generative-ai_169016-29328.jpg' }}
          style={styles.banner}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Fund</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Chat Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Call Now</Text>
          </TouchableOpacity>
        </View>

        {/* Starline */}
        <TouchableOpacity style={styles.starline}>
          <Text style={styles.starlineText}>Starline</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#fff" />
        </TouchableOpacity>

        {/* Game Cards */}
        {games.map((item, index) => (
          <View key={index} style={styles.cardWrapper}>
            {/* Side Bar (Symbol) */}
            <View style={styles.cardSymbol}>
              <MaterialIcons name="bar-chart" size={24} color="#FFD700" />
            </View>

            {/* Main Card Content */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardNumbers}>{item.numbers}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardTime}>Open: {item.open} | Close: {item.close}</Text>
                <View style={styles.closedBadge}>
                  <MaterialIcons name="close" size={16} color="#fff" />
                  <Text style={styles.closedText}>CLOSED</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#383838',
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  headerButtonText: {
    color: '#FFD700',
    marginLeft: 4,
    fontSize: 12,
  },
  subHeader: {
    textAlign: 'center',
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 12,
  },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#444',
    paddingVertical: 14,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 14,
  },
  starline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6A1B9A',
    padding: 12,
    borderRadius: 10,
    marginVertical: 14,
  },
  starlineText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardWrapper: {
    flexDirection: 'row',
    backgroundColor: '#383838',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  cardSymbol: {
    width: 50,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    padding: 15,
  },
  cardTitle: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  cardNumbers: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 10,
    letterSpacing: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTime: {
    color: '#ccc',
    fontSize: 13,
  },
  closedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D32F2F',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 12,
  },
  closedText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
});
