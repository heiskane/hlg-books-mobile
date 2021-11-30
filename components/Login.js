import React, { useState, useContext } from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { AuthContext } from './AuthManager';
import { forms } from './Styles';

export default function Login({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useContext(AuthContext);
 
  function handleSubmit() {

    const formData = new FormData();
    formData.append("username", username)
    formData.append("password", password)

    const instance = axios.create();
    instance.post("/login/", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
    .then(async (res) => {
      await setAuth({token: res.data.access_token})
      navigation.navigate("Home");
    })
    .catch((err) => {
      console.log(err)
      Alert.alert("Error", "Login failed")
    })
    setPassword("");
  }

  return (
    <View style={forms.container}>
      <Text style={forms.form_title}>Login</Text>
      <TextInput
        style={forms.inputView}
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={forms.inputView}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button onPress={handleSubmit} title="Login" />
    </View>
  )

}
