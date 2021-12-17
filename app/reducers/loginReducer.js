/* Login Reducer
 * handles login states in the app
 */
import createReducer from './../lib/createReducer';
import * as types from './../actions/types';
import { get, isObject, isArray } from 'lodash';

const initialState = {
  isFetching: false,
  message: '',
  data: {},
  listLink: [],
  isLoggedIn: false,
  userType: '',
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      // username: action.username,
      // password: action.password,
    };
  },
});
