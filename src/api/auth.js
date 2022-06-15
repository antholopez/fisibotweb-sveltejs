import { get, post, patch, del, setBearerToken } from './../axios.js';

import Cookies from 'js-cookie'

export const login = async (data) => {
  const { data: user } = await post('/authentication/login', data);
  Cookies.set('jwt', user.accessToken);
  return user;
}

export const logout = async () => {
  const user = await post('/authentication/logout', {});
  console.log('user logout: ', user);
  Cookies.remove('jwt');
}