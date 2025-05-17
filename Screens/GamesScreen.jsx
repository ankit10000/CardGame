import React, { useCallback, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ImageBackground, // Import ImageBackground
    Image, // Import Image
} from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen'; // Assuming this component exists and works
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage if not already globally available


const { width } = Dimensions.get('window');
// Calculate item width for 2 columns with spacing
const itemHorizontalPadding = 15;
const numColumns = 2;
const itemWidth = (width - itemHorizontalPadding * (numColumns + 1)) / numColumns;

// --- IMPORTANT: Replace placeholders with your actual asset paths ---
const BACKGROUND_IMAGE = require('../assets/bg.jpg'); // Replace with your background image
// const ICON_HOLDER_IMAGE = require('../assets/bg.jpg'); // Replace with your icon holder image
const options = [
    { key: '1', gamename: 'single', iconType: 'dice', subLabel: "DIGIT", iconImage: require('../assets/singleDigit.png'), nav: 'SAnkh' },
    { key: '2', gamename: 'Jodi', iconType: 'dice', subLabel: "DIGIT", iconImage: require('../assets/jodi.png'), nav: 'JodiAce' },
    { key: '3', gamename: 'Single Patti', iconType: 'card', subLabel: "PANNA", iconImage: require('../assets/singlePana.png'), nav: 'SPatti' },
    { key: '4', gamename: 'Double Patti', iconType: 'card', subLabel: "PANNA", iconImage: require('../assets/doublePana.png'), nav: 'DPatti' },
    { key: '5', gamename: 'Tripple Patti', iconType: 'card', subLabel: "PANNA", iconImage: require('../assets/triplePana.png'), nav: 'TPatti' },
    { key: '6', gamename: 'Half Sangam', iconType: 'other', subLabel: "SAANGAM", iconImage: require('../assets/halfSangam.png'), nav: 'HSangam' },
    { key: '7', gamename: 'Full Sangam', iconType: 'other', subLabel: "SAANGAM", iconImage: require('../assets/fullSanagm.png'), nav: 'FSangam' },
];

const GridItem = React.memo(({ itemData, onPress }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(itemData)}> 
        <View style={styles.iconOuterContainer}>
            <Image source={itemData.iconImage} style={styles.iconItself} resizeMode="contain" />
        </View>
    </TouchableOpacity>
));

const GamesScreen = ({ navigation, route }) => {

    const { item } = route.params; // Game Market data (e.g., LAXMI MORNING)
    console.log("Game Market data:", item); // Debugging log
    const handleItemPress = useCallback((selectedOption) => {
        if (selectedOption.nav) {
            navigation.navigate(selectedOption.nav, { items: item, gamename: selectedOption.gamename }); // Pass market data and gamename to next screen
        } else {
            console.warn(`Navigation target not defined for item: ${selectedOption.gamename}`);
        }
    }, [navigation, item]); // Include item in dependencies

    // Optional: Keep login check if needed
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    // navigation.navigate('Login'); // Uncomment if needed
                    console.log("No token found, potential redirect to Login needed.");
                }
            } catch (error) {
                console.log('Error checking login status:', error);
            }
        };

        checkLoginStatus(); // Uncomment if needed
    }, [navigation]); // Add navigation dependency if uncommented

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Use the exact purple from the image */}
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={26} color="#FFFFFF" />
                </TouchableOpacity>
                {/* Ensure item.name exists and is passed correctly */}
                <Text style={styles.headerTitle}>{item?.name ? item.name.toUpperCase() : 'GAME'}</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    {/* Make sure WallettScreen component is correctly implemented */}
                    <WallettScreen />
                </TouchableOpacity>
            </View>

            <ImageBackground source={BACKGROUND_IMAGE} style={styles.backgroundImage}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.gridContainer}>
                        {options.map((option) => (
                            <GridItem key={option.key} itemData={option} onPress={handleItemPress} />
                        ))}
                    </View>
                </ScrollView>
            </ImageBackground>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#4D2D7A', // Fallback background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4D2D7A', // Dark purple header
        paddingHorizontal: 15, // Increased padding
        paddingVertical: 10,
        height: 60, // Fixed height
    },
    headerButton: {
        // padding: 5, // Add padding for easier touch
        // minWidth: 40, // Ensure minimum touch area
        alignItems: 'center', // Center icon/content if needed
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 19, // Slightly larger font
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1, // Allow title to take available space for centering
        marginHorizontal: 10, // Add space around title
    },
    backgroundImage: {
        flex: 1, // Take remaining space
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        paddingTop: 20, // Add some padding at the top
        paddingBottom: 30, // Add padding at the bottom
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // Align items to the start
        paddingHorizontal: itemHorizontalPadding / 2, // Half padding on sides for centering
    },
    itemContainer: {
        width: itemWidth,
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to top
        marginBottom: 25, // Space between rows
        marginHorizontal: itemHorizontalPadding / 2, // Horizontal spacing between items
        // Remove background/border from the container itself
    },
    iconOuterContainer: {
        width: itemWidth * 0.7, // Adjust size relative to item width
        height: itemWidth * 0.7, // Make it square
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, // Space below icon holder
        position: 'relative', // Needed for absolute positioning of icon
    },
    iconHolder: {
        width: '100%',
        height: '100%',
        position: 'absolute', // Holder is the base
    },
    iconItself: {
        width: '95%', // Icon size relative to the holder
        height: '95%', // Icon size relative to the holder
        // The icon sits visually centered on top of the holder due to resizeMode and container centering
    },
    labelContainer: {
        alignItems: 'center', // Center labels horizontally
    },
    mainLabelBackground: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15, // Rounded corners
        paddingVertical: 5,
        paddingHorizontal: 20, // Wider padding
        marginBottom: 5, // Space between main and sub label
        minWidth: itemWidth * 0.8, // Ensure minimum width
        alignItems: 'center', // Center text inside
    },
    mainLabelText: {
        fontSize: 16,
        color: '#D32F2F', // Red color
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subLabelBackground: {
        backgroundColor: '#333333', // Dark background
        borderRadius: 10, // Slightly less rounded
        paddingVertical: 3,
        paddingHorizontal: 15, // Wider padding
        minWidth: itemWidth * 0.6, // Ensure minimum width
        alignItems: 'center', // Center text inside
    },
    subLabelText: {
        fontSize: 13,
        color: '#FFFFFF', // White text
        fontWeight: '500',
        textAlign: 'center',
    },
    // Ensure WalletScreen component styles don't conflict (optional)
    // walletContainer: { ... }
});

export default GamesScreen;