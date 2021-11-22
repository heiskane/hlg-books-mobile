import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import Book from './Book';

export default function Library({ navigation }) {
  
  const [books, setBooks] = useState([]);

  useEffect(async () => {
    
    let token = await SecureStore.getItemAsync("auth_token")

    const instance = axios.create();
    instance.get("/profile/library/", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => {
        setBooks(res.data)
      })
  })
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.books}
        data={books}
        renderItem={({item}) => <Book book={item} navigation={navigation} /> }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  books: {
    width: '100%'
  }
});