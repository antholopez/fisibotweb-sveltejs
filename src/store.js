import { writable } from "svelte/store";

let persistedUser = localStorage.getItem("userStorage");
export let userStorage = writable(
  persistedUser ? JSON.parse(persistedUser) : ""
);

userStorage.subscribe((value) => {
  if (value) localStorage.setItem("userStorage", JSON.stringify(value));
  else localStorage.removeItem("userStorage"); // for logout
});
