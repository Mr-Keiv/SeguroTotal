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
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomTextStyle, useTheme } from '@/hooks/useTheme'; // Asegúrate de que useTheme devuelva ThemeColors
import { FontWeights } from '@/constants/Typography';
import { router } from 'expo-router';
import BackgroundShape from '@/assets/svg/login/background-shape.svg';
import ArrowLeftSVG from '@/assets/svg/dashboard/back.svg';
import { CreditCard, Lock, Calendar, Shield, DollarSign } from 'lucide-react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

const paymentMethods = [
  { id: 'credit', label: 'Tarjeta de Crédito', icon: '💳', description: 'Visa, Mastercard' },
  { id: 'debit', label: 'Tarjeta Débito', icon: '💳', description: 'Débito nacional' },
  { id: 'transfer', label: 'Transferencia Bancaria', icon: '🏦', description: 'Banesco, Mercantil, BOD' },
  { id: 'mobile_payment', label: 'Pago Móvil', icon: '📱', description: 'C2P, Biopago' },
  { id: 'zelle', label: 'Zelle', icon: '💵', description: 'Solo USD' },
  { id: 'paypal', label: 'PayPal', icon: '🌐', description: 'USD disponible' },
];

const paymentFrequencies = [
  { 
    id: 'monthly', 
    label: 'Mensual', 
    priceUSD: 35, 
    priceBs: 1260, 
    discount: 0,
    popular: true 
  },
  { 
    id: 'quarterly', 
    label: 'Trimestral', 
    priceUSD: 100, 
    priceBs: 3600, 
    discount: 5,
    popular: false 
  },
  { 
    id: 'biannual', 
    label: 'Semestral', 
    priceUSD: 190, 
    priceBs: 6840, 
    discount: 10,
    popular: false 
  },
  { 
    id: 'annual', 
    label: 'Anual', 
    priceUSD: 360, 
    priceBs: 12960, 
    discount: 15,
    popular: false 
  },
];


