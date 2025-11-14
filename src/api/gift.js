import { getAuthToken } from "../utils/Token";
import axios from "./axios";

export const getPoints = async ()=>{

    const token = await getAuthToken();
    console.log('User Token: ', token);

    try {
        const res = await axios.get('/gifts/points', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getAvailableRewards = async ()=>{
    const token = await getAuthToken();
    try {
        const res = await axios.get('/gifts/available/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getMyRewards = async ()=>{
    const token = await getAuthToken();
    try {
        const res = await axios.get('/gifts/mine', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const redeemReward = async (rewardId)=>{
    
    const token = await getAuthToken();
    try {
        const res = await axios.post(`/gifts/assoc/${rewardId}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const rewardQRValidate = async (reward)=>{
    const token = await getAuthToken();
    try {
        const res = await axios.post('/gifts/qr/validate', reward, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        throw error;
    }
}