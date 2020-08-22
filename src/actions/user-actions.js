import moment from 'moment';
import { v4 as uuid } from 'uuid';
import get from 'lodash.get';
import api from '../api';
import createUser from '../models/user';

/* eslint-disable import/prefer-default-export */
export function login(dispatch, { email, password }) {
  const user = createUser({
    email,
    password,
  });
  dispatch({
    type: 'LOGIN_ATTEMPT',
  });
  api.user.login(email, password)
    .then((res) => (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve(res) : res.json()))
    .then((data) => {
      if (data.data) {
        user.token = data.data.token;
        return (api.user.getUserInfo(data.data.token));
      }
      if (data.error) {
        throw data.error;
      }
      return Promise.reject(new Error('Undefined error'));
    })
    .then((res) => (res.json()))
    .then((json) => {
      user.id = json.data._id;
      user.email = json.data.email;
      user.firstName = json.data.first_name;
      user.lastName = json.data.last_name;
      user.createdOn = json.data.createdOn;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });
    })
    .catch((err) => {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: { msg: `Login error: ${err.message}` },
      });
    });
}

export function register(dispatch, { email, password }) {
  dispatch({
    type: 'SIGNUP_ATTEMPT',
  });
  api.user.register(email, password)
    .then((res) => (process.env.REACT_APP_DEBUG === 'true' ? Promise.resolve(res) : res.json()))
    .then((data) => {
      if (data.data) {
        dispatch({
          type: 'SIGNUP_SUCCESS',
          payload: { msg: 'You have successfully registered' },
        });
      }
      if (data.error) {
        throw data.error;
      }
    })
    .catch((err) => {
      dispatch({
        type: 'SIGNUP_FAIL',
        payload: { msg: `Sign up error: ${err.message}` },
      });
    });
}


export function logout(dispatch) {
  dispatch({
    type: 'LOGOUT',
  });
}

/* eslint-enable import/prefer-default-export */
