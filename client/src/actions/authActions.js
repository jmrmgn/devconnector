import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register user
export const registerUser = (userData, history) => async dispatch => {
   try {
      await axios.post('/api/users/register', userData);
      history.push('/login')
   }
   catch (err) {
      dispatch({type: GET_ERRORS, payload: err.response.data });
   }
};

// Login user
export const loginUser = userData => async dispatch => {
   try {
      const res = await axios.post('/api/users/login', userData);
      // Get token
      const { token } = res.data;
      // Set token to Localstorage
      localStorage.setItem('jwtToken', token);
      // Set token to auth Header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
   }
   catch (err) {
      dispatch({type: GET_ERRORS, payload: err.response.data });
   }
};

// Set logged in user
export const setCurrentUser = decoded => {
   return {
      type: SET_CURRENT_USER,
      payload: decoded
   }
};