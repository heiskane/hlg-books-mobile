import React, {
  createContext,
  useState,
  initialState,
  useEffect,
  useRef
} from 'react';
import * as SecureStore from 'expo-secure-store';

// Create a context
const AuthContext = createContext({
  auth: {
    token: ""
  }
});

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(initialState);

  const auth_provider = useRef(null);

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

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };