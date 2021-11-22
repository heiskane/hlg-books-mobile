import React, {
  createContext,
  useState,
  initialState,
  useEffect,
  useRef
} from 'react';
import * as SecureStore from 'expo-secure-store';

// Create a context
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState({
    auth: {
      token: ""
    }
  });


  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await SecureStore.getItemAsync("auth");
      const authData = JSON.parse(authDataString || {});
      // Configure axios headers
      //configureAxiosHeaders(authData.token, authData.phone);
      setAuthState(authData);
    } catch (err) {
      setAuthState({});
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (auth) => {
    try {
      await SecureStore.setItemAsync("auth", JSON.stringify(auth));
      // Configure axios headers
      //configureAxiosHeaders(auth.token, auth.phone);
      setAuthState(auth);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const delAuth = async () => {
    try {
      await SecureStore.deleteItemAsync("auth")
      setAuthState({
        auth: {
          token: ""
        }});
    } catch (error) {
      Promise.reject(error);
    }
  }

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, delAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };