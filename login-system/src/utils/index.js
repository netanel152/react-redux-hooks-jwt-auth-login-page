import axios from "axios";
const API_URL =
  "https://private-052d6-testapi4528.apiary-mock.com/authenticate";

const login = (email, password) => {
  return axios
    .post(API_URL, {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Set localStorage
 */
export const setStore = (name, content) => {
  console.log("setStore > name", name);
  console.log("setStore > content", content);
  if (!name) return;
  if (typeof content !== "string") {
    let data = login(content.email, content.password);
    content = JSON.stringify(data);
  }
  return window.localStorage.setItem(name, content);
};

/**
 * Get localStorage
 */
export const getStore = (name) => {
  if (!name) return;
  return JSON.parse(window.localStorage.getItem(name));
};

/**
 * Clear localStorage
 */
export const removeItem = (name) => {
  if (!name) return;
  return window.localStorage.removeItem(name);
};

/**
 * Validate Email address
 */
export const isValidEmail = (value) => {
  return !(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value));
};

/**
 * Validate Email address
 */
export const isValidPassword = (value) => {
  return !(
    value && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(value)
  );
};
