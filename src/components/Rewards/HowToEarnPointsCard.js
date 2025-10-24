// HowToEarnPointsCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../assets/css/general/general';

const { brand, subtitle } = Colors;

const HowToEarnPointsCard = ({ userRole }) => {
  // Determinar los puntos según el rol
  let pointsPerAppointment = 10; // valor por defecto para rol 2 (client)
  if (userRole === 1) {
    pointsPerAppointment = 1;   // admin
  } else if (userRole === 3) {
    pointsPerAppointment = 5;   // employee
  }
  // rol 2 (client) ya tiene 10, así que no necesita cambio

  return (
    <View style={styles.mainView}>
      <View style={styles.contentView}>
        <Ionicons name="information-circle-outline" size={24} color={brand} />
        <View style={styles.rowView}>
          <Text style={styles.title}>How do I earn reward points?</Text>
          <Text style={styles.subtitle}>Complete Appointments</Text>
          <Text style={styles.description}>
            Earn <Text style={{color: brand, fontWeight: 700}}>{pointsPerAppointment}</Text> point{pointsPerAppointment !== 1 ? 's' : ''} for each completed appointment.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowView: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: brand,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: subtitle,
    lineHeight: 20,
  },
});

export default HowToEarnPointsCard;