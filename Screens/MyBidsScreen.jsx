

import {  useState,useCallback } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const MyBidsScreen = ({ navigation }) => {
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
                    throw new Error(errorData.message || 'Failed to fetch bids');
                }
                const data = await response.json();
                console.log('Bids Data:', data);
                setBids(data.transactions);
                console.log(data.transactions);

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

    const renderBidItem = ({ item }) => {

        return (
            <View style={styles.itemContainer} key={item._id}>
                <Text>Points: {item.amount}</Text>
                <Text>Status: {item.type}</Text>
                <Text>Note: {item.note}</Text>
                <Text>
                    Date: {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
                {/* <Text>Bid ID: {item._id}</Text> */}
            </View>
        );  };


    const renderContent = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#6A0DAD" style={styles.loader} />;
        }

        if (bids.length === 0) {
            return <Text style={styles.emptyText}>Record Not Found!</Text>;
        }


        return (
            <FlatList
                data={bids}
                renderItem={renderBidItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bid History</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            {/* Content Area */}
            <View style={styles.contentArea}>
                {renderContent()}
            </View>

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
        backgroundColor: '#934b47',
        paddingHorizontal: 10,
        paddingVertical: 12,
        height: 60,
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
    
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerRightIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        padding: 5,
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -5,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    contentArea: {
        flex: 1,
        padding: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    loader: {
        marginTop: 50,
        alignSelf: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
        marginTop: 10,
    },

    listContainer: {

    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
});

export default MyBidsScreen; 