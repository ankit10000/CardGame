import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const COLORS = {
    headerBackground: '#4D2D7A',
    headerText: '#ffffff',
    background: '#f4f7f9',
    cardBackground: '#ffffff',
    inputBorder: '#e0e0e0',
    inputPlaceholder: '#999999',
    inputText: '#333333',
    minAmountText: '#444444',
    amountButtonBackground: '#f8f9fa',
    amountButtonBorder: '#e9ecef',
    amountButtonText: '#343a40',
    amountButtonSelectedBackground: '#ddeeff',
    amountButtonSelectedBorder: '#aaccff',
    payButtonBackground: '#1d5da8',
    payButtonText: '#ffffff',
    walletIcon: '#e5a550',
    walletTextBackground: '#d3d3d3',
    walletTextColor: '#333',
};

const PREDEFINED_AMOUNTS = [500, 1000, 2000, 5000, 10000, 50000, 100000];
const MIN_AMOUNT = 500;

const AddFundsScreen = () => {
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(null);

    const handleAmountSelect = (value) => {
        setSelectedAmount(value);
        setAmount(String(value));
    };

    const handleTextInputChange = (text) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setAmount(numericValue);
        if (selectedAmount !== null && numericValue !== String(selectedAmount)) {
            setSelectedAmount(null);
        }
    };

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
    }, []);

    const handlePayNow = async () => {
        const numericAmount = parseInt(amount, 10);
        if (!numericAmount || isNaN(numericAmount)) {
            alert('Please enter a valid amount.');
            return;
        }
        if (numericAmount < MIN_AMOUNT) {
            alert(`Minimum amount required is ₹${MIN_AMOUNT}.`);
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("Session Expired", "Please login again.");
                navigation.navigate('Login');
                return;
            }

            const response = await axios.post(
                'http://192.168.1.7:3000/api/wallet/add',
                {
                    amount: numericAmount,
                    note: 'Initial top-up'
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                Alert.alert("Success", `₹${numericAmount} added to wallet successfully.`);
                setAmount('');
                setSelectedAmount(null);
            } else {
                Alert.alert("Failed", "Something went wrong. Try again.");
            }
        } catch (error) {
            console.log('Error during payment:', error.response?.data || error.message);
            Alert.alert("Error", error.response?.data?.message || "Failed to add funds.");
        }
    };

    const formatCurrency = (value) => {
        if (!value) return '';
        const numStr = String(value);
        const lastThree = numStr.substring(numStr.length - 3);
        const otherNumbers = numStr.substring(0, numStr.length - 3);
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        return otherNumbers ? formattedOtherNumbers + ',' + lastThree : lastThree;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={"#313332"} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={26} color={COLORS.headerText} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Funds</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flexContainer}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.card}>
                        <Text style={styles.fadedCardTitle}>Enter Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Amount"
                            placeholderTextColor={COLORS.inputPlaceholder}
                            value={amount}
                            onChangeText={handleTextInputChange}
                            keyboardType="numeric"
                        />

                        <Text style={styles.minAmountText}>
                            Enter minimum amount ₹{formatCurrency(MIN_AMOUNT)}
                        </Text>

                        <View style={styles.amountButtonsContainer}>
                            {PREDEFINED_AMOUNTS.map((value) => {
                                const isSelected = selectedAmount === value;
                                return (
                                    <TouchableOpacity
                                        key={value}
                                        style={[
                                            styles.amountButton,
                                            isSelected && styles.amountButtonSelected
                                        ]}
                                        onPress={() => handleAmountSelect(value)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={[
                                            styles.amountButtonText,
                                            isSelected && styles.amountButtonTextSelected
                                        ]}>
                                            ₹{formatCurrency(value)}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <TouchableOpacity
                            style={styles.payButton}
                            onPress={handlePayNow}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.payButtonText}>Pay Now!</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    flexContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.headerBackground,
        paddingHorizontal: 10,
        paddingVertical: 12,
        height: 60,
    },
    headerTitle: {
        color: COLORS.headerText,
        fontSize: 20,
        fontWeight: 'bold',
    },
  
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        paddingTop: 30,
    },
    card: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 15,
        padding: 20,
        width: '100%',
        maxWidth: 500,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    fadedCardTitle: {
        color: '#cccccc',
        fontSize: 14,
        marginBottom: -10,
        zIndex: 0,
    },
    input: {
        backgroundColor: COLORS.cardBackground,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 8,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: COLORS.inputText,
        textAlign: 'left',
        marginTop: 15,
        marginBottom: 15,
        zIndex: 1,
    },
    minAmountText: {
        fontSize: 14,
        color: COLORS.minAmountText,
        marginBottom: 25,
        fontWeight: '500',
    },
    amountButtonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    amountButton: {
        backgroundColor: COLORS.amountButtonBackground,
        borderWidth: 1,
        borderColor: COLORS.amountButtonBorder,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
        minWidth: (width - 40 - 40 - 30) / 3,
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    amountButtonSelected: {
        backgroundColor: COLORS.amountButtonSelectedBackground,
        borderColor: COLORS.amountButtonSelectedBorder,
    },
    amountButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.amountButtonText,
    },
    amountButtonTextSelected: {
        fontWeight: '700',
    },
    payButton: {
        backgroundColor: COLORS.payButtonBackground,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 40,
        width: '80%',
        alignItems: 'center',
        marginTop: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    payButtonText: {
        color: COLORS.payButtonText,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddFundsScreen;
