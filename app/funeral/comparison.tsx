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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import { FontWeights } from '@/constants/Typography';
import { router } from 'expo-router';
import BackgroundShape from '@/assets/svg/login/background-shape.svg';
// You REALLY need to replace these with actual distinct SVG files!
import StarSVG from '@/assets/svg/dashboard/start.svg'; // Placeholder for Star
import CheckSVG from '@/assets/svg/dashboard/plus.svg'; // Placeholder for Checkmark
import XSVG from '@/assets/svg/dashboard/plus.svg';     // Placeholder for X
import ArrowLeftSVG from '@/assets/svg/dashboard/back.svg'; // Placeholder for Arrow Left
import ArrowDownSVG from '@/assets/svg/dashboard/arrow.svg'; // Placeholder for Arrow Down

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

// FUNERAL OFFERS DATA - UPDATED
const funeralOffers = [
  {
    id: 1,
    company: 'Funeraria La Paz',
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', // Placeholder logo
    priceUSD: '$25',
    priceBs: 'Bs. 900',
    priceNumeric: 25, // Assuming this is USD for sorting if needed
    recommended: true,
    rating: 4.9,
    reviews: 2100,
    waitingPeriod: '6 meses',
    coverage: '$3.000.000', // This likely refers to VES, keep the string for display
    services: [
      'Servicio funerario completo',
      'Traslado del cuerpo',
      'Sala de velación 24h',
      'Ceremonia religiosa o civil',
      'Cremación o inhumación',
      'Urna o ataúd incluido'
    ],
    additional: [
      'Flores naturales',
      'Música personalizada',
      'Transporte para familiares',
      'Trámites legales',
      'Recordatorios'
    ],
    excluded: [
      'Servicios en el exterior',
      'Embalsamiento especial'
    ]
  },
  {
    id: 2,
    company: 'Servicios Funerarios San Miguel',
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', // Placeholder logo
    priceUSD: '$20',
    priceBs: 'Bs. 720',
    priceNumeric: 20,
    recommended: false,
    rating: 4.5,
    reviews: 1450,
    waitingPeriod: '12 meses',
    coverage: '$2.500.000',
    services: [
      'Servicio funerario básico',
      'Traslado del cuerpo',
      'Sala de velación 12h',
      'Ceremonia básica',
      'Cremación o inhumación'
    ],
    additional: [
      'Flores básicas',
      'Trámites legales',
      'Recordatorios'
    ],
    excluded: [
      'Servicios en el exterior',
      'Embalsamiento especial',
      'Música personalizada',
      'Transporte para familiares'
    ]
  },
  {
    id: 3,
    company: 'Funeraria Premium Eterno Descanso',
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', // Placeholder logo
    priceUSD: '$35',
    priceBs: 'Bs. 1.260',
    priceNumeric: 35,
    recommended: false,
    rating: 4.8,
    reviews: 890,
    waitingPeriod: 'Inmediata',
    coverage: '$5.000.000',
    services: [
      'Servicio funerario premium',
      'Traslado del cuerpo',
      'Sala de velación 48h',
      'Ceremonia personalizada',
      'Cremación o inhumación',
      'Ataúd de lujo o urna premium',
      'Embalsamiento incluido'
    ],
    additional: [
      'Arreglos florales premium',
      'Música en vivo',
      'Transporte VIP para familiares',
      'Trámites legales',
      'Recordatorios personalizados',
      'Servicio de catering',
      'Fotografía del evento'
    ],
    excluded: [
      'Servicios en el exterior'
    ]
  }
];

// Define feature categories for the accordion structure - UPDATED FOR FUNERAL SERVICES
const featureCategories = [
  { id: 'services', title: 'Servicios Incluidos' }, // Changed from 'coverage'
  { id: 'additional', title: 'Beneficios Adicionales' },
  { id: 'excluded', title: 'Exclusiones Clave' },
];

