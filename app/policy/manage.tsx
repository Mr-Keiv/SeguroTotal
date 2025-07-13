import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Switch,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Car, Flower, Settings, CreditCard, Calendar, TriangleAlert as AlertTriangle, User, Phone, Mail, CreditCard as Edit, Trash2, Plus, Save, X, AlertCircle } from 'lucide-react-native';
import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import { FontSizes, FontWeights } from '@/constants/Typography';
import ArrowLeftSVG from '@/assets/svg/dashboard/back.svg';
import BackgroundShape from '@/assets/svg/login/background-shape.svg';
import ShapeInput from '@/assets/svg/login/inputShape.svg';

const { width } = Dimensions.get('window');

// Mock data para las pólizas
const mockPolicies = {
  '1': {
    id: '1',
    type: 'RCV',
    policyNumber: 'RCV-2024-001234',
    company: 'Seguros ABC',
    status: 'Activa',
    premium: 140000,
    paymentMethod: 'Tarjeta de Crédito ****1234',
    paymentFrequency: 'Mensual',
    autoRenewal: true,
    notifications: {
      email: true,
      sms: true,
      push: true
    }
  },
  '2': {
    id: '2',
    type: 'Funerario',
    policyNumber: 'FUN-2024-005678',
    company: 'Funeraria La Paz',
    status: 'Activa',
    premium: 85000,
    paymentMethod: 'Débito Automático',
    paymentFrequency: 'Mensual',
    autoRenewal: true,
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  }
};

