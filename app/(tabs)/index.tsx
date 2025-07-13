import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView, // Keep this for the main scroll, will add another one
} from 'react-native';
// SVGs - Asume que tienes estos shapes


// Icons - Puedes usar los que ya tienes o crear nuevos
import NotificationIcon from '@/assets/svg/dashboard/notification.svg';
import CarIcon from '@/assets/svg/dashboard/cart.svg'; // Specific icon for car
import FlowerIcon from '@/assets/svg/dashboard/funerario.svg'; // Specific icon for funerary
import PolicyIcon from '@/assets/svg/dashboard/income.svg'; // Using fb.svg as a generic icon placeholder
import GiftIcon from '@/assets/svg/dashboard/expense.svg'; // Using fb.svg as a generic icon placeholder
import { FontSizes, FontWeights } from '@/constants/Typography';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const colors = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('Mensual');

  const titleStyle = useCustomTextStyle('h3', {
    color: colors.white,
    fontSize: FontSizes.lg,
    fontFamily: FontWeights.medium,
  });

  const balanceStyle = useCustomTextStyle('h4', {
    color: colors.white,
    fontFamily: FontWeights.bold,
  });

  const bodyStyle = useTextStyle('body');
  const smallTextStyle = useTextStyle('bodySmall');
  const captionTextStyle = useTextStyle('caption');


  // Information about insurance based on your files
  const insuranceServices = [
    {
      id: 1,
      title: 'Seguro de Vehículo',
      subtitle: 'RCV - Responsabilidad Civil',
      description: 'Protege tu vehículo y cumple con la normativa legal',
      amount: '$4,000.00',
      icon: CarIcon,
      color: '#2C5282',
      route: '/rcv/vehicle-data'
    },
    {
      id: 2,
      title: 'Seguro Funerario',
      subtitle: 'Planificación y tranquilidad',
      description: 'Asegura un último adiós digno para ti y tu familia',
      amount: '$50.00',
      icon: FlowerIcon,
      color: '#48BB78',
      route: '/funeral/insured-data'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Póliza RCV',
      description: 'Seguro vehicular activo',
      amount: '+$4,000.00',
      date: 'Monthly',
      icon: CarIcon,
      color: '#2C5282',
      isPositive: true
    },
    {
      id: 2,
      type: 'Seguro Funerario',
      description: 'Cobertura familiar',
      amount: '-$300.00',
      date: 'Monthly',
      icon: FlowerIcon,
      color: '#48BB78',
      isPositive: false
    },
    {
      id: 3,
      type: 'Póliza Hogar',
      description: 'Renovación anual',
      amount: '-$150.00',
      date: 'Monthly',
      icon: PolicyIcon,
      color: '#A0AEC0',
      isPositive: false
    },
    {
      id: 4,
      type: 'Bono Vacacional',
      description: 'Recompensa por fidelidad',
      amount: '+$100.00',
      date: 'Monthly',
      icon: GiftIcon,
      color: '#ED8936',
      isPositive: true
    },
    {
      id: 5,
      type: 'Pago de Cuota',
      description: 'Cuota de seguro de vida',
      amount: '-$80.00',
      date: 'Monthly',
      icon: PolicyIcon,
      color: '#5A67D8',
      isPositive: false
    },
    {
      id: 6,
      type: 'Servicio de Grua',
      description: 'Asistencia vehicular',
      amount: '-$25.00',
      date: 'Monthly',
      icon: CarIcon,
      color: '#2C5282',
      isPositive: false
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <View style={styles.header}>
        <View>
          <Text style={[titleStyle, { color: colors.white }]}>Hola Keiver,</Text>
          <Text style={[smallTextStyle, { color: colors.white, opacity: 0.8 }]}>
            Protege lo que más te importa
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <NotificationIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* Balance Card - Updated to match image */}
      <View style={[styles.balanceCard, { backgroundColor: colors.border }]}>
        <View style={styles.balanceContentUpdated}>
          <View style={styles.balanceTopRow}>
            {/* Total Balance */}
            <View style={styles.balanceItemUpdated}>
              <Text style={[smallTextStyle, { color: colors.white, opacity: 0.8 }]}>
                <PolicyIcon width={16} height={16} style={{ marginRight: 5 }} /> Total Balance
              </Text>
              <Text style={[balanceStyle, { color: colors.white }]}>$7,783.00</Text>
            </View>

            {/* Total Expense */}
            <View style={styles.balanceItemUpdated}>
              <Text style={[smallTextStyle, { color: colors.white, opacity: 0.8, flexDirection: 'row', alignItems: 'center' }]}>
                <GiftIcon width={16} height={16} style={{ marginRight: 5, alignSelf: 'center' }} /> Total Expense
              </Text>
              <Text style={[balanceStyle, { color: '#2C5282' }]}>-$1,187.40</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <Text style={[bodyStyle, { color: colors.white, marginRight: 10 }]}>30%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressBarFill, { width: '30%' }]}></View>
            </View>
            <Text style={[bodyStyle, { color: colors.white, marginLeft: 10 }]}>$20,000.00</Text>
          </View>
        </View>
      </View>

      <View style={[styles.homeContainer, { backgroundColor: colors.background }]}>

        <ScrollView
          style={styles.mainScrollContainer} // Main ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mainScrollContent}
        >
          {/* Insurance Service Cards */}
          <View style={styles.insuranceCardsContainer}>
            {insuranceServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[styles.insuranceCard, { backgroundColor: colors.card }]}
                onPress={() => router.push(service.route as any)}
              >
                <View style={[styles.insuranceIcon, { backgroundColor: service.color + '20' }]}>
                  <service.icon width={30} height={30} color={service.color} />
                </View>
                <Text style={[bodyStyle, styles.insuranceTitle, { color: colors.text, fontFamily: FontWeights.bold }]}>
                  {service.title}
                </Text>

                <Text style={[captionTextStyle, styles.insuranceDescription, { color: colors.textSecondary }]}>
                  {service.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.periodSelector}>
            {['Diario', 'Semanal', 'Mensual'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && { backgroundColor: colors.primary }
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text
                  style={[
                    smallTextStyle,
                    {
                      color: selectedPeriod === period ? colors.white : colors.textSecondary,
                      fontFamily: selectedPeriod === period ? FontWeights.medium : FontWeights.regular
                    }
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Payment History Table (inside its own ScrollView) */}
          <View style={styles.transactionsSection}>
            <Text style={[bodyStyle, { color: colors.text, fontFamily: FontWeights.bold, marginBottom: 10 }]}>
              Historial de pagos
            </Text>

            <ScrollView
              style={styles.transactionsScroll} // New ScrollView for transactions
              showsVerticalScrollIndicator={true} // Show scroll indicator for this
              nestedScrollEnabled={true} // Enable nested scrolling if needed
            >
              {recentActivities.map((activity) => (
                <TouchableOpacity key={activity.id} style={[styles.transactionItem, { backgroundColor: colors.card }]}>
                  <View style={styles.transactionContent}>
                    <View style={[styles.transactionIcon, { backgroundColor: activity.color + '20' }]}>
                      <activity.icon width={20} height={20} color={activity.color} />
                    </View>
                    <View style={styles.transactionInfo}>
                      <Text style={[bodyStyle, { color: colors.text, fontFamily: FontWeights.medium }]}>
                        {activity.type}
                      </Text>
                      <Text style={[smallTextStyle, { color: colors.textSecondary }]}>
                        {activity.description}
                      </Text>
                    </View>
                    <View style={styles.transactionAmount}>
                      <Text style={[
                        bodyStyle,
                        {
                          color: activity.isPositive ? '#10B981' : colors.text,
                          fontFamily: FontWeights.bold
                        }
                      ]}>
                        {activity.amount}
                      </Text>
                      <Text style={[smallTextStyle, { color: colors.textSecondary, marginTop: 2 }]}>
                        {activity.date}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  homeContainer: {
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
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: 'center',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  notificationButton: {
    padding: 8,
  },
  balanceCard: {
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 20,
    height: 150, // Adjusted height to accommodate new layout
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center', // Center content vertically
  },
  balanceBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  balanceContentUpdated: { // New style for the updated content
    flex: 1,
    padding: 20,
    justifyContent: 'space-around', // Distribute space between rows
    zIndex: 1,
  },
  balanceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space out the two items
    marginBottom: 15,
  },
  balanceItemUpdated: {
    alignItems: 'center', // Center text within each item
    flex: 1, // Take equal space
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#0E3E3E', // Lighter white for the empty part
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white', // White for the filled part
    borderRadius: 5,
  },
  messageContainerUpdated: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the message
  },
  // Main ScrollView styles
  mainScrollContainer: { // New style for the main ScrollView
    flex: 1,
  },
  mainScrollContent: { // Content style for the main ScrollView
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  // Insurance service cards container
  insuranceCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 15, // Space between cards
  },
  insuranceCard: {
    flex: 1,
    borderRadius: 15,
    padding: 15,
    alignItems: 'flex-start',
    // Enhanced styling for "fancier" look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // More pronounced shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android
    height: 180, // Giving it a fixed height for consistency
    justifyContent: 'space-between', // Distribute content nicely
  },
  insuranceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  insuranceTitle: {
    marginBottom: 5,
  },
  insuranceDescription: {
    fontSize: 12,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFC',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  transactionsSection: {
    marginBottom: 20,
    // Add a flex or height if you want the ScrollView inside to have a specific height
    // For example, if you want it to take remaining space: flex: 1,
    // Or a fixed height: height: 300,
  },
  transactionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  transactionHeader: {
    fontFamily: FontWeights.medium,
  },
  transactionsScroll: { // New style for the inner ScrollView
    maxHeight: 250, // Set a max height for the scrollable table
    marginBottom: 60,
  },
  transactionItem: {
    borderRadius: 15,
    marginTop: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    zIndex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  givebackCard: {
    backgroundColor: '#2C5282',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  givebackIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(246, 224, 94, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  givebackContent: {
    flex: 1,
  },
  givebackTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  givebackSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E2E8F0',
  },
});