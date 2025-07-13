// app/rcv/driver-data.tsx
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
import BackgroundShape from '@/assets/svg/login/background-shape.svg';
import ArrowLeftSVG from '@/assets/svg/dashboard/back.svg';
import UserIcon from '@/assets/svg/dashboard/funerario.svg';

const { width } = Dimensions.get('window');

interface Beneficiary {
  id: number;
  name: string;
  lastName: string;
  relationship: string;
  percentage: string;
  phone: string;
  documentNumber: string;
}

interface InsuredData {
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  maritalStatus: string;
  occupation: string;
}

export default function DriverDataScreen() {
  const colors = useTheme();
  const [insuredData, setInsuredData] = useState<InsuredData>({
    name: '',
    lastName: '',
    documentType: 'CC',
    documentNumber: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    maritalStatus: 'Soltero',
    occupation: '',
  });

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    {
      id: 1,
      name: '',
      lastName: '',
      relationship: 'Cónyuge',
      percentage: '100',
      phone: '',
      documentNumber: '',
    }
  ]);

  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageBoxText, setMessageBoxText] = useState('');
  const [expandedBeneficiary, setExpandedBeneficiary] = useState<number | null>(null);

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
    // Validar campos obligatorios del asegurado
/*     if (
      !insuredData.name ||
      !insuredData.lastName ||
      !insuredData.documentNumber ||
      !insuredData.birthDate ||
      !insuredData.phone ||
      !insuredData.email ||
      !insuredData.address ||
      !insuredData.city ||
      !insuredData.occupation
    ) {
      setMessageBoxText('Por favor completa todos los campos obligatorios del asegurado.');
      setShowMessageBox(true);
      return;
    } */

    // Validar que la suma de porcentajes sea 100%
    const totalPercentage = beneficiaries.reduce((sum, ben) => sum + parseFloat(ben.percentage || '0'), 0);
    if (totalPercentage !== 100) {
      setMessageBoxText('La suma de porcentajes de los beneficiarios debe ser 100%.');
      setShowMessageBox(true);
      return;
    }

    // Validar que todos los beneficiarios tengan datos completos
/*     const incompleteBeneficiaries = beneficiaries.filter(ben => 
      !ben.name || !ben.lastName || !ben.relationship || !ben.percentage || !ben.phone
    );
    if (incompleteBeneficiaries.length > 0) {
      setMessageBoxText('Por favor completa todos los campos de los beneficiarios.');
      setShowMessageBox(true);
      return;
    } */
    
    router.push('/funeral/preferences');
  };

  const closeMessageBox = () => {
    setShowMessageBox(false);
    setMessageBoxText('');
  };

  const addBeneficiary = () => {
    const newBeneficiary: Beneficiary = {
      id: Date.now(),
      name: '',
      lastName: '',
      relationship: 'Hijo/a',
      percentage: '0',
      phone: '',
      documentNumber: '',
    };
    setBeneficiaries([...beneficiaries, newBeneficiary]);
    setExpandedBeneficiary(newBeneficiary.id);
  };

  const updateBeneficiary = (id: number, field: keyof Beneficiary, value: string) => {
    setBeneficiaries(beneficiaries.map(ben => 
      ben.id === id ? { ...ben, [field]: value } : ben
    ));
  };

  const removeBeneficiary = (id: number) => {
    if (beneficiaries.length > 1) {
      setBeneficiaries(beneficiaries.filter(ben => ben.id !== id));
      if (expandedBeneficiary === id) {
        setExpandedBeneficiary(null);
      }
    } else {
      setMessageBoxText('Debe haber al menos un beneficiario.');
      setShowMessageBox(true);
    }
  };

  const toggleBeneficiaryExpansion = (id: number) => {
    setExpandedBeneficiary(expandedBeneficiary === id ? null : id);
  };

  const getTotalPercentage = () => {
    return beneficiaries.reduce((sum, ben) => sum + parseFloat(ben.percentage || '0'), 0);
  };

