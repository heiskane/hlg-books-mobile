import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from 'react-native-material-cards'
import axios from 'axios';

import { book_card } from './Styles';

export default function Book({book, navigation}) {

  return (
    {/* https://github.com/SiDevesh/React-Native-Material-Cards/issues/19 */},
    <TouchableOpacity
      onPress={() => navigation.navigate('BookDetails', {book: book})}
    >
      <Card style={book_card.book}>
        <CardImage
          style={book_card.image}
          resizeMode="contain"
          source={{ uri: `${axios.defaults.baseURL}/books/${book.id}/image/`}}
        />
        <CardTitle
          title={book.title}
          subtitle={book.genres[0].name}
        />
        <CardContent text={book.description} />
        <CardContent text={'Price: ' + book.price + '€'} />
        <CardAction
          separator={true}
          inColumn={false}
        >
          <CardButton
            onPress={() => navigation.navigate('ReadBook', {book: book})}
            title="Read"
            color="blue"
          />
        </CardAction>
      </Card>
    </TouchableOpacity>
  )

}
