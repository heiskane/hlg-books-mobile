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
  
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const instance = axios.create();
    instance.get("/async_books/")
      .then((res) => {
        setBooks(res.data)
      })
  }, [])

  return (
    <SafeAreaView style={books.container}>
      <FlatList
        style={books.books}
        data={books}
        renderItem={({item}) =>
          <Book book={item} navigation={navigation} />
        }
      />
    </SafeAreaView>
  )
}
