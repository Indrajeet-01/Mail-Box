

import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_MESSAGE,
  SET_TOKEN,
  LOGOUT,
  
} from '../constants/auth'

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:6500/user/register", userData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: "User registered successfully!",
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message || "Registration failed.",
    });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:6500/user/login", userData);

    dispatch({
      type: LOGIN_SUCCESS, 
      payload: response.data,
    });

    dispatch({
        type: SET_TOKEN, 
        payload: response.data.access_token,
      });
    
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data || "Login failed.",
    });
  }
};



export const logoutUser = (token) => async (dispatch) => {
  try {
    
    await axios.post('http://localhost:6500/user/logout', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Dispatch the LOGOUT action
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

