import Home from './pages/Home.svelte'
import Login from "./pages/Login.svelte";
import CourseId from "./pages/courses/_id.svelte";
import { wrap } from "svelte-spa-router/wrap";

export const routes = {
  "/": Home,
  "/login": wrap({
    component: Login,
    conditions: [
      async () => {
        const user = localStorage.getItem("userStorage");
        return !user ? true : false;
      },
    ],
  }),
  "/courses/:id": CourseId
};
