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

const clientRoutes = [
    {
        name: 'Home',
        component: Welcome,
        options: {
            headerTintColor: primary
        }
    }, {
        name: 'Profile',
        component: Welcome,//cambiar 
        options: {
            headerTintColor: primary
        }
    }, {
        name: "Schedule an Appointment",
        component: Welcome,//cambiar
        options: { title: "Schedule an Appointment" },
    },
    {
        name: "Rewards",
        component: Welcome,//cambiar
        options: { title: "Rewards" },
    },
];

const adminRoutes = [
    {
        name: 'Home',
        component: Welcome, 
        options:{headerTintColor: primary}
    },
    {
        name: 'Profile',
        component: Welcome,//cambiar
        options:{headerTintColor: primary}
    },
    {
        name: 'Business',
        component: Business, 
        options:{title: 'Business'}
    },
    {
        name: 'Branches',
        component: BranchesScreen, 
        options:{title: 'Branches'}
    },
    {
        name: 'Employees',
        component: Welcome,//cambiar
        options:{title: 'Employees'}
    },
    {
        name: 'Services',
        component: Welcome,//cambiar
        options:{title: 'Services'}
    },
    {
        name: 'Schedule',
        component: Welcome,//cambiar
        options:{title: 'Schedule'}
    },
    {
        name: 'Subscriptions',
        component: Welcome,//cambiar
        options:{title: 'Subscriptions'}
    },
    {
        name: 'Rewards',
        component: Welcome,//cambiar
        options:{title: 'Rewards'}
    }
];

const employeeRoutes = [
    {
        name: 'Home', 
        component: Welcome, 
        options: {title:'Home'}
    },
    {
        name: 'Profile', 
        component: Welcome,//cambiar
        options: {title:'Profile'}
    },
    {
        name: 'My Schedule', 
        component: Welcome,//cambiar
        options: {title:'My Schedule'}
    },
    {
        name: 'Rewards', 
        component: Welcome,//cambiar
        options: {title:'Rewards'}
    }
];


export { publicRoutes, screenOptions, adminRoutes, clientRoutes, employeeRoutes };