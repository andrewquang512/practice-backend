import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_USERS,
  ADD_USER,
  POST_ERROR,
  DELETE_USER,
  FILTER_BY_VALUE,
} from './types';

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/users');

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/users`,
      formData,
      config
    );

    dispatch({
      type: ADD_USER,
      payload: res.data,
    });

    dispatch(setAlert('User Added', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`);

    dispatch({
      type: DELETE_USER,
      payload: id,
    });

    dispatch(setAlert('User Removed', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const filterByValue = (value) => async (dispatch) => {
  dispatch({
    type: FILTER_BY_VALUE,
    payload: value,
  });
};
