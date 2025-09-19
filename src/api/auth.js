import axios from "./axios";
import { setAuthToken } from "../utils/Token";

export const registerRequest = async (user) => {
  console.log(user);
  try {
    const res = await axios.post(`/auth/register`, user);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const loginRequest = async (user) => {
  try {
    const res = await axios.post(`/auth/login`, user);
    if (res) {
      setAuthToken(res.data.token);
    }
    return res.data;
  } catch (error) {
    throw error;
  }
}