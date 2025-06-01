import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    Dimensions,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/Ionicons';
import apiService from '../services/apiService';

const { width } = Dimensions.get('window');
const PADDING = 15;
const PADDING_HORIZONTAL = 20;
const ITEM_MARGIN_HORIZONTAL = 5;
const NUM_COLUMNS = 4;
const digitItemWidth = (width - PADDING_HORIZONTAL * 2 - ITEM_MARGIN_HORIZONTAL * (NUM_COLUMNS * 2)) / NUM_COLUMNS;

const TripplePattiScreen = ({ navigation, route }) => {
    const { items,gamename } = route.params;
    const [dropdownValue, setDropdownValue] = useState('open');
    const [showDropdownOptions, setShowDropdownOptions] = useState(false);
    const dropdownOptions = ['open', 'close'];
    const [selectedPoints, setSelectedPoints] = useState(null);
    const [selectedMarket, setSelectedMarket] = useState('OPEN');
    const [digitInputs, setDigitInputs] = useState({});
    const currentDate = moment().format('DD / MM / YYYY');
    const [digitValues, setDigitValues] = useState({});
    const [selectedPoint, setSelectedPoint] = useState(null);



    const pointOptions = [10, 20, 50, 100, 200, 500, 1000];


    const digitGroups = [
        {
            title: 'Select All Digits',
            digits: ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999'],
        },
    ];





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

    const handleReset = () => {
        setDigitValues({});
        setSelectedPoint(null);
    };

    const submitBid = async () => {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            alert("You're not logged in. Please log in first.");
            navigation.navigate('Login');
            return;
        }

        if (!selectedPoint || Object.keys(digitValues).length === 0) {
            alert("Please select at least one digit and a point value.");
            return;
        }

        const gameType = items.name;
        const gameDate = moment().format("YYYY-MM-DD");
        const gameIds = items?._id;
        if (!gameIds) {
            alert('Game ID is missing. Please try again.');
            return;
        }
        try {
            const responses = await Promise.all(Object.entries(digitValues).map(async ([panaNumber, amount]) => {
                const payload = {
                    gameId: gameIds,
                    panaNumber: String(panaNumber),
                    amount: amount,
                    gameType: gamename,
                    betType: dropdownValue
                };

                const response = await apiService.post('/starline/bet/place', payload);
                return response.data;
            }));

            console.log("All bets placed:", responses);
            alert("Triple Pana bet placed successfully!");
            handleReset();
        } catch (error) {
            console.error("Failed to place bet:", error.response?.data || error.message);
            alert("Failed to place bet. Please try again.");
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
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tripple Patti</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                {/* Date Picker Trigger */}
                <TouchableOpacity style={styles.datePickerContainer}>
                    <Text style={styles.dateText}>{currentDate}</Text>

                    {/* Optional: Add a calendar icon here */}
                </TouchableOpacity>

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



                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Select Points for Betting</Text>
                    <View style={styles.pointsGrid}>
                        {pointOptions.map((points) => (
                            <TouchableOpacity
                                key={points}
                                style={[
                                    styles.pointButton,
                                    selectedPoint === points && { backgroundColor: 'green', borderColor: 'green' }
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


                <View style={[styles.sectionContainer, { marginBottom: 0 }]}>
                    <Text style={styles.sectionTitle}>Select Digits</Text>
                </View>


                {digitGroups.map((group, index) => (
                    <View key={index} style={styles.sectionContainer}>
                        <Text style={styles.subSectionTitle}>{group.title}</Text>
                        <View style={styles.digitsGrid}>
                            {group.digits.map((pattiNumber) => (
                                <TouchableOpacity
                                    key={pattiNumber}
                                    style={[
                                        styles.digitInputContainer,
                                        {
                                            borderColor: '#e0e0e0',
                                            borderRadius: 8,
                                            paddingVertical: 12,
                                        }
                                    ]}
                                    onPress={() => handleDigitPress(pattiNumber)}>
                                    <Text style={styles.digitLabel}>{pattiNumber}</Text>
                                    <TextInput
                                        style={[
                                            styles.digitInput,
                                            { color: digitValues[pattiNumber] ? '#000' : '#aaa' }
                                        ]}
                                        editable={false}
                                        value={digitValues[pattiNumber] ? String(digitValues[pattiNumber]) : ''}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

            </ScrollView>


            <View style={styles.bottomActions}>
                <TouchableOpacity style={[styles.actionButton, styles.resetButton]} onPress={handleReset}>
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
    dropdownContainer: {
        marginBottom: 20,
        position: 'relative',
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
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4D2D7A',
        paddingVertical: 12,
        paddingHorizontal: PADDING,
    },

    headerIconText: {
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
        paddingBottom: 100,
    },

    datePickerContainer: {
        marginHorizontal: PADDING,
        marginTop: PADDING,
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
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    iosPickerDoneButtonContainer: {
        alignItems: 'flex-end',
        paddingRight: PADDING,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iosPickerDoneButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    iosPickerDoneText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },

    dropdownContainer: {
        paddingHorizontal: PADDING,
        paddingVertical: PADDING,
    },
    pickerIcon: {
        fontSize: 16,
        color: '#555',
        paddingRight: 10,
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
        textAlign: 'center',
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
        justifyContent: 'space-between',
        marginHorizontal: -2,
    },
    pointButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        minWidth: width / 4.8,
        marginHorizontal: 2,
    },
    pointButtonSelected: {
        backgroundColor: '#4D2D7A',
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
        marginHorizontal: -PADDING / 2,
    },
    digitInputContainer: {
        width: digitItemWidth, // Calculated width for 4 columns
        marginHorizontal: ITEM_MARGIN_HORIZONTAL, // Horizontal space between items
        marginBottom: 15, // Vertical space between rows
        alignItems: 'center',
    },
    digitLabel: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        fontWeight: '500',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
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
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    actionButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButton: {
        backgroundColor: '#343A40',
        marginRight: PADDING / 2,
    },
    submitButton: {
        backgroundColor: '#0056b3',
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


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff',
    },
    iconContainer: {
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    placeholder: {
        color: '#888',
    },
});

export default TripplePattiScreen;
