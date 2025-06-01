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
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/apiService';





const HalfSangamScreen = ({ navigation, route }) => {
    const { items, gamename } = route.params; // Get userId from route params
    const currentDate = moment().format('DD / MM / YYYY');


    const [openPanna, setOpenPanna] = useState('');
    const [closeDigit, setCloseDigit] = useState('');
    const [points, setPoints] = useState('');


    const [addedItems, setAddedItems] = useState([]);
    const handleOpenPannaChange = (value) => {

        setOpenPanna(value.replace(/[^0-9]/g, '').slice(0, 3));
    };

    const handleCloseDigitChange = (value) => {

        setCloseDigit(value.replace(/[^0-9]/g, '').slice(0, 1));
    };

    const handlePointsChange = (value) => {

        setPoints(value.replace(/[^0-9]/g, ''));
    };


    const handleAddItem = () => {

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
            id: Date.now().toString(),
            sangam: `${openPanna}-${closeDigit}`,
            points: points,
            gameType: 'Half Sangam',
        };

        setAddedItems(prevItems => [...prevItems, newItem]);


        setOpenPanna('');
        setCloseDigit('');
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
                navigation.navigate('Login');
                return;
            }

            const gameDate = moment().format('YYYY-MM-DD');
            const openingTime = new Date();
            const gameIds = items?._id;
            if (!gameIds) {
                alert('Game ID is missing. Please try again.');
                return;
            }
            
            for (let item of addedItems) {
                const payload = {
                    gameId: gameIds,
                    closeDigit: parseInt(item.sangam.split('-')[1]),
                    openPana: item.sangam.split('-')[0],
                    amount: parseInt(item.points),
                    gameType: gamename,
                    betType: "close",
                };

                const response = await apiService.post('/starline/bet/place', payload);

                if (!response.status === 200 && !response.status === 201) {
                    throw new Error(response.data.message || 'Something went wrong');
                }

                console.log('Response:', response.data);
            }

            Alert.alert('Success', `Successfully submitted ${addedItems.length} bids.`);
            setAddedItems([]);
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', error.response?.data?.message || 'Failed to submit bids');
        }
    };



    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={[styles.listItemText, styles.listColSangam]}>{item.sangam}</Text>
            <Text style={[styles.listItemText, styles.listColPoints]}>{item.points}</Text>
            <Text style={[styles.listItemText, styles.listColGameType]}>{item.gameType}</Text>
        </View>
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
                <Text style={styles.headerTitle}>Half Sangam</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.dateContainer}>
                    <View style={styles.dateDisplay}>
                        <Text style={styles.dateText}>{currentDate}</Text>
                    </View>
                    <TouchableOpacity style={styles.changeButton} x>
                    </TouchableOpacity>
                </View>


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
                        <Text style={styles.label}>Close Digit</Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            value={closeDigit}
                            onChangeText={handleCloseDigitChange}
                            maxLength={1}
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

    contentContainer: {
        flex: 1,
        padding: 15,
    },

    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dateDisplay: {
        flex: 1,
        paddingVertical: 8,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    changeButton: {

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

    listContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    listHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
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
        borderBottomColor: '#eee',
    },
    listItemText: {
        fontSize: 14,
        color: '#555',
    },

    listColSangam: {
        flex: 2,
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

export default HalfSangamScreen;
