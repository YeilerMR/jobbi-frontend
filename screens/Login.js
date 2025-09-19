import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
//Formik
import { Formik } from 'formik';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  Subtitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsBox,
  Line,
  ExtraView,
  ExtraText, 
  TextLink, 
  TextLinkContent
} from '../components/styles.js';
import { View } from 'react-native';

//Colors
const { brand, darkLight, primary } = Colors;

// keyboard
import KeyboardAvoiding from '../components/KeyboardAvoiding.js';


const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

  return (
    <KeyboardAvoiding>
      <StyledContainer>
        <StatusBar style="dark"></StatusBar>
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('../assets/img/froggi.webp')}></PageLogo>
          <PageTitle>JOBBI</PageTitle>
          <Subtitle> Account Login</Subtitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("Welcome"); // -> Redireccion a la pantalla de bienvenida. 
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Addres"
                  icon="mail"
                  placeholder="johndoe@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText= {handleChange('password')}
                  onBlur= {handleBlur('password')}
                  value= {values.password}
                  secureTextEntry= {hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsBox>...</MsBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>
                      Login
                  </ButtonText>
                </StyledButton>
                <Line/>

                  <ExtraView>
                      <ExtraText>Don't have an account already? </ExtraText>
                      <TextLink onPress={()=> navigation.navigate("Signup")}>
                          <TextLinkContent>Singup</TextLinkContent>
                      </TextLink>
                  </ExtraView>

              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoiding>
  );
};

const MyTextInput = ({ label, icon,isPassword,hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress= {()=>setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? 'eye-off-outline' : 'eye-outline'} size={30} color={darkLight}></Ionicons>
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
