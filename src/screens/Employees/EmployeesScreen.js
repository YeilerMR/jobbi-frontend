import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createEmployee, getEmployeesByBranch, getMyEmployees, updateEmployee, deleteEmployee } from '../../api/employees';
import InfoRow from '../../components/ui/InfoRow';
import CustomButton from '../../components/ui/ButtonCustome';
import { Colors } from '../../assets/css/general/general';
import BranchModal from '../../components/business/BranchesModal';
import { useRoute } from '@react-navigation/native';
const { btnEdit, btnDisable, badgeEnable, badgeDisable, textBadgeE, textBadgeD, green } = Colors;

const EmployeesScreen = () => {
  const route = useRoute();
  const { businessId } = route?.params || 0;

  const [Branches, setBranches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, [businessId]);

  const fetchBranches = async () => {
    setBranches([]);
    try {
      setLoading(true);
      if (businessId) {
        const res = await getBranchesByBusiness(businessId);
        if (res && res?.data) {
          setBranches(res.data);
          setLoading(false);
        }
      } else {
        const res = await getMyBranches();
        if (res && res?.data) {
          setBranches(res.data);
          setLoading(false);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSaveBranch = async (BranchData) => {
    try {
      if (BranchData.id_Branch || BranchData.id_branch) {
        await updateBranch(BranchData.id_Branch || BranchData.id_branch, BranchData);
        Alert.alert('Success', 'Branch Updated!');
      } else {
        await createBranch(businessId, BranchData);
        Alert.alert('Success', 'Branch Created!');
      }
      fetchBranches();
    } catch (error) {
    }
  };

  const handleToggleBranchStatus = async (Branch) => {
    const idBranch = Branch.id_Branch || Branch.id_branch;
    const newStatus = Branch.state_Branch || Branch.state_branch === 1 ? 0 : 1;
    const action = newStatus === 1 ? 'enable' : 'disable';


    Alert.alert(
      `Confirm ${action}`,
      `Are you sure you want to ${action} "${Branch.name || Branch.branch_name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes', onPress: async () => {
            try {
              if (Branch.state_Branch || Branch.state_branch === 0) {
                if(Branch.state_Branch) {
                  Branch.state_Branch = newStatus;
                }else{
                  Branch.state_branch = newStatus;
                }
                await updateBranch(idBranch, Branch);
              } else {
                await deleteBranch(idBranch);
              }
              Alert.alert('Success', `Branch ${action}d!`);
              fetchBranches();
            } catch (error) { }
          }
        }
      ]
    );
  };

  const openEditModal = (Branch) => {
    setSelectedBranch(Branch);
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
        <Ionicons name="storefront-outline" size={24} color={'#4e73df'}></Ionicons>
        <View style={{ marginLeft: 12, flex: 1 }}>
          {/* Badge Info */}
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 4 }}>{item.name || item.branch_name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: (item.state_Branch || item.state_branch) === 1 ? badgeEnable : badgeDisable }]}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: (item.state_Branch || item.state_branch) === 1 ? textBadgeE : textBadgeD }}>
              {item.state_Branch || item.state_branch === 1 ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
          {/* Branch name */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, marginBottom: 12 }}>

          </View>
          <InfoRow iconName="location-outline" text={item.location || item.branch_location} />
          <InfoRow iconName="call-outline" text={item.phone || item.branch_phone} />
          <InfoRow iconName="mail-outline" text={item.email || item.branch_email} />
        </View>

      </TouchableOpacity>
      <View style={styles.buttons}>
        <CustomButton text="Edit" backgroundColor={btnEdit} onPress={() => openEditModal(item)} />
        <CustomButton text={item.state_Branch || item.state_branch === 1 ? 'Disable' : 'Enable'} backgroundColor={item.state_Branch || item.state_branch === 1 ? btnDisable : green} onPress={() => handleToggleBranchStatus(item)} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f6f9', padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16, color: '#333' }}>
        {Branches.length === 1 ? 'Branch' : 'Branches'} Registered {businessId ? 'for business' : ''}:{' '}
        <Text style={{ color: '#4e73df', fontWeight: 'bold' }}>{Branches.length}</Text>{' '}
      </Text>
      <FlatList
        data={Branches}
        keyExtractor={(item) => item.id_Branch || item.id_branch}
        renderItem={renderBranch}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>{loading ? 'Loading...' : 'You have no registered Branches.'}</Text>
        }
      />

      <TouchableOpacity
        onPress={() => {
          if (!businessId) {
            Alert.alert('Info', 'Please, select or create new business.');
            navigation.navigate('Business');
            return;
          }
          setSelectedBranch(null);
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
      <BranchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveBranch}
        branch={selectedBranch}
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
