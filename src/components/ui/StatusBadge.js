import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../assets/css/general/general';

const { badgeEnable, badgeDisable, textBadgeE, textBadgeD } = Colors;

const StatusBadge = ({ isActive }) => {
  return (
    <View
      style={{
        backgroundColor: isActive ? badgeEnable : badgeDisable,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          fontWeight: '600',
          color: isActive ? textBadgeE : textBadgeD,
        }}
      >
        {isActive ? 'Enabled' : 'Disabled'}
      </Text>
    </View>
  );
};

export default StatusBadge;