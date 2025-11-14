// ScanReward.js
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, Platform, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; // ✅ Cambiado a CameraView
import { rewardQRValidate } from '../../api/gift';

const ScanReward = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Solicitando permiso para la cámara...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: 'center', marginBottom: 16 }}>
          Se necesita acceso a la cámara para escanear códigos QR.
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Permitir cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);
    setLoading(true);

    try {
      let payload = null;
      try {
        const parsed = JSON.parse(data);
        payload = parsed;
      } catch (e) {
        payload = {
            id_user_gift: data,
            markUsed: true,
          }
      }

      console.log('Payload send to backend: ', payload);

      const result = await rewardQRValidate(payload);

      if (result.success) {
        Alert.alert('✅ Success', 'Discount successfully validated!');
      } else {
        Alert.alert('❌ Error', result.message || 'Discount invalid or already used.');
      }
    } catch (error) {
      console.error('Error valid reward:', error);
      Alert.alert('⚠️ Error', 'The QR code could not be processed.');
    } finally {
      setLoading(false);
      setTimeout(() => setScanned(false), 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Reward</Text>
      <Text style={styles.subtitle}>Point the camera at the customer's QR code</Text>

      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        onBarcodeScanned={scanned ? undefined : handleCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />

      {/* {(scanned || loading) && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            {loading ? 'Validando descuento...' : 'Procesando...'}
          </Text>
        </View>
      )} */}

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#00cc66" />
          <Text style={[styles.overlayText, { marginTop: 12 }]}>Validando descuento...</Text>
        </View>
      )}

      {scanned && !loading && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>¡Código escaneado!</Text>
        </View>
      )}

      {scanned && (
        <TouchableOpacity
          style={[styles.button, { position: 'absolute', bottom: 40, alignSelf: 'center' }]}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Escanear de nuevo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    zIndex: 1,
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ScanReward;
