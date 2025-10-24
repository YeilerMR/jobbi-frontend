import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InfoRow from '../ui/InfoRow';
import { Colors } from '../../assets/css/general/general';

const { primary, brand, green, badgeEnable } = Colors;

const RewardCard = ({ reward, iconName, isButton = false, isDisabled, discount, colorTitle = '#000', onClick }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.contentView}>
        <Ionicons name={iconName} size={24} color={brand} />
        <View style={styles.rowView}>
          <Text style={[styles.textCard, { color: colorTitle }]}>{reward.name}</Text>

          {/* Siempre mostrar descripción si existe */}
          {reward.description && <InfoRow iconName="information-circle-outline" text={reward.description} />}

          {/* Siempre mostrar puntos si existe */}
          {reward.points && <InfoRow iconName="sparkles-outline" text={reward.points} />}

          {/* Mostrar discount solo si no hay description ni points (retrocompatibilidad) */}
          {discount !== undefined && discount !== null && !reward.description && !reward.points && (
            <InfoRow text={`${discount}% discount on your next service.`} />
          )}
        </View>
      </View>

      {/* 👇 Solo muestra el botón si `isButton` es true */}
      {isButton && (
        <TouchableOpacity
          onPress={() => {
            if (!isDisabled) {
              onClick(reward);
            }
          }}
          disabled={isDisabled}
          style={[styles.button, isDisabled && styles.buttonDisabled]}
        >
          <Text style={[styles.buttonText, isDisabled && styles.buttonDisabledText]}>
            {isDisabled ? 'Insufficient Points' : 'Redeem'}
          </Text>
        </TouchableOpacity>
      )}
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
  textCard: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    flexShrink: 1,
  },
  button: {
    backgroundColor: green,
    borderRadius: 20,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: badgeEnable,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonDisabled: {
    backgroundColor: '#ccc', // gris desactivado
  },
  buttonDisabledText: {
    color: brand,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default RewardCard;
