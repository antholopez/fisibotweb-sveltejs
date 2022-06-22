import axios from "axios";
import Cookies from "js-cookie";
import { link, push } from "svelte-spa-router";

const { VITE_API_BASE_URL } = import.meta.env;

let isAuthenticated = true;

const instance = axios.create({
  baseURL: VITE_API_BASE_URL,
  timeout: 60000,
});

instance.interceptors.request.use((config) => {
  console.log(
    "🚀 ~ file: axios.js ~ line 13 ~ instance.interceptors.request.use ~ config",
    config
  );

  const bearerToken = Cookies.get("jwt");
  if (bearerToken) {
    config.headers.Authorization = `Bearer ${bearerToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    console.log("interceptors.response error: ", error);
    const { response } = error;
    const { status, statusText } = response;
    if (status === 401 && statusText === "Unauthorized") {
      localStorage.removeItem("userStorage");
      Cookies.remove("jwt");
      await push("/login");
      // alert("You are not authorized to access this page.");
    }
  }
);

export const get = (url) => instance.get(url);
export const post = (url, data) => instance.post(url, data);
export const patch = (url, data) => instance.patch(url, data);
export const del = (url) => instance.delete(url);
export const setBearerToken = (token) => {
  console.log("setBearerToken: ", token);
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
