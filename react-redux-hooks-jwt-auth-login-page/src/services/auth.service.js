import axios from "axios";
const API_URL = "https://private-052d6-testapi4528.apiary-mock.com/authenticate";

const login = async (email, password) => {
  const response = await axios
    .post(API_URL, {
      email,
      password,
    });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = () => {
  localStorage.removeItem("user");
};
export default {
  login,
  logout,
};
