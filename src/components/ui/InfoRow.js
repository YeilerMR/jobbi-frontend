// components/InfoRow.js
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoRow = ({ iconName, text, iconColor = '#666', iconSize = 16, textStyle = {} }) => {
  if (!text) return null; // No renderiza si no hay texto

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} style={{ marginEnd: 5 }} />
      <Text style={[{ fontSize: 14, color: '#666' }, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

export default InfoRow;