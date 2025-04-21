// src/screens/BidHistoryScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
    ScrollView,
    SafeAreaView,
    StatusBar,
    ImageBackground,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
// Helper to format date as YYYY-MM-DD
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};

const BidHistoryScreen = ({ navigation }) => { // Assuming navigation prop is passed
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [noDataFound, setNoDataFound] = useState(true); // Initially true, set to false when data is fetched

    const onChangeFromDate = (event, selectedDate) => {
        const currentDate = selectedDate || fromDate;
        setShowFromPicker(Platform.OS === 'ios'); // Keep open on iOS until dismissal
        setFromDate(currentDate);
        if (Platform.OS !== 'ios') {
            setShowFromPicker(false); // Close automatically on Android
        }
        // Optional: If ToDate is before FromDate, update ToDate
        if (currentDate > toDate) {
            setToDate(currentDate);
        }
    };

    const onChangeToDate = (event, selectedDate) => {
        const currentDate = selectedDate || toDate;
        setShowToPicker(Platform.OS === 'ios');
        setToDate(currentDate);
        if (Platform.OS !== 'ios') {
            setShowToPicker(false);
        }
    };

    const handleSubmit = () => {
        console.log('Fetching data from:', formatDate(fromDate), 'to:', formatDate(toDate));
        // --- Add your data fetching logic here ---
        // Example: fetchBidHistory(formatDate(fromDate), formatDate(toDate))
        // Based on the result, update setNoDataFound(false) or keep it true
        setNoDataFound(true); // Keep true for demo purposes
    };

    // Function to handle back navigation
    const handleBackPress = () => {
        if (navigation) {
            navigation.goBack();
        } else {
            console.log("Back button pressed - Navigation not available");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
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
            <ImageBackground
                        source={require('../assets/bg.jpg')} 
                        style={styles.background}
                        resizeMode="cover"
                    >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.dateContainer}>
                    <View style={styles.datePickerWrapper}>
                        <Text style={styles.dateLabel}>From Date</Text>
                        <TouchableOpacity
                            onPress={() => setShowFromPicker(true)}
                            style={styles.dateDisplay}
                        >
                            <Text style={styles.dateText}>{formatDate(fromDate)}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.datePickerWrapper}>
                        <Text style={styles.dateLabel}>To Date</Text>
                        <TouchableOpacity
                            onPress={() => setShowToPicker(true)}
                            style={styles.dateDisplay}
                        >
                            <Text style={styles.dateText}>{formatDate(toDate)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {showFromPicker && (
                    <DateTimePicker
                        testID="fromDateTimePicker"
                        value={fromDate}
                        mode="date"
                        display="default" // Or "spinner"
                        onChange={onChangeFromDate}
                        maximumDate={new Date()} // Optional: prevent future dates
                    />
                )}

                {showToPicker && (
                    <DateTimePicker
                        testID="toDateTimePicker"
                        value={toDate}
                        mode="date"
                        display="default"
                        onChange={onChangeToDate}
                        minimumDate={fromDate} // Prevent ToDate being before FromDate
                        maximumDate={new Date()} // Optional
                    />
                )}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>SUBMIT</Text>
                </TouchableOpacity>

                {noDataFound && (
                    <View style={styles.noDataContainer}>
                        {/* <Image
                            source={require('../assets/images/sad_file.png')} // Adjust path
                            style={styles.noDataIcon}
                            resizeMode="contain"
                        /> */}
                        <Text style={styles.noDataText}>No Data Found</Text>
                    </View>
                )}


            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
    flex: 1,
  },
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4D2D7A',
        paddingHorizontal: 10,
        paddingVertical: 12,
        height: 60,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 30,
    },
    datePickerWrapper: {
        alignItems: 'center',
    },
    dateLabel: {
        color: '#FFF',
        fontSize: 14,
        marginBottom: 5,
    },
    dateDisplay: {
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        minWidth: 140, // Ensure minimum width
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    dateText: {
        color: '#333',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#f0c14b', // Yellow color
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 40, // Space before no data message
        width: '80%',
        alignItems: 'center',
        elevation: 3,
    },
    submitButtonText: {
        color: '#111', // Dark text for yellow button
        fontSize: 16,
        fontWeight: 'bold',
    },
    noDataContainer: {
        flex: 1, // Take remaining space
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        // backgroundColor:'rgba(0,0,0,0.1)' // for debugging layout
    },
    noDataIcon: {
        width: 100,
        height: 100,
        marginBottom: 20,
        opacity: 0.8
    },
    noDataIconPlaceholder: { // Use if image fails
        fontSize: 80,
        color: '#e74c3c',
        marginBottom: 15,
    },
    noDataText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        opacity: 0.8
    },
});

export default BidHistoryScreen;