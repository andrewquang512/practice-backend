import {
  GET_USERS,
  ADD_USER,
  POST_ERROR,
  DELETE_USER,
  FILTER_BY_VALUE,
} from '../actions/types';
import { getUsers } from '../actions/users';

const initialState = {
  users: [],
  filteredusers: [],
  user: null,
  loading: true,
  error: {},
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case FILTER_BY_VALUE:
      let value = action.payload;
      if (value.length === 0) {
        return {
          ...state,
          filteredusers: [],
        };
      } else {
        let filteredValues = state.users.filter((user) => {
          const name = user.username.toLowerCase().includes(value);
          const email = user.email.toLowerCase().includes(value);
          const birthdate = user.birthdate.toLowerCase().includes(value);
          return name || email || birthdate;
        });
        return {
          ...state,
          filteredusers: filteredValues,
        };
      }
    default:
      return state;
  }
};

export default postReducer;
