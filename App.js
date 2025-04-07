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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SignUpScreen from './Screens/SignupScreen';
import LoginScreen from './Screens/LoginScreen';
import PanelChart from './Screens/PanelChart';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Drawer Navigator Component
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Game"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#934b47',
          marginTop: 60,
          marginRight: 40,
          borderRadius: 5,
          width: 240,
          paddingVertical: 20,
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
          marginLeft: -15,
          fontSize: 16,
          fontWeight: '600',
        },
      }}
    >
      <Drawer.Screen
        name="Game"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="gamepad-variant" size={24} style={{ marginRight: 10 }} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="account-circle" size={24} style={{ marginRight: 10 }} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0F172A' }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          {/* Stack screens */}
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* Drawer Navigator as main screen */}
          <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddFund" component={AddFundsScreen} />
          <Stack.Screen name="Withdraw" component={WithdrawalScreen} />
          <Stack.Screen name="ChatNow" component={ChatNowScreen} />
          <Stack.Screen name="CallNow" component={CallNowScreen} />
          <Stack.Screen name="Starline" component={StarlineScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="PanelChart" component={PanelChart} />
        </Stack.Navigator>

      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
