import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Feather';
import * as SecureStore from 'expo-secure-store';

import Home from "./Home";
import Library from "./Library";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import { AuthContext } from './AuthManager';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  const { auth } = useContext(AuthContext);

  return (
    <Tab.Navigator screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused, color, size}) => {
        if (route.name === 'Home') {
          return <Icon name="home" size={size} color={color} />
        } else if (route.name === 'Register') {
          return <Icon name="user-plus" size={size} color={color} />
        } else if (route.name === 'Login') {
          return <Icon name="user" size={size} color={color} />
        } else if (route.name === 'Logout') {
          return <Icon name="user-x" size={size} color={color} />
        } else if (route.name === 'My Library') {
          return <Icon name="archive" size={size} color={color} />
        }
      }
    })}>
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
        <>
          <Tab.Screen
            name="Register"
            component={Register}
          />
          <Tab.Screen
            name="Login"
            component={Login}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;