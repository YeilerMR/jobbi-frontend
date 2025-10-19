import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useServiceView } from '../../hooks/ServiceContext';


import {
  getServices,
  getAllServices,
  deleteService,
  updateService,
  createService,
  getAllSpecialties,
} from '../../api/services';
import ServiceCard from '../../components/services/ServiceCard';
import ServiceInfoModal from '../../components/services/ServiceInfoModal';
import ServiceForm from '../../components/services/ServiceForm';
import ServiceEmployeeTabs from '../../components/ui/ServiceEmployeeTabs';
import { Colors } from '../../assets/css/general/general';

import { useRoute } from '@react-navigation/native';
//

const { primary } = Colors;

const Service = () => {

  const { serviceViewMode, setServiceViewMode } = useServiceView();
  const route = useRoute();
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const [services, setServices] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (serviceViewMode.mode === 'branch' && serviceViewMode.branchId != null) {
        fetchServices(serviceViewMode.branchId);
      } else {
        fetchServices(null);
      }
    }, [serviceViewMode])
  );

  //usar si no funciona
//   useFocusEffect(
//   useCallback(() => {
//     // Si no estamos en modo branch, asegúrate de estar en modo all
//     if (serviceViewMode.mode !== 'branch') {
//       setServiceViewMode({ mode: 'all', branchId: null });
//     }

//     const branchId = serviceViewMode.mode === 'branch' ? serviceViewMode.branchId : null;
//     fetchServices(branchId);
//   }, [serviceViewMode])
// );

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchServices = async (branchId) => {
    setLoading(true);
    try {
      let res;
      if (branchId != null) {
        console.log('Fetching services for branch:', branchId);
        res = await getAllServices(branchId);
      } else {
        console.log('Fetching all services (no branch filter)');
        res = await getServices();
      }
      setServices(res?.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      Alert.alert('Error', 'No se pudieron cargar los servicios.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const res = await getAllSpecialties();
      if (res?.data) {
        setSpecialties(res.data);
      }
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  };

  const handleToggleService = async (serviceId, isActive) => {
    try {
      console.log('Esta activo: ', isActive);

      if (isActive) {
      }
      await deleteService(serviceId); // ✅ Borrado lógico (cambia state_service a 0)
      const newState = isActive ? 1 : 0;
      setServices((prev) => prev.map((s) => (s.id_service === serviceId ? { ...s, state_service: newState } : s)));
      Alert.alert('Success', `Service ${isActive ? 'Enabled' : 'Disabled'}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el estado.');
    }
  };

  const openInfoModal = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const renderService = ({ item }) => <ServiceCard service={item} onPress={() => openInfoModal(item)} />;
  //Handle Save Service
  const handleSaveService = async (serviceData) => {
    try {
      if (editingService) {
        await updateService(editingService.id_service, serviceData);
        Alert.alert('Success', 'Service Updated!');
      } else {
        await createService(serviceData);
        Alert.alert('Success', 'Service Created!');
      }
      setFormModalVisible(false);

      // ✅ Recarga con el branchId actual
      const { branchId, fromBranches } = route.params || {};
      const currentBranchId = fromBranches && branchId != null ? branchId : null;
      fetchServices(currentBranchId);
    } catch (error) {
      Alert.alert('Error', 'Can not create the service.');
    }
  };
  const branchId = route.params?.branchId ?? null;

  return (
    <View style={{ flex: 1, backgroundColor: primary, padding: 20 }}>
      <ServiceEmployeeTabs activeTab="services" branchId={branchId} />

      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16, color: '#333' }}>
        {services.length === 1 ? 'Service' : 'Services'} Registered :{' '}
        <Text style={{ color: '#4e73df', fontWeight: 'bold' }}>{services.length}</Text>
      </Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id_service.toString()}
        renderItem={renderService}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>You have no registered services.</Text>
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
        animationType="slide"
        transparent={false}
        visible={formModalVisible}
        onRequestClose={() => setFormModalVisible(false)}
      >
        <View style={{ flex: 1, padding: 20, backgroundColor: '#f8f9fa' }}>
          <ServiceForm
            service={editingService}
            specialties={specialties}
            onSubmit={handleSaveService}
            onCancel={() => setFormModalVisible(false)}
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

// useFocusEffect(
//   useCallback(() => {
//     // Obtén branchId de los parámetros actuales (puede ser null)
//     const branchId = route.params?.branchId ?? null;
//     fetchServices(branchId);
//   }, [route.key]) // ✅ clave: usar route.key
// );

// useEffect(() => {
//   if (isFocused) {
//     console.log('🔍 route.params in Service:', route.params);
//     const branchId = route.params?.branchId ?? null;
//     console.log('Current route.params:', route.params);
//     fetchServices(branchId);
//   }
// }, [isFocused, route.params?.branchId]);
