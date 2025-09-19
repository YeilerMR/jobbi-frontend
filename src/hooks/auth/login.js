import { useState } from 'react';
import { loginRequest } from '../../api/auth'

const useLogin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginPost = async (user) => {
        setLoading(true);
        setError(null);

        try {
            const res = await loginRequest(user);
            setData(res);
            return true;
        } catch (error) {
            setError(error.response?.data?.message);
            return false;
        } finally {
            setLoading(false);
        }
    }
    return { data, loading, error, setError, loginPost };
};

export default useLogin;