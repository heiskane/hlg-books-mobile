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
        <Text style={books.detailed_subtitle}>Genre</Text>
        <Text>{book.genres[0].name}</Text>
        <Text style={books.detailed_subtitle}>Description</Text>
        <Text>{book.description}</Text>
        <Text style={books.detailed_subtitle}>Language</Text>
        <Text>{book.language}</Text>
        <Text style={books.detailed_subtitle}>Publication Date</Text>
        <Text>{book.publication_date}</Text>
        <Text style={books.detailed_subtitle}>Price</Text>
        <Text>{book.price}€</Text>
      </View>
    </View>
  )
}
