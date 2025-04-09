

import React, { useState, useEffect } from 'react';
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



const MyBidsScreen = ({ navigation }) => {
    const [bids, setBids] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        const fetchBids = async () => {
            setIsLoading(true);
            try {


                await new Promise(resolve => setTimeout(resolve, 1500));



                const fetchedBids = [];
                setBids(fetchedBids);

            } catch (error) {
                console.error("Failed to fetch bid history:", error);

            } finally {
                setIsLoading(false);
            }
        };

        fetchBids();
    }, []);


    const renderBidItem = ({ item }) => {

        return (
            <View style={styles.itemContainer}>
                {/* Example structure for a bid item */}
                {/* <Text>Game: {item.gameName}</Text>
                <Text>Bid: {item.bidNumber}</Text>
                <Text>Points: {item.points}</Text>
                <Text>Date: {item.bidDate}</Text>
                <Text>Status: {item.status}</Text> */}
                <Text>Bid ID: {item.id}</Text>
            </View>
        );
    };


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
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
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
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
    headerButton: {
        padding: 5,
        minWidth: 40,
        alignItems: 'center',
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