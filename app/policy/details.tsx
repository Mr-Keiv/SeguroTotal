import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
  KeyboardAvoidingView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import { FontWeights } from '@/constants/Typography';
import { router, useLocalSearchParams } from 'expo-router';
import BackgroundShape from '@/assets/svg/login/background-shape.svg';
import StarSVG from '@/assets/svg/dashboard/start.svg';
import CheckSVG from '@/assets/svg/dashboard/plus.svg';
import XSVG from '@/assets/svg/dashboard/plus.svg';
import ArrowLeftSVG from '@/assets/svg/dashboard/back.svg';
import ArrowDownSVG from '@/assets/svg/dashboard/arrow.svg';
import { ArrowLeft, FileText, Shield, DollarSign, Settings, ChevronDown, ChevronUp } from 'lucide-react-native';


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

const insuranceOffers = [
  {
    id: 1,
    company: 'Seguros Pirámide',
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    priceUSD: '$35',
    priceBs: 'Bs. 1.260',
    rating: 4.8,
    reviews: 1250,
    recommended: true,
    coverage: ['Responsabilidad Civil', 'Daños Materiales', 'Lesiones Personales', 'Gastos Médicos'],
    additional: ['Grúa 24h', 'Auxilio Vial', 'Conductor Elegido'],
    excluded: ['Hurto Total', 'Incendio'],
  },
  {
    id: 2,
    company: 'Mercantil Seguros',
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    priceUSD: '$28',
    priceBs: 'Bs. 1.008',
    rating: 4.2,
    reviews: 890,
    recommended: false,
    coverage: ['Responsabilidad Civil', 'Daños Materiales', 'Lesiones Personales'],
    additional: ['Grúa 24h', 'Auxilio Vial'],
    excluded: ['Hurto Total', 'Incendio', 'Gastos Médicos'],
  },
  {
    id: 3,
    company: 'Seguros Venezuela',
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    priceUSD: '$42',
    priceBs: 'Bs. 1.512',
    rating: 4.6,
    reviews: 2100,
    recommended: false,
    coverage: ['Responsabilidad Civil', 'Daños Materiales', 'Lesiones Personales', 'Gastos Médicos', 'Hurto Total'],
    additional: ['Grúa 24h', 'Auxilio Vial', 'Conductor Elegido', 'Vehículo de Reemplazo'],
    excluded: ['Incendio'],
  },
  {
    id: 4,
    company: 'Mapfre Seguros',
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    priceUSD: '$38',
    priceBs: 'Bs. 1.368',
    rating: 4.5,
    reviews: 1800,
    recommended: false,
    coverage: ['Responsabilidad Civil', 'Daños Materiales', 'Lesiones Personales', 'Gastos Médicos', 'Asistencia Legal'],
    additional: ['Grúa 24h', 'Auxilio Vial', 'Cobertura de Vidrios'],
    excluded: ['Robo de Componentes', 'Catástrofes Naturales'],
  },
];

const featureCategories = [
  { id: 'coverage', title: 'Coberturas Principales' },
  { id: 'additional', title: 'Beneficios Adicionales' },
  { id: 'excluded', title: 'Exclusiones Clave' },
];

