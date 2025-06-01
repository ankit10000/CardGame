import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/apiService';

const GameGaliScreen = ({ navigation }) => {
    const [gameData, setGameData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const handleBidHistoryPress = () => {
        navigation.navigate('BidHistory');
    };

    const handleWinHistoryPress = () => {
        navigation.navigate('WinGaliHistory');
    };

    const fetchGamesAndWinners = async () => {
        setRefreshing(true);
        try {
            const [gamesResponse, winnersResponse] = await Promise.all([
                apiService.get('/galidesawar/all-games'),
                apiService.get('/galidesawar/all-winners'),
            ]);

            const currentTime = new Date();
            const winners = winnersResponse.data.winners;

            const games = gamesResponse.data.games.map((game) => {
                const [hours, minutes] = game.closeTime.split(':').map(Number);
                const closeDateTime = new Date();
                closeDateTime.setHours(hours, minutes, 0, 0);
                const status = currentTime < closeDateTime ? 'open' : 'close';

                const winner = winners.find(w => w.gameId === game._id);

                return {
                    id: game._id,
                    name: game.gameName,
                    time: game.closeTime,
                    result: status === 'close' && winner ? winner.result?.jodi || '**' : '**',
                    status: status,
                };
            });

            setGameData(games);
            console.log('Games id', gameData);
        } catch (error) {
            console.error('Error fetching games or winners:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchGamesAndWinners();
    }, []);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#313332" />
            <LinearGradient colors={['#4a0e57', '#3b0a45', '#2c0833']} style={styles.gradientContainer}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name="arrow-back" size={28} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Galidesawar Game</Text>
                        <View style={styles.headerPlaceholder} />
                    </View>

                    <ImageBackground
                        source={require('../assets/bg.jpg')}
                        style={styles.background}
                        resizeMode="cover"
                    >
                        <View style={styles.ratesContainer}>
                            <View style={styles.ratesHeader}>
                                <Text style={styles.ratesTitle}>Game Rates</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('GalidesawarChart', { items: gameData })}>
                                    <Text style={styles.chartLink}>Galidesawar Chart</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.ratesBox}>
                                <View style={styles.rateItem}>
                                    <Text style={styles.rateText}>Left Digit</Text>
                                    <Text style={styles.rateValue}>10 - 90</Text>
                                </View>
                                <View style={styles.rateItem}>
                                    <Text style={styles.rateText}>Right Digit</Text>
                                    <Text style={styles.rateValue}>10 - 90</Text>
                                </View>
                                <View style={styles.rateItem}>
                                    <Text style={styles.rateText}>Jodi Digit</Text>
                                    <Text style={styles.rateValue}>10 - 900</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.historyButtonsContainer}>
                            <TouchableOpacity style={styles.historyButton} onPress={handleBidHistoryPress}>
                                <Text style={styles.historyButtonText}>Bid History</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.historyButton} onPress={handleWinHistoryPress}>
                                <Text style={styles.historyButtonText}>Win History</Text>
                            </TouchableOpacity>
                        </View>

                        {loading ? (
                            <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }} />
                        ) : (
                            <FlatList
                                data={gameData}
                                keyExtractor={item => item.id}
                                contentContainerStyle={styles.scrollViewContent}
                                refreshing={refreshing}
                                onRefresh={fetchGamesAndWinners}
                                renderItem={({ item: game }) => (
                                    <View style={styles.gameCard}>
                                        <View style={styles.gameInfo}>
                                            <Text style={styles.gameName}>{game.name}</Text>
                                            <Text style={styles.gameResult}>{game.result}</Text>
                                            <Text style={styles.gameTime}>{game.time}</Text>
                                        </View>
                                        {game.status === 'close' ? (
                                            <TouchableOpacity style={styles.cardStatusContainer}>
                                                <View style={styles.closeIconCircle}>
                                                    <Ionicons name="close" size={22} color={"#ffffff"} />
                                                </View>
                                                <Text style={styles.closeText}>{game.status.toUpperCase()}</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity
                                                style={styles.cardStatusContainer}
                                                onPress={() => navigation.navigate('GameGali', { game })}
                                            >
                                                <View style={styles.playIconCircle}>
                                                    <Ionicons name="play" size={22} color={"#ffffff"} />
                                                </View>
                                                <Text style={styles.runningText}>{game.status.toUpperCase()}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}
                                style={styles.gameListContainer}
                            />
                        )}
                    </ImageBackground>
                </SafeAreaView>
            </LinearGradient>
        </>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    playIconCircle: {
        backgroundColor: "green",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
        borderWidth: 1,
        borderColor: "#4D2D7A",
    },
    closeIconCircle: {
        backgroundColor: "#e31202",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
        borderWidth: 1,
        borderColor: "#4D2D7A",
    },
    cardStatusContainer: {
        alignItems: 'center',
        paddingLeft: 10,
    },
    gradientContainer: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#5a1a69',
        minHeight: 50,
    },
    backButton: {
        padding: 5,
        marginRight: 15,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    headerPlaceholder: {
        width: 48,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },

    ratesContainer: {
        paddingHorizontal: 15,
        marginTop: 20,
        marginBottom: 20,
    },
    ratesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    ratesTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    chartLink: {
        color: '#64b5f6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    ratesBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 8,
        padding: 15,
    },
    rateItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    rateText: {
        color: '#E0E0E0',
        fontSize: 15,
    },
    rateValue: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },

    historyButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 15,
        marginBottom: 25,
    },
    historyButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 8,
        alignItems: 'center',
    },
    historyButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },

    gameListContainer: {
        paddingHorizontal: 15,
    },
    gameCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    gameInfo: {
        flex: 1,
    },
    gameName: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    gameResult: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    gameTime: {
        color: '#E0E0E0',
        fontSize: 15,
    },
    playButton: {
        marginLeft: 15,
        padding: 5,
    },

    runningText:
    {
        color: 'green',
        fontSize: 14,
        fontWeight: 'bold',
    },
    closeText: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default GameGaliScreen;
