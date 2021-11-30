import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-elements'

import { books, book_card } from './Styles';

export default function BookDetails({route}) {

  const { book } = route.params;

  return (
    <Card style={books.detailed}>
      <Card.Image
        PlaceholderContent={
          <ActivityIndicator size="large" color="#0000ff"/>
        }
        source={{ uri: `${axios.defaults.baseURL}/books/${book.id}/image/`}}
        style={book_card.image}
      />
      <Card.Title style={book_card.title}>{book.title}</Card.Title>
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
    </Card>
  )
}
