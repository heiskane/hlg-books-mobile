import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { ActivityIndicator } from "react-native";

import BookOwned from './BookOwned';
import { books } from './Styles';
import { AuthContext } from './AuthManager';

export default function Library({ navigation }) {
  
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const { auth } = useContext(AuthContext);
  
  function fetch_books() {
    const instance = axios.create();
    instance.get("/profile/library/", {
      headers: {
        'Authorization': 'Bearer ' + auth.token
      }
    })
      .then((res) => {
        setBooks(res.data)
        setIsLoading(false);
      })
  }

  useEffect(async () => {
    fetch_books();
    // Refresh page everytime its opened
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetch_books();
    })
    return willFocusSubscription;
  }, [])
  
  function RenderBooks() {
      if (books.length <= 0) {
        return <Text>You do not own any books.</Text>
      }
      return  <FlatList
          style={books.books}
          data={books}
          renderItem={({item}) => <BookOwned book={item} navigation={navigation} /> }
        />
  }

  return (
    <SafeAreaView style={books.container}>
    {isLoading ?
      <ActivityIndicator size="large" color="#00ff00" />
      :
      <RenderBooks />
    }
    </SafeAreaView>
  )
}
