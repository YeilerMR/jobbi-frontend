import axios from "axios";
import { API_URL } from "../config";

console.log(`URL del backend: ${API_URL}`);

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
export default instance;