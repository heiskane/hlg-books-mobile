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
import { PermissionsAndroid } from 'react-native';

import { download_book } from './DownloadBook';

// Use pure component for better performance
export default class Book extends React.PureComponent {

  handleDownload = async () => {

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Tile for request",
        message: "Message for request",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permissions Granted")
    } else {
      console.log("Permissions denied")
    }
    download_book(this.props.book)
  }

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
              <>
                <CardButton
                  onPress={() => this.props.navigation.navigate('ReadBook', {book: this.props.book})}
                  title="Read"
                  color="blue"
                />
                <CardButton
                  onPress={() => download_book(this.props.book)}
                  title="Download"
                  color="blue"
                />
              </>
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