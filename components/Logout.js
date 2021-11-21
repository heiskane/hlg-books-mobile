import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function Logout({navigation}) {

    useEffect(async () => {
      await SecureStore.deleteItemAsync("auth_token")
      navigation.navigate("Login")
    })

    return null;

}