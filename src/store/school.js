import { writable } from "svelte/store";

const schools = [];

const createSchool = () => {
  const { subscribe, update } = writable(schools);
  return {
    subscribe,
    setSchools: (data) => update(() => data),
  };
};

export const schoolsStore = createSchool();
