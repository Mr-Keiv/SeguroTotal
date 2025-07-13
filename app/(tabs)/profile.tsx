import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Appearance, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, useTextStyle, useColorScheme, useCustomTextStyle } from '@/hooks/useTheme';
import { FontWeights } from '@/constants/Typography';
import { router } from 'expo-router';
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
  Sun,
  Moon,
  Gift
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const colors = useTheme();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Estilos de texto consistentes con las otras pantallas
  const titleStyle = useCustomTextStyle('h4', {
    color: colors.text,
    fontFamily: FontWeights.bold,
  });
  const bodyStyle = useTextStyle('body');
  const smallTextStyle = useTextStyle('caption');
  const labelStyle = useCustomTextStyle('body', {
    color: colors.text,
    fontFamily: FontWeights.semiBold,
  });

  // Actualizar el estado cuando cambie el esquema de color del sistema
  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  // Función para cambiar el tema
  const toggleTheme = (value: boolean) => {
    setIsDarkMode(value);
    Appearance.setColorScheme(value ? 'dark' : 'light');
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Aquí puedes agregar lógica para limpiar datos de sesión
    // Por ejemplo: AsyncStorage.removeItem('userToken');
    router.replace('/login'); // o la ruta que uses para login
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary }]}>
      <View style={styles.fixedHeader}>
        <View style={styles.header}>
          <Text style={titleStyle}>Mi Perfil</Text>
        </View>
      </View>

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Profile Card */}
          <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
            <View style={styles.profileHeader}>
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <User size={32} color={colors.background} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: colors.text }]}>
                  Keiver Pacheco
                </Text>
                <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
                  keiver.pacheco@example.com
                </Text>
              </View>
            </View>
          </View>

          {/* Theme Switch Card */}
          {/*           <View style={[styles.themeCard, { backgroundColor: colors.card }]}>
            <View style={styles.themeHeader}>
              <View style={[styles.themeIconContainer, { backgroundColor: colors.primary }]}>
                {isDarkMode ? (
                  <Moon size={20} color={colors.background} />
                ) : (
                  <Sun size={20} color={colors.background} />
                )}
              </View>
              <View style={styles.themeInfo}>
                <Text style={[styles.themeTitle, { color: colors.text }]}>
                  {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
                </Text>
                <Text style={[styles.themeSubtitle, { color: colors.textSecondary }]}>
                  {isDarkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ 
                  false: '#E2E8F0', 
                  true: '#48BB78' 
                }}
                thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E2E8F0"
              />
            </View>
          </View> */}

          {/* Configuraciones */}
          <View style={styles.section}>
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: '#4299E1' }]}>
                    <Settings size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={[styles.menuItemTitle, { color: colors.text }]}>
                      Configuración
                    </Text>
                    <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                      Preferencias de la app
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: '#ED8936' }]}>
                    <Bell size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={[styles.menuItemTitle, { color: colors.text }]}>
                      Notificaciones
                    </Text>
                    <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                      Gestionar notificaciones
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: '#48BB78' }]}>
                    <Shield size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={[styles.menuItemTitle, { color: colors.text }]}>
                      Privacidad
                    </Text>
                    <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                      Configuración de privacidad
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Sección Giveback Social y Ayuda */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.menuItem, { backgroundColor: colors.card }]}
              onPress={() => router.push('/giveback')}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: '#E53E3E' }]}>
                    <Gift size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={[styles.menuItemTitle, { color: colors.text }]}>
                      Giveback Social
                    </Text>
                    <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                      Programa de beneficios
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, { backgroundColor: colors.card }]}
              onPress={() => router.push('/(tabs)/help')}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: '#805AD5' }]}>
                    <HelpCircle size={20} color="#FFFFFF" />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={[styles.menuItemTitle, { color: colors.text }]}>
                      Centro de Ayuda
                    </Text>
                    <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                      Obtener ayuda y soporte
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Términos y Políticas */}
          <View style={styles.section}>
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <Text style={styles.menuIconText}>📄</Text>
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={[styles.menuItemTitle, { color: colors.text }]}>
                      Términos y Condiciones
                    </Text>
                    <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                      Términos de uso
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <Text style={styles.menuIconText}>🔒</Text>
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={[styles.menuItemTitle, { color: colors.text }]}>
                      Política de Privacidad
                    </Text>
                    <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                      Protección de datos
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Cerrar Sesión */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.logoutButton, { backgroundColor: colors.card }]}
              onPress={handleLogout}
            >
              <LogOut size={20} color="#E53E3E" />
              <Text style={[styles.logoutText, { color: '#E53E3E' }]}>
                Cerrar Sesión
              </Text>
            </TouchableOpacity>
          </View>

          {/* Información de Versión */}
          <View style={styles.versionInfo}>
            <Text style={[styles.versionText, { color: colors.textSecondary }]}>
              Seguro Total v1.0.0
            </Text>
          </View>
        </ScrollView>
      </View>

      {/* Modal de Confirmación de Logout */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutModal}
        onRequestClose={cancelLogout}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <View style={[styles.modalIcon, { backgroundColor: '#FED7D7' }]}>
                <LogOut size={24} color="#E53E3E" />
              </View>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Cerrar Sesión
              </Text>
              <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
                ¿Estás seguro de que quieres cerrar sesión? Tendrás que volver a iniciar sesión para acceder a tu cuenta.
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.inputBackground }]}
                onPress={cancelLogout}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmLogout}
              >
                <Text style={styles.confirmButtonText}>
                  Cerrar Sesión
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  profileCard: {
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
  },
  themeCard: {
    marginBottom: 30,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  themeInfo: {
    flex: 1,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  themeSubtitle: {
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  menuItem: {
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIconText: {
    fontSize: 20,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  versionInfo: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    width: width * 0.85,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  confirmButton: {
    backgroundColor: '#E53E3E',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});