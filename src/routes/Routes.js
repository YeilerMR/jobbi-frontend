import { tertiary, primary } from '../assets/css/general/general.js';
import Business from '../screens/Business/Business.js';
import BranchesScreen from "../screens/Business/BranchesScreen.js";
import AddBusinessScreen from "../screens/Business/AddBusinessScreen";
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Service from '../screens/services/Service.js';

import EmployeesScreen from '../screens/Employees/EmployeesScreen.js';
import { Ionicons } from '@expo/vector-icons';
import ScheduleScreen from '../screens/Schedule/ScheduleScreen.js';
import EmployeeScheduleScreen from '../screens/Schedule/EmployeeScheduleScreen.js';

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
        component: ScheduleScreen,//cambiar
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
        options:{headerTintColor: primary},
        icon: (focused) => <Ionicons name='home' size={24} color={focused ? '#6200ee' : '#757575'}/>,
    },
    // {
    //     name: 'Profile',
    //     component: Welcome,//cambiar
    //     options:{headerTintColor: primary}
    // },
    {
        name: 'Business',
        component: Business, 
        options:{title: 'Business'},
        icon: (focused) => <Ionicons name='business' size={24} color={focused ? '#6200ee' : '#757575'}/>,
    },
    {
        name: 'Branches',
        component: BranchesScreen, 
        options:{title: 'Branches'},
        icon: (focused) => <Ionicons name='location' size={24} color={focused ? '#6200ee' : '#757575'}/>,
    },
    {
        name: 'Employees',
        component: EmployeesScreen,
        options:{title: 'Employees'},
        icon: (focused) => <Ionicons name='people-circle' size={24} color={focused ? '#6200ee' : '#757575'}/>,
    },
    {
        name: 'Services',
        component: Service,//cambiar
        options:{title: 'Services'},
         icon: (focused) => <Ionicons name='ribbon' size={24} color={focused ? '#6200ee' : '#757575'}/>,
    },
    {
        name: 'Schedule',
        component: Welcome,//cambiar
        options:{title: 'Schedule'},
         icon: (focused) => <Ionicons name='calendar' size={24} color={focused ? '#6200ee' : '#757575'}/>,
    },
    {
        name: 'Subscriptions',
        component: Welcome,//cambiar
        options:{title: 'Subscriptions'},
         icon: (focused) => <Ionicons name='card' size={24} color={focused ? '#6200ee' : '#757575'}/>,
    },
    {
        name: 'Rewards',
        component: Welcome,//cambiar
        options:{title: 'Rewards'},
         icon: (focused) => <Ionicons name='gift' size={24} color={focused ? '#6200ee' : '#757575'}/>,
    }
];

const employeeRoutes = [
    {
        name: 'Home',
        component: Welcome,
        options: { title: 'Home' }
    },
    {
        name: 'Profile',
        component: Welcome,//cambiar
        options: { title: 'Profile' }
    },
    {
        name: 'My Schedule',
        component: EmployeeScheduleScreen,//cambiar
        options: { title: 'My Schedule' }
    },
    {
        name: 'Rewards',
        component: Welcome,//cambiar
        options: { title: 'Rewards' }
    }
];


export { publicRoutes, screenOptions, adminRoutes, clientRoutes, employeeRoutes };