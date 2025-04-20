import React, { useState } from 'react'; // Removed useEffect
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
    ActivityIndicator // Import ActivityIndicator
} from 'react-native';
// Removed LinearGradient import
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather'; // For the eye icon

const { width, height } = Dimensions.get('window');

// Use the same COLORS object from the updated LoginScreen
const COLORS = {
    background: '#3a0d4a', // Dark purple background
    statusBar: '#2c0a38',  // Slightly darker status bar
    logoBackground: '#a30f0f',
    logoText: '#ffffff',
    loginTabBackground: '#4d1a63', // Background for the "Sign Up" tab (can reuse loginTab style)
    loginTabText: '#ffffff',
    formBorder: '#e6bf55', // Gold border for the form container
    inputBackground: '#3a0d4a', // Input background matches main bg
    inputBorder: '#e6bf55', // Gold border for input
    inputText: '#ffffff', // White text inside input
    placeholderText: '#b0aeb1', // Light grey placeholder
    buttonGradientStart: '#ffa500', // Orange color for buttons
    buttonGradientEnd: '#ff8c00', // Not used if solid color, but keep for consistency if needed later
    buttonText: '#ffffff',
    secondaryText: '#dcdcdc', // Light grey text
    activityIndicator: '#ffffff', // White indicator on orange button
};

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state

    const handleSignUp = async () => {
        // Basic validation
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
        if (password.length < 6) { // Example: Minimum password length
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true); // Start loading indicator
        try {
            // *** Ensure API endpoint and field names match your backend ***
            const response = await axios.post('http://192.168.1.2:3000/api/auth/register', {
                name: username, // Assuming backend expects 'name'
                number: mobile, // Assuming backend expects 'number'
                email: email,
                password: password,
                // Confirm password might not be needed by backend, but good practice to send if expected
                // confirmPassword: confirmPassword,
                isAdmin: false, // Make sure this is correct
            });

            console.log('Registration Success:', response.data);
            Alert.alert('Success', 'Registration successful! Please Login.', [
                // Navigate to Login screen after successful registration
                { text: 'OK', onPress: () => navigation.replace('LoginScreen') }, // Use replace
            ]);
        } catch (error) {
            console.error('Registration Error:', error.response?.data || error.message);
            // Provide more specific error messages if available from backend
            Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading indicator regardless of outcome
        }
    };

    const handleLoginPress = () => {
        navigation.navigate('Login'); // Navigate back to Login
    };

    // Removed the useEffect block that checked for login status

    return (
        // Removed LinearGradient wrapper
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
                        // *** Use the same logo asset as LoginScreen ***
                        source={require('../assets/icon.png')} // Placeholder path
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
                                autoCapitalize="words" // Typically capitalize names
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
                                maxLength={10} // Enforce 10 digits
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
                            style={[styles.button, styles.signUpButton]} // Added specific margin
                            activeOpacity={0.8}
                            disabled={loading} // Disable button when loading
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
                            style={styles.button} // Use the same button style
                            activeOpacity={0.8}
                            disabled={loading} // Also disable this when signing up
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// Combine and adapt styles from LoginScreen and existing SignUpScreen
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
        paddingBottom: 30, // Ensure space at bottom
        paddingTop: 20, // Add some space at top if needed
    },
    logoImage: {
        width: width * 0.55,
        height: height * 0.15,
        marginBottom: 20,
    },
    loginTab: { // Reusing loginTab style name for consistency
        backgroundColor: COLORS.loginTabBackground,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: -1,
        zIndex: 1,
    },
    loginTabText: { // Reusing loginTabText style name
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
        paddingTop: 30, // Adjust as needed
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
        marginBottom: 16, // Consistent spacing between inputs
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
    // Removed unused styles like logoTextGama, logoText567, buttonContainer, loginButton (as base style is now used)
});

export default SignUpScreen;