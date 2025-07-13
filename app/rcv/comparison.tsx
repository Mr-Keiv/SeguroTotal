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

// UPDATED INSURANCE OFFERS WITH VENEZUELAN COMPANY NAMES
const insuranceOffers = [
  {
    id: 1,
    company: 'Seguros Pirámide', // Updated company name
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', // Placeholder logo
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
    company: 'Mercantil Seguros', // Updated company name
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', // Placeholder logo
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
    company: 'Seguros Venezuela', // Updated company name
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', // Placeholder logo
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
    company: 'Mapfre Seguros', // Added another relevant company name
    logo: 'https://images.pexels.com/photos/3182784/pexels-photo-3182784.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', // Placeholder logo
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

// Define feature categories for the accordion structure
const featureCategories = [
  { id: 'coverage', title: 'Coberturas Principales' },
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
    router.push(`/policy/details?policyId=${policyId}&type=rcv`);
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
              <ArrowLeftSVG width={24} height={24} />
            </TouchableOpacity>
            <Text style={[titleStyle, { textAlign: 'center', maxWidth: 250 }]}>Comparar Seguros RCV</Text>
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

            {insuranceOffers.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  item.recommended && {
                    borderColor: colors.success, borderWidth: 2, paddingHorizontal: 20,
                    paddingBottom: 30,
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

                {featureCategories.map((category) => {
                  const items =
                    category.id === 'coverage'
                      ? item.coverage
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
                              <IconComponent width={14} height={14} fill={category.id === 'excluded' ? 'red' : 'green'} />
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
                      Seleccionar
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

  currencyToggle: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#F1F5F9',
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
    fontFamily: 'Inter-SemiBold',
    color: '#334155',
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
    fontFamily: 'Inter-Medium',
    textAlign: 'right',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  companyName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderBottomColor: '#eee',
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
  outlineButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
