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
} from '../components/styles.js';

const Welcome = ({navigation}) => {

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode= "cover" source={require('../assets/welcome_image.png')}/>
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome!!</PageTitle>
          <Subtitle welcome={true}>Jhon Doe</Subtitle>
          <Subtitle welcome={true}>johndoe@gmail.com</Subtitle>
          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('../assets/froggi.png')} />
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
