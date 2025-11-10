// MyRewardCard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../assets/css/general/general';
import QRCode from 'react-native-qrcode-svg';
//import { Modal } from 'react-native/types_generated/index';

const { brand, green, badgeEnable } = Colors;

const MyRewardCard = ({ reward }) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <TouchableOpacity activeOpacity={0.9} onPress={() => setShowQR(true)} style={styles.mainView}>
        <View style={styles.contentView}>
          <Ionicons name="ticket-outline" size={24} color={brand} />
          <View style={styles.rowView}>
            <Text style={styles.textCard}>{reward.name}</Text>
            <Text style={styles.dateText}>Redeemed on: {reward.redeemedDate}</Text>
            <Text style={[styles.statusText, { color: reward.isActive ? '#999' : green }]}>
              Status: {reward.isActive ? 'Used' : 'Active'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal transparent visible= {showQR} animationType='fade' onRequestClose={()=> setShowQR(false)}>
        <SafeAreaView style={styles.modalOverlay} edges={['bottom']}>
          <View style={styles.qrModal}>
            <Text style={styles.qrTitle}>Show this QR to redeem</Text>
            <Text style={styles.qrSubtitle}>{reward.name}</Text>
            <QRCode
              value={`https://example.com/reward/${reward.id}`} // 👈 Cambia esto más adelante por un token seguro
              size={220}
              color="black"
              backgroundColor="white"
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowQR(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

// const styles = StyleSheet.create({
//   mainView: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   contentView: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   rowView: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   textCard: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 6,
//     flexShrink: 1,
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 4,
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   button: {
//     backgroundColor: green,
//     borderRadius: 20,
//     marginTop: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     alignSelf: 'flex-start',
//   },
//   buttonText: {
//     color: badgeEnable,
//     fontWeight: '600',
//     fontSize: 14,
//   },
// });

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
  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  qrModal: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '80%',
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  qrSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default MyRewardCard;
