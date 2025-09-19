import { tertiary, primary } from '../assets/css/general/general.js';
import Business from '../screens/Business/Business.js';
import BranchesScreen from "../screens/Business/BranchesScreen.js";
import AddBusinessScreen from "../screens/Business/AddBusinessScreen";
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
        name: 'Home',
        component: Welcome,
        options: {
            headerTintColor: primary
        }
    }, {
        name: 'Business',
        component: Business,
        options: {
            headerTintColor: primary
        }
    }, {
        name: "Sucursales",
        component: BranchesScreen,
        options: { title: "Sucursales" },
    },
    {
        name: "AddBusiness",
        component: AddBusinessScreen,
        options: { title: "Agregar Negocio" },
    },
];

export { publicRoutes, privateRoutes, screenOptions };