import { get, post, patch, del, setBearerToken } from "./../axios.js";
import { schoolsStore } from "./../store/school.js";

export const getSchools = async () => {
  let schools = [];
  schoolsStore.subscribe((value) => (schools = value));

  const data = schools.length ? schools : await get("/schools");
  if (!schools.length) schoolsStore.setSchools(data);

  return data;
};
