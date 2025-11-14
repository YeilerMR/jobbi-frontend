import { getAuthToken } from "../utils/Token";
import axios from "./axios";


export const getAllPlans = async () =>{
    //const token = await getAuthToken();
    try {
        const res = await axios.get('/subscriptions/plans');
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getCurrentPlan = async () => {
    const token = await getAuthToken();
    try {
        const res = await axios.get('/subscriptions/my-plan', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const upgradePlan = async (payload) => {
    const token = await getAuthToken();
    try {
        const res = await axios.post('/subscriptions/change', payload,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}
