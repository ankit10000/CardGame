import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar, // Import StatusBar
    Platform // To handle platform specific styles if needed
} from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons'; // Example using Ionicons
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the cart/box icon

const pointsOptions = [10, 20, 50, 100, 200, 500, 1000];
const digits = Array.from({ length: 10 }, (_, i) => i.toString()); // ['0', '1', ..., '9']

const SingleAnkScreen = ({ navigation }) => {
    const [digitValues, setDigitValues] = useState({});

    const handleDigitChange = (digit, value) => {
        if (/^\d*$/.test(value)) {
            setDigitValues(prev => ({ ...prev, [digit]: value }));
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Custom Header */}
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Single Ank</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Date Display */}
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>07 / 04 / 2025</Text>
                </View>

                {/* Dropdown Mock */}
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>OPEN</Text>
                    <Icon1 name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>

                {/* Select Points Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Points for Betting</Text>
                    <View style={styles.pointsContainer}>
                        {pointsOptions.map((points) => (
                            <TouchableOpacity key={points} style={styles.pointButton}>
                                <Text style={styles.pointButtonText}>{points}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Select Digits Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Digits</Text>
                    <Text style={styles.selectAllText}>Select All Digits</Text>
                    <View style={styles.digitsContainer}>
                        {digits.map((digit) => (
                            <View key={digit} style={styles.digitInputContainer}>
                                <Text style={styles.digitLabel}>{digit}</Text>
                                <TextInput
                                    style={styles.digitInput}
                                    keyboardType="numeric"
                                    placeholder="" // No placeholder needed as per image
                                    value={digitValues[digit] || ''}
                                    onChangeText={(text) => handleDigitChange(digit, text)}
                                    maxLength={4} // Assume a max length, adjust as needed
                                    textAlign="center"
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.footerButton, styles.resetButton]}>
                    <Text style={styles.footerButtonText}>Reset BID</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, styles.submitButton]}>
                    <Text style={styles.footerButtonText}>Submit BID</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f4f7', // Light background for the body
    },
    // --- Header Styles ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#934b47', // Purple color from image
        paddingVertical: Platform.OS === 'ios' ? 15 : 12, // Adjust padding for different OS
        paddingHorizontal: 15,
        height: 60, // Fixed header height
    },
    headerButton: {
        padding: 5, // Add padding for easier tapping
        position: 'relative', // Needed for badge positioning
        flexDirection: 'row', // Align icon and badge horizontally
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    badgeContainer: {
        position: 'absolute',
        top: -5, // Adjust position
        right: -8, // Adjust position
        backgroundColor: '#FFFFFF', // White background for badge
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 1,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6a1b9a' // Match header background
    },
    badgeText: {
        color: '#6a1b9a', // Match header background
        fontSize: 10,
        fontWeight: 'bold',
    },
    // --- ScrollView Content ---
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100, // Ensure content doesn't hide behind footer
    },
    // --- Date & Dropdown ---
    dateContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 25, // Increased margin bottom
        width: '50%', // Adjust width as needed or align differently
        alignSelf: 'flex-end', // Align to the right
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    // --- Sections ---
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    // --- Points Selection ---
    pointsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around', // Distribute items evenly
    },
    walletContainer: { 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
    pointButton: {
        backgroundColor: '#f8f9fa', // Very light gray background
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        minWidth: 70, // Ensure minimum width
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 5, // Add horizontal margin for spacing
    },
    pointButtonText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    // --- Digits Selection ---
    selectAllText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 15,
        marginLeft: 5, // Align slightly with the grid start
    },
    digitsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Adjust spacing between items
    },
    digitInputContainer: {
        width: '22%', // Adjust width to fit 4 items per row with spacing
        marginBottom: 15,
        alignItems: 'center', // Center label and input vertically within the container
    },
    digitLabel: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    digitInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#b0bec5', // Slightly darker border for inputs
        borderRadius: 8,
        paddingVertical: Platform.OS === 'ios' ? 12 : 8, // Adjust padding for input height
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
        width: '100%', // Take full width of its container
        textAlign: 'center', // Center text inside input
        height: 50, // Fixed height for inputs
    },
    // --- Footer Buttons ---
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#f0f4f7', // Match body background
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        position: 'absolute', // Fixed position at the bottom
        bottom: 0,
        left: 0,
        right: 0,
    },
    footerButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1, // Make buttons take equal space
        alignItems: 'center',
        marginHorizontal: 5, // Add spacing between buttons
    },
    resetButton: {
        backgroundColor: '#546e7a', // Dark bluish-gray
    },
    submitButton: {
        backgroundColor: '#1e88e5', // Blue color
    },
    footerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SingleAnkScreen;