import { Formik } from 'formik';
import {
  MsBox,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../../assets/css/auth/auth';
import Input from '../ui/Input';
import { darkLight } from '../../assets/css/general/general';
import { formatDate } from '../../utils/DateFormat';

import useRegister from '../../hooks/auth/register';

const RegisterForm = ({ navigation, hidePassword, setHidePassword, showDatePicker, dob }) => {
  const { error, setError, registerPOST } = useRegister();
  return (
    <Formik
      initialValues={{ name: '', lastName: '', phone: '', email: '', password: '', confirmPassword: '' }}
      onSubmit={async (values) => {
        if (
          values.name.trim() === '' ||
          values.lastName.trim() === '' ||
          values.phone.trim() === '' ||
          values.email.trim() === '' ||
          values.password.trim() === '' ||
          values.confirmPassword.trim() === ''
        ) {
          setError('Please fill any field in form!');
          console.log('Empty fields');
          return;
        }
        if(values.password.trim()!== values.confirmPassword.trim()){
            setError('Please match both password!');
            console.log('Empty fields');
            return;
        }

        console.log(`Estoy en registerForm y este es el value:${values}`);
        const res = await registerPOST(values);

        if (res) {
          navigation.navigate('Welcome');
          console.log('Register form:', values);
        } else{
            console.error(`Se cayo en RegisterForm!`)
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <StyledFormArea>
          <Input
            label="Name"
            icon="person"
            placeholder="John"
            placeholderTextColor={darkLight}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          <Input
            label="Last Name"
            icon="person"
            placeholder="Doe"
            placeholderTextColor={darkLight}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
          />
          <Input
            label="Phone Number"
            icon="device-mobile"
            placeholder="(xxx) xxx xxxx"
            placeholderTextColor={darkLight}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
          />

          <Input
            label="Email Address"
            icon="mail"
            placeholder="john@gmail.com"
            placeholderTextColor={darkLight}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />

          {/* <Input
                        label="Date of Birth"
                        icon="calendar"
                        placeholder="YYYY - MM - DD"
                        placeholderTextColor={darkLight}
                        value={dob ? formatDate(dob) : ""}
                        isDate={true}
                        showDatePicker={showDatePicker}
                    /> */}

          <Input
            label="Password"
            icon="lock"
            placeholder="***************"
            placeholderTextColor={darkLight}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
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
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            secureTextEntry={hidePassword}
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
          />

          <MsBox>{error}</MsBox>

          <StyledButton onPress={handleSubmit}>
            <ButtonText>Signup</ButtonText>
          </StyledButton>

          <Line />

          <ExtraView>
            <ExtraText>Already have an account? </ExtraText>
            <TextLink onPress={() => navigation.navigate('Login')}>
              <TextLinkContent>Login</TextLinkContent>
            </TextLink>
          </ExtraView>
        </StyledFormArea>
      )}
    </Formik>
  );
};

export default RegisterForm;
