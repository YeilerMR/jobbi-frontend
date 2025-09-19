import { Formik } from "formik";
import {
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  MsBox,
} from "../../assets/css/auth/auth";
import Input from "../ui/Input";
import { darkLight } from "../../assets/css/general/general";
import useLogin from "../../hooks/auth/login";

const AuthForm = ({ navigation, hidePassword, setHidePassword }) => {
  const { error, setError, loginPost } = useLogin();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        if(values.email.trim() === "" || values.password.trim() === ""){
          setError("Please fill in all fields.");
          return;
        }
        const res = await loginPost(values);
        if (res) navigation.navigate("Welcome");
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <StyledFormArea>
          <Input
            label="Email Address"
            icon="mail"
            placeholder="johndoe@gmail.com"
            placeholderTextColor={darkLight}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            keyboardType="email-address"
          />

          <Input
            label="Password"
            icon="lock"
            placeholder="***************"
            placeholderTextColor={darkLight}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry={hidePassword}
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
          />

          <MsBox>{error}</MsBox>

          <StyledButton onPress={handleSubmit}>
            <ButtonText>Login</ButtonText>
          </StyledButton>

          <Line />

          <ExtraView>
            <ExtraText>Don’t have an account already? </ExtraText>
            <TextLink onPress={() => navigation.navigate("Signup")}>
              <TextLinkContent>Signup</TextLinkContent>
            </TextLink>
          </ExtraView>
        </StyledFormArea>
      )}
    </Formik>
  );
};

export default AuthForm;
