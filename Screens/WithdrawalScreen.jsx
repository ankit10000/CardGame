import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';


const { width } = Dimensions.get('window');
const cardPadding = 20;
const buttonMargin = 5;
const buttonWidth = (width - 2 * cardPadding - 6 * buttonMargin) / 3;

const formatCurrency = (value) => {
  return `₹${value.toLocaleString('en-IN')}`;
};

const WithdrawalScreen = ({ navigation }) => {
  const [phonepeId, setPhonepeId] = useState('');
  const [amount, setAmount] = useState('');

  const quickAmounts = [1000, 2000, 5000, 10000, 50000, 100000];

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount.toString());
  };

  const handleSubmit = () => {
    console.log('Submitting withdrawal:');
    console.log('PhonePe ID:', phonepeId);
    console.log('Amount:', amount);
    alert(`Withdrawal Requested:\nAmount: ${formatCurrency(Number(amount))}\nTo: ${phonepeId}`);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#313332" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="arrow-back" size={26} color={"#ffffff"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Withdrawal</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
          <WallettScreen />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/slide1.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.logoTextContainer}>
              <Text style={styles.logoTextGama}>Milaan matka</Text>
              <Text style={styles.logoText567}>777</Text>
            </View>
          </View>

          <Text style={styles.infoText}>
            For Add Funds Related Query Call Or Whatsapp
          </Text>
          <Text style={styles.phoneText}>+918112260478</Text>

          <View style={styles.separator} />

          <Text style={styles.paymentInfoText}>
            Your Payment 100% Secured & Automatic Super Fast Service Available.... Minimum Withdrawal 1000/- Maximum 100000/-
          </Text>
          <Text style={styles.noteText}>Note : Sunday Are Withdrawal Off</Text>
          <Text style={styles.timeNoteText}>
            Note: Withdrawal Time is 07:00 to 11:00
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Phonepe"
            placeholderTextColor="#888"
            value={phonepeId}
            onChangeText={setPhonepeId}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="enter amount"
            placeholderTextColor="#888"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <View style={styles.amountButtonsContainer}>
            {quickAmounts.map((amt) => (
              <TouchableOpacity
                key={amt}
                style={styles.amountButton}
                onPress={() => handleAmountSelect(amt)}
              >
                <Text style={styles.amountButtonText}>{formatCurrency(amt)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#934b47",
    paddingHorizontal: 10,
    paddingVertical: 12,
    height: 60,
  },
  
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  walletText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  scrollContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: cardPadding,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 70,
    marginBottom: 5,
  },
  logoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTextGama: {
    backgroundColor: '#e53935',
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 16,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  logoText567: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#e53935',
    marginBottom: 5,
  },
  phoneText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  paymentInfoText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    lineHeight: 20,
  },
  noteText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeNoteText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#555',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  amountButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountButton: {
    width: buttonWidth,
    backgroundColor: '#934b47',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  amountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#1d5da8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WithdrawalScreen;