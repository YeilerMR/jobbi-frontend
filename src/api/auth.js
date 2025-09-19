import axios from "./axios";

export const registerRequest = async (user) => {
  try {
    const res = await axios.post(`/auth/signup`, user);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const loginRequest = async (user) => {
  try {
    const res = await axios.post(`/auth/login`, user);
    return res.data;
  } catch (error) {
    throw error;
  }
}