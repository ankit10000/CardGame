import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/apiService';

const ProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.log('Error checking login status:', error);
            }
        };

        checkLoginStatus();
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await apiService.get('/auth/profile');
            
            setName(response.data.name);
            setEmail(response.data.email);
            setMobile(response.data.number);
            await AsyncStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching profile:', error);
            Alert.alert('Error', 'Failed to load profile data');
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await apiService.put('/auth/update-Password', {
                currentPassword: currentPassword,
                newPassword: newPassword,
            });

            Alert.alert('Success', 'Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            console.error('Update Error:', error);
            Alert.alert('Error', error.response?.data?.message || 'Failed to update password');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor="#ccc"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="Enter your email"
                                placeholderTextColor="#ccc"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mobile</Text>
                            <TextInput
                                style={styles.input}
                                value={mobile}
                                keyboardType="phone-pad"
                                placeholder="Enter your mobile number"
                                placeholderTextColor="#ccc"
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Current Password</Text>
                            <TextInput
                                style={styles.input}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                secureTextEntry={true}
                                placeholder="Enter your current password"
                                placeholderTextColor="#ccc"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>New Password</Text>
                            <TextInput
                                style={styles.input}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={true}
                                placeholder="Enter your new password"
                                placeholderTextColor="#ccc"
                            />
                        </View>

                        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                            <Text style={styles.updateButtonText}>Update Password</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F0F2F5' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4D2D7A',
        paddingHorizontal: 10,
        paddingVertical: 12,
        height: 60,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    keyboardAvoidingView: { flex: 1 },
    scrollContainer: {
        padding: 15,
        flexGrow: 1,
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    inputGroup: { marginBottom: 15 },
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
        backgroundColor: '#fff',
    },
    updateButton: {
        backgroundColor: '#0056b3',
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

export default ProfileScreen;
