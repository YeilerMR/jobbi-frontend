import { useUser } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const useLogout = () => {
  const { setUserRole } = useUser();
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');

      setUserRole(null);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { logout };
};

export default useLogout;