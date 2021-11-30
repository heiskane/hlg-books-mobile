import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator
} from 'react-native';
import { Card } from 'react-native-elements'
import axios from 'axios';

import { AuthContext } from './AuthManager';
import { download_book } from './DownloadBook';
import { book_card } from './Styles';
import PayPalWebView from './PayPalWebView';


// Use pure component for better performance
export default class Book extends React.PureComponent {

  buy_book = () => {
    // Allow only logged in users to buy
    if (!this.context.auth.token) {
      Alert.alert(
        "Not logged in",
        "You need to be logged in to buy books",
        [
          {
            text: "Login",
            onPress: () => this.props.navigation.navigate("Login")
          },
          {
            text: "Register",
            onPress: () => this.props.navigation.navigate("Register")
          },
          {
            text: "Cancel",
            onPress: () => console.log("Canceled")
          }
        ]
      )
    } else {
      this.props.navigation.navigate('PayPalWebView', {book: this.props.book})
    }
  }

  render() {

    return (
      {/* https://github.com/SiDevesh/React-Native-Material-Cards/issues/19 */},
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('BookDetails', {book: this.props.book})}
      >
        <Card style={book_card.book}>
          <Card.Image
            style={book_card.image}
            PlaceholderContent={
              <ActivityIndicator size="large" color="#0000ff"/>
            }
            source={{ uri: `${axios.defaults.baseURL}/books/${this.props.book.id}/image/`}}
          />
          <Card.Title style={book_card.title}>{this.props.book.title}</Card.Title>
          <Text style={book_card.description}>{this.props.book.description}</Text>
          <Text style={book_card.price}>{this.props.book.price + '€'}</Text>
          {this.props.book.price == 0 ? (
            <View style={book_card.buttons}>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('ReadBook', {book: this.props.book})
                }}
                title="Read"
                color="#1976D2"
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              />
              <Button
                onPress={() => download_book(this.props.book, this.context.auth)}
                title="Download"
                color="#1976D2"
              />
            </View>
          ) : (
            <Button
              onPress={this.buy_book}
              title="Buy"
              color="#1976D2"
            />
          )}
        </Card>
      </TouchableOpacity>
    )
  }

}

Book.contextType = AuthContext;
