import { useState } from 'react';
import { registerRequest } from '../../api/auth'

const useRegister = () =>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerPOST = async (user) => {
        setLoading(true);
        setError(null);
        const finalUser = filterData(user);
        try {
            const res = await registerRequest(finalUser);
            setData(res);
            return true;
        } catch (error) {
            setError(error.response?.data?.message);
            return false;
        } finally {
            setLoading(false);
        }
    }
    return { data, loading, error, setError, registerPOST};
};

function filterData(user){
    const {name, lastName, email, phone, password} = user;
    const filterUser = {
        name: name,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password
    }
    return filterUser;
}

export default useRegister;