import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView, // Keep ScrollView to wrap the form + list header
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    Platform,
    FlatList,
    Alert,
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


const FullSangamScreen = ({ navigation }) => {
    // Date Picker State
    const [date, setDate] = useState(new Date(2025, 3, 7)); // April is month 3
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Input State
    const [openPanna, setOpenPanna] = useState('');
    const [closePanna, setClosePanna] = useState(''); // Changed from closeDigit
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
        // On this screen, the date seems non-editable based on the image (no change button)
        // If it should be editable, uncomment the line below and add a trigger (like TouchableOpacity around the date text)
        // setShowDatePicker(true);
        Alert.alert("Date", "Date is fixed for this view or change button is missing."); // Inform user if date change is intended but not implemented
    };

    // --- Input Handlers ---
    const handleOpenPannaChange = (value) => {
        // Allow only 3 digits
        setOpenPanna(value.replace(/[^0-9]/g, '').slice(0, 3));
    };

    const handleClosePannaChange = (value) => { // Renamed handler
        // Allow only 3 digits
        setClosePanna(value.replace(/[^0-9]/g, '').slice(0, 3)); // Changed length to 3
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
        if (!closePanna || closePanna.length !== 3) { // Updated validation
            Alert.alert('Invalid Input', 'Please enter a valid 3-digit Close Panna.'); // Updated message
            return;
        }
        if (!points || parseInt(points, 10) <= 0) {
            Alert.alert('Invalid Input', 'Please enter valid points (must be > 0).');
            return;
        }

        const newItem = {
            id: Date.now().toString(),
            sangam: `${openPanna}-${closePanna}`, // Updated sangam format
            points: points,
            gameType: 'Full Sangam', // Updated game type
        };

        setAddedItems(prevItems => [...prevItems, newItem]);

        // Clear input fields
        setOpenPanna('');
        setClosePanna('');
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

    // Combine Header + List Content for FlatList header/footer
    const ListHeaderComponent = () => (
        <>
            {/* Date Display Area */}
            <View style={styles.dateContainer}>
                {/* Making the date text non-touchable as per image */}
                <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>

            {/* Date Picker Modal/Component (kept for potential future use) */}
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
                        maxLength={3}
                        placeholder="Enter 3 digits"
                        placeholderTextColor="#ccc"
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Close Panna</Text> {/* Updated Label */}
                    <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={closePanna}
                        onChangeText={handleClosePannaChange} // Updated handler
                        maxLength={3} // Updated length
                        placeholder="Enter 3 digits" // Updated placeholder
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

            {/* Added Items List Header */}
            <View style={styles.listHeader}>
                <Text style={[styles.listHeaderText, styles.listColSangam]}>Sangam</Text>
                <Text style={[styles.listHeaderText, styles.listColPoints]}>Points</Text>
                <Text style={[styles.listHeaderText, styles.listColGameType]}>Game Type</Text>
            </View>
        </>
    );


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Full Sangam</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Use FlatList to manage scrolling */}
            <FlatList
                style={styles.listContainer}
                contentContainerStyle={styles.listContentContainer}
                data={addedItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={ListHeaderComponent} // Render form and list header above the items
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        {/* Show empty text only below the header */}
                        <Text style={styles.emptyListText}>No bids added yet.</Text>
                    </View>
                }
            />


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
        backgroundColor: '#F8F9FA',
    },
    // Header Styles (same as before)
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
    // --- List & Content Area ---
    listContainer: {
        flex: 1, // Takes up remaining space below header, above submit button
    },
    listContentContainer: {
        paddingHorizontal: 15, // Add horizontal padding to the scrollable content
        paddingBottom: 15, // Add padding at the bottom of the scroll content
    },
    // --- Date Section ---
    dateContainer: {
        // Removed horizontal margin, now handled by listContentContainer padding
        marginTop: 15, // Add top margin
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10, // Keep internal padding
        paddingVertical: 12, // Adjusted padding
        borderWidth: 1,
        borderColor: '#ccc',
        // Removed flexDirection as it's just text now
        alignItems: 'flex-start', // Align text to the left
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    // --- iOS Done Button (same as before) ---
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
        width: 100,
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#0056b3',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // --- List Styles ---
    listHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 10, // Internal padding for header text
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderTopWidth: 1, // Add border separating form and list header
        borderTopColor: '#e0e0e0',
        marginTop: 10, // Space between Add button and list header
        borderTopLeftRadius: 8, // Round corners to match potential container
        borderTopRightRadius: 8,
    },
    listHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10, // Internal padding for item text
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff', // White background for items
        marginLeft: -10, // Counteract parent padding for full width separators
        marginRight: -10,
        paddingLeft: 20, // Adjust padding for content alignment
        paddingRight: 20,
    },
    listItemText: {
        fontSize: 14,
        color: '#555',
    },
    // Column widths (same as before)
    listColSangam: { flex: 2, textAlign: 'left' },
    listColPoints: { flex: 1, textAlign: 'center' },
    listColGameType: { flex: 2, textAlign: 'right' },

    emptyListContainer: {
        // Container for empty text to allow background styling if needed
        paddingTop: 20, // Give space below list header
        alignItems: 'center',
        backgroundColor: '#fff', // Match item background
        borderBottomLeftRadius: 8, // Round corners if it's the last element visually
        borderBottomRightRadius: 8,
        paddingBottom: 20, // Add padding below text
        marginLeft: -10, // Counteract parent padding for full width background
        marginRight: -10,
    },
    emptyListText: {
        fontSize: 16,
        color: '#888',
    },
    // --- Bottom Submit Button (same as before) ---
    bottomSubmitContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#F8F9FA',
    },
    submitButton: {
        backgroundColor: '#0056b3',
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

export default FullSangamScreen;