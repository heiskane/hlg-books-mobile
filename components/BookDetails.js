import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';

export default function BookDetails({route}) {

  const { book } = route.params;

  return (
    <View style={styles.book}>
      <Image
        source={{ uri: `${axios.defaults.baseURL}/books/${book.id}/image/`}}
        style={{ width: 100, height: 100 }}
      />
      <Text>Title: {book.title}</Text>
      <Text>Description: {book.description}</Text>
      <Text>Language: {book.language}</Text>
      <Text>Publication Date: {book.publication_date}</Text>
      <Text>Price: {book.price}€</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  book: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});