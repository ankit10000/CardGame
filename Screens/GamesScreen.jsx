import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const itemSize = width / 4 - 16;

const options = [
    { key: '1', label: 'Signle Ank', iconType: 'dice', iconName: 'dice-5-outline' },
    { key: '2', label: 'Jodi', iconType: 'dice', iconName: 'dice-multiple-outline' },
    { key: '3', label: 'Single Patti', iconType: 'card', iconName: 'cards-spade-outline' },
    { key: '4', label: 'Double Patti', iconType: 'card', iconName: 'cards-outline' }, // Placeholder
    { key: '5', label: 'Tripple Patti', iconType: 'card', iconName: 'cards-playing-outline' }, // Placeholder
    { key: '6', label: 'Half Sangam', iconType: 'other', iconName: 'chart-arc' }, // Placeholder
    { key: '7', label: 'Full Sangam', iconType: 'other', iconName: 'circle-slice-8' }, // Placeholder
    { key: '8', label: 'SP DP TP', iconType: 'other', iconName: 'triangle-outline' }, // Placeholder
    //   { key: '9', label: 'SP Motor', iconType: 'other', iconName: 'atom-variant' }, // Placeholder
    //   { key: '10', label: 'DP Motor', iconType: 'dice', iconName: 'cube-outline' }, // Placeholder
];

const renderIcon = (iconType, iconName) => {
    return <Icon name={iconName} size={35} color="#444" />;
};

const GridItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item.label)}>
        <View style={styles.iconContainer}>
            <Text>
                {renderIcon(item.iconType, item.iconName)}
            </Text>
        </View>
        <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
);

const GamesScreen = ({ navigation }) => {

    const handleItemPress = (itemName) => {
        console.log(`Pressed: ${itemName}`);
        // navigation.navigate('BettingScreen', { type: itemName });
    };

    const handleBackPress = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" /> // Match header color

            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>RAJDHANI NIGHT</Text>
                <View style={styles.headerRightPlaceholder} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.gridContainer}>
                    {options.map((item) => (
                        <GridItem key={item.key} item={item} onPress={handleItemPress} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#934b47',
        paddingVertical: 12,
        paddingHorizontal: 15,
        height: 60,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerRightPlaceholder: {
        width: 24 + 10,
    },
    scrollContainer: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: 8,
    },
    itemContainer: {
        width: itemSize,
        height: itemSize + 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        padding: 10,
    },
    iconContainer: {
        marginBottom: 8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 13,
        color: '#00008B',
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default GamesScreen;