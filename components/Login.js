import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default function Login({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function setAuthToken(value) {
    await SecureStore.setItemAsync("auth_token", value)
  }

  function handleSubmit() {

    const formData = new FormData();
    formData.append("username", username)
    formData.append("password", password)

    const instance = axios.create();
    instance.post("/login/", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
    .then((res) => {
      // https://docs.expo.dev/versions/latest/sdk/securestore/
      setAuthToken(res.data.access_token)
      setUsername("")
      setPassword("")
      navigation.navigate("Home")
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