import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-elements'

import { books, book_card } from './Styles';
import { download_book } from './DownloadBook';
import { AuthContext } from './AuthManager';

export default function BookDetails({route, navigation}) {

  const { book } = route.params;
  const { auth } = useContext(AuthContext)

  function buy_book() {
    // Allow only logged in users to buy
    if (!auth.token) {
      Alert.alert(
        "Not logged in",
        "You need to be logged in to buy books",
        [
          {
            text: "Login",
            onPress: () => navigation.navigate("Login")
          },
          {
            text: "Register",
            onPress: () => navigation.navigate("Register")
          },
          {
            text: "Cancel",
            onPress: () => console.log("Canceled")
          }
        ]
      )
    } else {
      navigation.navigate('PayPalWebView', {book: book})
    }
  }

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 50}}>
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
        <Text style={books.detailed_text}>{book.genres[0].name}</Text>
        <Text style={books.detailed_subtitle}>Description</Text>
        <Text style={books.detailed_text}>{book.description}</Text>
        <Text style={books.detailed_subtitle}>Language</Text>
        <Text style={books.detailed_text}>{book.language}</Text>
        <Text style={books.detailed_subtitle}>Publication Date</Text>
        <Text style={books.detailed_text}>{book.publication_date}</Text>
        <Text style={books.detailed_subtitle}>Price</Text>
        <Text style={books.detailed_text}>{book.price}€</Text>
        {book.price == 0 ? (
          <View style={book_card.buttons}>
            <Button
              onPress={() => {
                navigation.navigate('ReadBook', {book: book})
              }}
              title="Read"
              color="#1976D2"
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            />
            <Button
              onPress={() => download_book(book, auth)}
              title="Download"
              color="#1976D2"
            />
          </View>
        ) : (
          <Button
            onPress={buy_book}
            title="Buy"
            color="#1976D2"
          />
        )}
      </Card>
    </ScrollView>
  )
}
