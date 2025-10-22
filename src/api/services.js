import { getAuthToken } from "../utils/Token";
import axios from "./axios";

export const createService = async (service) =>{
    console.log('Endpoint de crear:', service);
    
    const token = await getAuthToken();
    try {
        const res = await axios.post('/services',service,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getAllServices = async (idBranch)=>{
    console.log('idBranch:', idBranch)
    const token = await getAuthToken();
    console.log(token);
    
    try {
        const res = await axios.get(`/Services/${idBranch}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error
    }
};

export const getServices = async () =>{
    const token= await getAuthToken();
    try {
        const res = await axios.get('/services', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getAllSpecialties = async () =>{
    try {
        const res = await axios.get('/specialtys');
        return res.data;
    } catch (error) {
        throw error;
    }
};  

export const updateService = async (id, service) => {
    const token = await getAuthToken();
    try {
        const res = await axios.put(`/services/${id}`, service, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const deleteService = async (id) => {
    const token = await getAuthToken();
    try {
        const res= await axios.delete(`/services/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}