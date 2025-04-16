

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AddFundsScreen from './Screens/AddFundsScreen';
import WithdrawalScreen from './Screens/WithdrawalScreen';
import StarlineScreen from './Screens/StarlineScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SignUpScreen from './Screens/SignupScreen';
import LoginScreen from './Screens/LoginScreen';
import PanelChart from './Screens/PanelChart';
import GamesScreen from './Screens/GamesScreen';
import SingleAnkScreen from './Screens/SingleAnkScreen';
import JodiScreen from './Screens/JodiScreen';
import SinglePattiScreen from './Screens/SinglePattiScreen';
import DoublePattiScreen from './Screens/DoublePattiScreen';
import TripplePattiScreen from './Screens/TripplePattiScreen';
import HalfSangamScreen from './Screens/HalfSangamScreen';
import FullSangamScreen from './Screens/FullSangamScreen';
import SpDpTpScreen from './Screens/SpDpTpScreen';

import MyBidsScreen from './Screens/MyBidsScreen';
import PaymentDetailsScreen from './Screens/PaymentDetailsScreen';
import AccountStatementScreen from './Screens/AccountStatementScreen';
import GameRatesScreen from './Screens/GameRatesScreen';
import HowToPlayScreen from './Screens/HowToPlayScreen';
import PrivacyPolicyScreen from './Screens/PrivacyPolicyScreen';
import {
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator() {
  const handleLogout = async (navigation) => {
    console.log("Logout action triggered");

    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      navigation.replace('Login');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };
  return (
    <Drawer.Navigator
      initialRouteName="Home"

      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: '#934b47',
          marginTop: 60,
          marginRight: 40,
          borderRadius: 5,
          width: 240,
          paddingVertical: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        },
        overlayColor: 'transparent',
        headerShown: false,
        drawerActiveBackgroundColor: '#b96b67',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#CBD5E1',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15,
          fontWeight: '500',
          paddingLeft: 15
        },
        drawerItemStyle: {
          marginVertical: 2,
        },

        drawerIcon: ({ color, size }) => (
          <Icon name="circle-medium" size={size} color={color} />
        ),
      })}
    >

      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (

            <Icon name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="My Bid"
        component={MyBidsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="currency-inr" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Payment Details"
        component={PaymentDetailsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="credit-card-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account Statement"
        component={AccountStatementScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="file-document-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Game Rates"
        component={GameRatesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="chart-line" size={size} color={color} />

          ),
        }}
      />
      <Drawer.Screen
        name="How to Play"
        component={HowToPlayScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="play-circle-outline" size={size} color={color} />

          ),
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicyScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="lock-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Logout"

        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="logout" size={size} color={color} />
          ),
        }}

        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {

            e.preventDefault();

            handleLogout(navigation);
          },
        })}
      />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (

    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#313332'}}>
      <StatusBar barStyle="light-content" backgroundColor="#313332" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="MainDrawer" component={DrawerNavigator} />

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddFund" component={AddFundsScreen} />
          <Stack.Screen name="Withdraw" component={WithdrawalScreen} />
          <Stack.Screen name="Starline" component={StarlineScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="PanelChart" component={PanelChart} />
          <Stack.Screen name="Games" component={GamesScreen} />
          <Stack.Screen name="SAnkh" component={SingleAnkScreen} />
          <Stack.Screen name="JodiAce" component={JodiScreen} />
          <Stack.Screen name="SPatti" component={SinglePattiScreen} />
          <Stack.Screen name="DPatti" component={DoublePattiScreen} />
          <Stack.Screen name="TPatti" component={TripplePattiScreen} />
          <Stack.Screen name="HSangam" component={HalfSangamScreen} />
          <Stack.Screen name="FSangam" component={FullSangamScreen} />
          <Stack.Screen name="SPDPTP" component={SpDpTpScreen} />

          <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
          <Stack.Screen name="AccountStatement" component={AccountStatementScreen} />
          <Stack.Screen name="GameRates" component={GameRatesScreen} />
          <Stack.Screen name="HowToPlay" component={HowToPlayScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}