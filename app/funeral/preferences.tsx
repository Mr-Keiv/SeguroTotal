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

import { ArrowLeft, Flower, DollarSign, Heart, MapPin, Clock, Plus, Minus } from 'lucide-react-native';
const { width } = Dimensions.get('window');

const serviceTypes = [
  { id: 'cremacion', label: 'Cremación', icon: '🔥' },
  { id: 'inhumacion', label: 'Inhumación', icon: '⚰️' },
  { id: 'ambos', label: 'Cualquiera de los dos', icon: '🤝' },
];

const ceremonyTypes = [
  { id: 'religiosa', label: 'Ceremonia Religiosa', icon: '⛪' },
  { id: 'civil', label: 'Ceremonia Civil', icon: '🏛️' },
  { id: 'privada', label: 'Ceremonia Privada', icon: '🏠' },
  { id: 'sin_ceremonia', label: 'Sin Ceremonia', icon: '🚫' },
];

const locations = [
  { id: 'caracas', label: 'Caracas' },
  { id: 'valencia', label: 'Valencia' },
  { id: 'maracaibo', label: 'Maracaibo' },
  { id: 'barquisimeto', label: 'Barquisimeto' },
  { id: 'otra', label: 'Otra ciudad' },
];

// Define coverage options for a stepped input (values in VES)
const coverageOptions = [
  500, 1000, 2000, 3000, 5000, 7000, 10000, 15000, 20000, 25000 // Example values in VES
];

