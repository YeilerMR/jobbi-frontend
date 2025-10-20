import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createEmployee, getEmployeesByBranch, getMyEmployees, updateEmployee, deleteEmployee } from '../../api/employees';
import InfoRow from '../../components/ui/InfoRow';
import CustomButton from '../../components/ui/ButtonCustome';
import { Colors } from '../../assets/css/general/general';
import EmployeesModal from '../../components/employee/EmployeeModal';
import { useRoute } from '@react-navigation/native';
const { btnEdit, btnDisable, badgeEnable, badgeDisable, textBadgeE, textBadgeD, green } = Colors;

const EmployeesScreen = () => {
  const route = useRoute();
  const branchId = route?.params?.branchId ?? null;

  const [Employees, setEmployees] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [branchId]);

  const fetchEmployees = async () => {
    setEmployees([]);
    try {
      setLoading(true);
      if (branchId) {
        const res = await getEmployeesByBranch(branchId);
        if (res && res?.data) {
          setEmployees(res.data);
          setLoading(false);
        }
      } else {
        const res = await getMyEmployees();
        if (res && res?.data) {
          setEmployees(res.data);
          setLoading(false);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSaveEmploye = async (EmployeData) => {
    try {
      if (EmployeData.id_employee) {
        await updateEmployee(EmployeData.id_employee, EmployeData);
        Alert.alert('Success', 'Employee Updated!');
      } else {
        await createEmployee(branchId, EmployeData);
        Alert.alert('Success', 'Employee Invited!');
      }
      fetchEmployees();
    } catch (error) {
    }
  };

  const handleToggleEmployeeStatus = async (Employee) => {
    const id_Employee = Employee?.id_employee;
    const newStatus = Employee.availability === 1 ? 0 : 1;
    const action = newStatus === 1 ? 'enable' : 'delete';


    Alert.alert(
      `Confirm ${action}`,
      `Are you sure you want to ${action} "${Employee.userName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes', onPress: async () => {
            try {
              if (Employee.availability === 0) {
                if (Employee.availability) {
                  Employee.availability = newStatus;
                } else {
                  Employee.availability = newStatus;
                }
                await updateEmployee(id_Employee, Employee);
              } else {
                await deleteEmployee(id_Employee);
              }
              Alert.alert('Success', `Employee ${action}d!`);
              fetchEmployees();
            } catch (error) { }
          }
        }
      ]
    );
  };

  const openEditModal = (Employee) => {
    setSelectedEmployee(Employee);
    setModalVisible(true);
  }

  const renderBranch = ({ item }) => (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'flex-start' }}
        onPress={() => navigation.navigate('Sucursales')}
      >
        <Ionicons name="person" size={24} color={'#4e73df'}></Ionicons>
        <View style={{ marginLeft: 12, flex: 1 }}>
          {/* Badge Info */}
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 4 }}>{item.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: (item.availability) === 1 ? badgeEnable : badgeDisable }]}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: (item.availability) === 1 ? textBadgeE : textBadgeD }}>
              {item.availability === 1 ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, marginBottom: 12 }}>

          </View>
          <InfoRow iconName="location-outline" text={item.branch_name || 'N/A'} />
          <InfoRow iconName="mail-outline" text={item.email || 'N/A'} />
        </View>

      </TouchableOpacity>
      <View style={styles.buttons}>
        {/* <CustomButton text="Edit" backgroundColor={btnEdit} onPress={() => openEditModal(item)} /> */}
        <CustomButton text={item.availability === 1 ? 'Delete' : 'Enable'} backgroundColor={item.availability === 1 ? btnDisable : green} onPress={() => handleToggleEmployeeStatus(item)} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f6f9', padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16, color: '#333' }}>
        {Employees.length === 1 ? 'Employee' : 'Employees'} Registered {branchId ? 'for branches' : ''}:{' '}
        <Text style={{ color: '#4e73df', fontWeight: 'bold' }}>{Employees.length}</Text>{' '}
      </Text>
      <FlatList
        data={Employees}
        keyExtractor={(item) => item.id_employee}
        renderItem={renderBranch}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>{loading ? 'Loading...' : 'You have no registered Employees.'}</Text>
        }
      />

      <TouchableOpacity
        onPress={() => {
          if (!branchId) {
            Alert.alert('Info', 'Please, select or create new branch.');
            navigation.navigate('Branches');
            return;
          }
          setSelectedEmployee(null);
          setModalVisible(true);
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
      {/* Add or Edit modal */}
      <EmployeesModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEmploye}
        branch={branchId}
        employee={selectedEmployee}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  customButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
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
});

export default EmployeesScreen;
