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

export default class Book extends React.PureComponent {

  render() {
    return (
      {/* https://github.com/SiDevesh/React-Native-Material-Cards/issues/19 */},
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('BookDetails', {book: this.props.book})}
      >
        <Card style={book_card.book}>
          <CardImage
            style={book_card.image}
            resizeMode="contain"
            source={{ uri: `${axios.defaults.baseURL}/books/${this.props.book.id}/image/`}}
          />
          <CardTitle
            title={this.props.book.title}
            subtitle={this.props.book.genres[0].name}
          />
          <CardContent text={this.props.book.description} />
          <CardContent text={'Price: ' + this.props.book.price + '€'} />
          <CardAction
            separator={true}
            inColumn={false}
          >
            <CardButton
              onPress={() => this.props.navigation.navigate('ReadBook', {book: this.props.book})}
              title="Read"
              color="blue"
            />
          </CardAction>
        </Card>
      </TouchableOpacity>
    )
  }


}
