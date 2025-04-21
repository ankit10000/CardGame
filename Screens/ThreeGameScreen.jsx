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
    ImageBackground, 
    Image, 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallettScreen from '../components/WallettScreen'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const { width } = Dimensions.get('window');

const itemHorizontalPadding = 15;
const numColumns = 2;
const itemWidth = (width - itemHorizontalPadding * (numColumns + 1)) / numColumns;


const BACKGROUND_IMAGE = require('../assets/bg.jpg'); 


const options = [
    { key: '1', mainLabel: 'Left', iconType: 'dice',subLabel:"DIGIT" , iconImage: require('../assets/Left.png'), nav: 'Left' },
    { key: '2', mainLabel: 'Right', iconType: 'dice',subLabel:"DIGIT" , iconImage: require('../assets/Right.png'), nav: 'Right' },
    { key: '3', mainLabel: 'Jodi', iconType: 'card',subLabel:"PANNA" , iconImage: require('../assets/JodiGali.png'), nav: 'JodiGali' },
    ];



const GridItem = React.memo(({ itemData, onPress }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(itemData)}>
        <View style={styles.iconOuterContainer}>
            <Image source={itemData.iconImage} style={styles.iconItself} resizeMode="contain" />
        </View>
    </TouchableOpacity>
));

const ThreeGameScreen = ({ navigation, route }) => {

    const { item } = route.params; 

    const handleItemPress = useCallback((selectedOption) => {
        if (selectedOption.nav) {
            navigation.navigate(selectedOption.nav, { items: item }); 
        } else {
            console.warn(`Navigation target not defined for item: ${selectedOption.mainLabel}`);
        }
    }, [navigation, item]); 

    
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    
                    console.log("No token found, potential redirect to Login needed.");
                }
            } catch (error) {
                console.log('Error checking login status:', error);
            }
        };

        checkLoginStatus(); 
    }, [navigation]); 

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={26} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{item?.name ? item.name.toUpperCase() : 'GAME'}</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
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
        backgroundColor: '#4D2D7A', 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4D2D7A', 
        paddingHorizontal: 15, 
        paddingVertical: 10,
        height: 60, 
    },
    headerButton: {
        
        
        alignItems: 'center', 
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 19, 
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1, 
        marginHorizontal: 10, 
    },
    backgroundImage: {
        flex: 1, 
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        paddingTop: 20, 
        paddingBottom: 30, 
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', 
        paddingHorizontal: itemHorizontalPadding / 2, 
    },
    itemContainer: {
        width: itemWidth,
        alignItems: 'center',
        justifyContent: 'flex-start', 
        marginBottom: 25, 
        marginHorizontal: itemHorizontalPadding / 2, 
        
    },
    iconOuterContainer: {
        width: itemWidth * 0.7, 
        height: itemWidth * 0.7, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, 
        position: 'relative', 
    },
    iconHolder: {
        width: '100%',
        height: '100%',
        position: 'absolute', 
    },
    iconItself: {
        width: '95%', 
        height: '95%', 
        
    },
    labelContainer: {
        alignItems: 'center', 
    },
    mainLabelBackground: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15, 
        paddingVertical: 5,
        paddingHorizontal: 20, 
        marginBottom: 5, 
        minWidth: itemWidth * 0.8, 
        alignItems: 'center', 
    },
    mainLabelText: {
        fontSize: 16,
        color: '#D32F2F', 
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subLabelBackground: {
        backgroundColor: '#333333', 
        borderRadius: 10, 
        paddingVertical: 3,
        paddingHorizontal: 15, 
        minWidth: itemWidth * 0.6, 
         alignItems: 'center', 
    },
    subLabelText: {
        fontSize: 13,
        color: '#FFFFFF', 
        fontWeight: '500',
         textAlign: 'center',
    },
    
    
});

export default ThreeGameScreen 