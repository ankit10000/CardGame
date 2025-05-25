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
import WallettScreen from '../components/WallettScreen';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const pointsOptions = [5, 10, 20, 50, 100, 200, 500, 1000];


const jodiDigits = Array.from({ length: 100 }, (_, i) => i.toString().padStart(2, '00'));

const JodiScreen = ({ navigation, route }) => {

    const { items, gamename } = route.params || {};


    const [selectedPoints, setSelectedPoints] = useState(null);


    const handleSubmit = async () => {
        const filledDigits = Object.entries(digitValues).filter(([key, value]) => value && parseInt(value) > 0);
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            alert('You are not logged in');
            return;
        }
        if (!selectedPoints) {
            alert('Please select points for betting.');
            return;
        }

        if (filledDigits.length === 0) {
            alert('Please enter at least one digit amount.');
            return;
        }

        try {
            const results = [];
            const gameIds = items?._id;
            if (!gameIds) {
                alert('Game ID is missing. Please try again.');
                return;
            }
            for (const [jodiNumber, amount] of filledDigits) {
                const payload = {
                    gameId: gameIds,
                    gameType: gamename,
                    betNumber: String(jodiNumber),
                    amount: Number(amount),
                    betType: 'close',
                };
                


                const response = await axios.post(
                    'http://192.168.1.3:3000/api/starline/bet/place',
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                results.push(response.data);
            }

            alert('All BIDs submitted successfully!');
            handleReset(); // Clear values on success

        } catch (error) {
            console.error('Error placing bid:', error.message);
            alert(`Error placing bid: ${error.message}`);
        }
    };

    const handleReset = () => {
        setDigitValues({});
        setSelectedPoints(null);
    };
    const [digitValues, setDigitValues] = useState({});
    const handleDigitPress = (digit) => {
        if (selectedPoints !== null) {
            setDigitValues(prev => ({
                ...prev,
                [digit]: selectedPoints
            }));
        } else {
            alert('Please select points first!');
        }
    };
    const currentDate = moment().format('DD / MM / YYYY');

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
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Date Display */}
                <TouchableOpacity style={styles.datePickerContainer}>
                    <Text style={styles.dateText}>{currentDate}</Text>
                </TouchableOpacity>



                {/* Dropdown removed as it's not in the Jodi screen image */}

                {/* Select Points Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Points for Betting</Text>
                    <View style={styles.pointsContainer}>
                        {pointsOptions.map((points) => (
                            <TouchableOpacity
                                key={points}
                                style={[
                                    styles.pointButton,
                                    selectedPoints === points && { backgroundColor: '#4D2D7A', borderColor: '#4D2D7A' }
                                ]}
                                onPress={() => setSelectedPoints(points)}
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

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Digits</Text>
                    <Text style={styles.selectAllText}>Select All Digits</Text>
                    <View style={styles.digitsContainer}>
                        {jodiDigits.map((digit) => (
                            <TouchableOpacity
                                key={digit}
                                style={[
                                    styles.digitInputContainer,
                                    {
                                        borderColor: '#e0e0e0',
                                        borderRadius: 8,
                                        paddingVertical: 12,
                                    }
                                ]}
                                onPress={() => handleDigitPress(digit)}
                            >
                                <Text style={styles.digitLabel}>{digit}</Text>
                                <TextInput
                                    style={[
                                        styles.digitInput,
                                        { color: digitValues[digit] ? '#000' : '#aaa' }
                                    ]}
                                    editable={false}
                                    value={digitValues[digit] ? String(digitValues[digit]) : ''}
                                />
                            </TouchableOpacity>
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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4D2D7A',
        paddingVertical: Platform.OS === 'ios' ? 15 : 12,
        paddingHorizontal: 15,
        height: 60,
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    datePickerContainer: {
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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

    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },

    dateContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 25,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },

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
        width: '22%',
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
        height: 50,
    },

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