import { Formik } from "formik";
import { MsBox, StyledFormArea, StyledButton, ButtonText, Line, ExtraView, ExtraText, TextLink, TextLinkContent } from "../../assets/css/auth/auth";
import Input from "../ui/Input";
import { darkLight } from "../../assets/css/general/general";
import { formatDate } from "../../utils/DateFormat";

const RegisterForm = ({ navigation, hidePassword, setHidePassword, showDatePicker, dob }) => {
    return (
        <Formik
            initialValues={{ fullName: "", email: "", dateOfBirth: "", password: "", confirmPassword: "" }}
            onSubmit={(values) => {
                console.log("Register form:", values);
                navigation.navigate("Welcome");
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <StyledFormArea>
                    <Input
                        label="Full Name"
                        icon="person"
                        placeholder="John Doe"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("fullName")}
                        onBlur={handleBlur("fullName")}
                        value={values.fullName}
                    />

                    <Input
                        label="Email Address"
                        icon="mail"
                        placeholder="john@gmail.com"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        keyboardType="email-address"
                    />

                    <Input
                        label="Date of Birth"
                        icon="calendar"
                        placeholder="YYYY - MM - DD"
                        placeholderTextColor={darkLight}
                        value={dob ? formatDate(dob) : ""}
                        isDate={true}
                        showDatePicker={showDatePicker}
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

                    <Input
                        label="Confirm Password"
                        icon="lock"
                        placeholder="***************"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />

                    <MsBox></MsBox>

                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>Signup</ButtonText>
                    </StyledButton>

                    <Line />

                    <ExtraView>
                        <ExtraText>Already have an account? </ExtraText>
                        <TextLink onPress={() => navigation.navigate("Login")}>
                            <TextLinkContent>Login</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>
            )}
        </Formik>
    );
};

export default RegisterForm;
