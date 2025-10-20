import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getMyBusinesses, updateBusiness, createBusiness, deleteBusiness } from '../../api/businesses';
import InfoRow from '../../components/ui/InfoRow';
//import ButtonCustome from '../../components/ui/ButtonCustome';
import CustomButton from '../../components/ui/ButtonCustome';
import { Colors } from '../../assets/css/general/general';
import BusinessModal from '../../components/business/BusinessModal';
//import { Button } from 'react-native/types_generated/index';

const { btnEdit, btnDisable, badgeEnable, badgeDisable, textBadgeE, textBadgeD, green } = Colors;

const Business = () => {
  const [businesses, setBusinesses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const res = await getMyBusinesses();
      if (res && res?.data) {
        setBusinesses(res.data);
      }
    } catch (error) {
      //Alert.alert('Error', 'Failed to load businesses');
    }
  };

  const handleSaveBusiness = async (businessData)=>{
    try {
      if (businessData.id_business) {
        await updateBusiness(businessData.id_business, businessData);
        Alert.alert('Success', 'Business Updated!');
      }else{
        await createBusiness(businessData);
        Alert.alert('Success', 'Business Created!');
      }
      fetchBusinesses();
    } catch (error) {
      //Alert.alert('Error', error.message || 'Operation failed');
    }
  };

  const handleToggleBusinessStatus = async (business) =>{
    const idBusiness = business.id_business;
    const newStatus= business.state_business === 1 ? 0:1;
    const action = newStatus === 1? 'enable':'disable';


    Alert.alert(
      `Confirm ${action}`,
      `Are you sure you want to ${action} "${business.name}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes', onPress: async ()=>{
          try {
            if (business.state_business === 0) {
              business.state_business = newStatus;
              await updateBusiness(idBusiness, business);
            } else {
              await deleteBusiness(idBusiness);
            }
            Alert.alert('Success', `Business ${action}d!`);
            fetchBusinesses();
          }catch(error){}
        }}
      ]
    );
  };

  const openEditModal = (business) => {
    setSelectedBusiness(business);
    setModalVisible(true);
  }

  const renderBusiness = ({ item }) => (
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
        onPress={() => navigation.navigate('Sucursales', { businessId: item.id_business })}
      >
        <Ionicons name="storefront-outline" size={24} color={'#4e73df'}></Ionicons>
        <View style={{ marginLeft: 12, flex: 1 }}>
          {/* Badge Info */}
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 4 }}>{item.name}</Text>
          <View style={[styles.statusBadge, {backgroundColor: item.state_business === 1 ? badgeEnable : badgeDisable}]}>
            <Text style={{fontSize: 12, fontWeight: '600', color: item.state_business === 1 ? textBadgeE : textBadgeD}}>
              {item.state_business === 1 ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
          {/* Business name */}
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4, marginBottom: 12}}>
      
          </View>
          <InfoRow iconName="location-outline" text={item.location} />
          <InfoRow iconName="call-outline" text={item.phone} />
          <InfoRow iconName="mail-outline" text={item.email} />
        </View>

      </TouchableOpacity>
      <View style={styles.buttons}>
        <CustomButton text="Edit" backgroundColor={btnEdit} onPress={() => openEditModal(item)} />
        <CustomButton text={item.state_business === 1 ? 'Disable' : 'Enable'} backgroundColor={item.state_business === 1 ? btnDisable : green} onPress={() => handleToggleBusinessStatus(item)} />
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#f4f6f9', padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16, color: '#333' }}>
        {businesses.length === 1 ? 'Business' : 'Businesses'} Registered:{' '}
        <Text style={{ color: '#4e73df', fontWeight: 'bold' }}>{businesses.length}</Text>{' '}
      </Text>
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id_business.toString()}
        renderItem={renderBusiness}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>You have no registered businesses.</Text>
        }
      />

      <TouchableOpacity
        onPress={() => {
          setSelectedBusiness(null);
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
      <BusinessModal
        visible={modalVisible}
        onClose={()=>setModalVisible(false)}
        onSave={handleSaveBusiness}
        business={selectedBusiness}
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

export default Business;
