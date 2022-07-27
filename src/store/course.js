import { writable } from "svelte/store";

const courses = [];

const createCourse = () => {
  const { subscribe, update } = writable(courses);
  return {
    subscribe,
    setcourses: (data) => update(() => data),
  };
};

export const coursesStore = createCourse();
