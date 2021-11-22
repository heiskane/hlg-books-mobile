import { useEffect, useContext } from 'react';

import { AuthContext } from './AuthManager';

export default function Logout({ navigation }) {

  const { delAuth } = useContext(AuthContext);

  useEffect(async () => {
    await delAuth()
    navigation.navigate("Home") // goBack() Instead?
  }, [])

  return null;

}