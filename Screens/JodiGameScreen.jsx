// src/screens/LeftDigitScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import apiService from '../services/apiService';
// Helper to format date like "Mon-21-April-2025"
const formatDateForDisplay = (date) => {
  const options = { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' };
  // Replace commas potentially added by toLocaleDateString and adjust format
  let formatted = date.toLocaleDateString('en-GB', options).replace(/,/g, '');
  // Example manual formatting if toLocaleDateString isn't exact:
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  formatted = `${days[date.getDay()]}-${('0' + date.getDate()).slice(-2)}-${months[date.getMonth()]}-${date.getFullYear()}`;
  return formatted;
};

const JodiGameScreen = ({ navigation, route }) => { // Assuming navigation prop
    const { items } = route.params;
  const [leftDigit, setLeftDigit] = useState('');
  const [amount, setAmount] = useState('');
  const currentDate = new Date(); // Or get relevant date from state/props

  const handleAddBid = async () => {
    try {
      const response = await apiService.post('/galidesawar/place-bet', {
        gameId: items.id,
        betType: 'jodi',
        number: leftDigit,
        amount: amount,
      });

      console.log('Response:', response.data);

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Bet placed successfully!');
        setLeftDigit('');
        setAmount('');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to place bet. Please try again.');
      }
    } catch (error) {
      console.error('Error placing bet:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to place bet. Please try again.');
    }
  };

  // Function to handle back navigation
  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log("Back button pressed - Navigation not available");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#313332" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Jodi</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
          <WallettScreen />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.dateDisplay}>
              <Text style={styles.dateText}>{formatDateForDisplay(currentDate)}</Text>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter Left Digit"
                placeholderTextColor="#999"
                value={leftDigit}
                onChangeText={setLeftDigit}
                keyboardType="number-pad" // Use number-pad for single digits
                maxLength={2} // Limit to single digit
              />

              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                placeholderTextColor="#999"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />

              <TouchableOpacity style={styles.submitButton} onPress={handleAddBid}>
                <Text style={styles.submitButtonText}>ADD BID</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4D2D7A',
    paddingHorizontal: 10,
    paddingVertical: 12,
    height: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Center content vertically
  },
  container: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background for the form
    borderRadius: 15,
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
  },
  dateDisplay: {
    backgroundColor: '#4a0e75', // Purple background for date
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20, // Pill shape
    marginBottom: 30, // Space below date
    alignSelf: 'center', // Center the date display
    elevation: 3,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    color: '#333',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20, // Space between inputs
    width: '100%', // Take full width within wrapper
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#f0c14b', // Yellow color
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 10, // Space above button
    width: '100%', // Take full width
    alignItems: 'center',
    elevation: 3,
  },
  submitButtonText: {
    color: '#111', // Dark text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JodiGameScreen;
