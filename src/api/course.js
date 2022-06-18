import { get, post, patch, del, setBearerToken } from "./../axios.js";

export const createCourse = async (data) => {
  const { data: course } = await post("/courses", data);
  console.log("createCourse: ", course);
  return course;
};

export const getCourses = async () => {
  const { data } = await get("/courses");
  console.log("getCourses: ", data);
  return data;
}
