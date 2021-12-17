/*
 * Reducer actions related with login
 */
import * as types from './types';
import { get } from 'lodash';
import { fetchPost } from '../api/fetch';
// import { openSnackBar } from './snackbarAction';
// import { onLoginProfileData, dashboardApi } from './dashboardAction';
// import { Platform } from 'react-native';

let deviceType = Platform.OS === 'ios' ? 'IOS' : 'Android';

export function requestLogin(username, password) {
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
  };
}
