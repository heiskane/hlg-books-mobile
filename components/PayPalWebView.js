import React, { Component, useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

import { AuthContext } from './AuthManager';

export default function PayPalWebView({route, navigation}) {

  const [loading, setLoading] = useState(true);
  const [approveLink, setApproveLink] = useState("");
  const { auth } = useContext(AuthContext);
  const { book } = route.params;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const instance = axios.create();
    instance.post('/checkout/paypal/order/create/', {
      book_ids: [book.id],
    },
    {
      headers: {
        'Authorization': 'Bearer ' + auth.token
      }
    }
    )
    .then((res) => {
      let links = res.data.result._dict.links

      // Get approve link
      let approve_link = links.find(i => i.rel === 'approve')
      setApproveLink(approve_link.href)
    })
  }, [])


  return (
    <>
      <WebView
        onLoad={() => setLoading(false)}
        source={{uri: approveLink}} />
      {loading && (
        <ActivityIndicator
          style={{
// https://stackoverflow.com/questions/44046500/how-do-i-overlay-activityindicator-in-react-native
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          size="large"
          color="#1976D2"
        />
      )}
    </>
  )
}