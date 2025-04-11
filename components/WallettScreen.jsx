import { StyleSheet, Text, View, Alert } from 'react-native';
import {  useState,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletScreen = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchWallet = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Token Error', 'Token not found');
                setLoading(false);
                return;
            }

            console.log('Token:', token);

            const response = await fetch('http://192.168.1.12:3000/api/wallet/get', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error response:', errorData);
                throw new Error(errorData.message || 'Failed to fetch wallet');
            }

            const data = await response.json();
            console.log('Wallet Data:', data);
            setBalance(data.balance);
        } catch (error) {
            console.error('Error fetching wallet:', error);
            Alert.alert('Error', error.message);
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
                <Text style={styles.walletText}>
                    {loading ? 'Loading...' : `₹ ${balance}`}
                </Text>
            </View>
        </View>
    );
};

export default WalletScreen;

const styles = StyleSheet.create({
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
