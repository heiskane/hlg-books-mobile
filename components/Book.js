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
export default function Book({book, navigation}) {

  return (
    {/* https://github.com/SiDevesh/React-Native-Material-Cards/issues/19 */},
    <TouchableOpacity
      onPress={() => navigation.navigate('BookDetails', {book: book})}
    >
      <Card style={styles.book}>
        <CardImage
          style={styles.image}
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
            onPress={() => alert("To be implemented later")}
            title="Read?"
            color="blue"
          />
          <CardButton
            title="Add to Cart?"
            color="blue"
          />
        </CardAction>
      </Card>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  book: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1
  },
  image: {
    backgroundColor: '#fff'
  }
});