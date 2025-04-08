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
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon library

// --- Placeholder Data ---
const statementData = [
    {
        id: '1',
        referenceId: '#3691127',
        amount: 1000,
        status: 'Pending',
        date: '06 Apr 2025 09:28',
    },
    {
        id: '2',
        referenceId: '#2517604',
        amount: 500,
        status: 'Rejected',
        date: '05 Apr 2025 02:57',
    },
    {
        id: '3',
        referenceId: '#1988432',
        amount: 2000,
        status: 'Success', // Added for variety
        date: '04 Apr 2025 11:15',
    },
];
// --- End Placeholder Data ---

// Define Status Colors
const statusColors = {
    Pending: '#FFA500', // Orange
    Rejected: '#FF0000', // Red
    Success: '#28A745', // Green
};


const AccountStatementScreen = ({ navigation }) => {

    const renderStatementItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.row}>
                <Text style={styles.label}>Reference ID:</Text>
                <Text style={styles.value}>{item.referenceId}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Transition Amount:</Text>
                <Text style={styles.value}>{item.amount}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Status:</Text>
                <Text style={[styles.value, { color: statusColors[item.status] || '#333' }]}>
                    {item.status}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{item.date}</Text>
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
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <FlatList
                data={statementData}
                renderItem={renderStatementItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No statements found.</Text>}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F2F5', // Light grey background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#934b47', // Same as other headers
        paddingVertical: 12,
        paddingHorizontal: 15,
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
        padding: 5, // Add padding for touch area
    },
    badge: {
        position: 'absolute',
        top: -2, // Adjust position
        right: -5, // Adjust position
        backgroundColor: '#FFA500', // Orange badge
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
    walletContainer: { 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
});

export default AccountStatementScreen;