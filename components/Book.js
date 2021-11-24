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

// Use pure component for better performance
export default class Book extends React.PureComponent {

  // ({book, this.props.navigation})

  render() {

    return (
      {/* https://github.com/SiDevesh/React-Native-Material-Cards/issues/19 */},
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('BookDetails', {book: this.props.book})}
      >
        <Card style={styles.book}>
          <CardImage
            style={styles.image}
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
            {this.props.book.price == 0 &&
              <CardButton
                onPress={() => this.props.navigation.navigate('ReadBook', {book: this.props.book})}
                title="Read"
                color="blue"
              />
            }
            <CardButton
              title="Add to Cart?"
              color="blue"
            />
          </CardAction>
        </Card>
      </TouchableOpacity>
    )
  }

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