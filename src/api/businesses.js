import { getAuthToken } from "../utils/Token";
import axios from "./axios";

export const registerRequest = async (business) => {
    const token = await getAuthToken();
    try {
        const res = await axios.post('/business', business, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getMyBusinesses = async () => {
    const token = await getAuthToken();
    try {
        const res = await axios.get(`/business`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getBusinessById = async (id) => { }

export const updateBusiness = async (id, business) => { }

export const deleteBusiness = async (id) => {
    const token = await getAuthToken();
    try {
        const res = await axios.delete(`/business/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}