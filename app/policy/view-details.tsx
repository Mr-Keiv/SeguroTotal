import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import { FontSizes, FontWeights } from '@/constants/Typography';

// Import SVG icons
import BackIcon from '@/assets/svg/dashboard/back.svg';
import CarIcon from '@/assets/svg/dashboard/cart.svg';
import PolicyIcon from '@/assets/svg/dashboard/income.svg';

import BackgroundShape from '@/assets/svg/login/background-shape.svg';
import { AlertCircleIcon, CalendarIcon, DollarSignIcon, DownloadIcon, FlowerIcon, MailIcon, PhoneIcon, ShareIcon, ShieldIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock data for policies
const mockPolicies = {
  '1': {
    id: '1',
    type: 'RCV',
    policyNumber: 'RCV-2024-001234',
    company: 'Seguros ABC',
    status: 'Activa',
    startDate: '15/01/2024',
    endDate: '15/01/2025',
    nextPayment: '15/02/2024',
    premiumUSD: '$35',
    premiumBs: 'Bs. 1.260',
    vehicle: {
      brand: 'Toyota',
      model: 'Corolla',
      year: '2020',
      plate: 'ABC123',
      color: 'Blanco'
    },
    coverage: {
      responsabilidadCivil: '$50.000.000',
      danosMateriales: '$30.000.000',
      lesionePersonales: '$20.000.000',
      gastosMedicos: '$10.000.000'
    },
    additionalServices: [
      'Asistencia Vial 24/7',
      'Grúa hasta 50km',
      'Conductor Elegido'
    ],
    deductible: '$500.000',
    beneficiaries: []
  },
  '2': {
    id: '2',
    type: 'Funerario',
    policyNumber: 'FUN-2024-005678',
    company: 'Funeraria La Paz',
    status: 'Activa',
    startDate: '01/12/2023',
    endDate: '01/12/2024',
    nextPayment: '01/02/2024',
    premiumUSD: '$25',
    premiumBs: 'Bs. 900',
    coverage: {
      montoAsegurado: '$3.000.000'
    },
    services: [
      'Servicio funerario completo',
      'Traslado del cuerpo',
      'Sala de velación 24h',
      'Ceremonia religiosa o civil',
      'Cremación o inhumación',
      'Ataúd incluido'
    ],
    waitingPeriod: '6 meses',
    beneficiaries: [
      { name: 'María García', relationship: 'Cónyuge', percentage: '60%' },
      { name: 'Carlos Pérez', relationship: 'Hijo', percentage: '40%' }
    ]
  }
};

export default function PolicyViewDetailsScreen() {
  const { policyId } = useLocalSearchParams();
  const colors = useTheme();
  const policy = mockPolicies[policyId];
  const [selectedCurrency, setSelectedCurrency] = React.useState('USD');

  // Custom text styles
  const titleStyle = useCustomTextStyle('h2', {
    color: colors.white,
    fontSize: FontSizes.xl,
    fontFamily: FontWeights.bold,
  });

  const subtitleStyle = useCustomTextStyle('body', {
    color: colors.white,
    opacity: 0.8,
    fontFamily: FontWeights.regular,
  });

  const bodyStyle = useTextStyle('body');
  const smallTextStyle = useTextStyle('bodySmall');
  const captionTextStyle = useTextStyle('caption');

  if (!policy) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <BackIcon width={24} height={24} color={colors.white} />
            </TouchableOpacity>
            <Text style={titleStyle}>Póliza no encontrada</Text>
          </View>
        </View>
        <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
          <View style={styles.errorContainer}>
            <AlertCircleIcon width={60} height={60} color="#E53E3E" />
            <Text style={[bodyStyle, { 
              color: colors.text, 
              fontFamily: FontWeights.bold,
              fontSize: FontSizes.lg,
              marginTop: 20,
              marginBottom: 10,
              textAlign: 'center'
            }]}>
              Póliza no encontrada
            </Text>
            <Text style={[smallTextStyle, { 
              color: colors.textSecondary,
              textAlign: 'center',
              marginBottom: 30
            }]}>
              No se pudo cargar la información de la póliza
            </Text>
            <TouchableOpacity 
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={() => router.back()}
            >
              <Text style={[styles.primaryButtonText, { color: colors.white }]}>
                Volver
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const handleDownloadPolicy = () => {
    Alert.alert(
      'Descargar Póliza',
      'Se descargará el documento PDF de tu póliza',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Descargar', onPress: () => console.log('Descargando póliza...') }
      ]
    );
  };

  const handleSharePolicy = () => {
    Alert.alert(
      'Compartir Póliza',
      '¿Cómo deseas compartir tu póliza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Email', onPress: () => console.log('Compartir por email') },
        { text: 'WhatsApp', onPress: () => console.log('Compartir por WhatsApp') }
      ]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contactar Soporte',
      'Elige una opción para contactar al soporte',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamar', onPress: () => console.log('Llamando...') },
        { text: 'Email', onPress: () => console.log('Enviando email...') }
      ]
    );
  };

  const PolicyIcon = policy.type === 'RCV' ? CarIcon : FlowerIcon;
  const iconColor = policy.type === 'RCV' ? '#2C5282' : '#48BB78';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary }]}>
      {/* Header with Background Shape */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <BackIcon width={24} height={24} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={titleStyle}>Detalles de Póliza</Text>
            <Text style={subtitleStyle}>
              {policy.type === 'RCV' ? 'Seguro de Vehículo' : 'Seguro Funerario'}
            </Text>
          </View>
        </View>

        {/* Currency Selector */}
        <View style={styles.currencySelector}>
          <TouchableOpacity
            style={[
              styles.currencyButton,
              selectedCurrency === 'USD' && styles.selectedCurrencyButton
            ]}
            onPress={() => setSelectedCurrency('USD')}
          >
            <Text style={[
              styles.currencyButtonText,
              selectedCurrency === 'USD' && styles.selectedCurrencyButtonText
            ]}>
              USD
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.currencyButton,
              selectedCurrency === 'VES' && styles.selectedCurrencyButton
            ]}
            onPress={() => setSelectedCurrency('VES')}
          >
            <Text style={[
              styles.currencyButtonText,
              selectedCurrency === 'VES' && styles.selectedCurrencyButtonText
            ]}>
              Bs.
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Policy Header Card */}
          <View style={[styles.policyHeaderCard, { backgroundColor: colors.card }]}>
            <View style={styles.policyHeader}>
              <View style={[styles.policyIconContainer, { backgroundColor: iconColor + '20' }]}>
                <PolicyIcon width={28} height={28} color={iconColor} />
              </View>
              <View style={styles.policyInfo}>
                <Text style={[bodyStyle, { 
                  color: colors.text, 
                  fontFamily: FontWeights.bold,
                  fontSize: FontSizes.md
                }]}>
                  {policy.type === 'RCV' ? 'Seguro de Vehículo' : 'Seguro Funerario'}
                </Text>
                <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                  {policy.company}
                </Text>
                <Text style={[captionTextStyle, { color: colors.textSecondary }]}>
                  Póliza: {policy.policyNumber}
                </Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={[styles.statusText, { color: '#38A169' }]}>
                  {policy.status}
                </Text>
              </View>
            </View>
          </View>

          {/* General Information */}
          <View style={styles.sectionContainer}>
            <Text style={[bodyStyle, { 
              color: colors.text, 
              fontFamily: FontWeights.bold,
              fontSize: FontSizes.lg,
              marginBottom: 15
            }]}>
              Información General
            </Text>
            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <CalendarIcon width={20} height={20} color={colors.textSecondary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                    Vigencia
                  </Text>
                  <Text style={[smallTextStyle, { 
                    color: colors.text, 
                    fontFamily: FontWeights.medium 
                  }]}>
                    {policy.startDate} - {policy.endDate}
                  </Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <DollarSignIcon width={20} height={20} color={colors.textSecondary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                    Prima Mensual
                  </Text>
                  <Text style={[smallTextStyle, { 
                    color: colors.primary, 
                    fontFamily: FontWeights.bold 
                  }]}>
                    {selectedCurrency === 'USD' ? policy.premiumUSD : policy.premiumBs}
                  </Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <CalendarIcon width={20} height={20} color={colors.textSecondary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                    Próximo Pago
                  </Text>
                  <Text style={[smallTextStyle, { 
                    color: colors.text, 
                    fontFamily: FontWeights.medium 
                  }]}>
                    {policy.nextPayment}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Vehicle Information (only for RCV) */}
          {policy.type === 'RCV' && policy.vehicle && (
            <View style={styles.sectionContainer}>
              <Text style={[bodyStyle, { 
                color: colors.text, 
                fontFamily: FontWeights.bold,
                fontSize: FontSizes.lg,
                marginBottom: 15
              }]}>
                Vehículo Asegurado
              </Text>
              <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                <View style={styles.vehicleInfo}>
                  <Text style={[bodyStyle, { 
                    color: colors.text, 
                    fontFamily: FontWeights.bold,
                    fontSize: FontSizes.md,
                    textAlign: 'center'
                  }]}>
                    {policy.vehicle.brand} {policy.vehicle.model} {policy.vehicle.year}
                  </Text>
                  <Text style={[smallTextStyle, { 
                    color: colors.textSecondary,
                    textAlign: 'center',
                    marginTop: 5
                  }]}>
                    Placa: {policy.vehicle.plate} • Color: {policy.vehicle.color}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Coverage */}
          <View style={styles.sectionContainer}>
            <Text style={[bodyStyle, { 
              color: colors.text, 
              fontFamily: FontWeights.bold,
              fontSize: FontSizes.lg,
              marginBottom: 15
            }]}>
              Coberturas
            </Text>
            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
              {policy.type === 'RCV' ? (
                <>
                  <View style={styles.coverageItem}>
                    <ShieldIcon width={16} height={16} color="#48BB78" />
                    <View style={styles.coverageContent}>
                      <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                        Responsabilidad Civil
                      </Text>
                      <Text style={[smallTextStyle, { 
                        color: '#48BB78', 
                        fontFamily: FontWeights.bold 
                      }]}>
                        {policy.coverage.responsabilidadCivil}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.coverageItem}>
                    <ShieldIcon width={16} height={16} color="#48BB78" />
                    <View style={styles.coverageContent}>
                      <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                        Daños Materiales
                      </Text>
                      <Text style={[smallTextStyle, { 
                        color: '#48BB78', 
                        fontFamily: FontWeights.bold 
                      }]}>
                        {policy.coverage.danosMateriales}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.coverageItem}>
                    <ShieldIcon width={16} height={16} color="#48BB78" />
                    <View style={styles.coverageContent}>
                      <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                        Lesiones Personales
                      </Text>
                      <Text style={[smallTextStyle, { 
                        color: '#48BB78', 
                        fontFamily: FontWeights.bold 
                      }]}>
                        {policy.coverage.lesionePersonales}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.coverageItem}>
                    <ShieldIcon width={16} height={16} color="#48BB78" />
                    <View style={styles.coverageContent}>
                      <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                        Gastos Médicos
                      </Text>
                      <Text style={[smallTextStyle, { 
                        color: '#48BB78', 
                        fontFamily: FontWeights.bold 
                      }]}>
                        {policy.coverage.gastosMedicos}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.deductibleInfo}>
                    <Text style={[smallTextStyle, { 
                      color: colors.primary, 
                      fontFamily: FontWeights.bold,
                      textAlign: 'center'
                    }]}>
                      Deducible: {policy.deductible}
                    </Text>
                  </View>
                </>
              ) : (
                <View style={styles.coverageItem}>
                  <ShieldIcon width={16} height={16} color="#48BB78" />
                  <View style={styles.coverageContent}>
                    <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                      Monto Asegurado
                    </Text>
                    <Text style={[smallTextStyle, { 
                      color: '#48BB78', 
                      fontFamily: FontWeights.bold 
                    }]}>
                      {policy.coverage.montoAsegurado}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Services */}
          <View style={styles.sectionContainer}>
            <Text style={[bodyStyle, { 
              color: colors.text, 
              fontFamily: FontWeights.bold,
              fontSize: FontSizes.lg,
              marginBottom: 15
            }]}>
              {policy.type === 'RCV' ? 'Servicios Adicionales' : 'Servicios Incluidos'}
            </Text>
            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
              {(policy.type === 'RCV' ? policy.additionalServices : policy.services)?.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <View style={styles.serviceBullet} />
                  <Text style={[smallTextStyle, { color: colors.textSecondary, flex: 1 }]}>
                    {service}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Beneficiaries (only for Funerario) */}
          {policy.type === 'Funerario' && policy.beneficiaries && policy.beneficiaries.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={[bodyStyle, { 
                color: colors.text, 
                fontFamily: FontWeights.bold,
                fontSize: FontSizes.lg,
                marginBottom: 15
              }]}>
                Beneficiarios
              </Text>
              <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                {policy.beneficiaries.map((beneficiary, index) => (
                  <View key={index} style={styles.beneficiaryItem}>
                    <View style={styles.beneficiaryInfo}>
                      <Text style={[smallTextStyle, { 
                        color: colors.text, 
                        fontFamily: FontWeights.bold 
                      }]}>
                        {beneficiary.name}
                      </Text>
                      <Text style={[captionTextStyle, { color: colors.textSecondary }]}>
                        {beneficiary.relationship}
                      </Text>
                    </View>
                    <Text style={[smallTextStyle, { 
                      color: '#48BB78', 
                      fontFamily: FontWeights.bold 
                    }]}>
                      {beneficiary.percentage}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Actions */}
          <View style={styles.sectionContainer}>
            <Text style={[bodyStyle, { 
              color: colors.text, 
              fontFamily: FontWeights.bold,
              fontSize: FontSizes.lg,
              marginBottom: 15
            }]}>
              Acciones
            </Text>
            
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card }]}
              onPress={handleDownloadPolicy}
            >
              <View style={[{ 
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }, { backgroundColor: colors.primary + '20' }]}>
                <DownloadIcon width={20} height={20} color={colors.primary} />
              </View>
              <Text style={[smallTextStyle, { 
                color: colors.text, 
                fontFamily: FontWeights.medium,
                marginLeft: 12
              }]}>
                Descargar Póliza (PDF)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card }]}
              onPress={handleSharePolicy}
            >
           <View style={[{ 
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }, { backgroundColor: colors.primary + '20' }]}>
                <ShareIcon width={20} height={20} color={colors.primary} />
              </View>
              <Text style={[smallTextStyle, { 
                color: colors.text, 
                fontFamily: FontWeights.medium,
                marginLeft: 12
              }]}>
                Compartir Póliza
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card }]}
              onPress={handleContactSupport}
            >
              <View style={[{ 
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }, { backgroundColor: colors.primary + '20' }]}>
                <PhoneIcon width={20} height={20} color={colors.primary} />
              </View>
              <Text style={[smallTextStyle, { 
                color: colors.text, 
                fontFamily: FontWeights.medium,
                marginLeft: 12
              }]}>
                Contactar Soporte
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card }]}
              onPress={() => router.push(`/policy/manage?policyId=${policy.id}`)}
            >
              <View style={[{ 
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }, { backgroundColor: colors.primary + '20' }]}>
                <PolicyIcon width={20} height={20} color={colors.primary} />
              </View>
              <Text style={[smallTextStyle, { 
                color: colors.text, 
                fontFamily: FontWeights.medium,
                marginLeft: 12
              }]}>
                Gestionar Póliza
              </Text>
            </TouchableOpacity>
          </View>

          {/* Emergency Contact */}
          <View style={styles.emergencySection}>
            <Text style={[bodyStyle, { 
              color: '#E53E3E', 
              fontFamily: FontWeights.bold,
              fontSize: FontSizes.md,
              textAlign: 'center',
              marginBottom: 10
            }]}>
              Contacto de Emergencia
            </Text>
            <Text style={[smallTextStyle, { 
              color: colors.textSecondary,
              textAlign: 'center',
              marginBottom: 15
            }]}>
              Para reportar siniestros o emergencias, contacta a {policy.company}
            </Text>
            <View style={styles.emergencyContacts}>
              <TouchableOpacity style={styles.emergencyButton}>
                <PhoneIcon width={16} height={16} color="#FFFFFF" />
                <Text style={styles.emergencyButtonText}>Llamar 24/7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.emergencyButton}>
                <MailIcon width={16} height={16} color="#FFFFFF" />
                <Text style={styles.emergencyButtonText}>Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    position: 'relative',
    paddingBottom: 20,
    marginTop: -30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  headerContent: {
    flex: 1,
  },
  currencySelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 4,
    marginHorizontal: 20,
    alignSelf: 'flex-start',
    zIndex: 1,
  },
    actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  currencyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  selectedCurrencyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  currencyButtonText: {
    fontSize: 14,
    fontFamily: FontWeights.medium,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  selectedCurrencyButtonText: {
    color: '#2C5282',
  },
  mainContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  policyHeaderCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  policyIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  policyInfo: {
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#C6F6D5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FontWeights.medium,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  infoCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  vehicleInfo: {
    alignItems: 'center',
  },
  coverageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  coverageContent: {
    marginLeft: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deductibleInfo: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#48BB78',
    marginRight: 12,
  },
  beneficiaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  beneficiaryInfo: {
    flex: 1,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  headerBackButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
  },
 
  policyHeaderInfo: {
    flex: 1,
  },
  policyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  policyCompany: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    marginBottom: 2,
  },
  policyNumber: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
 
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 15,
  },
  
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
 
  vehicleText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  vehicleDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
 
  coverageLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
  coverageValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#48BB78',
  },
 
  deductibleLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2C5282',
    textAlign: 'center',
  },
 
  serviceText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    flex: 1,
  },
  
  beneficiaryName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 2,
  },
  beneficiaryRelation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
  beneficiaryPercentage: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#48BB78',
  },
  actionsSection: {
    marginBottom: 25,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2C5282',
    marginLeft: 12,
  },
  emergencySection: {
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#E53E3E',
    marginBottom: 10,
  },
  emergencyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 15,
  },
  emergencyContacts: {
    flexDirection: 'row',
    gap: 10,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E53E3E',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 5,
  },
  emergencyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#E53E3E',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 30,
  },
    primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});