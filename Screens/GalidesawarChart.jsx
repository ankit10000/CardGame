import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import apiService from '../services/apiService';
import WallettScreen from '../components/WallettScreen'; 
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const isSmallScreen = screenWidth < 400;


const dateColWidth = screenWidth * (isSmallScreen ? 0.23 : 0.20);
const gameNameColWidth = screenWidth * (isSmallScreen ? 0.28 : 0.25); 
const timeColWidth = screenWidth * (isSmallScreen ? 0.17 : 0.15);
const resultColWidth = screenWidth * (isSmallScreen ? 0.10 : 0.12); 
const jodiColWidth = screenWidth * (isSmallScreen ? 0.12 : 0.10); 




const baseTotalWidth = dateColWidth + gameNameColWidth + timeColWidth + (resultColWidth * 2) + jodiColWidth;
const minTableWidth = baseTotalWidth + (isSmallScreen ? 10 : 20); 


const MODERN_COLORS = {
    primary: '#7E57C2', 
    primaryDark: '#5E35B1', 
    accent: '#FFCA28', 
    background: '#F0F2F5', 
    surface: '#FFFFFF', 
    textPrimary: '#263238', 
    textSecondary: '#546E7A', 
    textOnPrimary: '#FFFFFF', 
    borderColor: '#E0E0E0', 
    tableHeaderBackground: '#673AB7', 
    tableHeaderText: '#FFFFFF',
    resultText: '#C62828', 
    placeholderText: '#757575', 
    errorText: '#D32F2F', 
    
    walletIconColor: '#FFCA28', 
};
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
const GalidesawarChart = ({ navigation }) => {
    
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    navigation.navigate('Login');
                }
            } catch (err) {
                console.log('Error checking login status:', err);
                
            }
        };

        checkLoginStatus();
        fetchChartData();
    }, [navigation]); 

    const fetchChartData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.get('/api/galidesawar/all-results');

            if (response.data && Array.isArray(response.data.results)) {
                const sorted = response.data.results.sort(
                    (a, b) => new Date(b.declaredAt) - new Date(a.declaredAt)
                );
                setResults(sorted);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error('Error fetching chart data:', error);
            setError('Failed to load chart data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderRow = (item, idx) => (
        <View key={item._id || item.gameId || idx.toString()} style={styles.dataRow}>
            <View style={[styles.cell, styles.dateCell]}>
                <Text style={styles.dateText}>{new Date(item.declaredAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
            </View>
            <View style={[styles.cell, styles.gameNameCell]}>
                <Text style={styles.cellTextGameName} numberOfLines={2} ellipsizeMode="tail">{item.gameName}</Text>
            </View>
            <View style={[styles.cell, styles.timeCell]}>
                <Text style={styles.cellText}>{item.closeTime}</Text>
            </View>
            <View style={[styles.cell, styles.resultCell]}>
                <Text style={styles.resultText}>{item.result?.left || '-'}</Text>
            </View>
            <View style={[styles.cell, styles.resultCell]}>
                <Text style={styles.resultText}>{item.result?.right || '-'}</Text>
            </View>
            <View style={[styles.cell, styles.jodiCell]}>
                <Text style={styles.resultTextJodi}>{item.result?.jodi || '-'}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
             <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                <Icon name="arrow-back" size={26} color={COLORS.headerText} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Gali Desawar Chart</Text>
            <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                <WallettScreen />
            </TouchableOpacity>
        </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} horizontal>
                <View style={styles.tableWrapper}> 
                    <View style={[styles.tableContainer, { width: minTableWidth  }]}> 
                        
                        <View style={styles.tableHeaderRow}>
                            <View style={[styles.cell, styles.dateCell]}><Text style={styles.tableHeaderText}>Date</Text></View>
                            <View style={[styles.cell, styles.gameNameCell]}><Text style={styles.tableHeaderText}>Game Name</Text></View>
                            <View style={[styles.cell, styles.timeCell]}><Text style={styles.tableHeaderText}>Time</Text></View>
                            <View style={[styles.cell, styles.resultCell]}><Text style={styles.tableHeaderText}>Left</Text></View>
                            <View style={[styles.cell, styles.resultCell]}><Text style={styles.tableHeaderText}>Right</Text></View>
                            <View style={[styles.cell, styles.jodiCell]}><Text style={styles.tableHeaderText}>Jodi</Text></View>
                        </View>

                        
                        {loading ? (
                            <View style={styles.messageContainerCentered}>
                                <ActivityIndicator size="large" color={MODERN_COLORS.primary} />
                            </View>
                        ) : error ? (
                            <View style={styles.messageContainerCentered}>
                                <Icon name="error-outline" size={isSmallScreen ? 30 : 40} color={MODERN_COLORS.errorText} />
                                <Text style={styles.errorTextMsg}>{error}</Text>
                                <TouchableOpacity onPress={fetchChartData} style={styles.retryButton}>
                                    <Text style={styles.retryButtonText}>Try Again</Text>
                                </TouchableOpacity>
                            </View>
                        ) : results.length === 0 ? (
                            <View style={styles.messageContainerCentered}>
                                <Icon name="hourglass-empty" size={isSmallScreen ? 30 : 40} color={MODERN_COLORS.placeholderText} />
                                <Text style={styles.noDataText}>No results found.</Text>
                            </View>
                        ) : (
                            results.map(renderRow)
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MODERN_COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: MODERN_COLORS.primaryDark,
        paddingHorizontal: isSmallScreen ? 12 : 16,
        paddingVertical: isSmallScreen ? 10 : 12,
        height: isSmallScreen ? 56 : 60,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerTitle: {
        color: MODERN_COLORS.textOnPrimary,
        fontSize: isSmallScreen ? 17 : 20,
        fontWeight: '600',
    },
  
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingVertical: isSmallScreen ? 12 : 16,
        
    },
    tableWrapper: { 
        minWidth: minTableWidth,
        paddingHorizontal: isSmallScreen ? 8 : 3, 
    },
    tableContainer: {
        backgroundColor: MODERN_COLORS.surface,
        borderRadius: 10, 
        elevation: 3, 
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        overflow: 'hidden', 
    },
    tableHeaderRow: {
        flexDirection: 'row',
        backgroundColor: MODERN_COLORS.tableHeaderBackground,
        paddingVertical: isSmallScreen ? 12 : 14,
    },
    dataRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: MODERN_COLORS.borderColor,
        backgroundColor: MODERN_COLORS.surface, 
        alignItems: 'center', 
        paddingVertical: isSmallScreen ? 8 : 10,
    },
    cell: { 
        justifyContent: 'center',
        paddingHorizontal: isSmallScreen ? 4 : 6, 
    },
    
    dateCell: { width: dateColWidth, alignItems: 'flex-start', paddingLeft: isSmallScreen ? 10 : 12},
    gameNameCell: { width: gameNameColWidth, alignItems: 'flex-start', paddingLeft: isSmallScreen ? 6 : 8},
    timeCell: { width: timeColWidth, alignItems: 'center'},
    resultCell: { width: resultColWidth, alignItems: 'center'},
    jodiCell: { width: jodiColWidth, alignItems: 'center'},

    tableHeaderText: {
        color: MODERN_COLORS.tableHeaderText,
        fontSize: isSmallScreen ? 11 : 13,
        fontWeight: '700', 
        textAlign: 'center',
    },
    dateText: {
        fontSize: isSmallScreen ? 10 : 12,
        color: MODERN_COLORS.textSecondary,
        fontWeight: '500',
    },
    cellText: { 
        fontSize: isSmallScreen ? 11 : 13,
        color: MODERN_COLORS.textPrimary,
        fontWeight: '500',
        textAlign: 'center',
    },
    cellTextGameName: { 
        fontSize: isSmallScreen ? 11 : 13,
        color: MODERN_COLORS.textPrimary,
        fontWeight: '500',
        textAlign: 'left', 
    },
    resultText: { 
        fontSize: isSmallScreen ? 12 : 14,
        fontWeight: 'bold',
        color: MODERN_COLORS.resultText,
        textAlign: 'center',
    },
    resultTextJodi: { 
        fontSize: isSmallScreen ? 13 : 15, 
        fontWeight: 'bold',
        color: MODERN_COLORS.primaryDark, 
        textAlign: 'center',
    },
    messageContainerCentered: { 
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        minHeight: 200, 
        width: '100%', 
    },
    noDataText: {
        fontSize: isSmallScreen ? 14 : 16,
        color: MODERN_COLORS.placeholderText,
        marginTop: 8,
        textAlign: 'center',
    },
    errorTextMsg: {
        fontSize: isSmallScreen ? 14 : 16,
        color: MODERN_COLORS.errorText,
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: MODERN_COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        elevation: 2,
    },
    retryButtonText: {
        color: MODERN_COLORS.textOnPrimary,
        fontSize: isSmallScreen ? 13 : 15,
        fontWeight: '600',
    },
});

export default GalidesawarChart;
