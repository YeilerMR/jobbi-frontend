import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getMyBranches } from '../../api/branches';
import InfoRow from '../../components/ui/InfoRow';
import CustomButton from '../../components/ui/ButtonCustome';
import { Colors } from '../../assets/css/general/general';
import BranchModal from '../../components/business/BranchesModal';

const { btnEdit, btnDisable, badgeEnable, badgeDisable, textBadgeE, textBadgeD, green } = Colors;

const BranchesScreen = () => {
  const [Branches, setBranches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const res = await getMyBranches();
      if (res && res?.data) {
        setBranches(res.data);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSaveBranch = async (BranchData) => {
    try {
      if (BranchData.id_Branch) {
        await updateBranch(BranchData.id_Branch, BranchData);
        Alert.alert('Success', 'Branch Updated!');
      } else {
        await createBranch(BranchData);
        Alert.alert('Success', 'Branch Created!');
      }
      fetchBranches();
    } catch (error) {
    }
  };

  const handleToggleBranchStatus = async (Branch) => {
    const idBranch = Branch.id_Branch;
    const newStatus = Branch.state_Branch === 1 ? 0 : 1;
    const action = newStatus === 1 ? 'enable' : 'disable';


    Alert.alert(
      `Confirm ${action}`,
      `Are you sure you want to ${action} "${Branch.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes', onPress: async () => {
            try {
              if (Branch.state_Branch === 0) {
                Branch.state_Branch = newStatus;
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
        onPress={() => navigation.navigate('Sucursales', { BranchId: item.id_Branch })}
      >
        <Ionicons name="storefront-outline" size={24} color={'#4e73df'}></Ionicons>
        <View style={{ marginLeft: 12, flex: 1 }}>
          {/* Badge Info */}
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 4 }}>{item.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: item.state_Branch === 1 ? badgeEnable : badgeDisable }]}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: item.state_Branch === 1 ? textBadgeE : textBadgeD }}>
              {item.state_Branch === 1 ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
          {/* Branch name */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, marginBottom: 12 }}>

          </View>
          <InfoRow iconName="location-outline" text={item.location} />
          <InfoRow iconName="call-outline" text={item.phone} />
          <InfoRow iconName="mail-outline" text={item.email} />
        </View>

      </TouchableOpacity>
      <View style={styles.buttons}>
        <CustomButton text="Edit" backgroundColor={btnEdit} onPress={() => openEditModal(item)} />
        <CustomButton text={item.state_Branch === 1 ? 'Disable' : 'Enable'} backgroundColor={item.state_Branch === 1 ? btnDisable : green} onPress={() => handleToggleBranchStatus(item)} />
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#f4f6f9', padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16, color: '#333' }}>
        {Branches.length === 1 ? 'Branch' : 'Branches'} Registered:{' '}
        <Text style={{ color: '#4e73df', fontWeight: 'bold' }}>{Branches.length}</Text>{' '}
      </Text>
      <FlatList
        data={Branches}
        keyExtractor={(item) => item.id_Branch.toString()}
        renderItem={renderBranch}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>{loading ? 'Loading...' : 'You have no registered Branches.'}</Text>
        }
      />

      <TouchableOpacity
        onPress={() => {
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
        Branch={selectedBranch}
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

export default BranchesScreen;
