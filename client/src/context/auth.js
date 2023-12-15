import React, { createContext, useContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

const AUTH_TOKEN_KEY = 'token';
const AUTO_LOGOUT_TIME = 10 * 60 * 1000; 

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      const tokenExpiration = Date.now() + AUTO_LOGOUT_TIME;
      localStorage.setItem(AUTH_TOKEN_KEY, action.token);
      localStorage.setItem('tokenExpiration', tokenExpiration);
      return { ...state, user: action.user, token: action.token, tokenExpiration };
    case 'SIGN_OUT':
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('tokenExpiration');
      return { ...state, user: null, token: null, tokenExpiration: null };
    default:
      return state;
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const storedExpiration = localStorage.getItem('tokenExpiration');
  const tokenIsValid = storedToken && storedExpiration && Date.now() < storedExpiration;

  const [authState, dispatch] = useReducer(authReducer, {
    user: null,
    token: tokenIsValid ? storedToken : null,
    tokenExpiration: tokenIsValid ? storedExpiration : null,
  });

  useEffect(() => {
    if (authState.tokenExpiration && Date.now() >= authState.tokenExpiration) {
      dispatch({ type: 'SIGN_OUT' });
    }
  }, [authState.tokenExpiration]);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};