import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  KeyboardTypeOptions,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import { FontWeights } from '@/constants/Typography';
import ShapeInput from '@/assets/svg/login/inputShape.svg';
import CarIcon from '@/assets/svg/dashboard/cart.svg';
import BackgroundShape from '@/assets/svg/login/background-shape.svg';

const { width } = Dimensions.get('window');
import ArrowLeftSVG from '@/assets/svg/dashboard/back.svg';

export default function VehicleDataScreen() {
  const colors = useTheme();
  const [vehicleData, setVehicleData] = useState({
    brand: '',
    model: '',
    year: '',
    plateNumber: '',
    chassisNumber: '',
    color: '',
    cilindraje: '',
  });

  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageBoxText, setMessageBoxText] = useState('');

  const titleStyle = useCustomTextStyle('h4', {
    color: colors.text,
    fontFamily: FontWeights.bold,
  });
  const bodyStyle = useTextStyle('bodySmall');
  const smallTextStyle = useTextStyle('caption');
  const labelStyle = useCustomTextStyle('body', {
    color: colors.text,
    fontFamily: FontWeights.semiBold,
  });
  const buttonTextStyle = useCustomTextStyle('body', {
    color: colors.white,
    fontFamily: FontWeights.semiBold,
  });

  const handleNext = () => {
    if (!vehicleData.brand || !vehicleData.model || !vehicleData.year || !vehicleData.plateNumber) {
      setMessageBoxText('Por favor completa todos los campos obligatorios');
      setShowMessageBox(true);
      return;
    }
    router.push('/rcv/driver-data');
  };

  const closeMessageBox = () => {
    setShowMessageBox(false);
    setMessageBoxText('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.fixedHeader}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeftSVG width={24} height={24} />
            </TouchableOpacity>
            <Text style={titleStyle}>Datos del Vehículo</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View style={[styles.progressFill, { width: '33%', backgroundColor: colors.secondary }]} />
            </View>
            <Text style={[smallTextStyle, { color: colors.textSecondary, textAlign: 'center' }]}>
              Paso 1 de 3
            </Text>
          </View>
        </View>

        <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
          <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />

          {/* Fijo arriba del formulario */}
          <View style={styles.illustrationFixed}>
            <CarIcon width={80} height={80} color={colors.primary} />
            <Text style={[bodyStyle, styles.illustrationText, { color: colors.textSecondary }]}>
              Ingresa los datos de tu vehículo para obtener la mejor cotización
            </Text>
          </View>

          {/* Scroll solo para el formulario */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.form}>
              {[
                { label: 'Marca *', key: 'brand', placeholder: 'Ej: Toyota, Chevrolet, Nissan' },
                { label: 'Modelo *', key: 'model', placeholder: 'Ej: Corolla, Spark, Sentra' },
                { label: 'Año *', key: 'year', placeholder: '2020', keyboardType: 'numeric' },
                { label: 'Placa *', key: 'plateNumber', placeholder: 'ABC123', toUpperCase: true },
                { label: 'Color', key: 'color', placeholder: 'Ej: Blanco, Negro, Azul' },
                { label: 'Cilindraje (CC)', key: 'cilindraje', placeholder: 'Ej: 1600', keyboardType: 'numeric' },
                { label: 'Número de Chasis', key: 'chassisNumber', placeholder: 'Opcional' },
              ].map(({ label, key, placeholder, keyboardType, toUpperCase }) => (
                <View style={styles.inputGroup} key={key}>
                  <Text style={[labelStyle, { color: colors.text }]}>{label}</Text>
                  <View style={styles.inputWrapper}>
                    <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder={placeholder}
                      placeholderTextColor={colors.textSecondary}
                      keyboardType={keyboardType as KeyboardTypeOptions || 'default' as KeyboardTypeOptions}
                      value={vehicleData[key as keyof typeof vehicleData]}
                      autoCapitalize="none"
                      onChangeText={(text) =>
                        setVehicleData({
                          ...vehicleData,
                          [key]: toUpperCase ? text.toUpperCase() : text,
                        })
                      }
                    />
                  </View>
                </View>
              ))}

              <View style={[styles.helpContainer, { backgroundColor: colors.card }]}>
                <Text style={[smallTextStyle, styles.helpText, { color: colors.secondary }]}>
                  * Campos obligatorios. La información debe coincidir con la tarjeta de propiedad.
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: colors.primary }]}
                onPress={handleNext}
              >
                <Text style={buttonTextStyle}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <Modal animationType="fade" transparent={true} visible={showMessageBox} onRequestClose={closeMessageBox}>
        <View style={styles.centeredView}>
          <View style={[styles.messageBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[bodyStyle, { color: colors.text, marginBottom: 20, textAlign: 'center' }]}>
              {messageBoxText}
            </Text>
            <TouchableOpacity
              style={[styles.messageBoxButton, { backgroundColor: colors.primary }]}
              onPress={closeMessageBox}
            >
              <Text style={[buttonTextStyle, { color: colors.white }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  backgroundShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: -30,

    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  illustrationFixed: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  illustrationText: {
    textAlign: 'center',
    marginTop: 15,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    height: 50,
    marginTop: 8,
    justifyContent: 'center',
  },
  shapeInputBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 13,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  helpContainer: {
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  helpText: {
    textAlign: 'center',
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  messageBox: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
  },
  messageBoxButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
});
