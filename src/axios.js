import axios from 'axios';
import Cookies from 'js-cookie'

const instance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 60000
});

instance.interceptors.request.use((config) => {
  const bearerToken = Cookies.get('jwt');
	if (bearerToken) {
    config.headers.Authorization = `Bearer ${bearerToken}`
  }

	return config;
});

export const get = (url) => instance.get(url);
export const post = (url, data) => instance.post(url, data);
export const patch = (url, data) => instance.patch(url, data);
export const del = (url) => instance.delete(url);
export const setBearerToken = (token) => {
  console.log('setBearerToken: ', token);
  instance.defaults.headers.common.Authorization = `Bearer ${token}`
};
