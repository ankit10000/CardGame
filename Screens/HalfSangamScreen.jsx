import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    Platform,
    FlatList, // Use FlatList for the added items
    Alert,    // For basic validation feedback
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// Optional: Import an icon library
import Icon from 'react-native-vector-icons/MaterialIcons';
// import FeatherIcon from 'react-native-vector-icons/Feather';

// Helper function to format date
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = d.getFullYear();
    return `${day} / ${month} / ${year}`;
};


const HalfSangamScreen = ({ navigation }) => {
    // Date Picker State
    const [date, setDate] = useState(new Date(2025, 3, 7)); // April is month 3
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Input State
    const [openPanna, setOpenPanna] = useState('');
    const [closeDigit, setCloseDigit] = useState('');
    const [points, setPoints] = useState('');

    // List State
    const [addedItems, setAddedItems] = useState([]);

    // --- Date Picker Handler ---
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // --- Input Handlers ---
    const handleOpenPannaChange = (value) => {
        // Allow only 3 digits
        setOpenPanna(value.replace(/[^0-9]/g, '').slice(0, 3));
    };

    const handleCloseDigitChange = (value) => {
        // Allow only 1 digit
        setCloseDigit(value.replace(/[^0-9]/g, '').slice(0, 1));
    };

    const handlePointsChange = (value) => {
        // Allow only numbers
        setPoints(value.replace(/[^0-9]/g, ''));
    };

    // --- Add Item Handler ---
    const handleAddItem = () => {
        // Basic Validation
        if (!openPanna || openPanna.length !== 3) {
            Alert.alert('Invalid Input', 'Please enter a valid 3-digit Open Panna.');
            return;
        }
        if (!closeDigit || closeDigit.length !== 1) {
            Alert.alert('Invalid Input', 'Please enter a valid 1-digit Close Digit.');
            return;
        }
        if (!points || parseInt(points, 10) <= 0) {
            Alert.alert('Invalid Input', 'Please enter valid points (must be > 0).');
            return;
        }

        const newItem = {
            id: Date.now().toString(), // Simple unique ID for keyExtractor
            sangam: `${openPanna}-${closeDigit}`,
            points: points,
            gameType: 'Half Sangam',
        };

        setAddedItems(prevItems => [...prevItems, newItem]);

        // Clear input fields
        setOpenPanna('');
        setCloseDigit('');
        setPoints('');
    };

    // --- Submit Handler ---
    const handleSubmit = () => {
        if (addedItems.length === 0) {
            Alert.alert('No Bids', 'Please add at least one bid before submitting.');
            return;
        }
        console.log("Submitting Bids:");
        console.log("Date:", formatDate(date));
        console.log("Bids:", addedItems);
        // --- Add actual submission logic here (e.g., API call) ---

        Alert.alert("Bids Submitted", `Submitted ${addedItems.length} bids for ${formatDate(date)} (check console).`);
        // Optionally clear the list after submission
        // setAddedItems([]);
    };

    // --- Render Item for FlatList ---
    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={[styles.listItemText, styles.listColSangam]}>{item.sangam}</Text>
            <Text style={[styles.listItemText, styles.listColPoints]}>{item.points}</Text>
            <Text style={[styles.listItemText, styles.listColGameType]}>{item.gameType}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Half Sangam</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Use ScrollView only if needed, otherwise let FlatList handle scroll */}
            {/* Or wrap form elements in a View and list in FlatList */}
            <View style={styles.contentContainer}>
                {/* Date Picker Area */}
                <View style={styles.dateContainer}>
                    <View style={styles.dateDisplay}>
                        <Text style={styles.dateText}>{formatDate(date)}</Text>
                    </View>
                    <TouchableOpacity style={styles.changeButton} onPress={showDatepicker}>
                        <Text style={styles.changeButtonText}>Change</Text>
                    </TouchableOpacity>
                </View>

                {/* Date Picker Modal/Component */}
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                {showDatePicker && Platform.OS === 'ios' && (
                    <View style={styles.iosPickerDoneButtonContainer}>
                        <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.iosPickerDoneButton}>
                            <Text style={styles.iosPickerDoneText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Input Form */}
                <View style={styles.form}>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Open Panna</Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            value={openPanna}
                            onChangeText={handleOpenPannaChange}
                            maxLength={3} // Enforce max length visually
                            placeholder="Enter 3 digits"
                            placeholderTextColor="#ccc"
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Close Digit</Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            value={closeDigit}
                            onChangeText={handleCloseDigitChange}
                            maxLength={1} // Enforce max length visually
                            placeholder="Enter 1 digit"
                            placeholderTextColor="#ccc"
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Points</Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            value={points}
                            onChangeText={handlePointsChange}
                            placeholder="Enter points"
                            placeholderTextColor="#ccc"
                        />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>

                {/* Added Items List */}
                <View style={styles.listContainer}>
                    {/* List Header */}
                    <View style={styles.listHeader}>
                        <Text style={[styles.listHeaderText, styles.listColSangam]}>Sangam</Text>
                        <Text style={[styles.listHeaderText, styles.listColPoints]}>Points</Text>
                        <Text style={[styles.listHeaderText, styles.listColGameType]}>Game Type</Text>
                    </View>

                    {/* List Items */}
                    <FlatList
                        data={addedItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<Text style={styles.emptyListText}>No bids added yet.</Text>}
                    />
                </View>
            </View>

            {/* Bottom Submit Button */}
            <View style={styles.bottomSubmitContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Light background
    },
    // Header Styles (similar to previous)
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#934b47',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    headerButton: {
        padding: 5,
        minWidth: 40,
        alignItems: 'center',
    },
    headerIconText: {
        fontSize: 24,
        color: '#fff',
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
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -8,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6A0DAD'
    },
    badgeText: {
        color: '#6A0DAD',
        fontSize: 10,
        fontWeight: 'bold',
    },
    // --- Content Area ---
    contentContainer: {
        flex: 1, // Takes up remaining space
        padding: 15,
    },
    // --- Date Section ---
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5, // Reduced padding
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dateDisplay: {
        flex: 1, // Take available space
        paddingVertical: 8, // Match input height feel
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    changeButton: {
        backgroundColor: '#0056b3', // Darker blue
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginLeft: 10,
    },
    changeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    // --- iOS Done Button ---
    iosPickerDoneButtonContainer: {
        alignItems: 'flex-end',
        paddingRight: 15,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iosPickerDoneButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    iosPickerDoneText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    // --- Form Section ---
    form: {
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#444',
        width: 100, // Fixed width for labels
        marginRight: 10,
    },
    textInput: {
        flex: 1, // Take remaining width
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#0056b3', // Darker Blue
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10, // Add some space above Add button
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // --- List Section ---
    listContainer: {
        flex: 1, // Allow list to take remaining space
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#fff', // White background for the list area
        overflow: 'hidden', // Ensures children stay within bounds
    },
    listHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0', // Light grey header
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee', // Lighter separator
    },
    listItemText: {
        fontSize: 14,
        color: '#555',
    },
    // Column widths for List Header and Items
    listColSangam: {
        flex: 2, // Adjust flex ratios as needed
        textAlign: 'left',
    },
    listColPoints: {
        flex: 1,
        textAlign: 'center',
    },
    listColGameType: {
        flex: 2,
        textAlign: 'right',
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
    // --- Bottom Submit Button ---
    bottomSubmitContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#F8F9FA', // Match safe area background
    },
    submitButton: {
        backgroundColor: '#0056b3', // Darker Blue
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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

export default HalfSangamScreen;