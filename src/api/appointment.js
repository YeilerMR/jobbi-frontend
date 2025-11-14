import { getAuthToken } from "../utils/Token";
import axios from "./axios";

export const cancelApointment = async (id) => {
    const token = await getAuthToken();
    try {
        const res = await axios.delete(`/appointments/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const completeApointment = async (id) => {
    const token = await getAuthToken();
    try {
        const res = await axios.patch(`/appointments/${id}/status`, { status: "confirmed" },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const createAppointment = async (appointmentData) => {
    const token = await getAuthToken();
    try {
        const res = await axios.post(`/calendar/${appointmentData.id_employee}/events`, appointmentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getMyEvents = async () => {
    const token = await getAuthToken();
    try {
        const res = await axios.get(`/calendar/events`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}