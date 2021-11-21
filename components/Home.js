import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';
import Books from './Books';
import BookDetails from './BookDetails';

const Stack = createNativeStackNavigator();

export default function Home() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Books"
        component={Books}
      />
      <Stack.Screen name="BookDetails" component={BookDetails} />
    </Stack.Navigator>
  );
}