import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList
} from 'react-native';
import axios from 'axios';
import Book from './Book';

export default function Books({navigation}) {
  
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const instance = axios.create();
    instance.get("/async_books/")
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