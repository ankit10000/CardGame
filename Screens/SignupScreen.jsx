import React, { useState,useEffect } from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const COLORS = {
    statusBar: '#313332',
    gradientTop: '#fce5e3',
    gradientBottom: '#f7d7d5',
    cardBackground: '#d4a34a',
    inputBackground: '#ffffff',
    placeholderText: '#666666',
    buttonText: '#ffffff',
    buttonGradientStart: '#8b5e3c',
    buttonGradientEnd: '#d9c4a9',
    logoTextBackground: '#e63946',
    logoTextColor: '#ffffff',
    logoNumberColor: '#333333',
    secondaryText: '#f0f0f0',
};

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        // Basic validation
        if (!username || !mobile || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.2:3000/api/auth/register', {
                name: username,
                number: mobile,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                isAdmin: false,
            });

            console.log('Registration Success:', response.data);
            Alert.alert('Success', 'Registration successful!', [
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]);
        } catch (error) {
            console.error('Registration Error:', error.response?.data || error.message);
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
        }
    };

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    // Token hai to MainDrawer pe navigate kar do
                    navigation.navigate('MainDrawer');
                }
            } catch (error) {
                console.log('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);
    return (
        <LinearGradient
            colors={[COLORS.gradientTop, COLORS.gradientBottom]}
            style={styles.flexContainer}
        >
            <SafeAreaView style={styles.flexContainer}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.statusBar} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.flexContainer}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Logo Area */}
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../assets/slide1.png')}
                                style={styles.logoImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.logoText}>
                                <Text style={styles.logoTextGama}>Milaan matka</Text>
                                <Text style={styles.logoText567}>777</Text>
                            </Text>
                        </View>

                        {/* Sign Up Card */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Sign Up</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Enter username"
                                placeholderTextColor={COLORS.placeholderText}
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter mobile number"
                                placeholderTextColor={COLORS.placeholderText}
                                value={mobile}
                                onChangeText={setMobile}
                                keyboardType="phone-pad"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter email"
                                placeholderTextColor={COLORS.placeholderText}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter password"
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Confirm password"
                                placeholderTextColor={COLORS.placeholderText}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />

                            {/* Sign Up Button */}
                            <TouchableOpacity onPress={handleSignUp} style={styles.buttonContainer} activeOpacity={0.8}>
                                <LinearGradient
                                    colors={[COLORS.buttonGradientStart, COLORS.buttonGradientEnd]}
                                    style={styles.button}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                >
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <Text style={styles.secondaryText}>Already have an account?</Text>

                            {/* Login Button */}
                            <TouchableOpacity onPress={handleLoginPress} style={styles.buttonContainer} activeOpacity={0.8}>
                                <LinearGradient
                                    colors={[COLORS.buttonGradientStart, COLORS.buttonGradientEnd]}
                                    style={[styles.button, styles.loginButton]}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                >
                                    <Text style={styles.buttonText}>Login</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 16,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: height * 0.05,
    },
    logoImage: {
        width: width * 0.3,
        height: width * 0.25,
        marginBottom: 8,
    },
    logoText: {
        flexDirection: 'row',
        fontSize: 22,
        fontWeight: 'bold',
    },
    logoTextGama: {
        backgroundColor: COLORS.logoTextBackground,
        color: COLORS.logoTextColor,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        overflow: 'hidden',
        fontSize: 20,
    },
    logoText567: {
        color: COLORS.logoNumberColor,
        marginLeft: 6,
        fontSize: 20,
        fontWeight: '600',
    },
    card: {
        backgroundColor: COLORS.cardBackground,
        width: '100%',
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 28,
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    cardTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.buttonGradientStart,
        marginBottom: 25,
    },
    input: {
        backgroundColor: COLORS.inputBackground,
        width: '100%',
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10,
    },
    button: {
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.buttonText,
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryText: {
        color: COLORS.secondaryText,
        marginTop: 16,
        marginBottom: 8,
    },
    loginButton: {
        marginTop: 8,
    },
});

export default SignUpScreen;
