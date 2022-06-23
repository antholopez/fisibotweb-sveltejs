import axios from "axios";
import Cookies from "js-cookie";
import { link, push } from "svelte-spa-router";
import Notify from "simple-notify";
import { notify } from "./utils/notification";

const { VITE_API_BASE_URL } = import.meta.env;

let isAuthenticated = true;

const instance = axios.create({
  baseURL: VITE_API_BASE_URL,
  timeout: 60000,
});

instance.interceptors.request.use((config) => {
  console.log("axios request: ", config);

  const bearerToken = Cookies.get("jwt");
  if (bearerToken) {
    config.headers.Authorization = `Bearer ${bearerToken}`;
    isAuthenticated = true;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => {
    console.log("axios response ok: ", config);
    return config;
  },
  async (error) => {
    const { response } = error;
    const { status, statusText } = response;
    if (status === 401 && statusText === "Unauthorized" && !isAuthenticated) {
      try {
        const url = error.config.url;
        localStorage.removeItem("userStorage");
        Cookies.remove("jwt");
        await push("/login");
        if (url === "/authentication/login")
          notify(
            "error",
            "Credenciales inválidas",
            "Por favor verifique sus credenciales"
          );
        else
          notify(
            "error",
            "Sesión expirada",
            "Por favor inicia sesión nuevamente"
          );
      } catch (err) {
        console.log("axios response: ", err);
      }
    }
    isAuthenticated = false;
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
