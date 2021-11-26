import React, { Component, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

import { AuthContext } from './AuthManager';

export default function TestWebView() {

  const [approveLink, setApproveLink] = useState("");
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const instance = axios.create();
    instance.post('/checkout/paypal/order/create/', {
      book_ids: [10, 11],
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
    <WebView source={{uri: approveLink}} />
  )
}