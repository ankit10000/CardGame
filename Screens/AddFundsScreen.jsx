import React, { useState } from 'react';
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
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Using MaterialIcons
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// --- Color Palette (approximated) ---
const COLORS = {
    headerBackground: '#934b47', // Maroon/brown from previous headers
    headerText: '#ffffff',
    background: '#f4f7f9', // Very light grey background
    cardBackground: '#ffffff',
    inputBorder: '#e0e0e0',
    inputPlaceholder: '#999999',
    inputText: '#333333',
    minAmountText: '#444444',
    amountButtonBackground: '#f8f9fa', // Very light grey/off-white
    amountButtonBorder: '#e9ecef',
    amountButtonText: '#343a40',
    amountButtonSelectedBackground: '#ddeeff', // Example selected color
    amountButtonSelectedBorder: '#aaccff',    // Example selected border
    payButtonBackground: '#1d5da8', // Blue color from button
    payButtonText: '#ffffff',
    walletIcon: '#e5a550', // Orange/brown color for wallet icon
    walletTextBackground: '#d3d3d3', // Light grey background for wallet text
    walletTextColor: '#333',
};

// --- Predefined Amounts ---
const PREDEFINED_AMOUNTS = [500, 1000, 2000, 5000, 10000, 50000, 100000];
const MIN_AMOUNT = 500;

const AddFundsScreen = () => {
    const navigation = useNavigation();
    const [amount, setAmount] = useState(''); // Store amount from TextInput
    const [selectedAmount, setSelectedAmount] = useState(null); // Store selected predefined amount

    const handleAmountSelect = (value) => {
        setSelectedAmount(value);
        setAmount(String(value)); // Update TextInput as well
    };

    const handleTextInputChange = (text) => {
        // Allow only numbers
        const numericValue = text.replace(/[^0-9]/g, '');
        setAmount(numericValue);
        // Deselect predefined amount if user types manually
        if (selectedAmount !== null && numericValue !== String(selectedAmount)) {
            setSelectedAmount(null);
        }
    };

    const handlePayNow = () => {
        const numericAmount = parseInt(amount, 10);
        if (!numericAmount || isNaN(numericAmount)) {
            alert('Please enter a valid amount.');
            return;
        }
        if (numericAmount < MIN_AMOUNT) {
            alert(`Minimum amount required is ₹${MIN_AMOUNT}.`);
            return;
        }
        console.log('Processing payment for:', numericAmount);
        // Add your payment gateway integration logic here
        alert(`Proceeding to pay ₹${numericAmount}`);
    };

    // Function to format amount with commas (Indian style)
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

            {/* --- Custom Header --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={26} color={COLORS.headerText} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Funds</Text>
                <TouchableOpacity style={styles.headerButton}>
                    {/* Wallet display - adjust value as needed */}
                    <View style={styles.walletContainer}>
                      <Icon name="account-balance-wallet" size={20} color={COLORS.walletIcon} />
                      <Text style={styles.walletText}>0</Text>
                    </View>
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
                    {/* --- Card Container --- */}
                    <View style={styles.card}>
                        <Text style={styles.fadedCardTitle}>Enter Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Amount"
                            placeholderTextColor={COLORS.inputPlaceholder}
                            value={amount}
                            onChangeText={handleTextInputChange}
                            keyboardType="numeric" // Use numeric keyboard
                        />

                        <Text style={styles.minAmountText}>
                            Enter minimum amount ₹{formatCurrency(MIN_AMOUNT)}
                        </Text>

                        {/* --- Predefined Amount Buttons --- */}
                        <View style={styles.amountButtonsContainer}>
                            {PREDEFINED_AMOUNTS.map((value) => {
                                const isSelected = selectedAmount === value;
                                return (
                                    <TouchableOpacity
                                        key={value}
                                        style={[
                                            styles.amountButton,
                                            isSelected && styles.amountButtonSelected // Apply selected style
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

                        {/* --- Pay Now Button --- */}
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
    headerButton: {
        padding: 5, // Add padding for easier touch
        minWidth: 40, // Ensure minimum touch area
        alignItems: 'center',
    },
    headerTitle: {
        color: COLORS.headerText,
        fontSize: 20,
        fontWeight: 'bold',
    },
    walletContainer: { // Reusing style from previous examples
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.headerText, // White background
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 15,
    },
    walletText: { // Reusing style
        color: COLORS.walletTextColor,
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 5,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center', // Center card horizontally
        paddingTop: 30, // Add space below header
    },
    card: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 15,
        padding: 20,
        width: '100%', // Card takes full width of padding
        maxWidth: 500, // Max width for larger screens
        alignItems: 'center',
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
     fadedCardTitle: { // The subtle title above the input
        color: '#cccccc', // Very light grey
        fontSize: 14,
        marginBottom: -10, // Position it closer/overlap input slightly
        zIndex: 0, // Ensure it's behind input if overlapping visually helps
     },
    input: {
        backgroundColor: COLORS.cardBackground, // White background
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 8,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: COLORS.inputText,
        textAlign: 'left', // Align text to left
        marginTop: 15, // Give space from the faded title
        marginBottom: 15,
        zIndex: 1, // Ensure input is visually on top
    },
    minAmountText: {
        fontSize: 14,
        color: COLORS.minAmountText,
        marginBottom: 25,
        fontWeight: '500',
    },
    amountButtonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow buttons to wrap to next line
        justifyContent: 'space-between', // Distribute space
        width: '100%',
        marginBottom: 20, // Space before Pay button
    },
    amountButton: {
        backgroundColor: COLORS.amountButtonBackground,
        borderWidth: 1,
        borderColor: COLORS.amountButtonBorder,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5, // Spacing between buttons
        // Calculate width dynamically or set fixed based on design
        minWidth: (width - 40 - 40 - 30) / 3, // Approx width for 3 buttons per row (padding - cardPadding - margins)
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
        // Optional: change text color when selected
        // color: '#0056b3',
    },
    payButton: {
        backgroundColor: COLORS.payButtonBackground,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 40,
        width: '80%', // Make button wider
        alignItems: 'center',
        marginTop: 15, // Space above pay button
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