

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_TOKEN,
    LOGOUT,
    
  } from '../constants/auth';
  
  const initialState = {
    message: '',
    messageType: '',
    token: null,
    
  };
  
  const userReducer = (state = initialState, action) => {

  //   console.log('Action:', action.type);
  // console.log('Current State:', state);

    switch (action.type) {
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          token: action.payload.access_token,
          message: action.payload,
          messageType: 'success',
        };
      case REGISTER_FAIL:
      case LOGIN_FAIL:
        return {
          ...state,
          message: action.payload,
          messageType: 'error',
        };
      
        case SET_TOKEN: 
        return {
          ...state,
          token: action.payload,
        };
      
        case LOGOUT:
          return {
            ...state,
            token: '',
            
          };
        
      default:
        return state;
    }
  };
  
  export default userReducer;
  