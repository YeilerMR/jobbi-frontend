import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InfoRow from '../ui/InfoRow';
import { Colors } from '../../assets/css/general/general';

const { primary, brand, green, badgeEnable } = Colors;

const RewardCard = ({ reward, iconName, isButton = false, discount, colorTitle = '#000', onClick }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.contentView}>
        <Ionicons name={iconName} size={24} color={brand} />
        <View style={styles.rowView}>
          <Text style={[styles.textCard, { color: colorTitle }]}>{reward.name}</Text>

          {reward.description ? (
            <InfoRow iconName="information-circle-outline" text={reward.description} />
          ) : (
            <>
              {discount !== undefined && discount !== null && (
                <InfoRow text={`${discount}% discount on your next service.`} />
              )}
              {reward.points !== undefined && reward.points !== null && (
                <InfoRow iconName="sparkles-outline" text={reward.points} />
              )}
            </>
          )}

          {discount !== undefined && discount !== null && (
            <InfoRow text={`${discount}% discount on your next service.`} />
          )}

          {/* {reward.points !== undefined && reward.points !== null && (
            <InfoRow iconName="sparkles-outline" text={reward.points} />
          )} */}
        </View>
      </View>

      {/* 👇 Solo muestra el botón si `isButton` es true */}
      {isButton && (
        <TouchableOpacity
          onPress={() => {
            console.log('Boton interno');
            onClick(reward);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Redeem</Text>
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
});

export default RewardCard;
