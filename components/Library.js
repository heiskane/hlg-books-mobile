import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import BookOwned from './BookOwned';
import { books } from './Styles';
import { AuthContext } from './AuthManager';

export default function Library({ navigation }) {
  
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
      })
  }

  useEffect(async () => {
    fetch_books();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetch_books();
    })
    return willFocusSubscription;
  }, [])
  
  return (
    <SafeAreaView style={books.container}>
      {books.length == 0 ? (
        <Text>You do not own any books.</Text>
      ) : (
        <FlatList
          style={books.books}
          data={books}
          renderItem={({item}) => <BookOwned book={item} navigation={navigation} /> }
        />
      )}
    </SafeAreaView>
  )
}
