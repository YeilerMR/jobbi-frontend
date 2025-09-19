import { createDrawerNavigator } from '@react-navigation/drawer';
import { privateRoutes } from './Routes';

const Drawer = createDrawerNavigator();

const PrivateDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      {privateRoutes.map((route) => (
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