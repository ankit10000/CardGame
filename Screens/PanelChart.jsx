import React, { useEffect, useState } from 'react';
import {
    StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import WallettScreen from '../components/WallettScreen';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const dateColWidth = screenWidth * 0.20;
const HEADER_BG_COLOR = '#e6f2ff';
const DATE_BG_COLOR = '#f8f9fa';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const COLORS = {
    headerBackground: '#4D2D7A',
    headerText: '#ffffff',
    background: '#f4f7f9',
    cardBackground: '#ffffff',
    inputBorder: '#e0e0e0',
    inputPlaceholder: '#999999',
    inputText: '#333333',
    minAmountText: '#444444',
    amountButtonBackground: '#f8f9fa',
    amountButtonBorder: '#e9ecef',
    amountButtonText: '#343a40',
    amountButtonSelectedBackground: '#ddeeff',
    amountButtonSelectedBorder: '#aaccff',
    payButtonBackground: '#1d5da8',
    payButtonText: '#ffffff',
    walletIcon: '#e5a550',
    walletTextBackground: '#d3d3d3',
    walletTextColor: '#333',
};

const PanelChart = ({route}) => {
    const { item } = route.params;

    const navigation = useNavigation();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.log('Error checking login status:', error);
            }
        };

        checkLoginStatus();
        fetchChartData();
    }, []);

    const fetchChartData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) return;
    
            // 1. Get all starline games
            const gameListResponse = await axios.get('http://192.168.1.3:3000/api/starline/game/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            const selectedGame = gameListResponse.data.data.find(g => g.gameName === item.gameName);
            if (!selectedGame) {
                console.warn('Selected game not found');
                return;
            }
            const response = await axios.get('http://192.168.1.3:3000/api/game-result/getAllResults');
            const allResults = response.data;
    
            // ✅ Filter data based on the selected game
            const filteredResults = allResults.filter(res => res.gameId === selectedGame._id);
    
            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth(); // 0-based
    
            const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
            const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
            const weeks = [];
    
            let current = new Date(firstDayOfMonth);
            current.setDate(current.getDate() - ((current.getDay() + 6) % 7)); // Start from Monday
    
            while (current <= lastDayOfMonth) {
                const weekStart = new Date(current);
                const weekEnd = new Date(current);
                weekEnd.setDate(weekEnd.getDate() + 6);
    
                const weekLabel = `${formatDate(weekStart)} to ${formatDate(weekEnd)}`;
                const weekObject = { date: weekLabel };
    
                for (let i = 0; i < 7; i++) {
                    const d = new Date(weekStart);
                    d.setDate(d.getDate() + i);
                    const dayKey = days[i].toLowerCase();
    
                    if (d < firstDayOfMonth || d > lastDayOfMonth) {
                        weekObject[dayKey] = null;
                        continue;
                    }
    
                    const matchingEntry = filteredResults.find(entry => {
                        const resultDate = new Date(entry.date);
                        return resultDate.toDateString() === d.toDateString();
                    });
    
                    if (matchingEntry) {
                        weekObject[dayKey] = {
                            p1: matchingEntry.openDigits[0]?.toString() || '*',
                            p2: matchingEntry.openDigits[1]?.toString() || '*',
                            p3: matchingEntry.openDigits[2]?.toString() || '*',
                            result: `${matchingEntry.openResult || '*'} ${matchingEntry.closeResult || '*'}`,
                            p4: matchingEntry.closeDigits[0]?.toString() || '*',
                            p5: matchingEntry.closeDigits[1]?.toString() || '*',
                            p6: matchingEntry.closeDigits[2]?.toString() || '*',
                        };
                    } else {
                        weekObject[dayKey] = {
                            p1: '*',
                            p2: '*',
                            p3: '*',
                            result: '*',
                            p4: '*',
                            p5: '*',
                            p6: '*',
                        };
                    }
                }
    
                weeks.push(weekObject);
                current.setDate(current.getDate() + 7);
            }
    
            setChartData(weeks);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };
    
    
    const formatDate = (date) => {
        const day = (`0${date.getDate()}`).slice(-2);
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
   

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={26} color={COLORS.headerText} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{item.name}</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1, padding: 16 }} horizontal>
                <ScrollView style={{ borderWidth: 1 }}>
                    <View style={styles.row}>
                        <View style={[styles.cell, styles.dateCell, { backgroundColor: HEADER_BG_COLOR }]}>
                            <Text style={styles.headerText}>Date</Text>
                        </View>
                        {days.map((day) => (
                            <View key={day} style={[styles.cell, { backgroundColor: HEADER_BG_COLOR }]}>
                                <Text style={styles.headerText}>{day}</Text>
                            </View>
                        ))}
                    </View>

                    {chartData.map((week, index) => (
                        <View key={index} style={styles.row}>
                            <View style={[styles.cell, styles.enhancedCell, styles.dateCell, { backgroundColor: DATE_BG_COLOR, borderWidth: 1 }]}>
                                <Text style={styles.dateText}>{week.date}</Text>
                            </View>

                            {days.map((dayKey) => {
                                const dayData = week[dayKey.toLowerCase()];

                                return (
                                    <View
                                        key={dayKey}
                                        style={[
                                            styles.cell,
                                            dayData ? styles.activeCell : styles.inactiveCell,
                                            styles.enhancedCell,
                                        ]}
                                    >
                                        {dayData ? (
                                            <View style={{ width: '80%', flexDirection: "row" }}>
                                            <View style={{ flexDirection: 'colmn', justifyContent: 'space-between', marginBottom: 2 }}>
                                                        <Text style={styles.cellText}>{dayData.p1 != "" ? dayData.p1 : "*"}</Text>
                                                        <Text style={styles.cellText}>{dayData.p2 != "" ? dayData.p2 : "*"}</Text>
                                                        <Text style={styles.cellText}>{dayData.p3 != "" ? dayData.p3 : "*"}</Text>
                                                    </View>

                                                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginHorizontal: 8 }}>
                                                        <Text style={styles.resultText}>{dayData.result != "" ? dayData.result : "*"}</Text>
                                                    </View>

                                                <View style={{ flexDirection: 'coslumn', justifyContent: 'space-between' }}>
                                                        <Text style={styles.cellText}>{dayData.p4 != "" ? dayData.p4 : "*"}</Text>
                                                        <Text style={styles.cellText}>{dayData.p5 != "" ? dayData.p5 : "*"}</Text>
                                                        <Text style={styles.cellText}>{dayData.p6 != "" ? dayData.p6 : "*"}</Text>
                                                    </View>
                                            </View>
                                        ) : (
                                            <Text style={styles.noDataText}>-</Text>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    // (same as your provided styles above)
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.headerBackground,
        paddingHorizontal: 10,
        paddingVertical: 12,
        height: 60,
    },
    headerTitle: {
        color: COLORS.headerText,
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: { flexDirection: 'row' },
    cell: {
        padding: 0,
        margin: 0,
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
        minHeight: 100,
    },
    dateCell: {
        width: dateColWidth,
        paddingHorizontal: 4,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    dateText: {
        fontWeight: '600',
        fontSize: 11,
        textAlign: 'center',
    },
    enhancedCell: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        transform: [{ scale: 1.05 }],
    },
    cellText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        marginVertical: 4,
    },
    resultText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        marginVertical: 1,
    },
    noDataText: {
        fontSize: 10,
        color: '#999',
    },
    activeCell: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#313332',
    },
    inactiveCell: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    
});

export default PanelChart;
