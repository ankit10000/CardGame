// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0F172A' }}> 
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Game"
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#2E2E2E', // dark slate background for modern feel
              marginTop: 55,
              marginRight: 40,
              borderRadius: 20,
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
            drawerActiveBackgroundColor: '#444', // active item color
            drawerActiveTintColor: '#FFD700', // active icon/text color
            drawerInactiveTintColor: '#CBD5E1', // inactive color
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
              drawerIcon: ({ color, size }) => (
                <Icon name="gamepad-variant" size={24} style={{marginRight:10}} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name="account-circle" size={24} style={{marginRight:10}} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
