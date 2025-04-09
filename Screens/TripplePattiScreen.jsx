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
    Dimensions,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');
const PADDING = 15;
const INPUT_ITEM_WIDTH = (width - PADDING * 5) / 4;


const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day} / ${month} / ${year}`;
};


const TripplePattiScreen = ({ navigation }) => {
    const [selectedPoints, setSelectedPoints] = useState(null);
    const [selectedMarket, setSelectedMarket] = useState('OPEN');
    const [digitInputs, setDigitInputs] = useState({});


    const [date, setDate] = useState(new Date(2025, 3, 7));
    const [showDatePicker, setShowDatePicker] = useState(false);


    const pointOptions = [10, 20, 50, 100, 200, 500, 1000];


    const digitGroups = [
        {
            title: 'Select All Digits',
            digits: ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999'],
        },
    ];




    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);

        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };


    const handlePointSelect = (points) => {
        setSelectedPoints(points);
    };

    const handleInputChange = (digit, value) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setDigitInputs(prev => ({ ...prev, [digit]: numericValue }));
    };

    const resetBid = () => {
        setSelectedPoints(null);
        setDigitInputs({});
        setDate(new Date(2025, 3, 7));

    };

    const submitBid = () => {
        console.log("Submitting Bid:");
        console.log("Date:", formatDate(date));
        console.log("Market:", selectedMarket);
        console.log("Selected Points:", selectedPoints);
        console.log("Digit Inputs:", digitInputs);

        alert("Bid Submitted (check console)");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tripple Patti</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                {/* Date Picker Trigger */}
                <TouchableOpacity onPress={showDatepicker} style={styles.datePickerContainer}>
                    <Text style={styles.dateText}>{formatDate(date)}</Text>

                    {/* Optional: Add a calendar icon here */}
                    <Icon name="calendar-today" size={20} color="#555" />
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                {showDatePicker && Platform.OS === 'ios' && (
                    <View style={styles.iosPickerDoneButtonContainer}>
                        <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.iosPickerDoneButton}>
                            <Text style={styles.iosPickerDoneText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                )}

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
        backgroundColor: '#934b47',
        paddingVertical: 12,
        paddingHorizontal: PADDING,
    },
    headerButton: {
        padding: 5,
        minWidth: 40,
        alignItems: 'center',
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
        backgroundColor: '#934b47',
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
        width: INPUT_ITEM_WIDTH,
        marginBottom: PADDING,
        marginHorizontal: PADDING / 2,
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