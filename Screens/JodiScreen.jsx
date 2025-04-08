import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Updated points options for Jodi screen
const pointsOptions = [5, 10, 20, 50, 100, 200, 500, 1000];

// Generate Jodi digits (00 to 99)
const jodiDigits = Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '0'));

const JodiScreen = ({ navigation }) => {
    // State to hold input values for each Jodi number
    const [jodiValues, setJodiValues] = useState({});

    const handleJodiInputChange = (jodiNumber, value) => {
        // Basic validation to allow only numbers
        if (/^\d*$/.test(value)) {
            setJodiValues(prev => ({ ...prev, [jodiNumber]: value }));
        }
    };
    const [selectedPoints, setSelectedPoints] = useState(null);
    const handlePointSelection = (points) => {
        setSelectedPoints(points);
    };

    const handleSubmit = () => {
        const filledDigits = Object.entries(jodiValues).filter(([key, value]) => value && parseInt(value) > 0);
        if (!selectedPoints) {
            alert('Please select points for betting.');
            return;
        }
        if (filledDigits.length === 0) {
            alert('Please enter at least one digit amount.');
            return;
        }
        console.log('Selected Points:', selectedPoints);
        console.log('Digits:', filledDigits);
        alert('BID submitted successfully!');
    };
    const handleReset = () => {
        setJodiValues({});
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Custom Header */}
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Jodi</Text>
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

                {/* Dropdown removed as it's not in the Jodi screen image */}

                {/* Select Points Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Points for Betting</Text>
                    <View style={styles.pointsContainer}>
                        {pointsOptions.map((points) => ( // Using updated pointsOptions
                            <TouchableOpacity
                                key={points}
                                style={[
                                    styles.pointButton,
                                    selectedPoints === points && { backgroundColor: '#934b47', borderColor: '#934b47' }
                                ]}
                                onPress={() => handlePointSelection(points)}
                            >
                                <Text style={[
                                    styles.pointButtonText,
                                    selectedPoints === points && { color: '#fff', fontWeight: 'bold' }
                                ]}>
                                    {points}
                                </Text>
                            </TouchableOpacity>

                        ))}
                    </View>
                </View>

                {/* Select Digits Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Digits</Text>
                    <Text style={styles.selectAllText}>Select All Digits</Text>
                    <View style={styles.digitsContainer}>
                        {jodiDigits.map((jodiNumber) => ( // Mapping over jodiDigits
                            <View key={jodiNumber} style={styles.digitInputContainer}>
                                <Text style={styles.digitLabel}>{jodiNumber}</Text> {/* Displaying 00, 01, etc. */}
                                <TextInput
                                    style={styles.digitInput}
                                    keyboardType="numeric"
                                    placeholder=""
                                    value={jodiValues[jodiNumber] || ''} // Using jodiNumber as key
                                    onChangeText={(text) => handleJodiInputChange(jodiNumber, text)} // Passing jodiNumber
                                    maxLength={4}
                                    textAlign="center"
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.footerButton, styles.resetButton]} onPress={handleReset}>
                    <Text style={styles.footerButtonText}>Reset BID</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, styles.submitButton]} onPress={handleSubmit}>
                    <Text style={styles.footerButtonText}>Submit BID</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f4f7',
    },
    // --- Header Styles (same as before) ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#934b47',
        paddingVertical: Platform.OS === 'ios' ? 15 : 12,
        paddingHorizontal: 15,
        height: 60,
    },
    headerButton: {
        padding: 5,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    badgeContainer: {
        position: 'absolute',
        top: -5,
        right: -8,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 1,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6a1b9a'
    },
    badgeText: {
        color: '#6a1b9a',
        fontSize: 10,
        fontWeight: 'bold',
    },
    // --- ScrollView Content ---
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100, // Increased padding to avoid footer overlap with more digits
    },
    // --- Date Container (same as before) ---
    dateContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 25, // Adjusted margin as dropdown is removed
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    // --- Sections (same as before) ---
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
    // --- Points Selection (same styles, different data) ---
    pointsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    pointButton: {
        backgroundColor: '#f8f9fa',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        minWidth: 70,
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 5,
    },
    pointButtonText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    // --- Digits Selection (same styles, different data) ---
    selectAllText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 15,
        marginLeft: 5,
    },
    digitsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    digitInputContainer: {
        width: '22%', // Keeps 4 columns
        marginBottom: 15,
        alignItems: 'center',
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
        borderColor: '#b0bec5',
        borderRadius: 8,
        paddingVertical: Platform.OS === 'ios' ? 12 : 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
        width: '100%',
        textAlign: 'center',
        height: 50, // Keep consistent height
    },
    // --- Footer Buttons (same as before) ---
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#f0f4f7',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    footerButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    resetButton: {
        backgroundColor: '#546e7a',
    },
    submitButton: {
        backgroundColor: '#1e88e5',
    },
    footerButtonText: {
        color: '#FFFFFF',
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

export default JodiScreen;