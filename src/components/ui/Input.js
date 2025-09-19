import { View, TouchableOpacity } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import {
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
} from "../../assets/css/auth/auth";
import { darkLight, brand } from "../../assets/css/general/general";

const Input = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} editable={false} />
        </TouchableOpacity>
      )}

      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};
export default Input;
