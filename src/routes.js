import Home from "./pages/Home.svelte";
import Login from "./pages/Login.svelte";
import Student from "./pages/Student.svelte";
import CourseId from "./pages/courses/_id.svelte";
import { wrap } from "svelte-spa-router/wrap";
import { authStore } from "./store";

const validateSessionUser = () => {
  const user = authStore.getUserSession();
  return user ? true : false;
};

export const routes = {
  "/": Home,
  "/login": wrap({
    component: Login,
    conditions: [async () => !validateSessionUser()],
  }),
  "/courses/:id": CourseId,
  "/courses/:id/students": wrap({
    component: Student,
    conditions: [async () => validateSessionUser()],
  }),
};
