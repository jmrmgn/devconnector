import axios from 'axios';

import {
   GET_PROFILE,
   PROFILE_LOADING,
   CLEAR_CURRENT_PROFILE,
   GET_ERRORS,
   SET_CURRENT_USER,
   GET_PROFILES
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

// Get profile by handle
export const getProfileByHandle = handle => async dispatch => {
   try {
      dispatch(setProfileLoading());
      const res = await axios.get(`/api/profile/handle/${handle}`);
      dispatch({ type: GET_PROFILE, payload: res.data });
   }
   catch (err) {
      dispatch({ type: GET_PROFILE, payload: null });
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

// Delete experience
export const deleteExperience = id => async dispatch => {
   try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch({
         type: GET_PROFILE,
         payload: res.data
      });
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};

// Delete education
export const deleteEducation = id => async dispatch => {
   try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch({
         type: GET_PROFILE,
         payload: res.data
      });
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
   try {
      dispatch(setProfileLoading());
      const profiles = await axios.get('/api/profile/all');
      dispatch({
         type: GET_PROFILES,
         payload: profiles.data
      });
   }
   catch (err) {
      dispatch({ type: GET_PROFILES, payload: null });
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
