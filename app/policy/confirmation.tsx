import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, FileText, Chrome as Home, Download, Share } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useTextStyle } from '@/hooks/useTheme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ConfirmationScreen() {
  const colors = useTheme();
  
  const handleViewPolicy = () => {
    router.push('/(tabs)/policies');
  };

  const handleGoToDashboard = () => {
    router.push('/(tabs)');
  };

  const mockConfirmationData = {
    policyNumber: 'POL-2024-001234',
    amount: 140000,
    startDate: '15/01/2024',
    nextPayment: '15/02/2024',
    company: 'Seguros ABC',
    type: 'Seguro RCV Completo'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const h1Style = useTextStyle('h1');
  const h3Style = useTextStyle('h3');
  const h4Style = useTextStyle('h4');
  const h5Style = useTextStyle('h5');
  const bodyStyle = useTextStyle('body');
  const bodyLargeStyle = useTextStyle('bodyLarge');
  const bodySmallStyle = useTextStyle('bodySmall');
  const subtitle1Style = useTextStyle('subtitle1');
  const subtitle2Style = useTextStyle('subtitle2');
  const buttonStyle = useTextStyle('button');
  const labelStyle = useTextStyle('label');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Section with Gradient Effect */}
        <View style={[styles.heroSection, { backgroundColor: colors.primary }]}>
          <View style={styles.celebrationContainer}>
            {/* Floating Confetti */}
            <View style={styles.confettiBackground}>
              {['🎉', '✨', '🎊', '🌟', '💫', '🎈', '🍾', '🎁'].map((emoji, index) => (
                <Text 
                  key={index} 
                  style={[
                    styles.confetti, 
                    { 
                      top: Math.random() * 200,
                      left: Math.random() * (screenWidth - 40),
                      transform: [{ rotate: `${Math.random() * 360}deg` }]
                    }
                  ]}
                >
                  {emoji}
                </Text>
              ))}
            </View>
            
            {/* Animated Checkmark */}
            <View style={[styles.checkmarkContainer, { backgroundColor: colors.success }]}>
              <View style={styles.checkmarkInner}>
                <Check size={48} color={colors.white} strokeWidth={4} />
              </View>
            </View>
            
            <Text style={[h1Style, styles.congratsTitle, { color: colors.white }]}>
              ¡Felicidades!
            </Text>
            <Text style={[h5Style, styles.congratsSubtitle, { color: colors.white }]}>
              Tu póliza ha sido activada exitosamente
            </Text>
          </View>
        </View>

        {/* Main Content Card */}
        <View style={[styles.mainContent, { backgroundColor: colors.background }]}>
          
          {/* Success Image */}
          <View style={styles.successImageContainer}>
            <View style={styles.imageWrapper}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.celebrationImage}
              />
              <View style={[styles.imageOverlay, { backgroundColor: colors.overlay }]} />
            </View>
          </View>

          {/* Policy Card */}
          <View style={[styles.policyCard, { backgroundColor: colors.surface }]}>
            <View style={styles.policyHeader}>
              <View style={styles.policyBadge}>
                <Text style={[subtitle1Style, { color: colors.white }]}>ACTIVA</Text>
              </View>
              <Text style={[h4Style, styles.policyTitle, { color: colors.text }]}>
                {mockConfirmationData.type}
              </Text>
              <Text style={[subtitle2Style, { color: colors.textSecondary }]}>
                {mockConfirmationData.company}
              </Text>
            </View>
            
            <View style={styles.policyDetails}>
              {[
                { label: 'Número de Póliza', value: mockConfirmationData.policyNumber },
                { label: 'Prima Mensual', value: formatCurrency(mockConfirmationData.amount) },
                { label: 'Fecha de Inicio', value: mockConfirmationData.startDate },
                { label: 'Próximo Pago', value: mockConfirmationData.nextPayment }
              ].map((item, index) => (
                <View key={index} style={styles.detailRow}>
                  <Text style={[labelStyle, { color: colors.textSecondary }]}>{item.label}</Text>
                  <Text style={[subtitle2Style, { color: colors.text }]}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Next Steps */}
          <View style={styles.nextStepsSection}>
            <Text style={[h3Style, styles.sectionTitle, { color: colors.text }]}>
              ¿Qué sigue ahora?
            </Text>
            
            {[
              {
                title: 'Documentos Enviados',
                description: 'Hemos enviado tu póliza y documentos a tu correo electrónico',
                icon: '📧'
              },
              {
                title: 'Cobertura Activa',
                description: 'Tu seguro está activo desde hoy y puedes usarlo inmediatamente',
                icon: '🛡️'
              },
              {
                title: 'Gestiona tu Póliza',
                description: 'Accede a "Mis Pólizas" para gestionar tu seguro y reportar siniestros',
                icon: '📱'
              }
            ].map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepIcon}>
                  <Text style={styles.stepEmoji}>{step.icon}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[subtitle1Style, { color: colors.text }]}>{step.title}</Text>
                  <Text style={[bodyStyle, { color: colors.textSecondary }]}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <Text style={[h5Style, styles.sectionTitle, { color: colors.text }]}>
              Acciones Rápidas
            </Text>
            
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.surface }]}>
                <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                  <Download size={24} color={colors.white} />
                </View>
                <Text style={[labelStyle, { color: colors.text }]}>Descargar{'\n'}Póliza</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.surface }]}>
                <View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}>
                  <Share size={24} color={colors.white} />
                </View>
                <Text style={[labelStyle, { color: colors.text }]}>Compartir{'\n'}Detalles</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Support Section */}
          <View style={[styles.supportSection, { backgroundColor: colors.surface }]}>
            <Text style={[h5Style, { color: colors.text }]}>¿Necesitas ayuda?</Text>
            <Text style={[bodyStyle, { color: colors.textSecondary }]}>
              Nuestro equipo está disponible 24/7 para cualquier consulta
            </Text>
            <TouchableOpacity style={[styles.supportButton, { backgroundColor: colors.warning }]}>
              <Text style={[buttonStyle, { color: colors.text }]}>Contactar Soporte</Text>
            </TouchableOpacity>
          </View>

          {/* Main Actions */}
          <View style={styles.mainActions}>
            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: colors.primary }]}
              onPress={handleViewPolicy}
            >
              <FileText size={20} color={colors.primary} />
              <Text style={[subtitle1Style, { color: colors.primary }]}>Ver Mi Póliza</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.success }]}
              onPress={handleGoToDashboard}
            >
              <Home size={20} color={colors.white} />
              <Text style={[subtitle1Style, { color: colors.white }]}>Ir al Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    paddingTop: 40,
    paddingBottom: 60,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  celebrationContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  confettiBackground: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 200,
  },
  confetti: {
    position: 'absolute',
    fontSize: 28,
    opacity: 0.8,
  },
  checkmarkContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  checkmarkInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  congratsSubtitle: {
    textAlign: 'center',
    opacity: 0.9,
  },
  mainContent: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  successImageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  celebrationImage: {
    width: screenWidth * 0.8,
    height: 160,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  policyCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  policyHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  policyBadge: {
    backgroundColor: '#48BB78',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  policyTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  policyDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  nextStepsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepEmoji: {
    fontSize: 24,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  supportSection: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  supportButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 16,
  },
  mainActions: {
    gap: 16,
    marginBottom: 32,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    gap: 12,
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
});