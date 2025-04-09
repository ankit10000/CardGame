
import React, { useCallback } from 'react';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';


const { width } = Dimensions.get('window');
const itemSize = width / 3 - 16;

const options = [
    { key: '1', label: 'Signle Ank', iconType: 'dice', iconName: 'dice-5-outline', nav: 'SAnkh' },
    { key: '2', label: 'Jodi', iconType: 'dice', iconName: 'dice-multiple-outline', nav: 'JodiAce' },
    { key: '3', label: 'Single Patti', iconType: 'card', iconName: 'cards-spade-outline', nav: 'SPatti' },
    { key: '4', label: 'Double Patti', iconType: 'card', iconName: 'cards-outline', nav: 'DPatti' },
    { key: '5', label: 'Tripple Patti', iconType: 'card', iconName: 'cards-playing-outline', nav: 'TPatti' },
    { key: '6', label: 'Half Sangam', iconType: 'other', iconName: 'chart-arc', nav: 'HSangam' },
    { key: '7', label: 'Full Sangam', iconType: 'other', iconName: 'circle-slice-8', nav: 'FSangam' },
    { key: '8', label: 'SP DP TP', iconType: 'other', iconName: 'triangle-outline', nav: 'SPDPTP' },
];

const renderIcon = (iconType, iconName) => {
    return <Icon1 name={iconName} size={35} color="#444" />;
};


const GridItem = React.memo(({ item, onPress }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
        <View style={styles.iconContainer}>
            {/* Removed unnecessary Text wrapper around Icon */}
            {renderIcon(item.iconType, item.iconName)}
        </View>
        <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
));

const GamesScreen = ({ navigation }) => {


    const handleItemPress = useCallback((item) => {
        if (item.nav) {
            navigation.navigate(item.nav);
        } else {
            console.warn(`Navigation target not defined for item: ${item.label}`);

        }
    }, [navigation]);

    const handleBackPress = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>SRIDEVI MORNING</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
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
        paddingHorizontal: 10,
    },
    itemContainer: {

        width: itemSize,
        height: itemSize,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 4,
        padding: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    iconContainer: {
        marginBottom: 8,

        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
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

export default GamesScreen;