import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSelectedBranchTab } from '../../utils/Consts';

const ServiceEmployeeTabs = ({ activeTab = 'services', branchId }) => {
  const navigation = useNavigation();
  branchId = getSelectedBranchTab();
  const handleNavigate = (target) => {
    if (target === activeTab) return;

    if (target === 'services') {
      navigation.navigate('Services', { branchId: branchId || undefined });
    } else if (target === 'employees') {
      navigation.navigate('Employees', { branchId: branchId || undefined });
    }
  };

  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'services' && styles.activeTab]}
        onPress={() => handleNavigate('services')}
      >
        <Text style={[styles.tabText, activeTab === 'services' && styles.activeTabText]}>
          Services
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'employees' && styles.activeTab]}
        onPress={() => handleNavigate('employees')}
      >
        <Text style={[styles.tabText, activeTab === 'employees' && styles.activeTabText]}>
          Employees
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  activeTab: {
    backgroundColor: '#4e73df',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
  },
});

export default ServiceEmployeeTabs;