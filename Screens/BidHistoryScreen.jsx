// src/screens/BidHistoryScreen.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WallettScreen from '../components/WallettScreen';
import apiService from '../services/apiService';

const BidHistoryScreen = ({ navigation }) => {
    const [noDataFound, setNoDataFound] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userWinners, setUserWinners] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response1 = await apiService.get('/auth/profile');
                const userId = response1.data._id;
                
                const response = await apiService.get('/galidesawar/all-bets');

                const allWinners = response.data.allBets || [];
                const filteredWinners = allWinners.filter(winner => winner.userId === userId);
                console.log('Filtered Winners:', filteredWinners);
                setUserWinners(filteredWinners);
                setNoDataFound(filteredWinners.length === 0);
            } catch (error) {
                console.error('Error fetching winners:', error);
                setNoDataFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



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
                <Text style={styles.headerTitle}>Bid History</Text>
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
                                    <Text style={styles.cardText}>Status: ₹{item.status}</Text>
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

export default BidHistoryScreen;
