import { createDrawerNavigator } from '@react-navigation/drawer';
import { adminRoutes, clientRoutes, employeeRoutes } from './Routes';
import { useUser } from '../hooks/UserContext';

const Drawer = createDrawerNavigator();

const PrivateDrawer = () => {
  const { userRole } = useUser();

  let routesToRender = clientRoutes;

  if (userRole === 1) {
    routesToRender = adminRoutes;
  } else if (userRole === 3){
    routesToRender = employeeRoutes
  } else {
    routesToRender = clientRoutes;
  }
  return (
    <Drawer.Navigator initialRouteName="Home">
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

export default PrivateDrawer;