// src/components/services/ServiceForm.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import CustomButton from '../ui/ButtonCustome';

const ServiceForm = ({ 
  service = null, // null = modo crear, objeto = modo editar
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  // Si se pasa un servicio, inicializa los campos
  useEffect(() => {
    if (service) {
      setName(service.name || '');
      setPrice(service.price?.toString() || '');
      setDuration(service.duration?.toString() || '');
      setDescription(service.description || '');
    } else {
      // Modo crear: resetear campos
      setName('');
      setPrice('');
      setDuration('');
      setDescription('');
    }
  }, [service]);

  const handleSubmit = () => {
    // Validación básica
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      Alert.alert('Error', 'El precio debe ser un número válido mayor a 0');
      return;
    }
    if (!duration || isNaN(duration) || parseInt(duration) <= 0) {
      Alert.alert('Error', 'La duración debe ser un número entero válido mayor a 0');
      return;
    }

    const serviceData = {
      name: name.trim(),
      price: parseFloat(price),
      duration: parseInt(duration, 10),
      description: description.trim(),
    };

    onSubmit(serviceData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {service ? 'Editar Servicio' : 'Nuevo Servicio'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del servicio *"
        value={name}
        onChangeText={setName}
        maxLength={100}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio (₡) *"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Duración (minutos) *"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        maxLength={5}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción (opcional)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
        maxLength={500}
      />

      <View style={styles.buttonRow}>
        <CustomButton
          text="Cancelar"
          onPress={onCancel}
          backgroundColor="#6c757d"
          textColor="#fff"
          paddingVertical={12}
          paddingHorizontal={20}
          style={{ flex: 1, marginRight: 8 }}
        />
        <CustomButton
          text={isLoading ? "Guardando..." : (service ? "Actualizar" : "Crear")}
          onPress={handleSubmit}
          backgroundColor="#4e73df"
          textColor="#fff"
          paddingVertical={12}
          paddingHorizontal={20}
          style={{ flex: 1, marginLeft: 8 }}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
});

export default ServiceForm;