import { useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  Subtitle,
} from "../assets/css/auth/auth";
import KeyboardAvoiding from "../components/ui/KeyboardAvoiding";
import AuthForm from "../components/auth/AuthForm";

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <KeyboardAvoiding>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("../assets/img/froggi.webp")}
          />
          <PageTitle>JOBBI</PageTitle>
          <Subtitle>Account Login</Subtitle>

          <AuthForm
            navigation={navigation}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
          />
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoiding>
  );
};

export default Login;
