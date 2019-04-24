import {createStore, applyMiddleware, combineReducers} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';

const IS_LOGGED_IN = 'IS_LOGGED_IN';

const isLoggedIn = (user) => {
  return {
    type: IS_LOGGED_IN,
    user,
  }
}

const userReducer = (state = {}, action) => {
  switch(action.type){
    case IS_LOGGED_IN:
      return action.user
    default:
      return state;
  };
};


const reducer = combineReducers({
  user: userReducer
});

export const fetchUser = () => {
  return dispatch => {
    return axios.get('/auth')
      .then(res => res.data)
      .then(user => dispatch(isLoggedIn(user)))
  };
};

export const login = (user) => {
  return dispatch => {
    return axios.post('/auth', user)
      .then(res => res.data)
      .then(user => dispatch(isLoggedIn(user)))
  };
};

export const logout = () => {
  return dispatch => {
    return axios.delete('/auth')
      .then(() => dispatch(isLoggedIn({})))
  };
};

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
