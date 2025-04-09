import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { chartData } from '../Data/data';

const screenWidth = Dimensions.get('window').width;
const dateColWidth = screenWidth * 0.20;
const HEADER_BG_COLOR = '#e6f2ff';
const DATE_BG_COLOR = '#f8f9fa';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const COLORS = {
    headerBackground: '#934b47',
    headerText: '#ffffff',
    background: '#f4f7f9',
    cardBackground: '#ffffff',
    inputBorder: '#e0e0e0',
    inputPlaceholder: '#999999',
    inputText: '#333333',
    minAmountText: '#444444',
    amountButtonBackground: '#f8f9fa',
    amountButtonBorder: '#e9ecef',
    amountButtonText: '#343a40',
    amountButtonSelectedBackground: '#ddeeff',
    amountButtonSelectedBorder: '#aaccff',
    payButtonBackground: '#1d5da8',
    payButtonText: '#ffffff',
    walletIcon: '#e5a550',
    walletTextBackground: '#d3d3d3',
    walletTextColor: '#333',
};
const PanelChart = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Icon name="arrow-back" size={26} color={COLORS.headerText} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Funds</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddFund')}>
                    <View style={styles.walletContainer}>
                        <Icon name="account-balance-wallet" size={20} color={COLORS.walletIcon} />
                        <Text style={styles.walletText}>0</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, padding: 16 }} horizontal>
                <ScrollView style={{ borderWidth: 1 }}>
                    <View style={styles.row}>
                        <View style={[styles.cell, styles.dateCell, { backgroundColor: HEADER_BG_COLOR }]}>
                            <Text style={styles.headerText}>Date</Text>
                        </View>
                        {days.map((day) => (
                            <View key={day} style={[styles.cell, { backgroundColor: HEADER_BG_COLOR }]}>
                                <Text style={styles.headerText}>{day}</Text>
                            </View>
                        ))}
                    </View>

                    {chartData.map((week, index) => (
                        <View key={index} style={styles.row}>
                            <View style={[styles.cell, styles.enhancedCell, styles.dateCell, { backgroundColor: DATE_BG_COLOR, borderWidth: 1 }]}>
                                <Text style={styles.dateText}>{week.date}</Text>
                            </View>

                            {days.map((dayKey) => {
                                const dayData = week[dayKey.toLowerCase()];

                                return (
                                    <View
                                        key={dayKey}
                                        style={[
                                            styles.cell,
                                            dayData ? styles.activeCell : styles.inactiveCell,
                                            styles.enhancedCell,
                                        ]}
                                    >
                                        {dayData ? (
                                            <>
                                                <View style={{ width: '80%', flexDirection: "row" }}>
                                                    {/* Row 1 */}
                                                    <View style={{ flexDirection: 'colmn', justifyContent: 'space-between', marginBottom: 2 }}>
                                                        <Text style={styles.cellText}>{dayData.p1 != "" ? dayData.p1 : "*"}</Text>
                                                        <Text style={styles.cellText}>{dayData.p2 != "" ? dayData.p2 : "*"}</Text>
                                                        <Text style={styles.cellText}>{dayData.p3 != "" ? dayData.p3 : "*"}</Text>
                                                    </View>

                                                    {/* Result row */}
                                                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginHorizontal: 8 }}>
                                                        <Text style={styles.resultText}>{dayData.result != "" ? dayData.result : "*"}</Text>
                                                    </View>

                                                    {/* Row 2 */}
                                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                                        <Text style={styles.cellText}>{dayData.p4 != "" ? dayData.p4 : "*"}</Text>
                                                        <Text style={styles.cellText}>{dayData.p5 != "" ? dayData.p5 : "*"}</Text>
                                                        <Text style={styles.cellText}>{dayData.p6 != "" ? dayData.p6 : "*"}</Text>
                                                    </View>
                                                </View>

                                            </>
                                        ) : (
                                            <Text style={styles.noDataText}>-</Text>
                                        )}
                                    </View>

                                );
                            })}
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.headerBackground,
        paddingHorizontal: 10,
        paddingVertical: 12,
        height: 60,
    },
    headerButton: {
        padding: 5,
        minWidth: 40,
        alignItems: 'center',
    },
    headerTitle: {
        color: COLORS.headerText,
        fontSize: 20,
        fontWeight: 'bold',
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.headerText,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
    walletText: {
        color: COLORS.walletTextColor,
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 5,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        padding: 0,
        margin: 0,
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
        minHeight: 100,
    },
    dateCell: {
        width: dateColWidth,
        paddingHorizontal: 4,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    dateText: {
        fontWeight: '600',
        fontSize: 11,
        textAlign: 'center',
    },
    enhancedCell: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        transform: [{ scale: 1.05 }],
    },
    cellText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        marginVertical: 4,
        flexDirection: 'column',
    },
    resultText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        marginVertical: 1,
    },
    noDataText: {
        fontSize: 10,
        color: '#999',
    },
    activeCell: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#313332',
    },
    inactiveCell: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default PanelChart;
