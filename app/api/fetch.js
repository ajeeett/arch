import { getRequestPerf } from 'app/api/methods/commonMethods';
export const BASE_URL = 'https://ddcapi.allenbpms.in/';
export const HUB_BASE_URL = 'https://ddc.allenbpms.in/chatHub?userType=';

export const fetchGet = async (url, token) => {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    getRequestPerf(`${BASE_URL}${url}`, 'GET');
    return await fetch(`${BASE_URL}${url}`, {
      headers,
      method: 'GET',
      mode: 'cors',
    });
  } catch (err) {
    console.log('Fetch Failed - ', err.message, err.error);
  }
};

export const fetchPost = async (url, body, token) => {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    getRequestPerf(`${BASE_URL}${url}`, 'POST');

    return await fetch(`${BASE_URL}${url}`, {
      headers,
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.log('Fetch Failed - ', err.message, err.error);
  }
};

export const imagePost = async (url, token, formData) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    let options = {
      headers,
      method: 'POST',
    };
    options.body = formData;
    return fetch(`${BASE_URL}${url}`, options);
  } catch (err) {
    console.log('Fetch Failed - ', err);
  }
};
