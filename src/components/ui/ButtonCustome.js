// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// const ButtonCustome = ({ styles, btnColor, text, onPress }) => {
//   return (
//     <View style={styles.buttons}>
//       <TouchableOpacity
//         style={[styles.customButton, { backgroundColor: btnColor }]}
//         onPress={onPress}
//       >
//         <Text style={styles.buttonText}>{text}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ButtonCustome;


// components/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // o la librería que uses

const CustomButton = ({
  onPress,
  text,
  textColor = '#fff',
  backgroundColor = '#4e73df',
  borderColor,
  borderWidth = 0,
  borderRadius = 8,
  paddingVertical = 12,
  paddingHorizontal = 16,
  fontSize = 16,
  fontWeight = '600',
  icon: IconComponent, // componente de ícono (ej. Ionicons)
  iconName,           // nombre del ícono
  iconColor,          // color del ícono
  iconPosition = 'left', // 'left', 'right', 'top'
  iconSize = 18,
  disabled = false,
  loading = false,
  style,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          backgroundColor: isDisabled ? '#ccc' : backgroundColor,
          borderColor: borderColor || backgroundColor,
          borderWidth,
          borderRadius,
          paddingVertical,
          paddingHorizontal,
        },
        style,
      ]}
    >
      {loading ? (
        // Puedes poner un ActivityIndicator aquí si quieres
        <Text style={[styles.text, { color: textColor, fontSize, fontWeight }]}>
          Loading...
        </Text>
      ) : (
        <View style={iconPosition === 'top' ? styles.column : styles.row}>
          {iconName && IconComponent && iconPosition !== 'right' && (
            <IconComponent
              name={iconName}
              size={iconSize}
              color={iconColor || textColor}
              style={iconPosition === 'top' ? { marginBottom: 6 } : { marginRight: text ? 8 : 0 }}
            />
          )}

          {text ? (
            <Text style={[styles.text, { color: textColor, fontSize, fontWeight }]}>
              {text}
            </Text>
          ) : null}

          {iconName && IconComponent && iconPosition === 'right' && (
            <IconComponent
              name={iconName}
              size={iconSize}
              color={iconColor || textColor}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    includeFontPadding: false,
  },
});

export default CustomButton;