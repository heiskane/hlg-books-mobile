import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import Book from './Book';
import { books } from './Styles';

export default function Library({ navigation }) {
  
  const [books, setBooks] = useState([]);

  useEffect(async () => {
    
    let { token } = JSON.parse(await SecureStore.getItemAsync("auth"))

    const instance = axios.create();
    instance.get("/profile/library/", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => {
        setBooks(res.data)
      })
  }, [])
  
  return (
    <SafeAreaView style={books.container}>
      <FlatList
        style={books.books}
        data={books}
        renderItem={({item}) => <Book book={item} navigation={navigation} /> }
      />
    </SafeAreaView>
  )
}
