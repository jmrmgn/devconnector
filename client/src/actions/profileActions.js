import axios from 'axios';

import {
   GET_PROFILE,
   PROFILE_LOADING,
   CLEAR_CURRENT_PROFILE,
   GET_ERRORS,
   SET_CURRENT_USER
} from './types';

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

// Add experience
export const addExperience = (expData, history) => async dispatch => {
   try {
      await axios.post('/api/profile/experience', expData);
      history.push('/dashboard');
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};

// Add experience
export const addEducation = (eduData, history) => async dispatch => {
   try {
      await axios.post('/api/profile/education', eduData);
      history.push('/dashboard');
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};

// Delete account and profile
export const deleteAccount = () => async dispatch => {
   try {
      if (window.confirm('Are you sure? This can NOT be undone!')) {
         await axios.delete('/api/profile');
         dispatch({
            type: SET_CURRENT_USER,
            payload: {}
         });
      }
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};
