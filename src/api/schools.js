import { get, post, patch, del, setBearerToken } from './../axios.js';

export const getSchools = async () => {
  const { data } = await get('/schools');
  console.log('getSchools: ', data);
  return data;
}