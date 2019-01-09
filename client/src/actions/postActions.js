import axios from 'axios';
import { ADD_POST, GET_POSTS, GET_ERRORS, POST_LOADING } from './types';

// Posts loading
export const setPostLoading = () => {
   return {
      type: POST_LOADING
   }
}

// Get posts
export const getPosts = () => async dispatch => {
   try {
      dispatch(setPostLoading());
      const res = await axios.get('/api/posts');
      dispatch({
         type: GET_POSTS,
         payload: res.data
      })
   }
   catch (err) {
      dispatch({ type: GET_POSTS, payload: null });
   }
};

// Add post
export const addPost = postData => async dispatch => {
   try {
      const res = await axios.post('/api/posts', postData);
      dispatch({
         type: ADD_POST,
         payload: res.data
      })
   }
   catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
   }
};