import { StatusBar } from 'expo-status-bar';

import {
  InnerContainer,
  PageTitle,
  Subtitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from '../assets/css/auth/auth.js';
import { useUser } from '../hooks/UserContext.js';


// Componentes específicos por rol (puedes moverlos a archivos separados después)
const AdminView = ({ navigation }) => (
  <>
    <PageTitle welcome={true}>Admin Dashboard</PageTitle>
    <Subtitle welcome={true}>Manage your business, employees & services.</Subtitle>
    <StyledButton onPress={() => navigation.navigate('Business')}>
      <ButtonText>Go to Business</ButtonText>
    </StyledButton>
  </>
);

const ClientView = ({ navigation }) => (
  <>
    <PageTitle welcome={true}>Welcome, Client!</PageTitle>
    <Subtitle welcome={true}>Book appointments and earn rewards.</Subtitle>
    <StyledButton onPress={() => navigation.navigate('Branches')}>
      <ButtonText>Schedule Appointment</ButtonText>
    </StyledButton>
  </>
);

const EmployeeView = ({ navigation }) => (
  <>
    <PageTitle welcome={true}>Hello, Employee!</PageTitle>
    <Subtitle welcome={true}>View your schedule and services.</Subtitle>
    <StyledButton onPress={() => navigation.navigate('Schedule')}>
      <ButtonText>My Schedule</ButtonText>
    </StyledButton>
  </>
);


const Welcome = ({ navigation }) => {
  const { userRole } = useUser();
  console.log('current user role:', userRole);
  
  // Renderiza vista según el rol
  const renderContent = () => {
    if (userRole === 1) {
      return <AdminView navigation={navigation} />;
    } else if (userRole === 2) {
      return <ClientView navigation={navigation} />;
    } else if (userRole === 3) {
      return <EmployeeView navigation={navigation} />;
    } else {
      return (
        <>
          <PageTitle welcome={true}>Guest</PageTitle>
          <Subtitle welcome={true}>Please log in to continue.</Subtitle>
        </>
      );
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require('../assets/img/welcome_image.webp')}
        />
        <WelcomeContainer>
          {renderContent()}
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require('../assets/img/froggi.webp')}
            />
            <Line />
            <StyledButton
              onPress={() => {
                console.log('Out of Session');
                navigation.navigate('Login');
              }}
            >
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
