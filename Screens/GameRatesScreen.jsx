import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';


const gameRatesData = [
    { id: '1', name: 'Single Digit', rate: '10 KA 95' },
    { id: '2', name: 'Jodi', rate: '10 KA 950' },
    { id: '3', name: 'Single Panna', rate: '10 KA 1500' },
    { id: '4', name: 'Double Panna', rate: '10 KA 2800' },
    { id: '5', name: 'Tripple Panna', rate: '10 KA 7000' },
    { id: '6', name: 'Half Sangam', rate: '10 KA 10000' },
    { id: '7', name: 'Full Sangam', rate: '10 KA 100000' },
    { id: '8', name: 'SP Motor', rate: '10 KA 1500' },
    { id: '9', name: 'DP Motor', rate: '10 KA 2800' },
    { id: '10', name: 'SP DP TP', rate: '10 KA 950' },
];



const GameRatesScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Game Rates</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.contentBox}>
                    <Text style={styles.title}>Main Game Win Ratio For All Bids</Text>
                    {gameRatesData.map((item) => (
                        <View key={item.id} style={styles.rateItem}>
                            <Text style={styles.rateName}>{item.name}:</Text>
                            <Text style={styles.rateValue}>{item.rate}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

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
    headerButton: { /* ... same as AccountStatementScreen ... */
        padding: 5,
        minWidth: 40,
        alignItems: 'center',
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
    scrollContainer: {
        padding: 15,
    },
    contentBox: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    rateItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    rateName: {
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
    },
    rateValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    }
});

export default GameRatesScreen;