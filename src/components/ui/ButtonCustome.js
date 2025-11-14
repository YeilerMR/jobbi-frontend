
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

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
  icon: IconComponent, 
  iconName,         
  iconColor,       
  iconPosition = 'left',
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