import React, { useState, useCallback, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    Platform,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import Icon1 from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const singlePattiData = [
    {
        digit: '0',
        pattis: ['127', '136', '145', '190', '235', '280', '370', '479', '460', '569', '389', '578']
    },
    {
        digit: '1',
        pattis: ['128', '137', '146', '236', '245', '290', '380', '470', '489', '560', '678', '579']
    },
    {
        digit: '2',
        pattis: ['129', '138', '147', '156', '237', '246', '345', '390', '480', '570', '679', '589']
    },
    {
        digit: '3',
        pattis: ['120', '139', '148', '157', '238', '247', '256', '346', '490', '580', '670', '689']
    },
    {
        digit: '4',
        pattis: ['130', '149', '158', '167', '239', '248', '257', '347', '356', '590', '680', '789']
    },
    {
        digit: '5',
        pattis: ['140', '159', '168', '230', '249', '258', '267', '348', '357', '456', '690', '780']
    },
    {
        digit: '6',
        pattis: ['123', '150', '169', '178', '240', '259', '268', '349', '358', '457', '367', '790']
    },
    {
        digit: '7',
        pattis: ['124', '160', '179', '250', '269', '278', '340', '359', '368', '458', '467', '890']
    },
    {
        digit: '8',
        pattis: ['125', '134', '170', '189', '260', '279', '350', '369', '378', '459', '567', '468']
    },
    {
        digit: '9',
        pattis: ['126', '135', '180', '234', '270', '289', '360', '379', '450', '469', '478', '568']
    },
];


const pointsOptions = [10, 20, 50, 100, 200, 500, 1000];

const { width } = Dimensions.get('window');
const PADDING_HORIZONTAL = 20;
const ITEM_MARGIN_HORIZONTAL = 5;
const NUM_COLUMNS = 4;
const digitItemWidth = (width - PADDING_HORIZONTAL * 2 - ITEM_MARGIN_HORIZONTAL * (NUM_COLUMNS * 2)) / NUM_COLUMNS;
const SinglePattiScreen = ({ navigation, route }) => {
    const { items } = route.params || {};
    const [dropdownValue, setDropdownValue] = useState('open');
    const [showDropdownOptions, setShowDropdownOptions] = useState(false);
    const dropdownOptions = ['open', 'close'];
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
    const handleReset = () => {
        setDigitValues({});
        setSelectedPoint(null);
    };
    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                alert("User not logged in!");
                navigation.navigate('Login');
                return;
            }

            // const gameDate = moment().format('YYYY-MM-DD');

            const selectedEntries = Object.entries(digitValues);
            if (selectedEntries.length === 0) {
                alert("No digits selected!");
                return;
            }

            for (const [panaNumber, amount] of selectedEntries) {
                const payload = {
                    panaNumber,
                    amount,
                    gameType: items.name,
                    gameDate: moment().format('YYYY-MM-DD'),
                    betType: dropdownValue
                };

                const response = await axios.post(
                    'http://192.168.1.10:3000/api/singlepana/add',
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                console.log('Response:', response.data);
            }

            alert("All bets submitted successfully!");
            setDigitValues({});
            setSelectedPoint(null);
        } catch (error) {
            console.log("Bet submission error:", error.response?.data || error.message);
            alert("Failed to place bet: " + (error.response?.data?.message || error.message));
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
    const currentDate = moment().format('DD / MM / YYYY');

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Single Patti</Text> {/* Updated Title */}
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Date Display */}
                <TouchableOpacity style={styles.datePickerContainer}>
                    <Text style={styles.dateText}>{currentDate}</Text>
                </TouchableOpacity>


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
                {/* Select Points Section */}
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

                {/* Select Digits (Patti) Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Digits</Text>

                    {/* Map through each digit group */}
                    {singlePattiData.map((group) => (
                        <View key={`group-${group.digit}`} style={styles.digitGroup}>
                            <Text style={styles.digitGroupTitle}>Select Digit {group.digit}</Text>
                            <View style={styles.pattiGridContainer}>
                                {/* Map through pattis within the group */}
                                {group.pattis.map((pattiNumber) => (
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
    dropdownContainer: {
        marginBottom: 20,
        position: 'relative',
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
        backgroundColor: '#934b47',
        paddingVertical: Platform.OS === 'ios' ? 15 : 12,
        paddingHorizontal: 15,
        height: 60,
    },
    headerButton: { /* ... */ },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    badgeContainer: { /* ... */ },
    badgeText: { /* ... */ },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: PADDING_HORIZONTAL, // Use constant
        paddingTop: 20,
        paddingBottom: 100, // Ensure space above footer
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
    dateText: { /* ... */ },
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
    // --- Points Selection --- (Same as before)
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

    digitGroup: {
        marginBottom: 20, // Space between digit groups
    },
    digitGroupTitle: {
        fontSize: 16,
        fontWeight: '600', // Slightly bolder
        color: '#444',
        marginBottom: 15,
        marginLeft: ITEM_MARGIN_HORIZONTAL, // Align with grid items
    },
    pattiGridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // Start items from left
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

    // --- Footer Buttons --- (Same as before)
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#f0f4f7',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
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

export default SinglePattiScreen;