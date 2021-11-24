import React, { useState, useContext } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

import { AuthContext } from './AuthManager'
import { forms } from './Styles';

export default function Register({ navigation }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useContext(AuthContext);
 
  function handleSubmit() {

    const instance = axios.create();
    instance.post("/users/", {
      username: username,
      email: email,
      password: password
    })
    .then(async (res) => {
      await setAuth({token: res.data.access_token})
      navigation.navigate("Home");
    })
    .catch((err) => {
      console.log(err)
      alert("Registration failed")
    })
  }

  return (
    <View style={forms.container}>
      <Text>Register</Text>
      <TextInput
        style={forms.inputView}
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={forms.inputView}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
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