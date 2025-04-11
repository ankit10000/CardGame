import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';


const historyOptions = [
    { id: '1', title: 'Bid History', targetScreen: 'BidHistoryDetail' },
    { id: '2', title: 'Starline Bid History', targetScreen: 'StarlineBidHistoryDetail' },
    { id: '3', title: 'Starline Result Bid History', targetScreen: 'StarlineResultHistoryDetail' },
    { id: '4', title: 'Fund History', targetScreen: 'FundHistoryDetail' },
];



const HistoryScreen = ({ navigation }) => {

    const handleNavigation = (targetScreen) => {
        if (targetScreen) {

            navigation.navigate(targetScreen);
            console.log(`Navigating to ${targetScreen}`);
        } else {
            console.log('No target screen defined');
        }
    };

    const renderHistoryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleNavigation(item.targetScreen)}
        >
            <Text style={styles.itemText}>{item.title}</Text>
            <Icon name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>History</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <FlatList
                data={historyOptions}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: { /* ... same as AccountStatementScreen ... */
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
    
    headerTitle: { /* ... same as AccountStatementScreen ... */
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerRightIconContainer: { /* ... same as AccountStatementScreen ... */
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        padding: 5,
    },
    badge: { /* ... same as AccountStatementScreen ... */
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
    badgeText: { /* ... same as AccountStatementScreen ... */
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 15,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});

export default HistoryScreen;