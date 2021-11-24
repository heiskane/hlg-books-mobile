import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import Book from './Book';
import { books } from './Styles';
import { AuthContext } from './AuthManager';

export default function Library({ navigation }) {
  
  const [books, setBooks] = useState([]);
  const { auth } = useContext(AuthContext);
  
  useEffect(async () => {
    
    const instance = axios.create();
    instance.get("/profile/library/", {
      headers: {
        'Authorization': 'Bearer ' + auth.token
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
