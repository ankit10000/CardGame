import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    Dimensions, // To help with grid layout
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the cart/box icon


const { width } = Dimensions.get('window');
const PADDING = 15;
const INPUT_ITEM_WIDTH = (width - PADDING * 5) / 4; // Adjust based on desired padding and columns

const DoublePattiScreen = ({ navigation }) => {
    const [selectedPoints, setSelectedPoints] = useState(null);
    const [selectedMarket, setSelectedMarket] = useState('OPEN');
    const [digitInputs, setDigitInputs] = useState({}); // Store input values like { '550': '10', '668': '' }

    const pointOptions = [10, 20, 50, 100, 200, 500, 1000];

    const digitGroups = [
        {
            title: 'Select Digit 0',
            digits: ['550', '668', '244', '299', '226', '488', '677', '118', '334'],
        },
        {
            title: 'Select Digit 1',
            digits: ['100', '119', '155', '227', '335', '344', '399', '588', '669'],
        },
    ];

    const handlePointSelect = (points) => {
        setSelectedPoints(points);
    };

    const handleInputChange = (digit, value) => {
        // Allow only numbers
        const numericValue = value.replace(/[^0-9]/g, '');
        setDigitInputs(prev => ({ ...prev, [digit]: numericValue }));
    };

    const resetBid = () => {
        setSelectedPoints(null);
        setDigitInputs({});
        // Optionally reset dropdown if needed: setSelectedMarket('OPEN');
    };

    const submitBid = () => {
        console.log("Submitting Bid:");
        console.log("Market:", selectedMarket);
        console.log("Selected Points:", selectedPoints);
        console.log("Digit Inputs:", digitInputs);
        // Add actual submission logic here (e.g., API call)
        alert("Bid Submitted (check console)");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Double Patti</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>07 / 04 / 2025</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Select Points for Betting</Text>
                    <View style={styles.pointsGrid}>
                        {pointOptions.map((points) => (
                            <TouchableOpacity
                                key={points}
                                style={[
                                    styles.pointButton,
                                    selectedPoints === points && styles.pointButtonSelected,
                                ]}
                                onPress={() => handlePointSelect(points)}
                            >
                                <Text style={[
                                    styles.pointButtonText,
                                    selectedPoints === points && styles.pointButtonTextSelected
                                ]}>
                                    {points}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Digits Selection */}
                <View style={[styles.sectionContainer, { marginBottom: 0 }]}>
                    <Text style={styles.sectionTitle}>Select Digits</Text>
                </View>

                {digitGroups.map((group, index) => (
                    <View key={index} style={styles.sectionContainer}>
                        <Text style={styles.subSectionTitle}>{group.title}</Text>
                        <View style={styles.digitsGrid}>
                            {group.digits.map((digit) => (
                                <View key={digit} style={styles.digitInputContainer}>
                                    <Text style={styles.digitLabel}>{digit}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        keyboardType="numeric"
                                        value={digitInputs[digit] || ''}
                                        onChangeText={(value) => handleInputChange(digit, value)}
                                        placeholder="Points"
                                        placeholderTextColor="#ccc"
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

            </ScrollView>

            {/* Bottom Action Buttons */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={[styles.actionButton, styles.resetButton]} onPress={resetBid}>
                    <Text style={styles.actionButtonText}>Reset BID</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.submitButton]} onPress={submitBid}>
                    <Text style={styles.actionButtonText}>Submit BID</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#934b47', // Purple/Maroon color from image
        paddingVertical: 12,
        paddingHorizontal: PADDING,
    },
    headerButton: {
        padding: 5,
        minWidth: 40, // Ensure touchable area
        alignItems: 'center',
    },
    headerIconText: { // Simple text fallback for icon
        fontSize: 24,
        color: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerRightIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -8,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6A0DAD'
    },
    badgeText: {
        color: '#6A0DAD',
        fontSize: 10,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Ensure space for bottom buttons
    },
    dateContainer: {
        paddingHorizontal: PADDING,
        paddingVertical: PADDING,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dateText: {
        fontSize: 16,
        color: '#555',
    },
    dropdownContainer: {
        paddingHorizontal: PADDING,
        paddingVertical: PADDING,
        // borderWidth: 1, // uncomment to see container
        // borderColor: 'red',
    },
    pickerIcon: { // Simple text fallback for icon
        fontSize: 16,
        color: '#555',
        paddingRight: 10, // Add some padding if needed
        // alignSelf: 'center' // uncomment to see alignment
    },
    sectionContainer: {
        paddingHorizontal: PADDING,
        paddingTop: PADDING,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    subSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#444',
    },
    pointsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Distribute space between items
    },
    pointButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        paddingHorizontal: 10, // Adjust as needed
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        // Calculate width - adjust calculation based on number of columns and desired gap
        minWidth: width / 4.8, // Roughly 4 columns with some spacing
        marginHorizontal: 2, // Small gap between buttons
    },
    pointButtonSelected: {
        backgroundColor: '#934b47', // Use theme color for selection
    },
    pointButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    pointButtonTextSelected: {
        color: '#fff',
    },
    digitsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -PADDING / 2, // Counteract item padding for alignment
    },
    digitInputContainer: {
        width: INPUT_ITEM_WIDTH,
        marginBottom: PADDING,
        marginHorizontal: PADDING / 2, // Add horizontal spacing between items
        alignItems: 'center', // Center label and input vertically
    },
    digitLabel: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        fontWeight: '500',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        textAlign: 'center',
        width: '100%', // Take full width of container
        backgroundColor: '#fff',
    },
    bottomActions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: PADDING,
        backgroundColor: '#fff', // Or a slightly off-white color
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    actionButton: {
        flex: 1, // Make buttons take equal width
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButton: {
        backgroundColor: '#6c757d', // Greyish color
        marginRight: PADDING / 2,
    },
    submitButton: {
        backgroundColor: '#007bff', // Blue color
        marginLeft: PADDING / 2,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    walletContainer: { 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
});



export default DoublePattiScreen;