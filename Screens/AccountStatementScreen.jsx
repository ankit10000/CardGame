import React, { useState, useCallback } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusColors = {
    debit: '#FFA500',
    Success: '#FF0000',
    credit: '#28A745',
};

const AccountStatementScreen = ({ navigation }) => {
    const [bids, setBids] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBids = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Token Error', 'Token not found');
                return;
            }

            const response = await fetch('http://192.168.1.7:3000/api/wallet/get', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch bids');
            }

            const data = await response.json();
            
            // Sort transactions by createdAt DESC (latest first)
            const sortedTransactions = data.transactions.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            setBids(sortedTransactions);

        } catch (error) {
            console.error("Failed to fetch bid history:", error);
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchBids();
        }, [])
    );

    const renderStatementItem = ({ item }) => (
        <View style={styles.itemContainer} key={item._id}>
            <View style={styles.row}>
                <Text style={styles.label}>Reference ID:</Text>
                <Text style={styles.value}>{item._id}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Transition Amount:</Text>
                <Text style={styles.value}>{item.amount}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Note:</Text>
                <Text style={styles.value}>{item.note}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Status:</Text>
                <Text style={[styles.value, { color: statusColors[item.type] || '#333' }]}>
                    {item.type}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Account Statement</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <FlatList
                data={bids}
                renderItem={renderStatementItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No statements found.</Text>}
                refreshing={isLoading}
                onRefresh={fetchBids}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F2F5',
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
    
    listContainer: {
        padding: 15,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 15,
        color: '#555',
        fontWeight: '500',
    },
    value: {
        fontSize: 15,
        color: '#333',
        fontWeight: '600',
        textAlign: 'right',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },
});

export default AccountStatementScreen;
