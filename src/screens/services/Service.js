import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { createService, updateService, getAllServices, deleteService } from '../../api/services';

import InfoRow from '../../components/ui/InfoRow';
import { Colors } from '../../assets/css/general/general';
import CustomButton from '../../components/ui/ButtonCustome';

const { primary, brand, btnEdit } = Colors;

const Service = () => {
  const [services, setServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      console.log('fetch: puto');
      const res = await getAllServices(12); //agregar id del branch cuando termine daniel, hablar con el.
      if (res && res?.data) {
        setServices(res.data);
      }
    } catch (error) {}
  };

  //Handle save

  //handleToggleStatus

  const openEditModal = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };
  const openInfoModal = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const renderService = ({ item }) => (
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
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-start' }} onPress={() => openInfoModal(item)}>
        <Ionicons name="ribbon-outline" size={24} color={'#4e73df'} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 4 }}>{item.name}</Text>
          <InfoRow iconName="cash-outline" text={`₡${item.price}`} />
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: primary, padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16, color: '#333' }}>
        {services.length === 1 ? 'Service' : 'Services'} Registered:{' '}
        <Text style={{ color: '#4e73df', fontWeight: 'bold' }}>{services.length}</Text>{' '}
      </Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id_service.toString()}
        renderItem={renderService}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>You have no registered services.</Text>
        }
      />
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Hola Mundo!');
          //   setSelectedBusiness(null);
          //   setModalVisible(true);
        }}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 30,
          backgroundColor: '#4e73df',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 5,
          elevation: 6,
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
      {/*Falta el modal de edicion y registro*/}

      {/* Modal de Informacion: */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedService && (
              <>
                <Text style={styles.modalTitle}>{selectedService.name}</Text>
                <View style={{flexDirection:'column', alignItems: 'flex-start'}}>

                <InfoRow iconName="cash-outline" text={` Price: ₡${selectedService.price}`} />
                <InfoRow iconName="document-text-outline" text={selectedService.description || 'No Description'} />
                <InfoRow iconName="time-outline" text={selectedService.duration} />
                </View>
                {/* Buttons */}
                <View style={styles.modalButtons}>
                  <CustomButton
                    text="Edit"
                    onPress={() => {
                      Alert.alert('Edit Service', 'Form to Edit Service');
                    }}
                    style={[styles.customButton, { backgroundColor: btnEdit }]}
                  />
                  <CustomButton
                    text="Desactivar"
                    onPress={() => {
                      // Aquí irá la lógica para desactivar
                      Alert.alert('Desactivar', '¿Estás seguro?', [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Sí', onPress: () => handleDeactivateService(selectedService.id_service) },
                      ]);
                    }}
                    style={[styles.customButton, { backgroundColor: '#e74a3b' }]}
                    textStyle={styles.buttonText}
                  />
                </View>
              </>
            )}
            
            <CustomButton
              text="Cerrar"
              onPress={() => setModalVisible(false)}
              backgroundColor="#6c757d"
              textColor="#fff"
              paddingVertical={13} // ⬅️ Aumentado
              paddingHorizontal={16}
              fontSize={16} // ⬅️ Aumentado si quieres más visibilidad
              style={{ width: '50%' }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  customButton: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  statusBadge: {
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 2,
  },
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 12,
  },
});

export default Service;
