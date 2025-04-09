import React, { useState, useCallback } from 'react';
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
import Icon1 from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

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
        pattis: ['129', '138', '147', '156', '237', '246', '250', '345', '390', '480', '570', '679']
    },
];

const pointsOptions = [10, 20, 50, 100, 200, 500, 1000];

const { width } = Dimensions.get('window');
const PADDING_HORIZONTAL = 20;
const ITEM_MARGIN_HORIZONTAL = 5;
const NUM_COLUMNS = 4;
const digitItemWidth = (width - PADDING_HORIZONTAL * 2 - ITEM_MARGIN_HORIZONTAL * (NUM_COLUMNS * 2)) / NUM_COLUMNS;


const SinglePattiScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date(2025, 3, 7));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
    };
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day} / ${month} / ${year}`;
    };
    const [pattiValues, setPattiValues] = useState({});

    const handlePattiInputChange = useCallback((pattiNumber, value) => {
        if (/^\d*$/.test(value)) {
            setPattiValues(prev => ({ ...prev, [pattiNumber]: value }));
        }
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Single Patti</Text> {/* Updated Title */}
                <TouchableOpacity style={styles.headerButton}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Date Display */}
                <TouchableOpacity onPress={showDatepicker} style={styles.datePickerContainer}>
                    <Text style={styles.dateText}>{formatDate(date)}</Text>
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
                                    <View key={pattiNumber} style={styles.digitInputContainer}>
                                        <Text style={styles.digitLabel}>{pattiNumber}</Text>
                                        <TextInput
                                            style={styles.digitInput}
                                            keyboardType="numeric"
                                            placeholder=""
                                            value={pattiValues[pattiNumber] || ''}
                                            onChangeText={(text) => handlePattiInputChange(pattiNumber, text)}
                                            maxLength={4} // Assuming max 4 digit points input
                                            textAlign="center"
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
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
    dropdownText: { /* ... */ },
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
    pointButton: { /* ... */ },
    pointButtonText: { /* ... */ },

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
    footerButton: { /* ... */ },
    resetButton: { /* ... */ },
    submitButton: { /* ... */ },
    footerButtonText: { /* ... */ },
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