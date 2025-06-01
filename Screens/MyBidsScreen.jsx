import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import { useFocusEffect } from '@react-navigation/native';
import apiService from '../services/apiService';

const statusColors = {
    Pending: '#FFA500',
    Rejected: '#FF0000',
    Success: '#28A745',
};

const MyBidsScreen = ({ navigation }) => {
    const [bids, setBids] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBids = async () => {
        setIsLoading(true);
        try {
            const response = await apiService.get('/starline/bet/all-bets');
            const formattedBids = response.data.data || [];
            setBids(formattedBids);
        } catch (error) {
            console.error("Failed to fetch bid history:", error);
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
                <Text style={styles.label}>Game Name:</Text>
                <Text style={styles.value}>{item.game?.name || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Game Type:</Text>
                <Text style={styles.value}>{item.gameType}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Bet Type:</Text>
                <Text style={styles.value}>{item.betType}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Bet Info:</Text>
                <Text style={styles.value}>{item.betInfo}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Amount:</Text>
                <Text style={styles.value}>{item.amount || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Winning Amount:</Text>
                <Text style={styles.value}>{item.winningAmount || '0'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Status:</Text>
                <Text style={[styles.value, { color: statusColors[item.status] || '#000' }]}>
                    {item.status || 'Pending'}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>
                    {item.date
                        ? new Date(item.date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })
                        : 'N/A'}
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
                <Text style={styles.headerTitle}>My Bids</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            {/* Content */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#4D2D7A" style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    data={bids}
                    renderItem={renderStatementItem}
                    keyExtractor={(item, index) => item._id || index.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={<Text style={styles.emptyText}>No bids found.</Text>}
                    onRefresh={fetchBids}
                    refreshing={isLoading}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            )}
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
        flex: 1,
        paddingLeft: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },
});

export default MyBidsScreen;
