import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Linking,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import { FontWeights } from '@/constants/Typography';
import ArrowLeftSVG from '@/assets/svg/dashboard/back.svg';
import { Phone, Mail, MessageCircle, FileText, HelpCircle, ChevronRight, Clock, AlertCircle } from 'lucide-react-native';

const helpTopics = [
  {
    id: 1,
    title: '¿Cómo cotizar un seguro?',
    description: 'Aprende a usar nuestra plataforma paso a paso',
    icon: HelpCircle,
  },
  {
    id: 2,
    title: 'Tipos de seguros disponibles',
    description: 'Conoce nuestros productos: RCV y Funerario',
    icon: FileText,
  },
  {
    id: 3,
    title: 'Proceso de pago',
    description: 'Métodos de pago aceptados y facturación',
    icon: FileText,
  },
  {
    id: 4,
    title: 'Gestión de pólizas',
    description: 'Cómo administrar tus seguros contratados',
    icon: FileText,
  },
  {
    id: 5,
    title: 'Reportar siniestros',
    description: 'Qué hacer en caso de accidente o daño',
    icon: AlertCircle,
  },
  {
    id: 6,
    title: 'Giveback Social',
    description: 'Cómo funciona nuestro programa de impacto social',
    icon: HelpCircle,
  },
];

export default function HelpScreen() {
  const colors = useTheme();
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageBoxText, setMessageBoxText] = useState('');

  const titleStyle = useCustomTextStyle('h4', {
    color: colors.text,
    fontFamily: FontWeights.bold,
  });
  const bodyStyle = useTextStyle('bodySmall');
  const labelStyle = useCustomTextStyle('body', {
    color: colors.text,
    fontFamily: FontWeights.semiBold,
  });
  const buttonTextStyle = useCustomTextStyle('body', {
    color: colors.white,
    fontFamily: FontWeights.semiBold,
  });

  const handleContactPress = (type: string) => {
    switch (type) {
      case 'phone':
        Linking.openURL('tel:+573001234567');
        break;
      case 'email':
        Linking.openURL('mailto:soporte@segurototal.com');
        break;
      case 'chat':
        setMessageBoxText('El chat en vivo estará disponible próximamente.');
        setShowMessageBox(true);
        break;
    }
  };

  const handleTopicPress = (topic: any) => {
    setMessageBoxText(`Información sobre: ${topic.title}`);
    setShowMessageBox(true);
  };

  const closeMessageBox = () => {
    setShowMessageBox(false);
    setMessageBoxText('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.fixedHeader}>
          <View style={[styles.header, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={titleStyle}>Centro de Ayuda</Text>
          </View>
        </View>

        <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.illustrationContainer}>
              <HelpCircle size={80} color="#48BB78" />
              <Text style={[styles.illustrationText, { color: colors.textSecondary }]}>
                Estamos aquí para ayudarte
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Contacto Directo</Text>
              
              <TouchableOpacity 
                style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => handleContactPress('phone')}
              >
                <View style={[styles.contactIcon, { backgroundColor: colors.background }]}>
                  <Phone size={24} color="#48BB78" />
                </View>
                <View style={styles.contactContent}>
                  <Text style={[styles.contactTitle, { color: colors.text }]}>Llámanos</Text>
                  <Text style={[styles.contactDescription, { color: colors.primary }]}>+58 212 123 4567</Text>
                  <Text style={[styles.contactTime, { color: colors.textSecondary }]}>Lun - Vie: 8:00 AM - 6:00 PM</Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => handleContactPress('email')}
              >
                <View style={[styles.contactIcon, { backgroundColor: colors.background }]}>
                  <Mail size={24} color="#48BB78" />
                </View>
                <View style={styles.contactContent}>
                  <Text style={[styles.contactTitle, { color: colors.text }]}>Escríbenos</Text>
                  <Text style={[styles.contactDescription, { color: colors.primary }]}>soporte@segurototal.com</Text>
                  <Text style={[styles.contactTime, { color: colors.textSecondary }]}>Respuesta en 24 horas</Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => handleContactPress('chat')}
              >
                <View style={[styles.contactIcon, { backgroundColor: colors.background }]}>
                  <MessageCircle size={24} color="#48BB78" />
                </View>
                <View style={styles.contactContent}>
                  <Text style={[styles.contactTitle, { color: colors.text }]}>Chat en Vivo</Text>
                  <Text style={[styles.contactDescription, { color: colors.primary }]}>Asistencia inmediata</Text>
                  <Text style={[styles.contactTime, { color: colors.textSecondary }]}>Disponible 24/7</Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Preguntas Frecuentes</Text>
              
              {helpTopics.map((topic) => (
                <TouchableOpacity 
                  key={topic.id}
                  style={[styles.faqCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleTopicPress(topic)}
                >
                  <View style={[styles.faqIcon, { backgroundColor: colors.background }]}>
                    <topic.icon size={20} color="#48BB78" />
                  </View>
                  <View style={styles.faqContent}>
                    <Text style={[styles.faqTitle, { color: colors.text }]}>{topic.title}</Text>
                    <Text style={[styles.faqDescription, { color: colors.textSecondary }]}>{topic.description}</Text>
                  </View>
                  <ChevronRight size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recursos Adicionales</Text>
              
              <TouchableOpacity 
                style={[styles.resourceCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => {
                  setMessageBoxText('La documentación legal estará disponible próximamente.');
                  setShowMessageBox(true);
                }}
              >
                <View style={[styles.resourceIcon, { backgroundColor: colors.background }]}>
                  <FileText size={24} color="#48BB78" />
                </View>
                <View style={styles.resourceContent}>
                  <Text style={[styles.resourceTitle, { color: colors.text }]}>Documentación Legal</Text>
                  <Text style={[styles.resourceDescription, { color: colors.textSecondary }]}>
                    Términos, condiciones y políticas de privacidad
                  </Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.emergencySection}>
              <AlertCircle size={40} color="#E53E3E" />
              <Text style={[styles.emergencyTitle, { color: colors.text }]}>¿Emergencia?</Text>
              <Text style={[styles.emergencyDescription, { color: colors.textSecondary }]}>
                Si necesitas reportar un siniestro urgente, puedes hacerlo desde la sección "Mis Pólizas"
              </Text>
              <TouchableOpacity 
                style={styles.emergencyButton}
                onPress={() => {
                  setMessageBoxText('Serás redirigido a la sección de reportar siniestros.');
                  setShowMessageBox(true);
                }}
              >
                <Text style={styles.emergencyButtonText}>Reportar Siniestro</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <Modal animationType="fade" transparent={true} visible={showMessageBox} onRequestClose={closeMessageBox}>
          <View style={styles.centeredView}>
            <View style={[styles.messageBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[bodyStyle, { color: colors.text, marginBottom: 20, textAlign: 'center' }]}>
                {messageBoxText}
              </Text>
              <TouchableOpacity style={[styles.messageBoxButton, { backgroundColor: colors.primary }]} onPress={closeMessageBox}>
                <Text style={[buttonTextStyle, { color: colors.white }]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1,
    marginBottom: -40,
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
  loginContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  illustrationText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    marginBottom: 2,
  },
  contactTime: {
    fontSize: 12,
  },
  faqCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  faqIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  faqContent: {
    flex: 1,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  faqDescription: {
    fontSize: 14,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  resourceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
  },
  emergencySection: {
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 80,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  emergencyDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  emergencyButton: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  messageBox: {
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
  messageBoxButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
})