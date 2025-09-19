import axios from "./axios";

export const registerRequest = async (user) => {
  console.log(user);
  try {
    const res = await axios.post(`/auth/register`, user);
    return res.data;
  } catch (error) {
    console.error(`se cayo en auth.js`)
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