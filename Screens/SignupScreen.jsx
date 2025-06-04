import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiService from '../services/apiService';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const COLORS = {
    background: '#3a0d4a',
    statusBar: '#2c0a38',
    logoBackground: '#a30f0f',
    logoText: '#ffffff',
    loginTabBackground: '#4d1a63',
    loginTabText: '#ffffff',
    formBorder: '#e6bf55',
    inputBackground: '#3a0d4a',
    inputBorder: '#e6bf55',
    inputText: '#ffffff',
    placeholderText: '#b0aeb1',
    buttonGradientStart: '#ffa500',
    buttonGradientEnd: '#ff8c00',
    buttonText: '#ffffff',
    secondaryText: '#dcdcdc',
    activityIndicator: '#ffffff',
};

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!username || !mobile || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
             Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
             return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
             Alert.alert('Error', 'Please enter a valid email address');
             return;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await apiService.post('/api/auth/register', {
                name: username,
                number: mobile,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                isAdmin: false,
            });

            console.log('Registration Success:', response.data);
            Alert.alert('Success', 'Registration successful! Please Login.', [
                { text: 'OK', onPress: () => navigation.replace('Login') },
            ]);
        } catch (error) {
            console.error('Registration Error:', error.response?.data || error.message);
            Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.statusBar} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flexContainer}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo */}
                    <Image
                        source={require('../assets/icon.jpeg')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />

                    {/* Sign Up Tab */}
                    <View style={styles.loginTab}>
                        <Text style={styles.loginTabText}>Sign Up</Text>
                    </View>

                    {/* Form Container */}
                    <View style={styles.formContainer}>
                        {/* Username Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Username"
                                placeholderTextColor={COLORS.placeholderText}
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="words"
                            />
                        </View>

                        {/* Mobile Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Mobile Number"
                                placeholderTextColor={COLORS.placeholderText}
                                value={mobile}
                                onChangeText={setMobile}
                                keyboardType="phone-pad"
                                maxLength={10}
                            />
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Email"
                                placeholderTextColor={COLORS.placeholderText}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.passwordInput]}
                                placeholder="Enter Password"
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!isPasswordVisible}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                <Icon
                                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                                    size={20}
                                    color={COLORS.placeholderText}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.passwordInput]}
                                placeholder="Confirm Password"
                                placeholderTextColor={COLORS.placeholderText}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!isConfirmPasswordVisible}
                                autoCapitalize="none"
                            />
                             <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                            >
                                <Icon
                                    name={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
                                    size={20}
                                    color={COLORS.placeholderText}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Button */}
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={[styles.button, styles.signUpButton]}
                            activeOpacity={0.8}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color={COLORS.activityIndicator} />
                            ) : (
                                <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>

                        {/* Login Navigation */}
                        <Text style={styles.secondaryText}>Already have an account?</Text>

                        <TouchableOpacity
                            onPress={handleLoginPress}
                            style={styles.button}
                            activeOpacity={0.8}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>Login</Text>
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
        backgroundColor: COLORS.background,
    },
    flexContainer: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingBottom: 30,
        paddingTop: 20,
    },
    logoImage: {
        width: width * 0.55,
        height: height * 0.15,
        marginBottom: 20,
    },
    loginTab: {
        backgroundColor: COLORS.loginTabBackground,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: -1,
        zIndex: 1,
    },
    loginTabText: {
        color: COLORS.loginTabText,
        fontSize: 18,
        fontWeight: 'bold',
    },
    formContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.formBorder,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 25,
        alignItems: 'center',
        marginTop: 0,
        zIndex: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: COLORS.inputBackground,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        marginBottom: 16,
        paddingHorizontal: 5,
    },
    input: {
        flex: 1,
        height: '100%',
        color: COLORS.inputText,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    passwordInput: {
        paddingRight: 40, // Space for eye icon
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: 50, // Consistent button height
        borderRadius: 25, // Pill shape
        backgroundColor: COLORS.buttonGradientStart, // Solid orange background
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10, // Default margin for buttons
    },
    signUpButton: {
        marginTop: 20, // More space above the main action button
    },
    buttonText: {
        color: COLORS.buttonText,
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryText: {
        color: COLORS.secondaryText,
        marginTop: 20, // Space above "Already have account?"
        marginBottom: 8,
        fontSize: 14,
    },
});

export default SignUpScreen;
