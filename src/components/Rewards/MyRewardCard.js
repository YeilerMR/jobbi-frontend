// MyRewardCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../assets/css/general/general';

const { brand, green, badgeEnable } = Colors;

const MyRewardCard = ({ reward, onUse }) => {
  // reward debe tener: name, date, state (true = active, false = used)
  const statusText = reward.state ? 'Active' : 'Used';
  const statusColor = reward.state ? green : '#999';

  return (
    <View style={styles.mainView}>
      <View style={styles.contentView}>
        <Ionicons name="ticket-outline" size={24} color={brand} />
        <View style={styles.rowView}>
          <Text style={styles.textCard}>{reward.name}</Text>
          <Text style={styles.dateText}>Valid until: {reward.date}</Text>
          <Text style={[styles.statusText, { color: statusColor }]}>
            Status: {statusText}
          </Text>
        </View>
      </View>

      {reward.state && (
        <TouchableOpacity onPress={() => onUse(reward)} style={styles.button}>
          <Text style={styles.buttonText}>Use Now</Text>
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
  dateText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
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

export default MyRewardCard;