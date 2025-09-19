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

const Welcome = ({navigation}) => {

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode= "cover" source={require('../assets/img/welcome_image.webp')}/>
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome!!</PageTitle>
          <Subtitle welcome={true}>Jhon Doe</Subtitle>
          <Subtitle welcome={true}>johndoe@gmail.com</Subtitle>
          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('../assets/img/froggi.webp')} />
            <Line />
            <StyledButton onPress={() => {
              console.log('Out of Session');
              navigation.navigate('Login');
            }}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
