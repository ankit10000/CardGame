// Screens/MyBidsScreen.jsx

import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList, // Keep FlatList for potential future data display
    TouchableOpacity,
    ActivityIndicator, // To show loading state
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

// No interface needed in JSX

const MyBidsScreen = ({ navigation }) => {
    const [bids, setBids] = useState([]); // Start with an empty array
    const [isLoading, setIsLoading] = useState(true); // State to manage loading indicator

    // --- Simulate fetching data ---
    useEffect(() => {
        // Replace this with your actual API call to fetch bid history
        const fetchBids = async () => {
            setIsLoading(true);
            try {
                // Example: const response = await api.get('/user/bid-history');
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Set state based on response
                // For this example, we assume the API returns an empty array
                const fetchedBids = []; // Replace with actual data: response.data;
                setBids(fetchedBids);

            } catch (error) {
                console.error("Failed to fetch bid history:", error);
                // Handle error state if needed
            } finally {
                setIsLoading(false); // Stop loading indicator
            }
        };

        fetchBids();
    }, []); // Empty dependency array means this runs once on mount

    // --- Render Item (Placeholder for when data exists) ---
    const renderBidItem = ({ item }) => { // Removed type annotation for item
        // This part will be used if bids array is not empty
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

    // --- Render Content based on loading and data ---
    const renderContent = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#6A0DAD" style={styles.loader} />;
        }

        if (bids.length === 0) {
            return <Text style={styles.emptyText}>Record Not Found!</Text>;
        }

        // If data exists, render the list (kept for completeness)
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
        backgroundColor: '#F0F2F5', // Light grey background consistent with image
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#934b47', // Header color from previous examples
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
        flex: 1, // Take remaining space
        padding: 15, // Add padding around the content
        justifyContent: 'flex-start', // Align content to the top
        alignItems: 'flex-start', // Align content to the left
    },
    loader: {
        marginTop: 50,
        alignSelf: 'center', // Center loader horizontally
    },
    emptyText: {
        fontSize: 16,
        color: '#555', // Dark grey color for the text
        fontWeight: '500',
        marginTop: 10, // Add some margin from the top
    },
    // Styles for the list and items (if data existed)
    listContainer: {
        // Padding already handled by contentArea
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

export default MyBidsScreen; // Make sure to export