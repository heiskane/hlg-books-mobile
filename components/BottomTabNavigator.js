import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from 'expo-secure-store';

import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  const [jwtToken, setJwtToken] = useState("");

  useEffect(async () => {
    let token = await SecureStore.getItemAsync("auth_token")
    setJwtToken(token)
    //alert(token)
  })

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
      />
      {jwtToken ? (
        <>
          <Tab.Screen name="My Library" component={Home} />
          <Tab.Screen
            name="Logout"
            component={Logout}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;