import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { publicRoutes, screenOptions } from './Routes';
import PrivateDrawer from './PrivateDrawer';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}
                initialRouteName='Login'
            >
                {
                    <Stack.Screen
                        name="PrivateArea"
                        component={PrivateDrawer}
                        options={{ headerShown: false }}
                    />

                }

                {
                    publicRoutes.map((route) => (
                        <Stack.Screen
                            key={route.name}
                            name={route.name}
                            component={route.component}
                            options={route.options}
                        />
                    ))
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;