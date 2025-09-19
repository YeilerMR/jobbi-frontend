import AsyncStorage from '@react-native-async-storage/async-storage';

const setAuthToken = async (token) => {
    const expiresAt = Date.now() + 30 * 60 * 1000; // 30 min

    const data = {
        token,
        expiresAt,
    };

    try {
        await AsyncStorage.setItem('token', JSON.stringify(data));
    } catch (error) {
        console.error('Error', error);
    }
};

const getAuthToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token');

        if (value !== null) {
            const data = JSON.parse(value);
            if (Date.now() < data.expiresAt) {
                return data.token;
            } else {
                await AsyncStorage.removeItem('token');
                return null;
            }
        }

        return null;
    } catch (error) {
        console.error('Error', error);
        return null;
    }
};

export { setAuthToken, getAuthToken };