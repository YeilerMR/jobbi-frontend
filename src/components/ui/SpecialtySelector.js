import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../assets/css/general/general';

const { btnEdit, tertiary } = Colors;

const SpecialtySelector = ({ 
  specialties = [], 
  selectedValue, 
  onValueChange,
  placeholder = "Select a Specialty"
}) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        <Picker.Item label={placeholder} value={null} enabled={false} />
        {specialties.map((specialty) => (
          <Picker.Item
            key={specialty.id_specialty}
            label={specialty.name}
            value={specialty.id_specialty}
            style={{color: btnEdit}}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 60,
    color: '#333',
    borderRadius: 8,
  },
});

export default SpecialtySelector;