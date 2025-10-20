import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { adminRoutes, clientRoutes, employeeRoutes } from './Routes';
import { useUser } from '../hooks/UserContext';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from '../assets/css/auth/auth';
import { Ionicons } from '@expo/vector-icons';
import useLogout from '../hooks/auth/logout';

// Componente personalizado para cada ítem del drawer
const CustomDrawerItem = ({ route, focused, onPress }) => {
  // Busca la ruta en las rutas disponibles para obtener su ícono
  const routeConfig = [...adminRoutes, ...clientRoutes, ...employeeRoutes].find(
    (r) => r.name === route.name
  );

  return (
    <TouchableOpacity
      style={[styles.drawerItem, focused && styles.drawerItemFocused]}
      onPress={onPress}
    >
      {routeConfig?.icon && routeConfig.icon(focused)}
      <Text style={[styles.drawerLabel, focused && styles.drawerLabelFocused]}>
        {route.name}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = (props) => {
  const { state, navigation } = props;
  const { logout } = useLogout();

  const handleLogout = () =>{
    logout();
  }


  return (
    <View style={styles.drawerContainer}>
      <View style={styles.avatarContainer}>
        <Avatar
          resizeMode="cover"
          source={require('../assets/img/froggi.webp')}
        />
      </View>

      <DrawerContentScrollView {...props}>
        <View style={styles.drawerItemsContainer}>
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            const onPress = () => {
              navigation.navigate(route.name);
            };
            return (
              <CustomDrawerItem
                key={route.key}
                route={route}
                focused={focused}
                onPress={onPress}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>

      <View style = {styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name= 'log-out-outline' size={22} color="#d32f2f"/>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const PrivateDrawer = () => {
  const { userRole } = useUser();

  let routesToRender = clientRoutes;

  if (userRole === 1) {
    routesToRender = adminRoutes;
  } else if (userRole === 3) {
    routesToRender = employeeRoutes;
  } else {
    routesToRender = clientRoutes;
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#e0e0e0', // fondo cuando está activo
        drawerInactiveBackgroundColor: 'transparent',
        drawerLabelStyle: {
          marginLeft: 16,
          fontSize: 16,
        },
        drawerStyle: {
          backgroundColor: '#ffffff', // color de fondo del drawer
          width: 280,
        },
      }}
    >
      {routesToRender.map((route) => (
        <Drawer.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  avatarContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  drawerItemsContainer: {
    marginTop: 80, // espacio para el avatar
    paddingHorizontal: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  drawerItemFocused: {
    backgroundColor: '#e0e0e0',
  },
  drawerLabel: {
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
  drawerLabelFocused: {
    color: '#6200ee',
    fontWeight: '600',
  },
  footer: {
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderTopWidth: 1,
  borderTopColor: '#eee',
  backgroundColor: '#fff',
},
logoutButton: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 8,
},
logoutText: {
  fontSize: 16,
  color: '#d32f2f',
  marginLeft: 16,
  fontWeight: '500',
},
});

export default PrivateDrawer;