export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handlePayNow = () => {
    if (selectedMethod === 'credit' || selectedMethod === 'debit') {
      if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
        Alert.alert('Error', 'Por favor completa todos los datos de la tarjeta');
        return;
      }
    }
    router.push('/policy/confirmation');
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'USD') {
      return `$${amount.toLocaleString('en-US')}`;
    } else {
      return `Bs. ${amount.toLocaleString('es-VE')}`;
    }
  };

  const getSelectedFrequencyData = () => {
    return paymentFrequencies.find(f => f.id === selectedFrequency) || paymentFrequencies[0];
  };

  const calculateDiscountedPrice = () => {
    const frequency = getSelectedFrequencyData();
    const basePrice = selectedCurrency === 'USD' ? frequency.priceUSD : frequency.priceBs;
    const discountAmount = basePrice * (frequency.discount / 100);
    return basePrice - discountAmount;
  };

  const getOriginalPrice = () => {
    const frequency = getSelectedFrequencyData();
    return selectedCurrency === 'USD' ? frequency.priceUSD : frequency.priceBs;
  };

  // Aquí obtienes tus colores del tema activo
  const colors = useTheme();

  const titleStyle = useCustomTextStyle('h4', {
    color: colors.text,
    fontFamily: FontWeights.bold,
  });

  
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
            <Text style={[titleStyle, { textAlign: 'center', maxWidth: 300 }]}>Métodos de Pago</Text>
          </View>
        </View>

        <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
          <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />

          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
           <View style={[styles.securityBanner, { backgroundColor: colors.success, borderColor: colors.success }]}>
          <Lock size={20} color={colors.text} /> 
          <Text style={[styles.securityText, { color: colors.text }]}> 
            Pagos 100% seguros con encriptación SSL
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Moneda</Text>
          <View style={styles.currencyContainer}>
            <TouchableOpacity
              style={[
                styles.currencyOption,
                { backgroundColor: colors.card, borderColor: colors.border },
                selectedCurrency === 'USD' && { borderColor: colors.secondary, backgroundColor: colors.background }
              ]}
              onPress={() => setSelectedCurrency('USD')}
            >
              <Text style={styles.currencyFlag}>🇺🇸</Text>
              <View style={styles.currencyInfo}>
                <Text style={[
                  styles.currencyLabel,
                  { color: colors.text },
                  selectedCurrency === 'USD' && { color: colors.secondary }
                ]}>
                  Dólares USD
                </Text>
                <Text style={[
                  styles.currencyDesc,
                  { color: colors.textSecondary },
                  selectedCurrency === 'USD' && { color: colors.secondary }
                ]}>
                  Zelle, PayPal, Tarjetas
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.currencyOption,
                { backgroundColor: colors.card, borderColor: colors.border },
                selectedCurrency === 'VES' && { borderColor: colors.secondary, backgroundColor: colors.background }
              ]}
              onPress={() => setSelectedCurrency('VES')}
            >
              <Text style={styles.currencyFlag}>🇻🇪</Text>
              <View style={styles.currencyInfo}>
                <Text style={[
                  styles.currencyLabel,
                  { color: colors.text },
                  selectedCurrency === 'VES' && { color: colors.secondary }
                ]}>
                  Bolívares VES
                </Text>
                <Text style={[
                  styles.currencyDesc,
                  { color: colors.textSecondary },
                  selectedCurrency === 'VES' && { color: colors.secondary }
                ]}>
                  Pago Móvil, Transferencias
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Frecuencia de Pago</Text>
          <View style={styles.frequencyContainer}>
            {paymentFrequencies.map((frequency) => (
              <TouchableOpacity
                key={frequency.id}
                style={[
                  styles.frequencyOption,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  selectedFrequency === frequency.id && { borderColor: colors.success, backgroundColor: colors.background }
                ]}
                onPress={() => setSelectedFrequency(frequency.id)}
              >
                {frequency.popular && (
                  <View style={[styles.popularBadge, { backgroundColor: colors.secondary }]}>
                    <Text style={[styles.popularText, { color: colors.white }]}>Más Popular</Text>
                  </View>
                )}
                <View style={styles.frequencyInfo}>
                  <Text style={[
                    styles.frequencyLabel,
                    { color: colors.text },
                    selectedFrequency === frequency.id && { color: colors.success }
                  ]}>
                    {frequency.label}
                  </Text>
                  <View style={styles.priceAndDiscountContainer}>
                    <View style={styles.priceContainer}>
                      <Text style={[
                        styles.frequencyPrice,
                        { color: colors.text },
                        selectedFrequency === frequency.id && { color: colors.success }
                      ]}>
                        {formatCurrency(
                          selectedCurrency === 'USD' ? frequency.priceUSD : frequency.priceBs,
                          selectedCurrency
                        )}
                      </Text>
                      {frequency.discount > 0 && (
                        <Text style={[
                          styles.originalPrice,
                          { color: colors.textLight },
                          selectedFrequency === frequency.id && { color: colors.border }
                        ]}>
                          {formatCurrency(
                            selectedCurrency === 'USD' ? frequency.priceUSD : frequency.priceBs,
                            selectedCurrency
                          )}
                        </Text>
                      )}
                    </View>
                    {frequency.discount > 0 && (
                      <View style={[styles.discountBadge, { backgroundColor: colors.success }]}>
                        <Text style={[styles.discountText, { color: colors.white }]}>-{frequency.discount}%</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Método de Pago</Text>
          <View style={styles.paymentMethodsContainer}>
            {paymentMethods
              .filter(method => {
                if (selectedCurrency === 'USD') {
                  return ['credit', 'debit', 'zelle', 'paypal'].includes(method.id);
                } else {
                  return ['credit', 'debit', 'transfer', 'mobile_payment'].includes(method.id);
                }
              })
              .map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethod,
                    { backgroundColor: colors.card, borderColor: colors.border },
                    selectedMethod === method.id && { borderColor: colors.secondary, backgroundColor: colors.background }
                  ]}
                  onPress={() => setSelectedMethod(method.id)}
                >
                  <Text style={styles.methodIcon}>{method.icon}</Text>
                  <View style={styles.methodInfo}>
                    <Text style={[
                      styles.methodLabel,
                      { color: colors.text },
                      selectedMethod === method.id && { color: colors.secondary }
                    ]}>
                      {method.label}
                    </Text>
                    <Text style={[
                      styles.methodDescription,
                      { color: colors.textSecondary },
                      selectedMethod === method.id && { color: colors.secondary }
                    ]}>
                      {method.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {(selectedMethod === 'credit' || selectedMethod === 'debit') && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Datos de la Tarjeta</Text>
            <View style={[styles.cardForm, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Número de Tarjeta</Text>
                <View style={[styles.inputContainer, { borderColor: colors.inputBorder, backgroundColor: colors.inputBackground }]}>
                  <CreditCard size={20} color={colors.textLight} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor={colors.border}
                    keyboardType="numeric"
                    value={cardData.number}
                    onChangeText={(text) => setCardData({...cardData, number: text})}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>Vencimiento</Text>
                    <TextInput
                    style={[styles.inputContainer, { borderColor: colors.inputBorder, backgroundColor: colors.inputBackground, color: colors.text }]}
                      placeholder="MM/AA"
                      placeholderTextColor={colors.border}
                      value={cardData.expiry}
                      onChangeText={(text) => setCardData({...cardData, expiry: text})}
                    />
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>CVV</Text>
                  <TextInput
                    style={[styles.inputContainer, { borderColor: colors.inputBorder, backgroundColor: colors.inputBackground, color: colors.text }]}
                    placeholder="123"
                    placeholderTextColor={colors.border}
                    keyboardType="numeric"
                    maxLength={4}
                    value={cardData.cvv}
                    onChangeText={(text) => setCardData({...cardData, cvv: text})}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Nombre del Titular</Text>
                <TextInput
                  style={[styles.inputContainer, { borderColor: colors.inputBorder, backgroundColor: colors.inputBackground, color: colors.text }]}
                  placeholder="Juan Pérez"
                  placeholderTextColor={colors.border}
                  value={cardData.name}
                  onChangeText={(text) => setCardData({...cardData, name: text})}
                />
              </View>
            </View>
          </View>
        )}

        {selectedMethod === 'zelle' && (
          <View style={[styles.instructionsCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text style={[styles.instructionsTitle, { color: colors.success }]}>Instrucciones para Zelle</Text>
            <Text style={[styles.instructionsText, { color: colors.text }]}>
              1. Envía el pago a: pagos@insurapp.com{'\n'}
              2. Usa como concepto: Tu número de póliza{'\n'}
              3. Envía el comprobante por WhatsApp al +58 412-123-4567
            </Text>
          </View>
        )}

        {selectedMethod === 'mobile_payment' && (
          <View style={[styles.instructionsCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text style={[styles.instructionsTitle, { color: colors.success }]}>Pago Móvil</Text>
            <Text style={[styles.instructionsText, { color: colors.text }]}>
              Banco: Banesco{'\n'}
              Teléfono: 0412-123-4567{'\n'}
              Cédula: V-12.345.678{'\n'}
              Titular: Segurototal C.A.
            </Text>
          </View>
        )}

        <View style={styles.summarySection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Resumen del Pago</Text>
          <View style={[styles.summaryCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Seguro RCV Completo</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>Seguros ABC</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Frecuencia:</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{getSelectedFrequencyData().label}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Moneda:</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {selectedCurrency === 'USD' ? 'Dólares USD' : 'Bolívares VES'}
              </Text>
            </View>
            {getSelectedFrequencyData().discount > 0 && (
              <>
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Precio original:</Text>
                  <Text style={[styles.originalPriceText, { color: colors.textLight }]}>
                    {formatCurrency(getOriginalPrice(), selectedCurrency)}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Descuento:</Text>
                  <Text style={[styles.discountValue, { color: colors.success }]}>-{getSelectedFrequencyData().discount}%</Text>
                </View>
              </>
            )}
            <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>Total a Pagar:</Text>
              <Text style={[styles.totalValue, { color: colors.success }]}>
                {formatCurrency(calculateDiscountedPrice(), selectedCurrency)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.securityInfo, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <Shield size={20} color={colors.success} />
          <View style={styles.securityContent}>
            <Text style={[styles.securityTitle, { color: colors.success }]}>Pago 100% Seguro</Text>
            <Text style={[styles.securityDescription, { color: colors.textSecondary }]}>
              Utilizamos encriptación de nivel bancario para proteger tu información
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.payButton, { backgroundColor: colors.buttonPrimary, shadowColor: colors.shadow }]}
          onPress={handlePayNow}
        >
          <Text style={[styles.payButtonText, { color: colors.white }]}>
            Pagar {formatCurrency(calculateDiscountedPrice(), selectedCurrency)}
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
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  securityText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  currencyContainer: {
    gap: 12,
  },
  currencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedCurrency: {},
  currencyFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  currencyDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  selectedCurrencyText: {},
  frequencyContainer: {
    gap: 12,
  },
  frequencyOption: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    position: 'relative',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedFrequency: {},
  popularOption: {},
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1, 
  },
  popularText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  frequencyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
  },
  frequencyLabel: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    flexShrink: 1, 
    marginRight: 10, 
  },
  priceAndDiscountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  frequencyPrice: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textDecorationLine: 'line-through',
  },
  selectedFrequencyText: {},
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  paymentMethodsContainer: {
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedMethod: {},
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  methodDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  selectedMethodText: {},
  cardForm: {
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  instructionsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  instructionsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  originalPriceText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textDecorationLine: 'line-through',
  },
  discountValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  summaryDivider: {
    height: 1,
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  totalValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  securityContent: {
    marginLeft: 12,
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 30,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  payButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
});