export default function PreferencesScreen() {
  const [preferences, setPreferences] = useState({
    serviceType: '',
    ceremonyType: '',
    location: '',
    coverageAmount: 2000, // Initial value, corresponds to one of the options in VES
    specialRequests: '',
    musicPreference: '',
    flowerPreference: '',
    waitingPeriod: '6_months',
  });
  const colors = useTheme();
    const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageBoxText, setMessageBoxText] = useState('');


   const handleNext = () => {
    if (!preferences.serviceType || !preferences.ceremonyType || !preferences.location) {
      setMessageBoxText('La suma de porcentajes de los beneficiarios debe ser 100%.');
      setShowMessageBox(true);
    }
    router.push('/funeral/comparison');
  };

  const formatCurrency = (amount: number) => {
    // Formatting for Venezuelan Bolívar (VES)
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'VES',
      minimumFractionDigits: 2, // Common for VES
    }).format(amount);
  };

  

  const calculateRecommendedCoverage = () => {
    // Basic calculation based on average funeral costs in Venezuela (illustrative)
    const baseCost = 1500; // Example base cost in VES
    const locationMultiplier = preferences.location === 'caracas' ? 1.3 : 1.0;
    const serviceMultiplier = preferences.serviceType === 'cremacion' ? 0.8 : 1.2;

    // Ensure the recommended amount is within the defined coverage options range
    let recommended = Math.round(baseCost * locationMultiplier * serviceMultiplier);
    recommended = Math.max(coverageOptions[0], Math.min(recommended, coverageOptions[coverageOptions.length - 1]));
    
    // Find the closest step in coverageOptions
    const closestOption = coverageOptions.reduce((prev, curr) => 
      Math.abs(curr - recommended) < Math.abs(prev - recommended) ? curr : prev
    );

    return closestOption;
  };

  const increaseCoverage = () => {
    const currentIndex = coverageOptions.indexOf(preferences.coverageAmount);
    if (currentIndex < coverageOptions.length - 1) {
      setPreferences({ ...preferences, coverageAmount: coverageOptions[currentIndex + 1] });
    }
  };

  const decreaseCoverage = () => {
    const currentIndex = coverageOptions.indexOf(preferences.coverageAmount);
    if (currentIndex > 0) {
      setPreferences({ ...preferences, coverageAmount: coverageOptions[currentIndex - 1] });
    }
  };

    const closeMessageBox = () => {
    setShowMessageBox(false);
    setMessageBoxText('');
  };



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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.fixedHeader}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeftSVG width={24} height={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={titleStyle}>Mi Último Deseo</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View style={[styles.progressFill, { width: '66.6%', backgroundColor: colors.secondary }]} />
            </View>
            <Text style={[smallTextStyle, { color: colors.textSecondary, textAlign: 'center' }]}>Paso 2 de 3</Text>
          </View>
        </View>

        <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>


          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
       <View style={styles.illustrationContainer}>
          <Flower size={80} color="#48BB78" />
          <Text style={styles.illustrationText}>
            Personaliza tu seguro funerario según tus preferencias y valores
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de Servicio *</Text>
          <View style={styles.optionsContainer}>
            {serviceTypes.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.optionCard,
                  preferences.serviceType === service.id && styles.selectedOption
                ]}
                onPress={() => setPreferences({ ...preferences, serviceType: service.id })}
              >
                <Text style={styles.optionIcon}>{service.icon}</Text>
                <Text style={[
                  styles.optionText,
                  preferences.serviceType === service.id && styles.selectedOptionText
                ]}>
                  {service.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de Ceremonia *</Text>
          <View style={styles.optionsContainer}>
            {ceremonyTypes.map((ceremony) => (
              <TouchableOpacity
                key={ceremony.id}
                style={[
                  styles.optionCard,
                  preferences.ceremonyType === ceremony.id && styles.selectedOption
                ]}
                onPress={() => setPreferences({ ...preferences, ceremonyType: ceremony.id })}
              >
                <Text style={styles.optionIcon}>{ceremony.icon}</Text>
                <Text style={[
                  styles.optionText,
                  preferences.ceremonyType === ceremony.id && styles.selectedOptionText
                ]}>
                  {ceremony.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación Preferida *</Text>
          <View style={styles.locationContainer}>
            {locations.map((location) => (
              <TouchableOpacity
                key={location.id}
                style={[
                  styles.locationOption,
                  preferences.location === location.id && styles.selectedLocation
                ]}
                onPress={() => setPreferences({ ...preferences, location: location.id })}
              >
                <MapPin
                  size={20}
                  color={preferences.location === location.id ? '#FFFFFF' : '#4A5568'}
                />
                <Text style={[
                  styles.locationText,
                  preferences.location === location.id && styles.selectedLocationText
                ]}>
                  {location.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stepped Coverage Selector */}
        <View style={styles.section}>
          <View style={styles.coverageHeader}>
            <Text style={styles.sectionTitle}>Cobertura Deseada</Text>
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>
                Recomendado: {formatCurrency(calculateRecommendedCoverage())}
              </Text>
            </View>
          </View>

          <View style={styles.coverageContainer}>
            <TouchableOpacity
              style={styles.coverageStepperButton}
              onPress={decreaseCoverage}
              disabled={preferences.coverageAmount === coverageOptions[0]}
            >
              <Minus size={24} color={preferences.coverageAmount === coverageOptions[0] ? '#CBD5E0' : '#48BB78'} />
            </TouchableOpacity>

            <View style={styles.coverageAmountDisplay}>
              <Text style={styles.coverageAmountText}>
                {formatCurrency(preferences.coverageAmount)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.coverageStepperButton}
              onPress={increaseCoverage}
              disabled={preferences.coverageAmount === coverageOptions[coverageOptions.length - 1]}
            >
              <Plus size={24} color={preferences.coverageAmount === coverageOptions[coverageOptions.length - 1] ? '#CBD5E0' : '#48BB78'} />
            </TouchableOpacity>
          </View>

          <View style={styles.stepperProgress}>
            {coverageOptions.map((amount, index) => (
              <View
                key={index}
                style={[
                  styles.stepperDot,
                  preferences.coverageAmount >= amount ? styles.stepperDotFilled : styles.stepperDotEmpty
                ]}
              />
            ))}
          </View>
          <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>Mínimo</Text>
              <Text style={styles.sliderLabel}>Máximo</Text>
            </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Período de Carencia</Text>
          <View style={styles.waitingPeriodContainer}>
            <TouchableOpacity
              style={[
                styles.waitingOption,
                preferences.waitingPeriod === '6_months' && styles.selectedWaiting
              ]}
              onPress={() => setPreferences({ ...preferences, waitingPeriod: '6_months' })}
            >
              <Clock size={20} color={preferences.waitingPeriod === '6_months' ? '#FFFFFF' : '#4A5568'} />
              <View style={styles.waitingContent}>
                <Text style={[
                  styles.waitingTitle,
                  preferences.waitingPeriod === '6_months' && styles.selectedWaitingText
                ]}>
                  6 Meses
                </Text>
                <Text style={[
                  styles.waitingSubtitle,
                  preferences.waitingPeriod === '6_months' && styles.selectedWaitingText
                ]}>
                  Prima más baja
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.waitingOption,
                preferences.waitingPeriod === '12_months' && styles.selectedWaiting
              ]}
              onPress={() => setPreferences({ ...preferences, waitingPeriod: '12_months' })}
            >
              <Clock size={20} color={preferences.waitingPeriod === '12_months' ? '#FFFFFF' : '#4A5568'} />
              <View style={styles.waitingContent}>
                <Text style={[
                  styles.waitingTitle,
                  preferences.waitingPeriod === '12_months' && styles.selectedWaitingText
                ]}>
                  12 Meses
                </Text>
                <Text style={[
                  styles.waitingSubtitle,
                  preferences.waitingPeriod === '12_months' && styles.selectedWaitingText
                ]}>
                  Prima intermedia
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.waitingOption,
                preferences.waitingPeriod === 'immediate' && styles.selectedWaiting
              ]}
              onPress={() => setPreferences({ ...preferences, waitingPeriod: 'immediate' })}
            >
              <Heart size={20} color={preferences.waitingPeriod === 'immediate' ? '#FFFFFF' : '#4A5568'} />
              <View style={styles.waitingContent}>
                <Text style={[
                  styles.waitingTitle,
                  preferences.waitingPeriod === 'immediate' && styles.selectedWaitingText
                ]}>
                  Inmediata
                </Text>
                <Text style={[
                  styles.waitingSubtitle,
                  preferences.waitingPeriod === 'immediate' && styles.selectedWaitingText
                ]}>
                  Prima más alta
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            * Campos obligatorios. Estas preferencias nos ayudan a encontrar las mejores opciones para ti.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Ver Cotizaciones</Text>
        </TouchableOpacity>
          </ScrollView>
        </View>
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
      </KeyboardAvoidingView>
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
    scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
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
    section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    // fontFamily: 'Inter-Bold',
    fontWeight: 'bold', // Fallback
    color: '#2D3748',
    marginBottom: 15,
  },

    illustrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  optionsContainer: {
    gap: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#48BB78',
    borderColor: '#38A169',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    // fontFamily: 'Inter-SemiBold',
    fontWeight: '600', // Fallback
    color: '#2D3748',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedLocation: {
    backgroundColor: '#48BB78',
    borderColor: '#38A169',
  },
  locationText: {
    fontSize: 14,
    // fontFamily: 'Inter-SemiBold',
    fontWeight: '600', // Fallback
    color: '#4A5568',
    marginLeft: 8,
  },
  selectedLocationText: {
    color: '#FFFFFF',
  },
  coverageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  recommendedBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  recommendedText: {
    fontSize: 9,
    // fontFamily: 'Inter-SemiBold',
    fontWeight: '600', // Fallback
    color: '#48BB78',
  },
  coverageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7FAFC',
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
  },
  coverageAmountDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  coverageAmountText: {
    fontSize: 28,
    // fontFamily: 'Inter-Bold',
    fontWeight: 'bold', // Fallback
    color: '#48BB78',
    marginLeft: 10,
  },
  coverageStepperButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  stepperProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  stepperDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#48BB78',
  },
  stepperDotEmpty: {
    backgroundColor: 'transparent',
  },
  stepperDotFilled: {
    backgroundColor: '#48BB78',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  sliderLabel: {
    fontSize: 12,
    // fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
  waitingPeriodContainer: {
    gap: 10,
  },
  waitingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedWaiting: {
    backgroundColor: '#48BB78',
    borderColor: '#38A169',
  },
  waitingContent: {
    marginLeft: 15,
  },
  waitingTitle: {
    fontSize: 16,
    // fontFamily: 'Inter-SemiBold',
    fontWeight: '600', // Fallback
    color: '#2D3748',
  },
  waitingSubtitle: {
    fontSize: 14,
    // fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
  selectedWaitingText: {
    color: '#FFFFFF',
  },
  helpContainer: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  helpText: {
    fontSize: 14,
    // fontFamily: 'Inter-Regular',
    color: '#48BB78',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#48BB78',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    // fontFamily: 'Inter-SemiBold',
    fontWeight: '600', // Fallback
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
