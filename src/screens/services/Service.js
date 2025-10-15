import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { getAllServices, deleteService, updateService, createService, getAllSpecialties } from '../../api/services';
import ServiceCard from '../../components/services/ServiceCard';
import ServiceInfoModal from '../../components/services/ServiceInfoModal';
import ServiceForm from '../../components/services/ServiceForm';
import { Colors } from '../../assets/css/general/general';
//

const { primary } = Colors;

const Service = () => {
  const [services, setServices] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    fetchServices();
    fetchSpecialties();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await getAllServices(12);
      if (res?.data) setServices(res.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchSpecialties = async () =>{
    try {
      const res = await getAllSpecialties();
      if (res?.data) {
        setSpecialties(res.data);
      }
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  }

  const handleToggleService = async (serviceId, isActive) => {
    try {
      await deleteService(serviceId); // ✅ Borrado lógico (cambia state_service a 0)
      const newState = isActive ? 1 : 0;
      setServices(prev =>
        prev.map(s =>
          s.id_service === serviceId ? { ...s, state_service: newState } : s
        )
      );
      Alert.alert('Success', `Service ${isActive ? 'Enabled' : 'Disabled'}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el estado.');
    }
  };

  const openInfoModal = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const renderService = ({ item }) => (
    <ServiceCard
      service={item}
      onPress={() => openInfoModal(item)}
    />
  );
  //Handle Save Service
  const handleSaveService = async (serviceData) => {
    console.log('Datos del servicio: ',serviceData)
    try {
      if (editingService) {
        //edition
        console.log('Servicio editado: ', editingService);
        
        await updateService(editingService.id_service, serviceData);//Revisar el endpoint
        Alert.alert('Success', 'Service Updated!');
      }else {
        //create
        await createService(serviceData);//Revisar endpoint
        Alert.alert('Success', 'Service Created!');
      }
      setFormModalVisible(false);
      fetchServices(); //reload page
    } catch (error) {
      Alert.alert('Error', 'Can not create the service.');
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: primary, padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16, color: '#333' }}>
        {services.length === 1 ? 'Service' : 'Services'} Registered:{' '}
        <Text style={{ color: '#4e73df', fontWeight: 'bold' }}>{services.length}</Text>
      </Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id_service.toString()}
        renderItem={renderService}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>
            You have no registered services.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <TouchableOpacity
        onPress={() => {
          setEditingService(null);
          setFormModalVisible(true);
        }}
        style={styles.fab}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <ServiceInfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        service={selectedService}
        onToggleStatus={handleToggleService}
        onEdit={() => {
          setEditingService(selectedService);
          setFormModalVisible(true);
          setModalVisible(false);
        }}
      />
      <Modal
        animationType='slide'
        transparent={false}
        visible={formModalVisible}
        onRequestClose={()=> setFormModalVisible(false)}
      >
        <View style={{flex: 1, padding: 20, backgroundColor: '#f8f9fa'}}>
          <ServiceForm
            service={editingService}
            specialties={specialties}
            onSubmit={handleSaveService}
            onCancel={()=> setFormModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
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
  },
});

export default Service;