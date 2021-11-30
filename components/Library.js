import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, FlatList, StyleSheet, View, Dimensions } from 'react-native';
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
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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
        return (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20
          }}>
            <Text style={{
              fontSize: 20
            }}>You do not own any books.</Text>
          </View>
        )
      }
      return  <FlatList
          style={books.books}
          data={books}
          renderItem={({item}) => <BookOwned book={item} navigation={navigation} /> }
        />
  }

  return (
    <>
    <SafeAreaView style={books.container}>
      <RenderBooks />
    </SafeAreaView>
    {isLoading &&
      <ActivityIndicator
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        size="large"
        color="#0000ff"
        />
    }
    </>
  )
}
