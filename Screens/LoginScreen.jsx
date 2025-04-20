import React, { useState, useEffect } from 'react';
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
    Linking // Import Linking for WhatsApp
} from 'react-native';
// Removed LinearGradient as the background is solid dark purple in the target image
// If you still want a subtle gradient, you can add it back.
// import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Keep if you still use axios, otherwise remove
import Icon from 'react-native-vector-icons/Feather'; // For the eye icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // For WhatsApp icon

const { width, height } = Dimensions.get('window');

// Updated COLORS based on the target image
const COLORS = {
    background: '#3a0d4a', // Dark purple background
    statusBar: '#2c0a38',  // Slightly darker status bar
    logoBackground: '#a30f0f', // Background color for GAMA text could vary
    logoText: '#ffffff',
    loginTabBackground: '#4d1a63', // Background for the "Login" tab
    loginTabText: '#ffffff',
    formBorder: '#e6bf55', // Gold border for the form container
    inputBackground: '#3a0d4a', // Input background matches main bg
    inputBorder: '#e6bf55', // Gold border for input
    inputText: '#ffffff', // White text inside input
    placeholderText: '#b0aeb1', // Light grey placeholder
    forgotPasswordText: '#e6bf55', // Gold text for forgot password
    buttonGradientStart: '#ffa500', // Orange gradient start
    buttonGradientEnd: '#ff8c00', // Orange gradient end (darker orange)
    buttonText: '#ffffff',
    secondaryText: '#dcdcdc', // Light grey text ("Don't have an account", "Need Help?")
    adminButtonBorder: '#ffffff',
    adminButtonText: '#ffffff',
};

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(''); // Changed from email to mobile
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

    // Check login status on component mount
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    navigation.replace('MainDrawer'); // Use replace to avoid going back to Login
                }
            } catch (error) {
                console.log('Error checking login status:', error);
            }
        };
        checkLoginStatus();
    }, [navigation]);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both mobile number and password.');
            return;
        }
        setLoading(true);
        try {
            // *** IMPORTANT: Update the API endpoint and request body if needed ***
            // Assuming your API now expects 'mobile' instead of 'email'
            const response = await fetch('http://192.168.1.2:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, // Use mobile state variable
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const { token, user } = data;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                Alert.alert('Success', 'Login successful!');
                navigation.replace('MainDrawer'); // Use replace here as well
            } else {
                Alert.alert('Error', data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.log("Login API Error:", error); // Log the specific error
            Alert.alert('Error', 'An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpPress = () => {
        navigation.navigate('SignUp'); // Navigate to your Sign Up screen
    };

    const handleForgotPasswordPress = () => {
        // Navigate to your Forgot Password screen or implement logic
        Alert.alert('Forgot Password', 'Forgot Password functionality not implemented yet.');
        // Example navigation: navigation.navigate('ForgotPassword');
    };

    const handleAdminHelpPress = () => {
        // Replace with the actual Admin WhatsApp number
        const adminWhatsAppNumber = '91XXXXXXXXXX'; // Include country code, no '+' or spaces
        const message = 'Hello Admin, I need help with the GAMA567 app.';
        const url = `whatsapp://send?phone=${adminWhatsAppNumber}&text=${encodeURIComponent(message)}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    Alert.alert('Error', 'WhatsApp is not installed on your device.');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred opening WhatsApp', err));
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.statusBar} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined} // Use undefined for Android if headerTransparent is not used
                style={styles.flexContainer}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo */}
                    <Image
                        // *** Replace with the correct path to your logo asset ***
                        source={require('../assets/icon.png')} // Placeholder path
                        style={styles.logoImage}
                        resizeMode="contain"
                    />

                    {/* Login Tab */}
                    <View style={styles.loginTab}>
                        <Text style={styles.loginTabText}>Login</Text>
                    </View>

                    {/* Form Container */}
                    <View style={styles.formContainer}>
                        {/* Mobile Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor={COLORS.placeholderText}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.passwordInput]} // Add paddingRight for icon
                                placeholder="Enter Password"
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!isPasswordVisible} // Control visibility
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

                        {/* Forgot Password */}
                        {/* <TouchableOpacity onPress={handleForgotPasswordPress} style={styles.forgotPasswordButton}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity> */}

                        {/* Login Button */}
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={styles.button}
                            activeOpacity={0.8}
                            disabled={loading}
                        >
                             {/* We can use a simple View for solid color buttons or keep LinearGradient if needed */}
                             <View style={styles.buttonInner}>
                                <Text style={styles.buttonText}>
                                    {loading ? 'Logging In...' : 'Login'}
                                </Text>
                             </View>
                            {/* <LinearGradient
                                colors={[COLORS.buttonGradientStart, COLORS.buttonGradientEnd]}
                                style={styles.buttonInner} // Use buttonInner for gradient styles
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                            >
                                <Text style={styles.buttonText}>
                                    {loading ? 'Logging In...' : 'Login'}
                                </Text>
                            </LinearGradient> */}
                        </TouchableOpacity>

                        {/* Sign Up Section */}
                        <Text style={styles.secondaryText}>Don't have an account yet?</Text>

                        <TouchableOpacity
                            onPress={handleSignUpPress}
                            style={styles.button}
                            activeOpacity={0.8}
                        >
                             <View style={styles.buttonInner}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </View>
                            {/* <LinearGradient
                                colors={[COLORS.buttonGradientStart, COLORS.buttonGradientEnd]}
                                style={styles.buttonInner}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                            >
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </LinearGradient> */}
                        </TouchableOpacity>
                    </View>

                    {/* Need Help Section */}
                    <View style={styles.helpContainer}>
                        <Text style={styles.secondaryText}>Need Help?</Text>
                        <TouchableOpacity
                            onPress={handleAdminHelpPress}
                            style={styles.adminButton}
                            activeOpacity={0.8}
                        >
                            <FontAwesome name="whatsapp" size={20} color="#25D366" style={styles.whatsappIcon} />
                            <Text style={styles.adminButtonText}>Admin</Text>
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
        backgroundColor: COLORS.background, // Set background color here
    },
    flexContainer: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',
        paddingHorizontal: width * 0.05, // Use percentage for padding
        paddingBottom: 20, // Add some padding at the bottom
    },
    logoImage: {
        width: width * 0.55, // Adjust width as needed
        height: height * 0.15, // Adjust height as needed
        marginBottom: 20, // Space below logo
    },
    loginTab: {
        backgroundColor: COLORS.loginTabBackground,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // Position it slightly above the form container visually if needed
        // This might require adjusting margins or using absolute positioning carefully
        marginBottom: -1, // Slight overlap to connect visually with border
        zIndex: 1, // Ensure tab is above the form container border
    },
    loginTabText: {
        color: COLORS.loginTabText,
        fontSize: 18,
        fontWeight: 'bold',
    },
    formContainer: {
        width: '100%', // Take full width of padded area
        backgroundColor: 'transparent', // Keep it transparent to show main background
        borderRadius: 15, // Rounded corners for the container
        borderWidth: 2,
        borderColor: COLORS.formBorder, // Gold border
        paddingHorizontal: 20,
        paddingTop: 35, // More space at the top inside the border
        paddingBottom: 25,
        alignItems: 'center',
        marginTop: 0, // Remove margin if tab handles spacing
        zIndex: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: COLORS.inputBackground, // Match main background
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.inputBorder, // Gold border for input
        marginBottom: 18,
        paddingHorizontal: 5, // Reduced padding as border is now the visual edge
    },
    input: {
        flex: 1, // Take remaining space
        height: '100%',
        color: COLORS.inputText,
        fontSize: 16,
        paddingHorizontal: 10, // Inner padding for text
    },
    passwordInput: {
        paddingRight: 40, // Make space for the eye icon
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end', // Align to the right
        marginBottom: 20, // Space before login button
        paddingVertical: 5, // Easier to tap
    },
    forgotPasswordText: {
        color: COLORS.forgotPasswordText,
        fontSize: 14,
        fontWeight: '500',
    },
    button: {
        width: '100%',
        borderRadius: 25, // Pill shape
        overflow: 'hidden', // Needed for gradient or View border radius
        marginTop: 10, // Space between buttons/text
        height: 50, // Fixed height for buttons
         // If using solid color instead of gradient:
        backgroundColor: COLORS.buttonGradientStart, // Use one of the orange colors
    },
    buttonInner: { // Apply padding and alignment to this View/LinearGradient
        flex: 1, // Take full height of parent TouchableOpacity
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: COLORS.buttonGradientStart, // Solid color fallback if not using gradient
    },
    buttonText: {
        color: COLORS.buttonText,
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryText: {
        marginTop: 20, // Space above "Don't have account"
        marginBottom: 8, // Space below "Don't have account" / "Need Help?"
        color: COLORS.secondaryText,
        fontSize: 14,
    },
    helpContainer: {
        marginTop: 30, // Space above Need Help section
        alignItems: 'center',
    },
    adminButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.adminButtonBorder,
        borderRadius: 25, // Pill shape
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginTop: 5, // Space below "Need Help?" text
    },
    whatsappIcon: {
        marginRight: 10, // Space between icon and text
    },
    adminButtonText: {
        color: COLORS.adminButtonText,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;