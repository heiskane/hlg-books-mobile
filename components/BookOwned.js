import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Button
} from 'react-native';
import { Card } from 'react-native-elements'
import axios from 'axios';

import { book_card } from './Styles';
import { AuthContext } from './AuthManager';
import { download_book } from './DownloadBook';


export default class BookOwned extends React.PureComponent {

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
        </Card>
      </TouchableOpacity>
    )
  }
}

BookOwned.contextType = AuthContext;