import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InfoRow from '../ui/InfoRow';
import StatusBadge from '../ui/StatusBadge';
import { Colors } from '../../assets/css/general/general';

const { primary } = Colors;

const ServiceCard = ({ service, onPress }) => {
  return (
    <View
      style={{
        backgroundColor: primary,
        padding: 20,
        borderRadius: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'flex-start' }}
        onPress={onPress}
      >
        <Ionicons name="ribbon-outline" size={24} color={'#4e73df'} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 4 }}>
            {service.name}
          </Text>
          <InfoRow iconName="cash-outline" text={`₡${service.price}`} />
        </View>
        <StatusBadge isActive={service.state_service === 1} />
      </TouchableOpacity>
    </View>
  );
};

export default ServiceCard;