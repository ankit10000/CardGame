import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert, // For update feedback
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentDetailsScreen = ({ navigation }) => {
    // --- State for input fields ---
    // Replace initial values with data fetched for the user
    const [paytm, setPaytm] = useState('');
    const [phonepe, setPhonepe] = useState('');
    const [googlePay, setGooglePay] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');

    const handleUpdate = () => {
        // --- Add logic to save the updated details via API ---
        console.log('Updating Payment Details:', {
            paytm, phonepe, googlePay, accountNumber, ifsc, bankName, accountHolderName
        });
        Alert.alert('Success', 'Payment details updated successfully!');
        // Potentially navigate back or show success message
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />

            {/* Header */}
            <View style={styles.header}>
                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Details</Text>
                 <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.formContainer}>
                        {/* UPI Details */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Paytm</Text>
                            <TextInput
                                style={styles.input}
                                value={paytm}
                                onChangeText={setPaytm}
                                placeholder="Enter Paytm UPI ID or Number"
                                placeholderTextColor="#ccc"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Phonepe</Text>
                            <TextInput
                                style={styles.input}
                                value={phonepe}
                                onChangeText={setPhonepe}
                                placeholder="Enter PhonePe UPI ID or Number"
                                placeholderTextColor="#ccc"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Google Pay</Text>
                            <TextInput
                                style={styles.input}
                                value={googlePay}
                                onChangeText={setGooglePay}
                                placeholder="Enter Google Pay UPI ID or Number"
                                placeholderTextColor="#ccc"
                            />
                        </View>

                        {/* Bank Account Details */}
                        <Text style={styles.sectionTitle}>Account Details</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Account Number</Text>
                            <TextInput
                                style={styles.input}
                                value={accountNumber}
                                onChangeText={setAccountNumber}
                                keyboardType="numeric"
                                placeholder="Enter Account Number"
                                placeholderTextColor="#ccc"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>IFSC Code</Text>
                            <TextInput
                                style={styles.input}
                                value={ifsc}
                                onChangeText={setIfsc}
                                autoCapitalize="characters" // Common for IFSC
                                placeholder="Enter IFSC Code"
                                placeholderTextColor="#ccc"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Bank Name</Text>
                            <TextInput
                                style={styles.input}
                                value={bankName}
                                onChangeText={setBankName}
                                placeholder="Enter Bank Name"
                                placeholderTextColor="#ccc"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Account Holder Name</Text>
                            <TextInput
                                style={styles.input}
                                value={accountHolderName}
                                onChangeText={setAccountHolderName}
                                placeholder="Enter Account Holder Name"
                                placeholderTextColor="#ccc"
                            />
                        </View>

                        {/* Update Button */}
                        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                            <Text style={styles.updateButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

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
        backgroundColor: '#934b47', // Same as other headers
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
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        padding: 15,
        paddingBottom: 30, // Extra padding at bottom
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 15,
        color: '#555',
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#fff', // Ensure input background is white
    },
    updateButton: {
        backgroundColor: '#0056b3', // Dark Blue
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PaymentDetailsScreen;