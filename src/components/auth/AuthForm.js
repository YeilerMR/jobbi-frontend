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
import { useUser } from "../../hooks/UserContext";

const AuthForm = ({ navigation, hidePassword, setHidePassword }) => {
  
  const { data, error, setError, loginPost } = useLogin();
  const {setUserRole} = useUser();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        if(values.email.trim() === "" || values.password.trim() === ""){
          setError("Please fill in all fields.");
          return;
        }
        const success = await loginPost(values);
        if (success && data) {

          const userRole = data?.role;
          if (userRole !== undefined) {
            setUserRole(userRole);
            navigation.navigate('PrivateArea')
          } else{
            setError('User rol Not found')
          }
        }
        // const res = await loginPost(values);
        // if (res) navigation.navigate("PrivateArea", { screen: "Welcome" });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <StyledFormArea>
          <Input
            label="Email Address"
            icon="mail"
            placeholder="johndoe@gmail.com"
            placeholderTextColor={darkLight}
            onChangeText={(text) => handleChange("email")(text.toLowerCase())}
            onBlur={handleBlur("email")}
            value={values.email}
            keyboardType="email-address"
            autoCapitalize="none"
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
