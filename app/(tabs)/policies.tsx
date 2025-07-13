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
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import { FontSizes, FontWeights } from '@/constants/Typography';

import NotificationIcon from '@/assets/svg/dashboard/notification.svg';
import CarIcon from '@/assets/svg/dashboard/cart.svg'; // Specific icon for car
import FlowerIcon from '@/assets/svg/dashboard/funerario.svg'; // Specific icon for funerary
import PolicyIcon from '@/assets/svg/dashboard/income.svg'; // Using fb.svg as a generic icon placeholder
import BackgroundShape from '@/assets/svg/login/background-shape.svg';

const { width } = Dimensions.get('window');

const mockPolicies = [
  {
    id: 1,
    type: 'RCV',
    company: 'Seguros ABC',
    status: 'Activa',
    expiryDate: '2024-12-31',
    nextPayment: '2024-02-15',
    premiumUSD: '$35',
    premiumBs: 'Bs. 1.260',
    vehicle: 'Toyota Corolla 2020',
    coverage: '$4,000.00',
    icon: CarIcon,
    color: '#2C5282',
  },
  {
    id: 2,
    type: 'Funerario',
    company: 'Seguros XYZ',
    status: 'Activa',
    expiryDate: '2025-06-30',
    nextPayment: '2024-02-01',
    premiumUSD: '$25',
    premiumBs: 'Bs. 900',
    coverage: '$5,000.00',
    icon: FlowerIcon,
    color: '#48BB78',
  },
];

const quickActions = [
  {
    id: 1,
    title: 'Reportar Siniestro',
    subtitle: 'Informa un accidente o daño',
    icon: PolicyIcon,
    color: '#E53E3E',
    action: 'report_claim'
  },
  {
    id: 2,
    title: 'Actualizar Mi Último Deseo',
    subtitle: 'Modifica tus preferencias funerarias',
    icon: FlowerIcon,
    color: '#48BB78',
    action: 'update_wish'
  },
  {
    id: 3,
    title: 'Solicitar Asistencia',
    subtitle: 'Grúa, auxilio mecánico y más',
    icon: CarIcon,
    color: '#2C5282',
    action: 'request_assistance'
  }
];

export default function PoliciesScreen() {
  const colors = useTheme();
  const [selectedCurrency, setSelectedCurrency] = React.useState('USD');

  // Estilos de texto personalizados
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

  const handleAction = (action: string) => {
    switch(action) {
      case 'report_claim':
        Alert.alert(
          'Reportar Siniestro',
          '¿Deseas reportar un siniestro?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Reportar', onPress: () => console.log('Reportar siniestro') },
          ]
        );
        break;
      case 'update_wish':
        console.log('Actualizar último deseo');
        break;
      case 'request_assistance':
        console.log('Solicitar asistencia');
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary }]}>
      {/* Header con Background Shape */}


      <View style={styles.headerContainer}>
        
                <View style={styles.header}>
          <View>
            <Text style={titleStyle}>Mis Pólizas</Text>
            <Text style={subtitleStyle}>Gestiona tus seguros contratados</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <NotificationIcon width={24} height={24} />
          </TouchableOpacity>
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
          {/* Policies Cards */}
          <View style={styles.policiesContainer}>
            <Text style={[bodyStyle, { 
              color: colors.text, 
              fontFamily: FontWeights.bold,
              fontSize: FontSizes.lg,
              marginBottom: 15
            }]}>
              Pólizas Activas
            </Text>
            
            {mockPolicies.map((policy) => (
              <View key={policy.id} style={[styles.policyCard, { backgroundColor: colors.card }]}>
                <View style={styles.policyHeader}>
                  <View style={[styles.policyIconContainer, { backgroundColor: policy.color + '20' }]}>
                    <policy.icon width={28} height={28} color={policy.color} />
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
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={[styles.statusText, { color: '#38A169' }]}>
                      {policy.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.policyDetails}>
                  <View style={styles.detailRow}>
                    <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                      Vigente hasta:
                    </Text>
                    <Text style={[smallTextStyle, { color: colors.text, fontFamily: FontWeights.medium }]}>
                      {policy.expiryDate}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                      Próximo pago:
                    </Text>
                    <Text style={[smallTextStyle, { color: colors.text, fontFamily: FontWeights.medium }]}>
                      {policy.nextPayment}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                      Prima:
                    </Text>
                    <Text style={[smallTextStyle, { 
                      color: colors.primary, 
                      fontFamily: FontWeights.bold 
                    }]}>
                      {selectedCurrency === 'USD' ? policy.premiumUSD : policy.premiumBs}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                      Cobertura:
                    </Text>
                    <Text style={[smallTextStyle, { 
                      color: '#10B981', 
                      fontFamily: FontWeights.bold 
                    }]}>
                      {policy.coverage}
                    </Text>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={[styles.actionButton, { borderColor: colors.primary }]}
                  onPress={() => router.push(`/policy/view-details?policyId=${policy.id}`)}
                  >
                    <Text style={[styles.actionButtonText, { color: colors.primary }]}>
                      Ver Detalles
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.primaryActionButton, { backgroundColor: colors.primary }]}
                    onPress={() => router.push(`/policy/manage?policyId=${policy.id}`)}
                  >
                    <Text style={[styles.primaryActionButtonText, { color: colors.white }]}>
                      Gestionar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Text style={[bodyStyle, { 
              color: colors.text, 
              fontFamily: FontWeights.bold,
              fontSize: FontSizes.lg,
              marginBottom: 15
            }]}>
              Acciones Rápidas
            </Text>
            
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                style={[styles.quickActionCard, { backgroundColor: colors.card }]}
                onPress={() => handleAction(action.action)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                  <action.icon width={24} height={24} color={action.color} />
                </View>
                <View style={styles.quickActionContent}>
                  <Text style={[bodyStyle, { 
                    color: colors.text, 
                    fontFamily: FontWeights.bold,
                    fontSize: FontSizes.md
                  }]}>
                    {action.title}
                  </Text>
                  <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                    {action.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
    marginTop: -30
  },
  backgroundShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  notificationButton: {
    padding: 8,
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
  policiesContainer: {
    marginBottom: 30,
  },
  policyCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
  policyDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: FontWeights.medium,
  },
  primaryActionButton: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryActionButtonText: {
    fontSize: 14,
    fontFamily: FontWeights.medium,
  },
  quickActionsContainer: {
    marginBottom: 30,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  quickActionContent: {
    flex: 1,
  },
});