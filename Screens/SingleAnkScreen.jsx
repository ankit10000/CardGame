import React, { useState, useEffect } from 'react';
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
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';



const SingleAnkScreen = ({ navigation, route }) => {
    const { items } = route.params || {};

    const pointsOptions = [10, 20, 50, 100, 200, 500, 1000];
    const digits = Array.from({ length: 10 }, (_, i) => i.toString());

    const [digitValues, setDigitValues] = useState({});
    const [selectedPoint, setSelectedPoint] = useState(null);

    const handleDigitPress = (digit) => {
        if (selectedPoint !== null) {
            setDigitValues(prev => ({
                ...prev,
                [digit]: selectedPoint
            }));
        } else {
            alert('Please select points first!');
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    // Token hai to MainDrawer pe navigate kar do
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.log('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);
    const [dropdownValue, setDropdownValue] = useState('open');
    const [showDropdownOptions, setShowDropdownOptions] = useState(false);
    const dropdownOptions = ['open', 'close'];
    const submitBid = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            alert('You are not logged in');
            return;
        }

        const selectedDigits = Object.keys(digitValues);
        if (selectedDigits.length === 0) {
            alert('Please select at least one digit.');
            return;
        }

        try {
            const results = [];

            for (let digit of selectedDigits) {
                const payload = {
                    digit: Number(digit),
                    amount: digitValues[digit],
                    gameType: items?.name || '',
                    isOpenClosed: dropdownValue,
                    date: moment().format('YYYY-MM-DD'), // you can replace with actual selected date if needed
                    openingTime: dropdownValue === 'open' ? moment().toISOString() : null,
                    closingTime: dropdownValue === 'close' ? moment().toISOString() : null,
                };

                const response = await axios.post(
                    'http://192.168.1.2:3000/api/sigle/place',
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

            alert('Bids placed successfully!');
            console.log('Responses:', results);

            // Reset state
            setDigitValues({});
            setSelectedPoint(null);

        } catch (error) {
            console.error('Bid submission error:', error?.response?.data || error.message);
            alert(error?.response?.data?.message || 'Something went wrong!');
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


                <Text style={styles.headerTitle}>Single Ank</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Date Display */}
                <View style={styles.datePickerContainer}>
                <Text style={styles.dateText}>{currentDate}</Text>
                </View>

                {/* Dropdown Mock */}
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setShowDropdownOptions(!showDropdownOptions)}
                    >
                        <Text style={styles.dropdownText}>{dropdownValue}</Text>
                        <Icon1 name="chevron-down" size={20} color="#666" />
                    </TouchableOpacity>

                    {showDropdownOptions && (
                        <View style={styles.dropdownOptions}>
                            {dropdownOptions.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={styles.dropdownOption}
                                    onPress={() => {
                                        setDropdownValue(option);
                                        setShowDropdownOptions(false);
                                    }}
                                >
                                    <Text style={styles.dropdownOptionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Points for Betting</Text>
                    <View style={styles.pointsContainer}>
                        {pointsOptions.map((points) => (
                            <TouchableOpacity
                                key={points}
                                style={[
                                    styles.pointButton,
                                    selectedPoint === points && { backgroundColor: 'green', borderColor: 'green' } // Selected styling
                                ]}
                                onPress={() => setSelectedPoint(points)}
                            >
                                <Text style={[styles.pointButtonText, selectedPoint === points && { color: '#fff' }]}>
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
                        {digits.map((digit) => (
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
                <TouchableOpacity
                    style={[styles.footerButton, styles.resetButton]}
                    onPress={() => {
                        setDigitValues({});
                        setSelectedPoint(null);
                    }}
                >
                    <Text style={styles.footerButtonText}>Reset BID</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.footerButton, styles.submitButton]}
                    onPress={submitBid}
                >
                    <Text style={styles.footerButtonText}>Submit BID</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        marginBottom: 20,
        position: 'relative',
    },

   

    dropdownText: {
        color: '#333',
        fontSize: 16,
    },

    dropdownOptions: {
        position: 'absolute',
        top: 50,
        left: 185,
        right: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        zIndex: 10,
        width: '50%',
    },

    dropdownOption: {
        padding: 12,
    },

    dropdownOptionText: {
        fontSize: 16,
        color: '#333',
    },

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
        marginBottom: 25,
        width: '50%',
        alignSelf: 'flex-end',
    },
    dropdownText: {
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
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
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
});

export default SingleAnkScreen;