export default function PolicyDetailsScreen() {
  const { policyId, type } = useLocalSearchParams();
  const [expandedSections, setExpandedSections] = useState<string[]>(['coverage']);
  const [additionalCoverage, setAdditionalCoverage] = useState({
    roadAssistance: true,
    legalAssistance: false,
    replacementVehicle: false,
  });
  const [deductible, setDeductible] = useState(500000);
  const colors = useTheme();

  const titleStyle = useCustomTextStyle('h4', {
    color: colors.text,
    fontFamily: FontWeights.bold,
  });

  const toggleSection = (section: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTotalPrice = () => {
    let basePrice = type === 'rcv' ? 125000 : 85000;
    if (additionalCoverage.roadAssistance) basePrice += 15000;
    if (additionalCoverage.legalAssistance) basePrice += 10000;
    if (additionalCoverage.replacementVehicle) basePrice += 25000;
    
    const deductibleFactor = deductible / 1000000;
    basePrice = basePrice * (1 - deductibleFactor * 0.1);
    
    return Math.round(basePrice);
  };

  const handleContinueToPayment = () => {
    router.push('/policy/review');
  };

  const mockPolicyData = {
    rcv: {
      company: 'Seguros ABC',
      name: 'Seguro RCV Completo',
      basePrice: 125000,
      coverage: [
        'Responsabilidad Civil Contractual',
        'Responsabilidad Civil Extracontractual',
        'Daños Materiales hasta $50.000.000',
        'Lesiones Personales hasta $30.000.000',
        'Gastos Médicos hasta $10.000.000'
      ],
      exclusions: [
        'Daños por guerra o terrorismo',
        'Conducción bajo efectos del alcohol',
        'Uso comercial no declarado',
        'Participación en competencias'
      ],
      conditions: [
        'Vigencia: 1 año',
        'Renovación automática',
        'Pago mensual o anual',
        'Cobertura nacional'
      ]
    },
    funeral: {
      company: 'Funeraria La Paz',
      name: 'Seguro Funerario Completo',
      basePrice: 85000,
      coverage: [
        'Servicio funerario completo',
        'Traslado del cuerpo',
        'Sala de velación 24 horas',
        'Ceremonia religiosa o civil',
        'Cremación o inhumación',
        'Ataúd o urna incluida'
      ],
      exclusions: [
        'Servicios en el exterior',
        'Embalsamiento especial',
        'Muerte por suicidio (primer año)'
      ],
      conditions: [
        'Período de carencia: 6 meses',
        'Cobertura: $3.000.000',
        'Vigencia: Hasta los 80 años',
        'Renovación automática'
      ]
    }
  };

  const currentPolicy = mockPolicyData[type as keyof typeof mockPolicyData];
  
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
            <Text style={[titleStyle, { textAlign: 'center', maxWidth: 300 }]}>Detalles de la Póliza</Text>
          </View>
        </View>

        <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
          <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />

          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={[styles.policyHeader, { backgroundColor: colors.card }]}>
              <View style={styles.policyInfo}>
                <Text style={[styles.policyName, { color: colors.text }]}>{currentPolicy.name}</Text>
                <Text style={[styles.companyName, { color: colors.textSecondary }]}>{currentPolicy.company}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={[styles.totalPrice, { color: colors.success }]}>{formatCurrency(calculateTotalPrice())}</Text>
                <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>/ mes</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.sectionHeader, { backgroundColor: colors.card }]}
              onPress={() => toggleSection('coverage')}
            >
              <View style={styles.sectionTitleContainer}>
                <Shield size={20} color={colors.success} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Coberturas</Text>
              </View>
              {expandedSections.includes('coverage') ? 
                <ChevronUp size={20} color={colors.textSecondary} /> : 
                <ChevronDown size={20} color={colors.textSecondary} />
              }
            </TouchableOpacity>

            {expandedSections.includes('coverage') && (
              <View style={[styles.sectionContent, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                {currentPolicy.coverage.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={[styles.bullet, { backgroundColor: colors.success }]} />
                    <Text style={[styles.listText, { color: colors.textSecondary }]}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity 
              style={[styles.sectionHeader, { backgroundColor: colors.card }]}
              onPress={() => toggleSection('exclusions')}
            >
              <View style={styles.sectionTitleContainer}>
                <Text style={[styles.sectionIcon, { color: colors.warning }]}>⚠️</Text>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Exclusiones</Text>
              </View>
              {expandedSections.includes('exclusions') ? 
                <ChevronUp size={20} color={colors.textSecondary} /> : 
                <ChevronDown size={20} color={colors.textSecondary} />
              }
            </TouchableOpacity>

            {expandedSections.includes('exclusions') && (
              <View style={[styles.sectionContent, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                {currentPolicy.exclusions.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={[styles.bullet, styles.redBullet, { backgroundColor: colors.error }]} />
                    <Text style={[styles.listText, { color: colors.textSecondary }]}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity 
              style={[styles.sectionHeader, { backgroundColor: colors.card }]}
              onPress={() => toggleSection('conditions')}
            >
              <View style={styles.sectionTitleContainer}>
                <FileText size={20} color={colors.info} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Condiciones</Text>
              </View>
              {expandedSections.includes('conditions') ? 
                <ChevronUp size={20} color={colors.textSecondary} /> : 
                <ChevronDown size={20} color={colors.textSecondary} />
              }
            </TouchableOpacity>

            {expandedSections.includes('conditions') && (
              <View style={[styles.sectionContent, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                {currentPolicy.conditions.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={[styles.bullet, { backgroundColor: colors.success }]} />
                    <Text style={[styles.listText, { color: colors.textSecondary }]}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

            {type === 'rcv' && (
              <TouchableOpacity 
                style={[styles.sectionHeader, { backgroundColor: colors.card }]}
                onPress={() => toggleSection('additional')}
              >
                <View style={styles.sectionTitleContainer}>
                  <Settings size={20} color={colors.warning} />
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Opciones Adicionales</Text>
                </View>
                {expandedSections.includes('additional') ? 
                  <ChevronUp size={20} color={colors.textSecondary} /> : 
                  <ChevronDown size={20} color={colors.textSecondary} />
                }
              </TouchableOpacity>
            )}

            {type === 'rcv' && expandedSections.includes('additional') && (
              <View style={[styles.sectionContent, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                <View style={[styles.optionItem, { borderBottomColor: colors.border }]}>
                  <View style={styles.optionInfo}>
                    <Text style={[styles.optionTitle, { color: colors.text }]}>Asistencia Vial 24/7</Text>
                    <Text style={[styles.optionPrice, { color: colors.success }]}>+$15.000/mes</Text>
                  </View>
                  <Switch
                    value={additionalCoverage.roadAssistance}
                    onValueChange={(value) => setAdditionalCoverage({
                      ...additionalCoverage,
                      roadAssistance: value
                    })}
                    trackColor={{ false: colors.textLight, true: colors.success }}
                    thumbColor={colors.white}
                  />
                </View>

                <View style={[styles.optionItem, { borderBottomColor: colors.border }]}>
                  <View style={styles.optionInfo}>
                    <Text style={[styles.optionTitle, { color: colors.text }]}>Asistencia Jurídica</Text>
                    <Text style={[styles.optionPrice, { color: colors.success }]}>+$10.000/mes</Text>
                  </View>
                  <Switch
                    value={additionalCoverage.legalAssistance}
                    onValueChange={(value) => setAdditionalCoverage({
                      ...additionalCoverage,
                      legalAssistance: value
                    })}
                    trackColor={{ false: colors.textLight, true: colors.success }}
                    thumbColor={colors.white}
                  />
                </View>

                <View style={[styles.optionItem, { borderBottomColor: colors.border }]}>
                  <View style={styles.optionInfo}>
                    <Text style={[styles.optionTitle, { color: colors.text }]}>Vehículo de Reemplazo</Text>
                    <Text style={[styles.optionPrice, { color: colors.success }]}>+$25.000/mes</Text>
                  </View>
                  <Switch
                    value={additionalCoverage.replacementVehicle}
                    onValueChange={(value) => setAdditionalCoverage({
                      ...additionalCoverage,
                      replacementVehicle: value
                    })}
                    trackColor={{ false: colors.textLight, true: colors.success }}
                    thumbColor={colors.white}
                  />
                </View>

                <View style={[styles.deductibleContainer, { borderTopColor: colors.border }]}>
                  <Text style={[styles.deductibleTitle, { color: colors.text }]}>Deducible</Text>
                  <Text style={[styles.deductibleAmount, { color: colors.info }]}>{formatCurrency(deductible)}</Text>
              
                  <View style={styles.sliderLabels}>
                    <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>$200K</Text>
                    <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>$1M</Text>
                  </View>
                  <Text style={[styles.deductibleNote, { color: colors.textSecondary }]}>
                    A mayor deducible, menor prima mensual
                  </Text>
                </View>
              </View>
            )}

            <TouchableOpacity style={[styles.documentButton, { backgroundColor: colors.inputBackground }]}>
              <FileText size={20} color={colors.info} />
              <Text style={[styles.documentButtonText, { color: colors.info }]}>Ver Documentación Legal (PDF)</Text>
            </TouchableOpacity>

            <View style={[styles.priceBreakdown, { backgroundColor: colors.card }]}>
              <Text style={[styles.breakdownTitle, { color: colors.text }]}>Resumen de Precio</Text>
              <View style={styles.breakdownItem}>
                <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Precio base</Text>
                <Text style={[styles.breakdownValue, { color: colors.text }]}>{formatCurrency(currentPolicy.basePrice)}</Text>
              </View>
              {type === 'rcv' && additionalCoverage.roadAssistance && (
                <View style={styles.breakdownItem}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Asistencia vial</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text }]}>$15.000</Text>
                </View>
              )}
              {type === 'rcv' && additionalCoverage.legalAssistance && (
                <View style={styles.breakdownItem}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Asistencia jurídica</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text }]}>$10.000</Text>
                </View>
              )}
              {type === 'rcv' && additionalCoverage.replacementVehicle && (
                <View style={styles.breakdownItem}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Vehículo de reemplazo</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text }]}>$25.000</Text>
                </View>
              )}
              <View style={[styles.breakdownDivider, { backgroundColor: colors.border }]} />
              <View style={styles.breakdownItem}>
                <Text style={[styles.breakdownTotal, { color: colors.text }]}>Total mensual</Text>
                <Text style={[styles.breakdownTotalValue, { color: colors.success }]}>{formatCurrency(calculateTotalPrice())}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: colors.buttonPrimary }]}
              onPress={handleContinueToPayment}
            >
              <Text style={[styles.continueButtonText, { color: colors.white }]}>Continuar al Pago</Text>
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
    marginTop: -30,
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
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  policyInfo: {
    flex: 1,
  },
  policyName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  totalPrice: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionContent: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  redBullet: {},
  listText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
    lineHeight: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  optionPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  deductibleContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  deductibleTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
  },
  deductibleAmount: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sliderLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  deductibleNote: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  documentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
    gap: 10,
  },
  documentButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  priceBreakdown: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  breakdownTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 15,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  breakdownLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  breakdownValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  breakdownDivider: {
    height: 1,
    marginVertical: 15,
  },
  breakdownTotal: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  breakdownTotalValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});