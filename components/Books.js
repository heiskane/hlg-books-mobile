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
import { books } from './Styles';

export default function Books({navigation}) {
  
  const [refreshing, setRefreshing] = useState(false);
  const [books, setBooks] = useState([]);

  function fetch_books() {
    const instance = axios.create();
    instance.get("/async_books/")
      .then((res) => {
        setBooks(res.data)
        setRefreshing(false);
      })
  }

  function on_refresh() {
    fetch_books();
    setRefreshing(true);
  }

  useEffect(() => {
    fetch_books();
  }, [])

  return (
    <SafeAreaView style={books.container}>
      <FlatList
        style={books.books}
        data={books}
        onRefresh={on_refresh}
        refreshing={refreshing}
        renderItem={({item}) =>
          <Book book={item} navigation={navigation} />
        }
      />
    </SafeAreaView>
  )
}
