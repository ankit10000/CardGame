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
    KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';


const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day} / ${month} / ${year}`;
};


const SpDpTpScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date(2025, 3, 7));
    const [selectedMarket, setSelectedMarket] = useState('OPEN');

    const gameTypes = ['SP', 'DP', 'TP'];

    const [selectedGameType, setSelectedGameType] = useState(null);

    const [digit, setDigit] = useState('');
    const [points, setPoints] = useState('');

    const [addedItems, setAddedItems] = useState([]);

    const handleDigitChange = (value) => {
        setDigit(value.replace(/[^0-9]/g, '').slice(0, 3));
    };

    const handlePointsChange = (value) => {
        setPoints(value.replace(/[^0-9]/g, ''));
    };

    const handleGameTypeSelect = (type) => {
        setSelectedGameType(type);
    };

    const handleAddItem = () => {
        if (!selectedGameType) {
            Alert.alert('Invalid Input', 'Please select a game type (SP, DP, or TP).');
            return;
        }
        if (!digit || digit.length !== 3) {
            Alert.alert('Invalid Input', 'Please enter a valid 3-digit number.');
            return;
        }
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
            if (d1 === d2 && d2 === d3) {
                Alert.alert('Invalid Input', 'SP requires distinct or only two identical digits (e.g., 123, 112). Use TP for three identical digits.');
                return;
            }
        }

        if (!points || parseInt(points, 10) <= 0) {
            Alert.alert('Invalid Input', 'Please enter valid points (must be > 0).');
            return;
        }

        const newItem = {
            id: Date.now().toString(),
            digit: digit,
            points: points,
            gameType: selectedGameType,
            market: selectedMarket,
        };

        setAddedItems(prevItems => [...prevItems, newItem]);
        setDigit('');
        setPoints('');
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
    };
    const handleSubmit = () => {
        if (addedItems.length === 0) {
            Alert.alert('No Bids', 'Please add at least one bid before submitting.');
            return;
        }
        console.log("Submitting Bids:");
        console.log("Date:", formatDate(date));
        console.log("Market:", selectedMarket);
        console.log("Bids:", addedItems);

        Alert.alert("Bids Submitted", `Submitted ${addedItems.length} bids for ${formatDate(date)} (check console).`);


    };
    const [showDatePicker, setShowDatePicker] = useState(false);
    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={[styles.listItemText, styles.listColDigit]}>{item.digit}</Text>
            <Text style={[styles.listItemText, styles.listColPoints]}>{item.points}</Text>
            <Text style={[styles.listItemText, styles.listColGameType]}>{item.gameType} ({item.market})</Text>
            {/* <Text style={[styles.listItemText, styles.listColMarket]}>{item.market}</Text> */}
        </View>
    );

    const ListHeaderComponent = () => (
        <>
            {/* Date Display Area */}
            <TouchableOpacity onPress={showDatepicker} style={styles.datePickerContainer}>
                <Text style={styles.dateText}>{formatDate(date)}</Text>
                <Icon name="calendar-today" size={20} color="#555" />
            </TouchableOpacity>

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

            </View>


            <View style={styles.formRow}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Digit</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={digit}
                        onChangeText={handleDigitChange}
                        maxLength={3}
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

            <View style={styles.listHeader}>
                <Text style={[styles.listHeaderText, styles.listColDigit]}>Digit</Text>
                <Text style={[styles.listHeaderText, styles.listColPoints]}>Points</Text>
                <Text style={[styles.listHeaderText, styles.listColGameType]}>Game Type</Text>
                {/* <Text style={[styles.listHeaderText, styles.listColMarket]}>Market</Text> */}
            </View>
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

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
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
                        </View>
                    }
                />
            </KeyboardAvoidingView>

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#934b47',
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

    listContainerStyle: {
        flex: 1,
    },
    listContentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    datePickerContainer: {
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateContainer: {
        marginTop: 15,
        marginBottom: 10,
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
    marketAndGameTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    dropdownContainer: {
        flex: 1,
        marginLeft: 10,
    },
    pickerIcon: {
        fontSize: 16,
        color: '#555',
    },
    gameTypeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gameTypeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        backgroundColor: '#fff',
    },
    radioButtonSelected: {
        borderColor: '#0056b3',
    },
    radioButtonInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#0056b3',
    },
    gameTypeText: {
        fontSize: 16,
        color: '#333',
    },


    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    inputGroup: {
        flex: 1,
        marginHorizontal: 5,
    },
    label: {
        fontSize: 14,
        color: '#444',
        marginBottom: 5,
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
        marginBottom: 15,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

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
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginBottom: 5,
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

    listColDigit: { flex: 1.5, textAlign: 'left' },
    listColPoints: { flex: 1, textAlign: 'center' },
    listColGameType: { flex: 2, textAlign: 'right' },


    emptyListContainer: {
        backgroundColor: '#fff',
        paddingBottom: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    emptyListText: { /* Not really needed if header/note always show */ },


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









































export default SpDpTpScreen;