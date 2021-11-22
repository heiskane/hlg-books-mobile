import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';

import { books } from './Styles';

export default function BookDetails({route}) {

  const { book } = route.params;

  return (
    <View style={books.detailed}>
      <Image
        source={{ uri: `${axios.defaults.baseURL}/books/${book.id}/image/`}}
        style={{
          width: '100%',
          height: 300,
          resizeMode: 'contain'
        }}
      />
      <View style={books.detailed_info}>
        <Text style={books.detailed_title}>{book.title}</Text>
        <Text>Description: {book.description}</Text>
        <Text>Language: {book.language}</Text>
        <Text>Publication Date: {book.publication_date}</Text>
        <Text>Price: {book.price}€</Text>
      </View>
    </View>
  )
}