interface ModalConfig {
  visible: boolean;
  title: string;
  message: string;
  type: 'info' | 'confirm' | 'success' | 'error';
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function PolicyManageScreen() {
  const { policyId } = useLocalSearchParams();
  const policy = mockPolicies[policyId as keyof typeof mockPolicies];
  const colors = useTheme();

  const [notifications, setNotifications] = useState(policy?.notifications || {
    email: true,
    sms: true,
    push: true
  });
  const [autoRenewal, setAutoRenewal] = useState(policy?.autoRenewal || true);
  const [editingBeneficiary, setEditingBeneficiary] = useState(false);
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: '',
    relationship: '',
    percentage: ''
  });

  const [modal, setModal] = useState<ModalConfig>({
    visible: false,
    title: '',
    message: '',
    type: 'info'
  });

  // Estilos de texto personalizados
  const titleStyle = useCustomTextStyle('h2', {
    color: colors.text,
    fontSize: FontSizes.xl,
    fontFamily: FontWeights.bold,
  });

  const bodyStyle = useTextStyle('body');
  const smallTextStyle = useTextStyle('bodySmall');
  const captionTextStyle = useTextStyle('caption');

  if (!policy) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.fixedHeader}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <ArrowLeftSVG width={24} height={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={titleStyle}>Gestionar Póliza</Text>
            </View>
          </View>

          <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
            <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />
            <View style={styles.errorContainer}>
              <AlertTriangle size={60} color={colors.error} />
              <Text style={[styles.errorTitle, { color: colors.error, fontFamily: FontWeights.bold }]}>Póliza no encontrada</Text>
              <TouchableOpacity 
                style={[styles.primaryActionButton, { backgroundColor: colors.primary, width: '80%', marginTop: 20 }]}
                onPress={() => router.back()}
              >
                <Text style={[styles.primaryActionButtonText, { color: colors.white }]}>Volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const showModal = (config: Partial<ModalConfig>) => {
    setModal({
      visible: true,
      title: '',
      message: '',
      type: 'info',
      ...config
    });
  };

  const hideModal = () => {
    setModal({ ...modal, visible: false });
  };

  const handleChangePaymentMethod = () => {
    showModal({
      type: 'confirm',
      title: 'Cambiar Método de Pago',
      message: 'Serás redirigido a una página segura para actualizar tu método de pago',
      confirmText: 'Continuar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        hideModal();
        setTimeout(() => {
          showModal({
            type: 'success',
            title: 'Redirigiendo',
            message: 'Redirigiendo para cambiar método de pago...'
          });
        }, 300);
      }
    });
  };

  const handleChangePaymentFrequency = () => {
    showModal({
      type: 'confirm',
      title: 'Cambiar Frecuencia de Pago',
      message: 'Selecciona la nueva frecuencia de pago',
      confirmText: 'Mensual',
      cancelText: 'Cancelar',
      onConfirm: () => {
        hideModal();
        setTimeout(() => {
          showModal({
            type: 'success',
            title: 'Actualizado',
            message: 'Frecuencia cambiada a Mensual.'
          });
        }, 300);
      }
    });
  };

  const handleReportClaim = () => {
    showModal({
      type: 'confirm',
      title: 'Reportar Siniestro',
      message: policy.type === 'RCV' 
        ? '¿Has tenido un accidente o incidente con tu vehículo?'
        : '¿Necesitas hacer uso del seguro funerario?',
      confirmText: 'Reportar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        hideModal();
        setTimeout(() => {
          showModal({
            type: 'success',
            title: 'Reportado',
            message: 'Siniestro reportado. Un agente se pondrá en contacto.'
          });
        }, 300);
      }
    });
  };

  const handleCancelPolicy = () => {
    showModal({
      type: 'confirm',
      title: 'Cancelar Póliza',
      message: '¿Estás seguro de que deseas cancelar esta póliza? Esta acción no se puede deshacer.',
      confirmText: 'Sí, cancelar',
      cancelText: 'No, mantener póliza',
      onConfirm: () => {
        hideModal();
        setTimeout(() => {
          showModal({
            type: 'success',
            title: 'Cancelado',
            message: 'Póliza cancelada exitosamente.'
          });
        }, 300);
      }
    });
  };

  const handleUpdateLastWish = () => {
    showModal({
      type: 'info',
      title: 'Redirigiendo',
      message: 'Redirigiendo para actualizar tu último deseo.'
    });
    setTimeout(() => {
      router.push('/funeral/preferences');
    }, 1500);
  };

  const handleAddBeneficiary = () => {
    if (!newBeneficiary.name || !newBeneficiary.relationship || !newBeneficiary.percentage) {
      showModal({
        type: 'error',
        title: 'Error',
        message: 'Por favor completa todos los campos del beneficiario'
      });
      return;
    }
    showModal({
      type: 'success',
      title: 'Agregado',
      message: 'Beneficiario agregado correctamente.'
    });
    setNewBeneficiary({ name: '', relationship: '', percentage: '' });
    setEditingBeneficiary(false);
  };

  const handleSaveNotifications = () => {
    showModal({
      type: 'success',
      title: 'Guardado',
      message: 'Preferencias de notificación actualizadas.'
    });
  };

  const renderModal = () => {
    const getModalColor = () => {
      switch (modal.type) {
        case 'success': return colors.success;
        case 'error': return colors.error;
        case 'confirm': return colors.primary;
        default: return colors.primary;
      }
    };

    const getModalIcon = () => {
      switch (modal.type) {
        case 'success': return <Settings size={40} color={colors.success} />;
        case 'error': return <AlertTriangle size={40} color={colors.error} />;
        case 'confirm': return <AlertCircle size={40} color={colors.primary} />;
        default: return <Settings size={40} color={colors.primary} />;
      }
    };

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal.visible}
        onRequestClose={hideModal}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {getModalIcon()}
            {modal.title && (
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {modal.title}
              </Text>
            )}
            <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
              {modal.message}
            </Text>
            
            <View style={styles.modalButtons}>
              {modal.type === 'confirm' ? (
                <>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton, { borderColor: colors.border }]}
                    onPress={modal.onCancel || hideModal}
                  >
                    <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>
                      {modal.cancelText || 'Cancelar'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton, { backgroundColor: getModalColor() }]}
                    onPress={modal.onConfirm || hideModal}
                  >
                    <Text style={[styles.confirmButtonText, { color: colors.white }]}>
                      {modal.confirmText || 'Confirmar'}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton, { backgroundColor: getModalColor() }]}
                  onPress={hideModal}
                >
                  <Text style={[styles.confirmButtonText, { color: colors.white }]}>
                    OK
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.fixedHeader}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeftSVG width={24} height={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={titleStyle}>Gestionar Póliza</Text>
          </View>
        </View>

        <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
          <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />


          <ScrollView style={styles.scrollContent}>
                      
          <View style={styles.illustrationFixed}>
            <Settings size={60} color={colors.primary} />
            <Text style={[bodyStyle, styles.illustrationText, { color: colors.textSecondary }]}>
              Administra tu póliza, configura notificaciones y gestiona beneficiarios
            </Text>
          </View>
            {/* Header de la póliza */}
            <View style={[styles.policyCard, { backgroundColor: colors.card, marginBottom: 30 }]}>
              <View style={styles.policyHeader}>
                <View style={[styles.policyIconContainer, { backgroundColor: (policy.type === 'RCV' ? colors.primary : colors.success) + '20' }]}>
                  {policy.type === 'RCV' ? (
                    <Car size={28} color={colors.primary} />
                  ) : (
                    <Flower size={28} color={colors.success} />
                  )}
                </View>
                <View style={styles.policyInfo}>
                  <Text style={[bodyStyle, { 
                    color: colors.text, 
                    fontFamily: FontWeights.bold,
                    fontSize: FontSizes.md
                  }]}>
                    {policy.type === 'RCV' ? 'Seguro de Vehículo' : 'Seguro Funerario'}
                  </Text>
                  <Text style={[smallTextStyle, { color: colors.textSecondary }]}>{policy.company}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={[smallTextStyle, { color: colors.textSecondary }]}>Número de Póliza:</Text>
                <Text style={[smallTextStyle, { color: colors.text, fontFamily: FontWeights.medium }]}>{policy.policyNumber}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[smallTextStyle, { color: colors.textSecondary }]}>Estado:</Text>
                <Text style={[smallTextStyle, { color: colors.success, fontFamily: FontWeights.medium }]}>{policy.status}</Text>
              </View>
            </View>

            {/* Información de pago */}
            <View style={styles.section}>
              <Text style={[bodyStyle, { 
                color: colors.text, 
                fontFamily: FontWeights.bold,
                fontSize: FontSizes.lg,
                marginBottom: 15
              }]}>Información de Pago</Text>
              <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                <View style={styles.detailRow}>
                  <Text style={[smallTextStyle, { color: colors.textSecondary }]}>Prima {policy.paymentFrequency}</Text>
                  <Text style={[smallTextStyle, { color: colors.text, fontFamily: FontWeights.medium }]}>{formatCurrency(policy.premium)}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={[smallTextStyle, { color: colors.textSecondary }]}>Método de Pago</Text>
                  <View style={styles.paymentMethodRow}>
                    <Text style={[smallTextStyle, { color: colors.text, fontFamily: FontWeights.medium, marginRight: 10 }]}>{policy.paymentMethod}</Text>
                    <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.background }]} onPress={handleChangePaymentMethod}>
                      <Edit size={16} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Text style={[smallTextStyle, { color: colors.textSecondary }]}>Frecuencia</Text>
                  <View style={styles.paymentMethodRow}>
                    <Text style={[smallTextStyle, { color: colors.text, fontFamily: FontWeights.medium, marginRight: 10 }]}>{policy.paymentFrequency}</Text>
                    <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.background }]} onPress={handleChangePaymentFrequency}>
                      <Edit size={16} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.switchRow}>
                  <Text style={[smallTextStyle, { color: colors.text }]}>Renovación Automática</Text>
                  <Switch
                    value={autoRenewal}
                    onValueChange={setAutoRenewal}
                    trackColor={{ false: colors.border, true: colors.success }}
                    thumbColor={colors.white}
                  />
                </View>
              </View>
            </View>

            {/* Notificaciones */}
            <View style={styles.section}>
              <Text style={[bodyStyle, { 
                color: colors.text, 
                fontFamily: FontWeights.bold,
                fontSize: FontSizes.lg,
                marginBottom: 15
              }]}>Notificaciones</Text>
              <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                <View style={styles.switchRow}>
                  <View style={styles.notificationInfo}>
                    <Text style={[smallTextStyle, { color: colors.text }]}>Email</Text>
                    <Text style={[captionTextStyle, { color: colors.textSecondary }]}>Recibir notificaciones por correo</Text>
                  </View>
                  <Switch
                    value={notifications.email}
                    onValueChange={(value) => setNotifications({...notifications, email: value})}
                    trackColor={{ false: colors.border, true: colors.success }}
                    thumbColor={colors.white}
                  />
                </View>

                <View style={styles.switchRow}>
                  <View style={styles.notificationInfo}>
                    <Text style={[smallTextStyle, { color: colors.text }]}>SMS</Text>
                    <Text style={[captionTextStyle, { color: colors.textSecondary }]}>Recibir notificaciones por mensaje</Text>
                  </View>
                  <Switch
                    value={notifications.sms}
                    onValueChange={(value) => setNotifications({...notifications, sms: value})}
                    trackColor={{ false: colors.border, true: colors.success }}
                    thumbColor={colors.white}
                  />
                </View>

                <View style={styles.switchRow}>
                  <View style={styles.notificationInfo}>
                    <Text style={[smallTextStyle, { color: colors.text }]}>Push</Text>
                    <Text style={[captionTextStyle, { color: colors.textSecondary }]}>Notificaciones en la app</Text>
                  </View>
                  <Switch
                    value={notifications.push}
                    onValueChange={(value) => setNotifications({...notifications, push: value})}
                    trackColor={{ false: colors.border, true: colors.success }}
                    thumbColor={colors.white}
                  />
                </View>

                <TouchableOpacity 
                  style={[styles.primaryActionButton, { backgroundColor: colors.primary, marginTop: 10, width: '100%' }]} 
                  onPress={handleSaveNotifications}
                >
                  <Text style={[styles.primaryActionButtonText, { color: colors.white }]}>Guardar Preferencias</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Acciones específicas por tipo de póliza */}
            <View style={styles.section}>
              <Text style={[bodyStyle, { 
                color: colors.text, 
                fontFamily: FontWeights.bold,
                fontSize: FontSizes.lg,
                marginBottom: 15
              }]}>Acciones Rápidas</Text>
              
              <TouchableOpacity 
                style={[styles.quickActionCard, { backgroundColor: colors.card, marginBottom: 10 }]} 
                onPress={handleReportClaim}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: colors.error + '20' }]}>
                  <AlertTriangle size={24} color={colors.error} />
                </View>
                <View style={styles.quickActionContent}>
                  <Text style={[bodyStyle, { 
                    color: colors.text, 
                    fontFamily: FontWeights.bold,
                    fontSize: FontSizes.md
                  }]}>
                    {policy.type === 'RCV' ? 'Reportar Siniestro' : 'Activar Seguro Funerario'}
                  </Text>
                  <Text style={[smallTextStyle, { color: colors.textSecondary }]}>Informa un accidente o evento</Text>
                </View>
              </TouchableOpacity>

              {policy.type === 'Funerario' && (
                <TouchableOpacity 
                  style={[styles.quickActionCard, { backgroundColor: colors.card, marginBottom: 10 }]} 
                  onPress={handleUpdateLastWish}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: colors.success + '20' }]}>
                    <Flower size={24} color={colors.success} />
                  </View>
                  <View style={styles.quickActionContent}>
                    <Text style={[bodyStyle, { 
                      color: colors.text, 
                      fontFamily: FontWeights.bold,
                      fontSize: FontSizes.md
                    }]}>Actualizar Mi Último Deseo</Text>
                    <Text style={[smallTextStyle, { color: colors.textSecondary }]}>Modifica tus preferencias funerarias</Text>
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity 
                style={[styles.quickActionCard, { backgroundColor: colors.card, marginBottom: 10 }]}
                onPress={() => router.push(`/policy/view-details?policyId=${policy.id}`)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: colors.primary + '20' }]}>
                  <Settings size={24} color={colors.primary} />
                </View>
                <View style={styles.quickActionContent}>
                  <Text style={[bodyStyle, { 
                    color: colors.text, 
                    fontFamily: FontWeights.bold,
                    fontSize: FontSizes.md
                  }]}>Ver Detalles Completos</Text>
                  <Text style={[smallTextStyle, { color: colors.textSecondary }]}>Información detallada de tu póliza</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Gestión de beneficiarios (solo para Funerario) */}
            {policy.type === 'Funerario' && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={[bodyStyle, { 
                    color: colors.text, 
                    fontFamily: FontWeights.bold,
                    fontSize: FontSizes.lg
                  }]}>Beneficiarios</Text>
                  <TouchableOpacity 
                    style={[styles.addButton, { backgroundColor: colors.primary }]}
                    onPress={() => setEditingBeneficiary(true)}
                  >
                    <Plus size={16} color={colors.white} />
                    <Text style={[smallTextStyle, { color: colors.white, fontFamily: FontWeights.semiBold }]}>Agregar</Text>
                  </TouchableOpacity>
                </View>

                {editingBeneficiary && (
                  <View style={[styles.formCard, { backgroundColor: colors.card }]}>
                    <Text style={[bodyStyle, { 
                      color: colors.text, 
                      fontFamily: FontWeights.bold,
                      fontSize: FontSizes.md,
                      marginBottom: 15
                    }]}>Nuevo Beneficiario</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={[smallTextStyle, { color: colors.text, fontFamily: FontWeights.medium }]}>Nombre completo</Text>
                      <View style={styles.inputWrapper}>
                        <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
                        <TextInput
                          style={[styles.input, { color: colors.text }]}
                          placeholder="Nombre completo"
                          placeholderTextColor={colors.textSecondary}
                          value={newBeneficiary.name}
                          onChangeText={(text) => setNewBeneficiary({...newBeneficiary, name: text})}
                        />
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={[smallTextStyle, { color: colors.text, fontFamily: FontWeights.medium }]}>Parentesco</Text>
                      <View style={styles.inputWrapper}>
                        <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
                        <TextInput
                          style={[styles.input, { color: colors.text }]}
                          placeholder="Parentesco (ej: Cónyuge, Hijo/a)"
                          placeholderTextColor={colors.textSecondary}
                          value={newBeneficiary.relationship}
                          onChangeText={(text) => setNewBeneficiary({...newBeneficiary, relationship: text})}
                        />
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={[smallTextStyle, { color: colors.text, fontFamily: FontWeights.medium }]}>Porcentaje</Text>
                      <View style={styles.inputWrapper}>
                        <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
                        <TextInput
                          style={[styles.input, { color: colors.text }]}
                          placeholder="Porcentaje (ej: 50)"
                          placeholderTextColor={colors.textSecondary}
                          keyboardType="numeric"
                          value={newBeneficiary.percentage}
                          onChangeText={(text) => setNewBeneficiary({...newBeneficiary, percentage: text})}
                        />
                      </View>
                    </View>

                    <View style={[styles.modalButtons, { marginTop: 15 }]}>
                      <TouchableOpacity 
                        style={[styles.actionButton, { flex: 1, borderColor: colors.error }]}
                        onPress={() => {
                          setEditingBeneficiary(false);
                          setNewBeneficiary({ name: '', relationship: '', percentage: '' });
                        }}
                      >
                        <Text style={[styles.actionButtonText, { color: colors.error }]}>Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.primaryActionButton, { flex: 1, backgroundColor: colors.primary }]} 
                        onPress={handleAddBeneficiary}
                      >
                        <Text style={[styles.primaryActionButtonText, { color: colors.white }]}>Guardar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View style={[styles.infoCard, { backgroundColor: colors.card, paddingVertical: 15 }]}>
                  <Text style={[captionTextStyle, { color: colors.textSecondary, textAlign: 'center', fontStyle: 'italic' }]}>
                    Los beneficiarios actuales pueden ser modificados contactando a nuestro servicio al cliente.
                  </Text>
                </View>
              </View>
            )}

            {/* Zona de peligro */}
            <View style={styles.emergencySection}>
              <AlertCircle size={40} color="#E53E3E" />
              <Text style={[styles.emergencyTitle, { color: colors.text }]}>¿Estás seguro?</Text>
              <Text style={[styles.emergencyDescription, { color: colors.textSecondary }]}>
                La cancelación de la póliza es permanente y puede tener implicaciones legales y financieras.
              </Text>
              <TouchableOpacity 
                style={styles.emergencyButton}
                onPress={handleCancelPolicy}
              >
                <Text style={styles.emergencyButtonText}>Cancelar Póliza</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {renderModal()}
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
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -30
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    height: 50,
    marginTop: 8,
    justifyContent: 'center',
  },
  shapeInputBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 13,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  helpContainer: {
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  helpText: {
    textAlign: 'center',
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  messageBox: { // Renombrado a modalView en el renderModal
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
  messageBoxButton: { // Renombrado a modalButton
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  // Estilos de PoliciesScreen replicados
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: FontSizes.lg,
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
  },
  section: {
    marginBottom: 25,
  },
  infoCard: {
    borderRadius: 12, 
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
  },
  notificationInfo: {
    flex: 1,
    marginRight: 10,
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 12,
  },
  primaryActionButtonText: {
    fontSize: 14,
    fontFamily: FontWeights.medium,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 5,
  },
  formCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    borderWidth: 1.5,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: FontWeights.medium,
  },
  // Estilos del modal (anteriormente messageBox)
  modalView: {
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
  modalTitle: {
    fontSize: FontSizes.lg,
    fontFamily: FontWeights.bold,
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: FontSizes.md,
    fontFamily: FontWeights.regular,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    gap: 10, // Espacio entre botones
  },
  modalButton: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButton: {
    // backgroundColor: definido dinámicamente por getModalColor()
  },
  confirmButtonText: {
    fontSize: 14,
    fontFamily: FontWeights.medium,
  },
  cancelButton: {
    borderWidth: 1.5,
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: FontWeights.medium,
  },
  // Estilos de la zona de peligro
  emergencySection: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1.5,
    alignItems: 'center',
    backgroundColor: '#FFF0F0', // Un fondo suave para la zona de peligro
    borderColor: '#E53E3E', // Un borde que destaque
  },
  emergencyTitle: {
    fontSize: FontSizes.lg,
    fontFamily: FontWeights.bold,
    marginTop: 15,
    color: '#E53E3E', // Color de texto de peligro
  },
  emergencyDescription: {
    fontSize: FontSizes.md,
    fontFamily: FontWeights.regular,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
    color: '#718096', // Color de texto secundario para descripción
  },
  emergencyButton: {
    backgroundColor: '#E53E3E', // Color de botón de peligro
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    width: '100%',
  },
  emergencyButtonText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
    fontFamily: FontWeights.medium,
  },
});