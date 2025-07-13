import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  UIManager,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomTextStyle, useTheme } from '@/hooks/useTheme';
import { FontWeights } from '@/constants/Typography';
import { router } from 'expo-router';
import BackgroundShape from '@/assets/svg/login/background-shape.svg';
import ArrowLeftSVG from '@/assets/svg/dashboard/back.svg';
import { Eye, CreditCard as Edit, Check, FileText, Shield } from 'lucide-react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');


export default function ReviewScreen() {

  const colors = useTheme();

  const titleStyle = useCustomTextStyle('h4', {
    color: colors.text,
    fontFamily: FontWeights.bold,
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedTruth, setAcceptedTruth] = useState(false);

  const handleConfirmAndPay = () => {
    if (!acceptedTerms || !acceptedTruth) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones y declarar la veracidad de la información');
      return;
    }
    router.push('/policy/payment');
  };

  const mockReviewData = {
    personalInfo: {
      name: 'Juan Pérez',
      document: 'CC 1234567890',
      birthDate: '15/03/1985',
      phone: '3001234567',
      email: 'juan@email.com'
    },
    vehicleInfo: {
      brand: 'Toyota',
      model: 'Corolla',
      year: '2020',
      plate: 'ABC123',
      color: 'Blanco'
    },
    policyInfo: {
      company: 'Seguros ABC',
      type: 'Seguro RCV Completo',
      coverage: '$50.000.000',
      deductible: '$500.000',
      additionalServices: ['Asistencia Vial 24/7']
    },
    pricing: {
      basePrice: 125000,
      additionalServices: 15000,
      total: 140000
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'VES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.fixedHeader}>
          <View style={[styles.header, { justifyContent: 'center' }]}>
            <TouchableOpacity 
              style={[styles.backButton, { position: 'absolute', left: 0 }]} 
              onPress={() => router.back()}
            >
              <ArrowLeftSVG width={24} height={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[titleStyle, { textAlign: 'center', maxWidth: 300 }]}>Revisión Final</Text>
          </View>
        </View>

        <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
          <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />

          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.illustrationContainer}>
              <Eye size={80} color={colors.info} />
              <Text style={[styles.illustrationText, { color: colors.textSecondary }]}>
                Revisa cuidadosamente toda la información antes de proceder al pago
              </Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Información Personal</Text>
                <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.inputBackground }]}>
                  <Edit size={16} color={colors.info} />
                </TouchableOpacity>
              </View>
              <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Nombre:</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{mockReviewData.personalInfo.name}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Documento:</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{mockReviewData.personalInfo.document}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Fecha de Nacimiento:</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{mockReviewData.personalInfo.birthDate}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Teléfono:</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{mockReviewData.personalInfo.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email:</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{mockReviewData.personalInfo.email}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Información del Vehículo</Text>
                <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.inputBackground }]}>
                  <Edit size={16} color={colors.info} />
                </TouchableOpacity>
              </View>
              <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Vehículo:</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>
                    {mockReviewData.vehicleInfo.brand} {mockReviewData.vehicleInfo.model} {mockReviewData.vehicleInfo.year}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Placa:</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{mockReviewData.vehicleInfo.plate}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Color:</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{mockReviewData.vehicleInfo.color}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Detalles de la Póliza</Text>
                <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.inputBackground }]}>
                  <Edit size={16} color={colors.info} />
                </TouchableOpacity>
              </View>
              <View style={[styles.policyCard, { backgroundColor: colors.card }]}>
                <View style={styles.policyHeader}>
                  <Shield size={24} color={colors.success} />
                  <View style={styles.policyInfo}>
                    <Text style={[styles.policyName, { color: colors.text }]}>{mockReviewData.policyInfo.type}</Text>
                    <Text style={[styles.companyName, { color: colors.textSecondary }]}>{mockReviewData.policyInfo.company}</Text>
                  </View>
                </View>
                <View style={[styles.policyDetails, { borderTopColor: colors.border }]}>
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Cobertura:</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>{mockReviewData.policyInfo.coverage}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Deducible:</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>{mockReviewData.policyInfo.deductible}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Servicios Adicionales:</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>
                      {mockReviewData.policyInfo.additionalServices.join(', ')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.priceSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Resumen de Precio</Text>
              <View style={[styles.priceCard, { backgroundColor: colors.card }]}>
                <View style={styles.priceRow}>
                  <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Precio base</Text>
                  <Text style={[styles.priceValue, { color: colors.text }]}>{formatCurrency(mockReviewData.pricing.basePrice)}</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Servicios adicionales</Text>
                  <Text style={[styles.priceValue, { color: colors.text }]}>{formatCurrency(mockReviewData.pricing.additionalServices)}</Text>
                </View>
                <View style={[styles.priceDivider, { backgroundColor: colors.border }]} />
                <View style={styles.priceRow}>
                  <Text style={[styles.totalLabel, { color: colors.text }]}>Total mensual</Text>
                  <Text style={[styles.totalValue, { color: colors.success }]}>{formatCurrency(mockReviewData.pricing.total)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.declarationsSection}>
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => setAcceptedTruth(!acceptedTruth)}
              >
                <View style={[styles.checkbox, { borderColor: colors.border }, acceptedTruth && { backgroundColor: colors.success, borderColor: colors.success }]}>
                  {acceptedTruth && <Check size={16} color={colors.white} />}
                </View>
                <Text style={[styles.checkboxText, { color: colors.text }]}>
                  Declaro que toda la información proporcionada es veraz y completa
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
              >
                <View style={[styles.checkbox, { borderColor: colors.border }, acceptedTerms && { backgroundColor: colors.success, borderColor: colors.success }]}>
                  {acceptedTerms && <Check size={16} color={colors.white} />}
                </View>
                <View style={styles.termsTextContainer}>
                  <Text style={[styles.checkboxText, { color: colors.text }]}>
                    Acepto los{' '}
                    <Text style={[styles.linkText, { color: colors.info }]}>términos y condiciones</Text>
                    {' '}y la{' '}
                    <Text style={[styles.linkText, { color: colors.info }]}>política de privacidad</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.documentsButton, { backgroundColor: colors.inputBackground }]}>
              <FileText size={20} color={colors.info} />
              <Text style={[styles.documentsButtonText, { color: colors.info }]}>Ver Documentación Completa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.confirmButton,
                { backgroundColor: colors.buttonPrimary },
                (!acceptedTerms || !acceptedTruth) && { backgroundColor: colors.buttonDisabled }
              ]}
              onPress={handleConfirmAndPay}
              disabled={!acceptedTerms || !acceptedTruth}
            >
              <Text style={[
                styles.confirmButtonText,
                { color: colors.white },
                (!acceptedTerms || !acceptedTruth) && { color: colors.textLight }
              ]}>
                Confirmar y Pagar
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
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
  illustrationFixed: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    zIndex: 1,
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
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  illustrationText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
  },
  infoCard: {
    borderRadius: 12,
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    flex: 2,
    textAlign: 'right',
  },
  policyCard: {
    borderRadius: 12,
    padding: 20,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  policyInfo: {
    marginLeft: 15,
  },
  policyName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  companyName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  policyDetails: {
    borderTopWidth: 1,
    paddingTop: 15,
  },
  priceSection: {
    marginBottom: 30,
  },
  priceCard: {
    borderRadius: 12,
    padding: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  priceValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  priceDivider: {
    height: 1,
    marginVertical: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  totalValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  declarationsSection: {
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: { },
  checkboxText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
    lineHeight: 20,
  },
  termsTextContainer: {
    flex: 1,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  documentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
    gap: 10,
  },
  documentsButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  confirmButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  disabledButton: { },
  disabledButtonText: { },
});