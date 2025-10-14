// src/components/services/ServiceInfoModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InfoRow from '../ui/InfoRow';
import CustomButton from '../ui/ButtonCustome';
import StatusBadge from '../ui/StatusBadge';
import { Colors } from '../../assets/css/general/general';

const { btnEdit, badgeEnable, badgeDisable } = Colors;

const ServiceInfoModal = ({ visible, onClose, service, onToggleStatus, onEdit }) => {
  const [isServiceActive, setIsServiceActive] = useState(service?.state_service === 1);

  const handleToggle = (value) => {
    setIsServiceActive(value);
    onToggleStatus(service.id_service, value);
  };

  if (!service) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="arrow-back" size={24} color="#4e73df" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>{service.name}</Text>

          <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <InfoRow iconName="cash-outline" text={`Price: ₡${service.price}`} />
            <InfoRow iconName="document-text-outline" text={service.description || 'No Description'} />
            <InfoRow iconName="time-outline" text={`${service.duration || 'N/A'} min`} />
          </View>

          <View style={styles.toggleContainer}>
            <StatusBadge isActive={isServiceActive} />
            <Switch
              value={isServiceActive}
              onValueChange={handleToggle}
              trackColor={{ false: badgeDisable, true: badgeEnable }}
              thumbColor={isServiceActive ? '#fff' : '#f4f4f4'}
            />
          </View>

          <CustomButton
            text="Editar"
            onPress={onEdit}
            backgroundColor={btnEdit}
            textColor="#fff"
            paddingVertical={12}
            paddingHorizontal={20}
            style={{ width: '100%', marginTop: 16 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    padding: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 8,
  },
});

export default ServiceInfoModal;