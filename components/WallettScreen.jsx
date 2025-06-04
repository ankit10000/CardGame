import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';
import apiService from '../services/apiService';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
const WalletScreen = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchWallet = async () => {
        try {
            setLoading(true);
            const response = await apiService.get('/api/wallet/get');
            console.log('Wallet Data:', response.data);
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching wallet:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchWallet();
        }, [])
    );

    return (
        <View >
            <View style={styles.walletContainer}>
                <Icon name="account-balance-wallet" size={20} color="#e5a550" />
                {/* <Text style={styles.walletText}>
                    {loading ? 'Loading...' : `${balance}`}
                </Text> */}
                {/* <FontAwesome name="rupee" size={18} color={'#4D2D7A'} style={styles.coinIcon} /> */}
                            <Text style={styles.coinText}>{loading ? 'Loading...' : `${balance}`}</Text>
            </View>
        </View>
    );
};

export default WalletScreen;

const styles = StyleSheet.create({
    coinIcon: {
    marginRight: 4,
    color: "#4D2D7A", // Icon color inside coin
  },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
        elevation: 3,
    },
    walletText: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 5,
    },
});
