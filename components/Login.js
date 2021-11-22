import React, { useState, useContext } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { AuthContext } from './AuthManager';

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
      setUsername("");
      setPassword("");
      navigation.navigate("Home");
    })
    .catch((err) => {
      console.log(err)
      alert("Login failed")
    })
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.inputView}
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.inputView}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button onPress={handleSubmit} title="Login" />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: "#DDD",
    borderRadius: 25,
    width: "65%",
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    padding: 15
  }
});