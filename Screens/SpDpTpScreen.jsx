import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    Platform,
    FlatList,
    Alert,
    KeyboardAvoidingView, // Import KeyboardAvoidingView
} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker'; // Still needed if date was changeable
// import PickerSelect from 'react-native-picker-select'; // For the OPEN/CLOSE dropdown
// Optional: Import an icon library
import Icon from 'react-native-vector-icons/MaterialIcons';
// import FeatherIcon from 'react-native-vector-icons/Feather';

// Helper function to format date (can be kept)
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = d.getFullYear();
    return `${day} / ${month} / ${year}`;
};


const SpDpTpScreen = ({ navigation }) => {
    // Date State (fixed display based on image)
    const [date] = useState(new Date(2025, 3, 7)); // April is month 3

    // Market State
    const [selectedMarket, setSelectedMarket] = useState('OPEN');

    // Game Type State
    const gameTypes = ['SP', 'DP', 'TP'];
    const [selectedGameType, setSelectedGameType] = useState(null); // Start with none selected

    // Input State
    const [digit, setDigit] = useState('');
    const [points, setPoints] = useState('');

    // List State
    const [addedItems, setAddedItems] = useState([]);

    // --- Input Handlers ---
    const handleDigitChange = (value) => {
        // Allow only 3 digits (assuming SP/DP/TP refers to Patti types)
        setDigit(value.replace(/[^0-9]/g, '').slice(0, 3));
    };

    const handlePointsChange = (value) => {
        // Allow only numbers
        setPoints(value.replace(/[^0-9]/g, ''));
    };

     // --- Game Type Selection ---
     const handleGameTypeSelect = (type) => {
        setSelectedGameType(type);
    };

    // --- Add Item Handler ---
    const handleAddItem = () => {
        // Basic Validation
        if (!selectedGameType) {
            Alert.alert('Invalid Input', 'Please select a game type (SP, DP, or TP).');
            return;
        }
         if (!digit || digit.length !== 3) { // Assuming 3 digits for Patti
            Alert.alert('Invalid Input', 'Please enter a valid 3-digit number.');
            return;
        }
        // Add specific validation for SP/DP/TP digits if needed (e.g., DP must have 2 same digits)
        // This logic can be complex and might be better handled server-side.
        // Example basic check (can be enhanced):
        /*
        if (selectedGameType === 'DP') {
            const d1 = digit[0]; const d2 = digit[1]; const d3 = digit[2];
            if (d1 !== d2 && d1 !== d3 && d2 !== d3) {
                Alert.alert('Invalid Input', 'DP requires at least two identical digits (e.g., 112, 233).');
                return;
            }
        } else if (selectedGameType === 'TP') {
             if (digit[0] !== digit[1] || digit[1] !== digit[2]) {
                 Alert.alert('Invalid Input', 'TP requires all three digits to be identical (e.g., 111, 222).');
                 return;
             }
        } else if (selectedGameType === 'SP') {
            const d1 = digit[0]; const d2 = digit[1]; const d3 = digit[2];
             if (d1 === d2 && d2 === d3) { // Check if it's actually a TP
                Alert.alert('Invalid Input', 'SP requires distinct or only two identical digits (e.g., 123, 112). Use TP for three identical digits.');
                return;
             }
        }
        */

        if (!points || parseInt(points, 10) <= 0) {
            Alert.alert('Invalid Input', 'Please enter valid points (must be > 0).');
            return;
        }

        const newItem = {
            id: Date.now().toString(),
            digit: digit,
            points: points,
            gameType: selectedGameType,
            market: selectedMarket, // Include market in the item if needed for display/submission
        };

        setAddedItems(prevItems => [...prevItems, newItem]);

        // Clear input fields after adding
        // Keep game type selected for potentially faster subsequent entries
        setDigit('');
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
        // Note: Market (OPEN/CLOSE) applies to all bids in this submission batch
        console.log("Market:", selectedMarket);
        console.log("Bids:", addedItems);
        // --- Add actual submission logic here (e.g., API call) ---

        Alert.alert("Bids Submitted", `Submitted ${addedItems.length} bids for ${formatDate(date)} (check console).`);
        // Optionally clear the list and inputs after submission
        // setAddedItems([]);
        // setSelectedGameType(null);
    };

     // --- Render Item for FlatList ---
     const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={[styles.listItemText, styles.listColDigit]}>{item.digit}</Text>
            <Text style={[styles.listItemText, styles.listColPoints]}>{item.points}</Text>
            <Text style={[styles.listItemText, styles.listColGameType]}>{item.gameType} ({item.market})</Text>
            {/* Optional: Display market (OPEN/CLOSE) per bid if needed */}
            {/* <Text style={[styles.listItemText, styles.listColMarket]}>{item.market}</Text> */}
        </View>
    );

     // Combine Header + List Content for FlatList header/footer
    const ListHeaderComponent = () => (
        <>
            {/* Date Display Area */}
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>

             {/* Market Dropdown */}
            <View style={styles.marketAndGameTypeContainer}>
                <View style={styles.gameTypeSelector}>
                    {gameTypes.map((type) => (
                         <TouchableOpacity
                            key={type}
                            style={styles.gameTypeOption}
                            onPress={() => handleGameTypeSelect(type)}
                          >
                            <View style={[
                                styles.radioButton,
                                selectedGameType === type && styles.radioButtonSelected
                            ]}>
                                {selectedGameType === type && <View style={styles.radioButtonInner} />}
                            </View>
                            <Text style={styles.gameTypeText}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {/* <View style={styles.dropdownContainer}>
                    <PickerSelect
                        value={selectedMarket}
                        onValueChange={(value) => setSelectedMarket(value)}
                        items={[
                            { label: 'OPEN', value: 'OPEN' },
                            { label: 'CLOSE', value: 'CLOSE' },
                        ]}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                             return <Text style={styles.pickerIcon}>▼</Text>;
                        }}
                    />
                </View> */}

            </View>


            {/* Input Form */}
            <View style={styles.formRow}>
                 <View style={styles.inputGroup}>
                    <Text style={styles.label}>Digit</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={digit}
                        onChangeText={handleDigitChange}
                        maxLength={3} // Patti/Panna number
                        placeholder="Enter Digit"
                        placeholderTextColor="#ccc"
                    />
                </View>
                 <View style={styles.inputGroup}>
                    <Text style={styles.label}>Points</Text>
                     <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={points}
                        onChangeText={handlePointsChange}
                        placeholder="Enter Points"
                        placeholderTextColor="#ccc"
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            {/* Added Items List Header */}
             <View style={styles.listHeader}>
                <Text style={[styles.listHeaderText, styles.listColDigit]}>Digit</Text>
                <Text style={[styles.listHeaderText, styles.listColPoints]}>Points</Text>
                <Text style={[styles.listHeaderText, styles.listColGameType]}>Game Type</Text>
                 {/* <Text style={[styles.listHeaderText, styles.listColMarket]}>Market</Text> */}
            </View>
             {/* Note Text */}
            <View style={styles.noteContainer}>
                 <Text style={styles.noteText}>*Note Bid Once Played Will Not Be Cancelled*</Text>
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
                            <Text style={styles.headerTitle}>SP DP TP</Text>
                            <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                                <View style={styles.walletContainer}>
                                    <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                                    <Text style={styles.walletText}>0</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

             {/* Use KeyboardAvoidingView for better input experience */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust offset if needed
            >
                <FlatList
                    style={styles.listContainerStyle}
                    contentContainerStyle={styles.listContentContainer}
                    data={addedItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={ListHeaderComponent}
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            {/* Only show text if list is empty, header always shows */}
                        </View>
                       }
                       // Ensure list scrolls even with few items if KeyboardAvoidingView pushes content
                    // removeClippedSubviews={false}
                />
            </KeyboardAvoidingView>

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
        backgroundColor: '#934b47', // Purple/Maroon color from image
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    headerButton: { /* ... */ },
    headerIconText: { /* ... */ },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerRightIconContainer: { /* ... */ },
    badge: { /* ... */ },
    badgeText: { /* ... */ },

    // --- List & Content Area ---
     listContainerStyle: {
        flex: 1, // Make FlatList take available space within KeyboardAvoidingView
    },
     listContentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15, // Padding at the very bottom of scrollable content
    },
    // --- Date Section ---
    dateContainer: {
        marginTop: 15,
        marginBottom: 10, // Reduced margin
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'flex-start',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    // --- Market and Game Type Row ---
    marketAndGameTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    dropdownContainer: {
       flex: 1, // Let dropdown take space on the right
       marginLeft: 10, // Space between game types and dropdown
    },
    pickerIcon: { // Style for the dropdown icon
        fontSize: 16,
        color: '#555',
        // Position adjustment might be needed based on pickerSelectStyles
    },
    gameTypeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        // Removed flex: 1 to let it size naturally
    },
    gameTypeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15, // Space between SP, DP, TP options
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc', // Grey border
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        backgroundColor: '#fff', // White background for radio button
    },
    radioButtonSelected: {
        borderColor: '#0056b3', // Blue border when selected
    },
    radioButtonInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#0056b3', // Blue fill when selected
    },
    gameTypeText: {
        fontSize: 16,
        color: '#333',
    },

    // --- Form Section ---
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    inputGroup: {
        flex: 1, // Each input group takes half the space
        marginHorizontal: 5, // Add some space between inputs
    },
    label: {
        fontSize: 14, // Smaller label
        color: '#444',
        marginBottom: 5, // Space between label and input
    },
    textInput: {
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
        marginBottom: 15, // Space before list header
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
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
         borderTopLeftRadius: 8,
         borderTopRightRadius: 8,
    },
    listHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    noteContainer: {
        backgroundColor: '#f0f0f0', // Same as header
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginBottom: 5, // Add small margin below the note
    },
    noteText: {
        fontSize: 12,
        color: '#555',
        fontStyle: 'italic',
    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    listItemText: {
        fontSize: 14,
        color: '#555',
    },
    // Column widths for List Header and Items
    listColDigit: { flex: 1.5, textAlign: 'left' },
    listColPoints: { flex: 1, textAlign: 'center' },
    listColGameType: { flex: 2, textAlign: 'right'},
    // listColMarket: { flex: 1, textAlign: 'right' }, // Optional market column

    emptyListContainer: { // Takes up space below the Note
        backgroundColor: '#fff', // Match item background
        paddingBottom: 10, // Ensure some space if empty
         borderBottomLeftRadius: 8,
         borderBottomRightRadius: 8,
    },
    emptyListText: { /* Not really needed if header/note always show */ },

    // --- Bottom Submit Button ---
    bottomSubmitContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#F8F9FA', // Match safe area background
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

// Styles for react-native-picker-select (can be reused)
// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 8, // Reduced padding to fit better
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 8,
//         color: 'black',
//         paddingRight: 30,
//         backgroundColor: '#fff',
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingHorizontal: 10,
//         paddingVertical: 8, // Reduced padding
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 8,
//         color: 'black',
//         paddingRight: 30,
//         backgroundColor: '#fff',
//         minHeight: 40, // Ensure minimum height on Android
//     },
//     iconContainer: {
//         top: 0,
//         bottom: 0,
//         right: 5, // Adjust position
//         justifyContent: 'center',
//         // alignItems: 'center',
//         height: '100%', // Ensure icon aligns vertically
//         paddingHorizontal: 5,
//     },
//     placeholder: {
//         color: '#888',
//     },
// });


export default SpDpTpScreen;