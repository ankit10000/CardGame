// src/screens/WinHistoryGali.js
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
    ActivityIndicator
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WallettScreen from '../components/WallettScreen';
import axios from 'axios';

// Helper to format date as YYYY-MM-DD
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};

const WinHistoryGali = ({ navigation }) => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [noDataFound, setNoDataFound] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userWinners, setUserWinners] = useState([]);

    const onChangeFromDate = (event, selectedDate) => {
        const currentDate = selectedDate || fromDate;
        setShowFromPicker(Platform.OS === 'ios');
        setFromDate(currentDate);
        if (Platform.OS !== 'ios') {
            setShowFromPicker(false);
        }
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

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const response1 = await axios.get('https://mtka-api.vercel.app/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const userId = response1.data._id;
            if (!token) {
                console.log('No token found');
                setLoading(false);
                return;
            }


            const response = await axios.get('https://mtka-api.vercel.app/api/galidesawar/all-winners', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const allWinners = response.data.winners || [];
            const filteredWinners = allWinners.filter(winner => winner.userId === userId);
            if (filteredWinners.length > 0) {
                setUserWinners(filteredWinners);
                setNoDataFound(false);
            } else {
                setUserWinners([]);
                setNoDataFound(true);
            }

        } catch (error) {
            console.error('Error fetching winners:', error);
            setNoDataFound(true);
        } finally {
            setLoading(false);
        }
    };

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
                <TouchableOpacity style={styles.headerButton} onPress={handleBackPress}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Win History</Text>
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
                            display="default"
                            onChange={onChangeFromDate}
                            maximumDate={new Date()}
                        />
                    )}

                    {showToPicker && (
                        <DateTimePicker
                            testID="toDateTimePicker"
                            value={toDate}
                            mode="date"
                            display="default"
                            onChange={onChangeToDate}
                            minimumDate={fromDate}
                            maximumDate={new Date()}
                        />
                    )}

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>SUBMIT</Text>
                    </TouchableOpacity>

                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : noDataFound ? (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>No Data Found</Text>
                        </View>
                    ) : (
                        <View style={styles.dataContainer}>
                            {userWinners.map((item, index) => (
                                <View key={index} style={styles.card}>
                                    <Text style={styles.cardText}>Game Name: {item.gameName}</Text>
                                    <Text style={styles.cardText}>Number: {item.number}</Text>
                                    <Text style={styles.cardText}>Bet Type: {item.betType}</Text>
                                    <Text style={styles.cardText}>Amount: ₹{item.amount}</Text>
                                    <Text style={styles.cardText}>Winning: ₹{item.winningAmount}</Text>
                                    <Text style={styles.cardText}>Result :- {`\n`} Left : {item.result.left}{`\n`} Right : {item.result.right}{`\n`} Jodi : {item.result.jodi}</Text>
                                </View>
                            ))}
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
        minWidth: 140,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    dateText: {
        color: '#333',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#f0c14b',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 40,
        width: '80%',
        alignItems: 'center',
        elevation: 3,
    },
    submitButtonText: {
        color: '#111',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    noDataText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        opacity: 0.8
    },
    dataContainer: {
        width: '100%',
    },
    card: {
        backgroundColor: '#ffffffaa',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    cardText: {
        fontSize: 14,
        color: '#333',
    }
});

export default WinHistoryGali;
