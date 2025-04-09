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
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const pointsOptions = [10, 20, 50, 100, 200, 500, 1000];
const digits = Array.from({ length: 10 }, (_, i) => i.toString());

const SingleAnkScreen = ({ navigation }) => {
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
                                    placeholder=""
                                    value={digitValues[digit] || ''}
                                    onChangeText={(text) => handleDigitChange(digit, text)}
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