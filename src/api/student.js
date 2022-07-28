import { get, post, patch, del, setBearerToken } from "./../axios.js";

export const createStudent = async (data) => {
  const { data: student } = await post("/users/students", data);
  console.log("createStudent: ", student);
  return student;
}

export const getStudentsByCourse = async (id) => {
  return get(`/users/students/courses/${id}`);
}