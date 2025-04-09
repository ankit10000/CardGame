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
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

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
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        console.log('Signing Up:', { username, mobile, password });

    };

    const handleLoginPress = () => {
        console.log('Navigate to Login');
        navigation.navigate('Login');
    };

    return (
        <LinearGradient
            colors={[COLORS.gradientTop, COLORS.gradientBottom]}
            style={styles.flexContainer}
        >
            <SafeAreaView style={styles.flexContainer}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.statusBar} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.flexContainer}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* --- Logo Area --- */}
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

                        {/* --- Sign Up Card --- */}
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
                                placeholder="Enter password"
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            {/* --- Sign Up Button --- */}
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

                            {/* --- Login Button --- */}
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
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 12,
        borderRadius: 25,
        overflow: 'hidden',
    },
    button: {
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 25,
    },
    buttonText: {
        color: COLORS.buttonText,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    secondaryText: {
        marginTop: 16,
        marginBottom: 8,
        color: COLORS.secondaryText,
        fontSize: 14,
    },
    loginButton: {
        marginTop: 8,
        borderRadius: 25,
    },
});


export default SignUpScreen;