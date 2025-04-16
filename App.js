// App.tsx

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
import ChatNowScreen from './Screens/ChatNowScreen';
import CallNowScreen from './Screens/CallNowScreen';
import StarlineScreen from './Screens/StarlineScreen';
import DetailScreen from './Screens/DetailScreen';
// Use a consistent Icon library - MaterialCommunityIcons used below
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Or import specific icons if needed from MaterialIcons etc.
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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

// --- Add Imports for New Drawer Screens (Replace with your actual paths) ---
import MyBidsScreen from './Screens/MyBidsScreen'; // Placeholder
import PaymentDetailsScreen from './Screens/PaymentDetailsScreen'; // Placeholder
import AccountStatementScreen from './Screens/AccountStatementScreen'; // Placeholder
import GameRatesScreen from './Screens/GameRatesScreen'; // Placeholder
import HowToPlayScreen from './Screens/HowToPlayScreen'; // Placeholder
import PrivacyPolicyScreen from './Screens/PrivacyPolicyScreen'; // Placeholder
// Logout might be handled differently (e.g., function call), but can be a screen placeholder
// import LogoutHandler from './utils/LogoutHandler'; // Or a component triggering logout
import {
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// --- Updated Drawer Navigator ---
function DrawerNavigator() {
  // Function to handle logout - You'd trigger this onPress for the Logout item
  // This often involves clearing auth state and navigating to Login
  const handleLogout = async (navigation) => {
    console.log("Logout action triggered");

    try {
        // Token aur user data ko remove karo
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');

        // Navigate back to Login screen
        navigation.replace('Login'); // replace karega taaki user back button se wapas na ja sake
    } catch (error) {
        console.log('Error during logout:', error);
    }
};
  return (
    <Drawer.Navigator
      initialRouteName="Home" // Changed initial route to Home
      // drawerContent={(props) => <CustomDrawerContent {...props} />} // Add this later for header/logout logic
      screenOptions={({ navigation }) => ({ // Make navigation available in screenOptions
        drawerStyle: {
          backgroundColor: '#934b47', // Keep existing style
          marginTop: 60, // Keep existing style
          marginRight: 40, // Keep existing style
          borderRadius: 5, // Keep existing style
          width: 240, // Keep existing style
          paddingVertical: 10, // Adjust padding if needed
          shadowColor: '#000', // Keep existing style
          shadowOffset: { width: 0, height: 2 }, // Keep existing style
          shadowOpacity: 0.3, // Keep existing style
          shadowRadius: 5, // Keep existing style
          elevation: 5, // Keep existing style
        },
        overlayColor: 'transparent', // Keep existing style
        headerShown: false, // Keep existing style
        drawerActiveBackgroundColor: '#b96b67', // Keep existing style
        drawerActiveTintColor: '#fff', // Keep existing style
        drawerInactiveTintColor: '#CBD5E1', // Keep existing style (light text on dark bg)
        drawerLabelStyle: { // Keep existing style
          marginLeft: -20, // Adjust icon spacing if needed
          fontSize: 15, // Slightly smaller font maybe
          fontWeight: '500',
          paddingLeft:15 // Adjust weight if needed
        },
        drawerItemStyle: {
          marginVertical: 2, // Add slight vertical spacing between items
        },
        // Default icon style
        drawerIcon: ({ color, size }) => (
            <Icon name="circle-medium" size={size} color={color} /> // Default placeholder icon
        ),
      })}
    >
      {/* User Info Header - Implement using drawerContent prop later */}

      <Drawer.Screen
        name="Home" // Renamed from "Game"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Profile" // Renamed from "Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            // Choose one style: account-circle (filled) or account-outline
            <Icon name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />
       
        <Drawer.Screen
        name="My Bid"
        component={MyBidsScreen} // Use your actual Bids screen
        options={{
          drawerIcon: ({ color, size }) => (
            // Using Material Icons Rupee symbol here for variety
            // Make sure to import MaterialIcon if you use it
            // import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
            // <MaterialIcon name="currency-rupee" size={size} color={color} />
            // Or using MCommunityIcons
            <Icon name="currency-inr" size={size} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Payment Details"
        component={PaymentDetailsScreen} // Use your actual Payment screen
        options={{
          drawerIcon: ({ color, size }) => (
             <Icon name="credit-card-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account Statement"
        component={AccountStatementScreen} // Use your actual Statement screen
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="file-document-outline" size={size} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Game Rates"
        component={GameRatesScreen} // Use your actual Rates screen
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="chart-line" size={size} color={color} />
            // Or: <Icon name="star-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="How to Play"
        component={HowToPlayScreen} // Use your actual How To Play screen
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="play-circle-outline" size={size} color={color} />
            // Or: <Icon name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicyScreen} // Use your actual Policy screen
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="lock-outline" size={size} color={color} />
          ),
        }}
      />
     
      <Drawer.Screen
        name="Logout"
        // component={LoginScreen} // Navigate back to Login on press (better handled via onPress)
        component={HomeScreen} // Temporary placeholder component - DO NOT NAVIGATE HERE
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="logout" size={size} color={color} />
          ),
        }}
        // --- IMPORTANT: Add listener for logout ---
         listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            // Prevent default navigation behavior
            e.preventDefault();
            // Call your logout function
            handleLogout(navigation);
          },
        })}
      />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    // Consider changing the background color if needed
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#313332' /* Light purple/grey? */ }}>
    <StatusBar barStyle="light-content" backgroundColor="#313332" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          {/* Auth Screens */}
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* Main App with Drawer */}
          <Stack.Screen name="MainDrawer" component={DrawerNavigator} />

          {/* Other Screens accessible from anywhere (e.g., nested stacks or modals) */}
          {/* Keep these if they are pushed ON TOP of the drawer screens */}
          {/* If they should be INSIDE the drawer, move them into DrawerNavigator or a nested stack */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddFund" component={AddFundsScreen} />
          <Stack.Screen name="Withdraw" component={WithdrawalScreen} />
          <Stack.Screen name="ChatNow" component={ChatNowScreen} />
          <Stack.Screen name="CallNow" component={CallNowScreen} />
          <Stack.Screen name="Starline" component={StarlineScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
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

           {/* Add New Screens Here if they are part of the main stack */}
          {/* <Stack.Screen name="MyBids" component={MyBidsScreen} /> */}
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