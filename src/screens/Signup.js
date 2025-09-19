import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyledContainer, InnerContainer, PageTitle, Subtitle } from "../assets/css/auth/auth";
import KeyboardAvoiding from "../components/ui/KeyboardAvoiding";
import RegisterForm from "../components/auth/RegisterForm";

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => setShow(true);

  return (
    <KeyboardAvoiding>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>JOBBI</PageTitle>
          <Subtitle>Account Signup</Subtitle>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <RegisterForm
            navigation={navigation}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
            showDatePicker={showDatePicker}
            dob={dob}
          />
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoiding>
  );
};

export default Signup;
