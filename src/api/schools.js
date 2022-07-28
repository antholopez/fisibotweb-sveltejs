import { get, post, patch, del, setBearerToken } from "./../axios.js";
import { schoolStore } from "./../store.js";

export const getSchools = async () => {
  let schools = schoolStore.get();

  const data = schools.length ? schools : await get("/schools");
  if (!schools.length) schoolStore.set(data);

  return data;
};
