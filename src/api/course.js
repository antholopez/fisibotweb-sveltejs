import { get, post, patch, del, setBearerToken } from "./../axios.js";
import { courseStore } from "./../store.js";

export const createCourse = async (data) => {
  const { data: course } = await post("/courses", data);
  console.log("createCourse: ", course);
  return course;
};

export const getCourses = async () => {
  let courses = courseStore.get();

  const data = courses.length ? courses : await get("/courses");
  if (!courses.length) courseStore.set(data);

  return data;
};

export const getCourse = async (id) => {
  return get(`/courses/${id}`);
};
