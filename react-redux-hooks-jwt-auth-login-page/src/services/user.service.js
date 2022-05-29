import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://private-052d6-testapi4528.apiary-mock.com/info";
const getPublicContent = () => {
  return axios.get(API_URL , { headers: authHeader() });
};

export default {
  getPublicContent,
};
