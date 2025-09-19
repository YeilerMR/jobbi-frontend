import {tertiary, primary} from '../assets/css/general/general.js';

import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';


const screenOptions = {
    headerStyle: {
        backgroundColor: 'transparent'
    },
    headerTintColor: tertiary,
    headerTransparent: true,
    headerTitle: '',
    headerLeftContainerStyle: {
        paddingLeft: 20
    }
};

const publicRoutes = [
    {
        name: 'Login',
        component: Login
    },
    {
        name: 'Signup',
        component: Signup
    }
];

const privateRoutes = [
    {
        name: 'Welcome',
        component: Welcome,
        options: {
            headerTintColor: primary
        }
    }
];

export { publicRoutes, privateRoutes, screenOptions };