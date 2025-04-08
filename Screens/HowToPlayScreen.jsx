import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const HowToPlayScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>How to Play</Text>
                 <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={"#e5a550"} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                 <View style={styles.contentBox}>
                     <Text style={styles.title}>How To Play</Text>
                     <Text style={styles.paragraph}>
                         Download our application from Google Play Store or from our official website.
                     </Text>
                     <Text style={styles.paragraph}>
                         Register with your Mobile Number, Email ID, User Name with our platform.
                     </Text>
                     <Text style={styles.paragraph}>
                         Login with the application using Mobile Number and Password with your secure PIN code.
                     </Text>
                     <Text style={styles.paragraph}>
                         Select the Game type, select your favourite number and start to Play Game.
                     </Text>
                     <Text style={styles.paragraph}>
                         Get a chance to win upto 10 Lac Points.
                     </Text>
                 </View>
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
     header: { /* ... same as AccountStatementScreen ... */
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#934b47', // Same as other headers
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
walletContainer: { 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
    headerButton: { /* ... same as AccountStatementScreen ... */
        padding: 5,
        minWidth: 40,
        alignItems: 'center',
    },
    headerTitle: { /* ... same as AccountStatementScreen ... */
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerRightIconContainer: { /* ... same as AccountStatementScreen ... */
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        padding: 5,
    },
    badge: { /* ... same as AccountStatementScreen ... */
        position: 'absolute',
        top: -2,
        right: -5,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    badgeText: { /* ... same as AccountStatementScreen ... */
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    scrollContainer: {
        padding: 15,
    },
    contentBox: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
     title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        // textAlign: 'center', // Keep left aligned as per image
    },
    paragraph: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24, // Improve readability
        marginBottom: 15,
    }
});

export default HowToPlayScreen;