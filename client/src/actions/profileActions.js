import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

// Profile Loading
export const setProfileLoading = () => {
   return {
      type: PROFILE_LOADING
   }
};

// Clear Profile
export const clearCurrentProfile = () => {
   return {
      type: CLEAR_CURRENT_PROFILE
   }
};

// Get current profile
export const getCurrentProfile = () => async dispatch => {
   try {
      dispatch(setProfileLoading());
      const res = await axios.get('/api/profile');
      dispatch({ type: GET_PROFILE, payload: res.data });
   }
   catch (err) {
      dispatch({ type: GET_PROFILE, payload: {} });
   }
};

// Create profile
export const createProfile = (profileData, history) => async dispatch => {
   try {
      await axios.post('/api/profile', profileData);
      history.push('/dashboard');
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });      
   }
};