import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './components/BottomTabNavigator';

import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import { AuthProvider } from './components/AuthManager';

axios.defaults.baseURL = 'https://api.hlgbooks.com'
//axios.defaults.baseURL = 'http://12a5-86-115-55-28.ngrok.io'

export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
