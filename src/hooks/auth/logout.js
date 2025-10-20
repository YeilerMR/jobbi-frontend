// hooks/logout.js
import { useUser } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

/**
 * Hook personalizado para manejar el cierre de sesión.
 * Limpia el token, el rol del usuario y redirige al login.
 */
const useLogout = () => {
  const { setUserRole } = useUser();
  const navigation = useNavigation();

  const logout = async () => {
    try {
      // 1. Eliminar el token de AsyncStorage (misma clave usada en setAuthToken)
      await AsyncStorage.removeItem('token');

      // 2. Limpiar el rol en el contexto global
      setUserRole(null);

      // 3. Redirigir al login (reiniciando la pila de navegación)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
      // Opcional: mostrar alerta al usuario
    }
  };

  return { logout };
};

export default useLogout;