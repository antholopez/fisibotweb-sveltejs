import { get, post, patch, del, setBearerToken } from "./../axios.js";
import { coursesStore } from "./../store/course.js";

let courses = [];

export const createCourse = async (data) => {
  const { data: course } = await post("/courses", data);
  console.log("createCourse: ", course);
  return course;
};

export const getCourses = async () => {
  coursesStore.subscribe((value) => (courses = value));

  const data = courses.length ? courses : await get("/courses");
  if (!courses.length) coursesStore.setcourses(data);

  return data;
};

export const getCourse = async (id) => {
  return get(`/courses/${id}`);
};
