import React, { useEffect, useState, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from 'expo-secure-store';

import Home from "./Home";
import Library from "./Library";
import Login from "./Login";
import Logout from "./Logout";
import { AuthContext } from './AuthManager';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  const { auth } = useContext(AuthContext);

  //console.log("TabNavigator: " + JSON.stringify(auth))

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
      />
      {auth.token ? (
        <>
          <Tab.Screen name="My Library" component={Library} />
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