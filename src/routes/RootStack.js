import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { publicRoutes, privateRoutes, screenOptions } from './Routes';


const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}
                initialRouteName='Login'
            >
                {
                    privateRoutes.map((route) => (
                        <Stack.Screen
                            key={route.name}
                            name={route.name}
                            component={route.component}
                            options={route.options}
                        />
                    ))

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