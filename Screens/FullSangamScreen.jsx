import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    FlatList,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import moment from 'moment';
import axios from 'axios'; // add this





const FullSangamScreen = ({ navigation, route }) => {

    const { items, gamename } = route.params; 

    const [openPanna, setOpenPanna] = useState('');
    const [closePanna, setClosePanna] = useState('');
    const [points, setPoints] = useState('');


    const [addedItems, setAddedItems] = useState([]);

    const currentDate = moment().format('DD / MM / YYYY');



    const handleOpenPannaChange = (value) => {

        setOpenPanna(value.replace(/[^0-9]/g, '').slice(0, 3));
    };

    const handleClosePannaChange = (value) => {

        setClosePanna(value.replace(/[^0-9]/g, '').slice(0, 3));
    };

    const handlePointsChange = (value) => {

        setPoints(value.replace(/[^0-9]/g, ''));
    };


    const handleAddItem = () => {

        if (!openPanna || openPanna.length !== 3) {
            Alert.alert('Invalid Input', 'Please enter a valid 3-digit Open Panna.');
            return;
        }
        if (!closePanna || closePanna.length !== 3) {
            Alert.alert('Invalid Input', 'Please enter a valid 3-digit Close Panna.');
            return;
        }
        if (!points || parseInt(points, 10) <= 0) {
            Alert.alert('Invalid Input', 'Please enter valid points (must be > 0).');
            return;
        }

        const newItem = {
            id: Date.now().toString(),
            sangam: `${openPanna}-${closePanna}`,
            points: points,
            gameType: 'Full Sangam',
        };

        setAddedItems(prevItems => [...prevItems, newItem]);


        setOpenPanna('');
        setClosePanna('');
        setPoints('');
    };


    const handleSubmit = async () => {
        if (addedItems.length === 0) {
            Alert.alert('No Bids', 'Please add at least one bid before submitting.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Authorization Failed', 'User token not found. Please login again.');
                navigation.navigate('Login');
                return;
            }

            const gameDate = moment().format('YYYY-MM-DD');

            for (const item of addedItems) {
                const [openPana, closePana] = item.sangam.split('-');
                const openingTime = new Date(); 
                const gameIds = items?._id;
            if (!gameIds) {
                alert('Game ID is missing. Please try again.');
                return;
            }
                const body = {
                    gameId: gameIds,
                    openPana,
                    closePana,
                    amount: parseInt(item.points),
                    gameType: gamename, // fallback gameType
                    betType: "close",
                };

                const response = await axios.post(
                    'http://192.168.1.3:3000/api/starline/bet/place',
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('API Response:', response.data);
            }

            Alert.alert("Success", "Full Sangam entry created successfully.");
            setAddedItems([]); // clear after successful submit

        } catch (error) {
            console.error('API Error:', error.response?.data || error.message);
            Alert.alert("Submission Failed", error.response?.data?.message || "An error occurred while submitting.");
        }
    };


    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={[styles.listItemText, styles.listColSangam]}>{item.sangam}</Text>
            <Text style={[styles.listItemText, styles.listColPoints]}>{item.points}</Text>
            <Text style={[styles.listItemText, styles.listColGameType]}>{item.gameType}</Text>
        </View>
    );


    const ListHeaderComponent = () => (
        <>
            {/* Date Display Area */}
            <TouchableOpacity style={styles.datePickerContainer}>
                <Text style={styles.dateText}>{currentDate}</Text>

            </TouchableOpacity>



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
                        onChangeText={handleClosePannaChange}
                        maxLength={3}
                        placeholder="Enter 3 digits"
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
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    // Token hai to MainDrawer pe navigate kar do
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.log('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Full Sangam</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            {/* Use FlatList to manage scrolling */}
            <FlatList
                style={styles.listContainer}
                contentContainerStyle={styles.listContentContainer}
                data={addedItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={ListHeaderComponent}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4D2D7A',
        paddingHorizontal: 10,
        paddingVertical: 12,
        height: 60,
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

    listContainer: {
        flex: 1,
    },
    listContentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15,
    },

    dateContainer: {

        marginTop: 15,
        marginBottom: 20,
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

    listHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        marginTop: 10,
        borderTopLeftRadius: 8,
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
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
        marginLeft: -10,
        marginRight: -10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    listItemText: {
        fontSize: 14,
        color: '#555',
    },

    listColSangam: { flex: 2, textAlign: 'left' },
    listColPoints: { flex: 1, textAlign: 'center' },
    listColGameType: { flex: 2, textAlign: 'right' },

    emptyListContainer: {

        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingBottom: 20,
        marginLeft: -10,
        marginRight: -10,
    },
    emptyListText: {
        fontSize: 16,
        color: '#888',
    },

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