const renderInput = (
    key: string,
    label: string,
    placeholder: string,
    keyboardType?: KeyboardTypeOptions,
    value?: string,
    onChangeText?: (text: string) => void,
    isSmall?: boolean // This is the key difference!
  ) => (
    <View style={ styles.inputGroup}>
      <Text style={[labelStyle, { color: colors.text }]}>{label}</Text>
      <View style={isSmall ? styles.inputWrapperSmall : styles.inputWrapper}>
        <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
        <TextInput
          style={[ styles.input, { color: colors.text, }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          keyboardType={keyboardType || 'default'}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.fixedHeader}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeftSVG width={24} height={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={titleStyle}>Datos del Asegurado</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View style={[styles.progressFill, { width: '33.3%', backgroundColor: colors.secondary }]} />
            </View>
            <Text style={[smallTextStyle, { color: colors.textSecondary, textAlign: 'center' }]}>Paso 1 de 3</Text>
          </View>
        </View>

        <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
          <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />
          <View style={styles.illustrationFixed}>
            <UserIcon width={60} height={60} color={colors.primary} />
            <Text style={[bodyStyle, styles.illustrationText, { color: colors.textSecondary }]}>
              Información del conductor principal para personalizar tu cotización
            </Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.form}>
              {/* Información Personal */}
              <View style={styles.sectionContainer}>
                <Text style={[labelStyle, styles.sectionTitle, { color: colors.text }]}>Información Personal</Text>
                
                {/* Nombre y Apellido en fila */}
                <View style={styles.rowContainer}>
                  <View style={styles.halfInput}>
                    {renderInput('name', 'Nombre *', 'Ej: Juan', 'default', insuredData.name, 
                      (text) => setInsuredData({ ...insuredData, name: text }))}
                  </View>
                  <View style={styles.halfInput}>
                    {renderInput('lastName', 'Apellido *', 'Ej: Pérez', 'default', insuredData.lastName, 
                      (text) => setInsuredData({ ...insuredData, lastName: text }))}
                  </View>
                </View>

                {/* Documento y Fecha de Nacimiento en fila */}
                <View style={styles.rowContainer}>
                  <View style={styles.halfInput}>
                    {renderInput('documentNumber', 'Cédula *', 'Ej: 12345678', 'numeric', insuredData.documentNumber, 
                      (text) => setInsuredData({ ...insuredData, documentNumber: text }))}
                  </View>
                  <View style={styles.halfInput}>
                    {renderInput('birthDate', 'Fecha Nac. *', 'DD/MM/AAAA', 'default', insuredData.birthDate, 
                      (text) => setInsuredData({ ...insuredData, birthDate: text }))}
                  </View>
                </View>

                {/* Teléfono y Email en fila */}
                <View style={styles.rowContainer}>
                  <View style={styles.halfInput}>
                    {renderInput('phone', 'Teléfono *', 'Ej: 04141234567', 'phone-pad', insuredData.phone, 
                      (text) => setInsuredData({ ...insuredData, phone: text }))}
                  </View>
                  <View style={styles.halfInput}>
                    {renderInput('email', 'Email *', 'correo@ejemplo.com', 'email-address', insuredData.email, 
                      (text) => setInsuredData({ ...insuredData, email: text }))}
                  </View>
                </View>
                

                {/* Dirección completa */}
                {renderInput('address', 'Dirección *', 'Ej: Av. Principal, Edif. X', 'default', insuredData.address, 
                  (text) => setInsuredData({ ...insuredData, address: text }))}

                {/* Ciudad y Ocupación en fila */}
                <View style={styles.rowContainer}>
                  <View style={styles.halfInput}>
                    {renderInput('city', 'Ciudad *', 'Ej: Caracas', 'default', insuredData.city, 
                      (text) => setInsuredData({ ...insuredData, city: text }))}
                  </View>
                  <View style={styles.halfInput}>
                    {renderInput('occupation', 'Ocupación *', 'Ej: Ingeniero', 'default', insuredData.occupation, 
                      (text) => setInsuredData({ ...insuredData, occupation: text }))}
                  </View>
                </View>
              </View>

              {/* Sección de Beneficiarios Mejorada */}
              <View style={styles.sectionContainer}>
                <View style={styles.beneficiaryHeader}>
                  <Text style={[labelStyle, styles.sectionTitle, { color: colors.text }]}>Beneficiarios</Text>
                  <View style={styles.percentageIndicator}>
                    <Text style={[smallTextStyle, { 
                      color: getTotalPercentage() === 100 ? colors.success : colors.error 
                    }]}>
                      Total: {getTotalPercentage()}%
                    </Text>
                  </View>
                </View>

                {beneficiaries.map((beneficiary, index) => (
                  <View key={beneficiary.id} style={[styles.beneficiaryCard, { 
                    backgroundColor: colors.card, 
                    borderColor: expandedBeneficiary === beneficiary.id ? colors.primary : colors.border 
                  }]}>
                    <TouchableOpacity 
                      style={styles.beneficiaryHeader}
                      onPress={() => toggleBeneficiaryExpansion(beneficiary.id)}
                    >
                      <View style={styles.beneficiaryMainInfo}>
                        <Text style={[labelStyle, { color: colors.text }]}>
                          {beneficiary.name && beneficiary.lastName 
                            ? `${beneficiary.name} ${beneficiary.lastName}` 
                            : `Beneficiario ${index + 1}`}
                        </Text>
                        <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                          {beneficiary.relationship} • {beneficiary.percentage}%
                        </Text>
                      </View>
                      <Text style={[smallTextStyle, { color: colors.primary }]}>
                        {expandedBeneficiary === beneficiary.id ? 'Contraer' : 'Expandir'}
                      </Text>
                    </TouchableOpacity>

                    {expandedBeneficiary === beneficiary.id && (
                      <View style={styles.beneficiaryForm}>
                        {/* Nombre y Apellido */}
                        <View style={styles.rowContainer}>
                          <View style={styles.halfInput}>
                            {renderInput('name', 'Nombre *', 'Nombre', 'default', beneficiary.name, 
                              (text) => updateBeneficiary(beneficiary.id, 'name', text))}
                          </View>
                          <View style={styles.halfInput}>
                            {renderInput('lastName', 'Apellido *', 'Apellido', 'default', beneficiary.lastName, 
                              (text) => updateBeneficiary(beneficiary.id, 'lastName', text))}
                          </View>
                        </View>

                        {/* Documento */}
                        {renderInput('documentNumber', 'Cédula', 'Número de documento', 'numeric', beneficiary.documentNumber, 
                          (text) => updateBeneficiary(beneficiary.id, 'documentNumber', text))}

                        {/* Parentesco y Porcentaje */}
                        <View style={styles.rowContainer}>
                          <View style={styles.halfInput}>
                            {renderInput('relationship', 'Parentesco *', 'Ej: Cónyuge', 'default', beneficiary.relationship, 
                              (text) => updateBeneficiary(beneficiary.id, 'relationship', text))}
                          </View>
                          <View style={styles.halfInput}>
                            {renderInput('percentage', 'Porcentaje *', 'Ej: 50', 'numeric', beneficiary.percentage, 
                              (text) => updateBeneficiary(beneficiary.id, 'percentage', text))}
                          </View>
                        </View>

                        {/* Teléfono */}
                        {renderInput('phone', 'Teléfono *', 'Ej: 04123456789', 'phone-pad', beneficiary.phone, 
                          (text) => updateBeneficiary(beneficiary.id, 'phone', text))}

                        {/* Botón eliminar */}
                        {beneficiaries.length > 1 && (
                          <TouchableOpacity 
                            style={[styles.removeButton, { backgroundColor: colors.error }]} 
                            onPress={() => removeBeneficiary(beneficiary.id)}
                          >
                            <Text style={[buttonTextStyle, { fontSize: 12 }]}>Eliminar Beneficiario</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                ))}

                <TouchableOpacity 
                  style={[styles.addButton, { backgroundColor: colors.secondary }]} 
                  onPress={addBeneficiary}
                >
                  <Text style={buttonTextStyle}>+ Añadir Beneficiario</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.helpContainer, { backgroundColor: colors.card }]}>
                <Text style={[smallTextStyle, styles.helpText, { color: colors.textSecondary }]}>
                  * Campos obligatorios. La suma de porcentajes debe ser 100%. Esta información será verificada durante el proceso de emisión de la póliza.
                </Text>
              </View>

              <TouchableOpacity style={[styles.nextButton, { backgroundColor: colors.primary }]} onPress={handleNext}>
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
            <TouchableOpacity style={[styles.messageBoxButton, { backgroundColor: colors.primary }]} onPress={closeMessageBox}>
              <Text style={[buttonTextStyle, { color: colors.white }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
        marginTop: -50,

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
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  halfInput: {
    flex: 1,
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
    paddingHorizontal: 20,
    fontSize: 13,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  inputGroupSmall: {
    marginBottom: 12,
  },
  inputWrapperSmall: {
    position: 'relative',
    width: '100%',
    height: 40,
    marginTop: 5,
    justifyContent: 'center',
  },
  inputSmall: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 14,
    fontSize: 12,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  beneficiaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  percentageIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  beneficiaryCard: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
  },
  beneficiaryMainInfo: {
    flex: 1,
  },
  beneficiaryForm: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  addButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  removeButton: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
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