export default function ComparisonScreen() {
  const colors = useTheme();
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'VES'>('USD');
  const [openSections, setOpenSections] = useState({});

  const titleStyle = useCustomTextStyle('h4', {
    color: colors.text,
    fontFamily: FontWeights.bold,
  });
  const labelStyle = useTextStyle('caption');
  const bodyStyle = useTextStyle('bodySmall'); // Added for general text
  const priceStyle = useCustomTextStyle('h4', {
    color: colors.primary,
    fontFamily: FontWeights.bold,
  });


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarSVG
        key={i}
        width={16}
        height={16}
        fill={i + 1 <= Math.round(rating) ? '#F6E05E' : 'none'}
        stroke={i + 1 <= Math.round(rating) ? '#F6E05E' : colors.border}
        style={{ marginRight: 2 }}
      />
    ));
  };

  const toggleSection = (offerId: number, categoryId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSections(prev => ({
      ...prev,
      [offerId]: {
        ...((prev[offerId as keyof typeof prev] as { [key: string]: boolean }) || {}),
        [categoryId]: !(prev[offerId as keyof typeof prev]?.[categoryId as keyof typeof prev[keyof typeof prev]]),
      },
    }));
  };

  const handleSelectPolicy = (policyId: number) => {
    router.push(`/policy/details?policyId=${policyId}&type=funeral`);
  };



  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.fixedHeader}>
          <View style={[styles.header, { justifyContent: 'center' }]}>
            <TouchableOpacity
              style={[styles.backButton, { position: 'absolute', left: 0 }]}
              onPress={() => router.back()}
            >
              <ArrowLeftSVG width={24} height={24} />
            </TouchableOpacity>
            <Text style={[titleStyle, { textAlign: 'center', maxWidth: 250 }]}>Comparar Planes Funerarios</Text>
          </View>
          <View style={styles.currencyToggle}>
            {['USD', 'VES'].map((curr) => (
              <TouchableOpacity
                key={curr}
                onPress={() => setSelectedCurrency(curr as 'USD' | 'VES')}
                style={[
                  styles.currencyButton,
                  selectedCurrency === curr && { backgroundColor: colors.primary },
                ]}
              >
                <Text
                  style={[
                    styles.currencyText,
                    selectedCurrency === curr && { color: colors.white },
                  ]}
                >
                  {curr}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>

        <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
          <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />

          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

            {funeralOffers.map((item) => ( // Using funeralOffers here
              <View
                key={item.id}
                style={[
                  styles.card,
                  item.recommended && {
                    borderColor: colors.success, borderWidth: 2, paddingHorizontal: 16, // Adjusted padding for consistent look
                    paddingBottom: 20, // Adjusted padding
                  },
                ]}
              >
                {item.recommended && (
                  <Text style={[styles.recommendedLabel, { color: colors.success }]}>
                    SeguroTotal Recomienda
                  </Text>
                )}

                <View style={styles.cardHeader}>
                  <Image source={{ uri: item.logo }} style={styles.logo} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.companyName, { color: colors.text }]}>
                      {item.company}
                    </Text>
                    <View style={styles.ratingRow}>
                      <View style={{ flexDirection: 'row' }}>
                        {renderStars(item.rating)}
                      </View>
                      <Text style={[labelStyle, { color: colors.textSecondary }]}>
                        {' '}
                        {item.rating} ({item.reviews})
                      </Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={priceStyle}>
                      {selectedCurrency === 'USD' ? item.priceUSD : item.priceBs}
                    </Text>
                    <Text style={[labelStyle, { color: colors.textSecondary }]}>
                      / mes
                    </Text>
                  </View>
                </View>

                {/* New: Displaying Waiting Period and Coverage directly */}
                <View style={styles.infoRow}>
                  <Text style={[bodyStyle, { color: colors.text, fontFamily: FontWeights.semiBold }]}>
                    Período de Carencia:
                  </Text>
                  <Text style={[bodyStyle, { color: colors.textSecondary, marginLeft: 5 }]}>
                    {item.waitingPeriod}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[bodyStyle, { color: colors.text, fontFamily: FontWeights.semiBold }]}>
                    Cobertura:
                  </Text>
                  <Text style={[bodyStyle, { color: colors.textSecondary, marginLeft: 5 }]}>
                    {item.coverage}
                  </Text>
                </View>
                {/* End New */}


                {featureCategories.map((category) => {
                  const items =
                    category.id === 'services' // Changed from 'coverage'
                      ? item.services
                      : category.id === 'additional'
                        ? item.additional
                        : item.excluded;
                  const isOpen = openSections[item.id as keyof typeof openSections]?.[category.id] ?? false;
                  const IconComponent = category.id === 'excluded' ? XSVG : CheckSVG;

                  return (
                    <View key={category.id} style={styles.featureSection}>
                      <TouchableOpacity
                        onPress={() => toggleSection(item.id, category.id)}
                        style={styles.sectionHeader}
                      >
                        <Text
                          style={[
                            labelStyle,
                            { fontFamily: FontWeights.semiBold, color: colors.text },
                          ]}
                        >
                          {category.title}
                        </Text>
                        {isOpen ? (
                          <ArrowDownSVG width={18} height={18} stroke={colors.textSecondary} style={{ transform: [{ rotate: '180deg' }] }} />
                        ) : (
                          <ArrowDownSVG width={18} height={18} stroke={colors.textSecondary} />
                        )}
                      </TouchableOpacity>

                      {isOpen && (
                        <View style={styles.sectionContent}>
                          {items.map((text, i) => (
                            <View key={i} style={styles.featureItem}>
                              <IconComponent width={14} height={14} fill={category.id === 'excluded' ? colors.error : colors.success} /> {/* Using theme colors */}
                              <Text style={[labelStyle, { color: colors.text, marginLeft: 8 }]}>
                                {text}
                              </Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  );
                })}

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                  onPress={() => handleSelectPolicy(item.id)}
                    style={[styles.filledButton, { backgroundColor: colors.success }]}
                  >
                    <Text style={{ color: colors.white, fontFamily: FontWeights.semiBold }}>
                      Seleccionar Plan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
  currencyToggle: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#F1F5F9', // Use a light grey from the theme if available
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
  },
  currencyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 14,
    // fontFamily: 'Inter-SemiBold', // Ensure font is loaded
    fontWeight: '600', // Fallback
    color: '#334155', // Use a dark grey from the theme if available
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  recommendedLabel: {
    fontSize: 12,
    marginBottom: 10,
    // fontFamily: 'Inter-Medium', // Ensure font is loaded
    fontWeight: '500', // Fallback
    textAlign: 'right',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Use a light border color from theme
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#eee', // Use a light border color from theme
  },
  companyName: {
    fontSize: 16,
    // fontFamily: 'Inter-Bold', // Ensure font is loaded
    fontWeight: 'bold', // Fallback
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRow: { // New style for displaying carencia and coverage
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 5, // Small horizontal padding
  },
  featureSection: {
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Use a light border color from theme
  },
  sectionContent: {
    paddingVertical: 5,
    paddingLeft: 5,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
  filledButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});