// Service.js - VERSIÓN COMPLETA
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
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

const { primary } = Colors;

const Service = () => {
  const { serviceViewMode, resetToAllMode } = useServiceView();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const branchId = route?.params?.branchId ?? null;
  // Referencia para trackear si venimos de Branches
  const cameFromBranchesRef = useRef(false);

  const [services, setServices] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto principal para cargar servicios
  useEffect(() => {
    fetchServicesBasedOnMode();
  }, [branchId])
  // useEffect(() => {

  //   if (isFocused) {
  //     fetchServicesBasedOnMode();
  //   }
  // }, [isFocused, serviceViewMode.mode, serviceViewMode.branchId]);

  // Efecto para detectar navegación desde Branches vs Drawer
  useFocusEffect(
    useCallback(() => {
      // Cuando la pantalla gana foco, verificar si venimos de Branches
      const navigationState = navigation.getState();
      const currentRoute = navigationState.routes[navigationState.index]?.name;
      const previousRoute = navigationState.routes[navigationState.index - 1]?.name;



      if (previousRoute === 'Branches') {
        // Venimos de Branches - NO resetear
        cameFromBranchesRef.current = true;

      } else if (previousRoute && previousRoute !== 'Branches') {
        // Venimos de otra pantalla (probablemente drawer) - RESETEAR
        cameFromBranchesRef.current = false;

        resetToAllMode();
      }

      // Si no hay ruta anterior (app recién iniciada), también resetear
      if (!previousRoute) {

        resetToAllMode();
      }
    }, [navigation, resetToAllMode])
  );

  const fetchServicesBasedOnMode = async () => {
    setLoading(true);
    try {
      let res;
      if (serviceViewMode.mode === 'branch' && serviceViewMode.branchId != null) {

        res = await getAllServices(serviceViewMode.branchId);
      } else {

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

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleToggleService = async (serviceId, newActiveStatus) => {
    try {
      if (newActiveStatus) {
        await updateService(serviceId, { state_service: 1 });
      } else {
        await deleteService(serviceId);
      }

      setServices((prev) =>
        prev.map((s) => (s.id_service === serviceId ? { ...s, state_service: newActiveStatus ? 1 : 0 } : s)),
      );

      Alert.alert('Success', `Service ${newActiveStatus ? 'Enabled' : 'Disabled'}`);
    } catch (error) {
      console.error('Error toggling service status:', error);
      Alert.alert('Error', 'No se pudo actualizar el estado del servicio.');

      setServices((prev) =>
        prev.map((s) => (s.id_service === serviceId ? { ...s, state_service: newActiveStatus ? 0 : 1 } : s)),
      );
    }
  };

  const openInfoModal = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const renderService = ({ item }) => <ServiceCard service={item} onPress={() => openInfoModal(item)} />;

  const handleSaveService = async (serviceData) => {
    try {
      if (editingService) {
        await updateService(editingService.id_service, serviceData);
        Alert.alert('Success', 'Service Updated!');
      } else {
        console.log("Service: ",serviceData);
        await createService(serviceData);
        Alert.alert('Success', 'Service Created!');
      }
      setFormModalVisible(false);
      fetchServicesBasedOnMode();
    } catch (error) {
      Alert.alert('Error', 'Can not create the service.');
    }
  };

  const canManageStatus = serviceViewMode.mode === 'branch' && serviceViewMode.fromBranches;

  return (
    <View style={{ flex: 1, backgroundColor: primary, padding: 20 }}>
      <ServiceEmployeeTabs
        activeTab="services"
        branchId={serviceViewMode.mode === 'branch' ? serviceViewMode.branchId : null}
      />

      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16, color: '#333' }}>
        {services.length === 1 ? 'Service' : 'Services'} Registered :{' '}
        <Text style={{ color: '#4e73df', fontWeight: 'bold' }}>{services.length}</Text>
        {serviceViewMode.mode === 'branch' && (
          <Text style={{ fontSize: 12, color: '#666', marginLeft: 8 }}>(Filtered by branch)</Text>
        )}
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
        canManageStatus={canManageStatus}
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
            idBranch={branchId}
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