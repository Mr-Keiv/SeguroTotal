import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import { FontWeights } from '@/constants/Typography';
import ArrowLeftSVG from '@/assets/svg/dashboard/back.svg';
import { Heart, Users, TreePine, UtensilsCrossed } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const impactData = {
  totalDonated: 'Bs. 125.000.000',
  projectsSupported: 15,
  beneficiaries: 3250,
};

const causes = [
  {
    id: 1,
    name: 'Fundación Niños del Futuro',
    description: 'Educación y alimentación para niños en vulnerabilidad',
    icon: <Heart size={24} color="#2C5282" />,
    color: '#2C5282',
    votes: 1250,
    image: 'https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    name: 'Hogar de Ancianos San José',
    description: 'Cuidado y atención médica para adultos mayores',
    icon: <Users size={24} color="#48BB78" />,
    color: '#48BB78',
    votes: 890,
    image: 'https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    name: 'Reforestación Valle Verde',
    description: 'Conservación ambiental y siembra de árboles',
    icon: <TreePine size={24} color="#38A169" />,
    color: '#38A169',
    votes: 756,
    image: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 4,
    name: 'Comedores Comunitarios',
    description: 'Seguridad alimentaria para familias necesitadas',
    icon: <UtensilsCrossed size={24} color="#E53E3E" />,
    color: '#E53E3E',
    votes: 623,
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const successStories = [
  {
    id: 1,
    title: 'Construcción de Aulas Escolares',
    description: 'Gracias a las donaciones, se construyeron 3 aulas en la escuela rural La Esperanza, beneficiando a 150 niños.',
    image: 'https://images.pexels.com/photos/1187105/pexels-photo-1187105.jpeg?auto=compress&cs=tinysrgb&w=400',
    amount: 'Bs. 25.000.000',
  },
  {
    id: 2,
    title: 'Equipamiento Médico',
    description: 'Se adquirieron equipos médicos para el hogar de ancianos, mejorando la calidad de vida de 80 adultos mayores.',
    image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400',
    amount: 'Bs. 18.000.000',
  },
];

export default function GivebackScreen() {
  const [selectedCause, setSelectedCause] = React.useState<number | null>(null);
  const [showMessageBox, setShowMessageBox] = React.useState(false);
  const [messageBoxText, setMessageBoxText] = React.useState('');

  const colors = useTheme();

  const titleStyle = useCustomTextStyle('h4', {
    color: colors.text,
    fontFamily: FontWeights.bold,
  });
  const bodyStyle = useTextStyle('bodySmall');
  const smallTextStyle = useTextStyle('caption');
  const labelStyle = useCustomTextStyle('body', {
    color: colors.text,
    fontFamily: FontWeights.semiBold,
  });
  const buttonTextStyle = useCustomTextStyle('body', {
    color: colors.white,
    fontFamily: FontWeights.semiBold,
  });

  const handleVote = (causeId: number) => {
    setSelectedCause(causeId);
    setMessageBoxText('¡Gracias por tu voto! Tu participación nos ayuda a apoyar las causas más importantes para nuestra comunidad.');
    setShowMessageBox(true);
  };

  const closeMessageBox = () => {
    setShowMessageBox(false);
    setMessageBoxText('');
  };

  const handleMoreInfo = () => {
    setMessageBoxText('Para más información sobre nuestros programas de responsabilidad social, contáctanos a través de nuestros canales oficiales.');
    setShowMessageBox(true);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.fixedHeader}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeftSVG width={24} height={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={titleStyle}>Giveback Social</Text>
          </View>
        </View>

        <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            
            <View style={styles.heroSection}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800' }}
                style={styles.heroImage}
              />
              <View style={styles.heroContent}>
                <Text style={[styles.heroTitle, { color: colors.primary }]}>Tu póliza, nuestro impacto</Text>
                <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
                  Cada prima que pagas contribuye al bienestar de nuestra comunidad venezolana
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Nuestro Impacto</Text>
              <View style={styles.statsContainer}>
                <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                  <Text style={[styles.statNumber, { color: colors.primary }]}>{impactData.totalDonated}</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Donado</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                  <Text style={[styles.statNumber, { color: colors.primary }]}>{impactData.projectsSupported}</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Proyectos Apoyados</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                  <Text style={[styles.statNumber, { color: colors.primary }]}>{impactData.beneficiaries}</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Beneficiarios</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Vota por una Causa</Text>
              <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                Ayúdanos a decidir qué proyectos apoyar con tu voto
              </Text>
              
              <View style={styles.causesContainer}>
                {causes.map((cause) => (
                  <TouchableOpacity
                    key={cause.id}
                    style={[
                      styles.causeCard,
                      { backgroundColor: colors.card, borderColor: colors.border },
                      selectedCause === cause.id && { backgroundColor: '#48BB78', borderColor: '#38A169' }
                    ]}
                    onPress={() => handleVote(cause.id)}
                  >
                    <Image source={{ uri: cause.image }} style={styles.causeImage} />
                    <View style={styles.causeContent}>
                      <View style={styles.causeHeader}>
                        <View style={[styles.causeIcon, { backgroundColor: cause.color + '20' }]}>
                          {cause.icon}
                        </View>
                        <View style={styles.causeInfo}>
                          <Text style={[
                            styles.causeName,
                            { color: selectedCause === cause.id ? colors.white : colors.text }
                          ]}>
                            {cause.name}
                          </Text>
                          <Text style={[
                            styles.causeDescription,
                            { color: selectedCause === cause.id ? colors.white : colors.textSecondary }
                          ]}>
                            {cause.description}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.voteInfo}>
                        <Text style={[
                          styles.voteCount,
                          { color: selectedCause === cause.id ? colors.white : colors.textSecondary }
                        ]}>
                          {cause.votes} votos
                        </Text>
                        <View style={[styles.voteButton, { backgroundColor: '#48BB78' }]}>
                          <Heart size={16} color="#FFFFFF" />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Historias de Éxito</Text>
              <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                Conoce cómo tus aportes han transformado vidas en Venezuela
              </Text>
              
              <View style={styles.storiesContainer}>
                {successStories.map((story) => (
                  <View key={story.id} style={[styles.storyCard, { backgroundColor: colors.card }]}>
                    <Image source={{ uri: story.image }} style={styles.storyImage} />
                    <View style={styles.storyContent}>
                      <Text style={[styles.storyTitle, { color: colors.text }]}>{story.title}</Text>
                      <Text style={[styles.storyDescription, { color: colors.textSecondary }]}>
                        {story.description}
                      </Text>
                      <View style={styles.storyAmount}>
                        <Text style={[styles.amountText, { color: colors.primary }]}>
                          Inversión: {story.amount}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.actionSection, { backgroundColor: colors.primary }]}>
              <Text style={[styles.actionTitle, { color: colors.white }]}>¿Quieres saber más?</Text>
              <Text style={[styles.actionSubtitle, { color: colors.white }]}>
                Descubre cómo puedes contribuir aún más a nuestra causa social
              </Text>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: colors.secondary }]}
                onPress={handleMoreInfo}
              >
                <Text style={[styles.actionButtonText, { color: colors.white }]}>Más Información</Text>
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
  safeArea: { flex: 1 },
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
  heroSection: {
    marginBottom: 30,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  causesContainer: {
    gap: 15,
  },
  causeCard: {
    borderRadius: 15,
    padding: 15,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  causeImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
  },
  causeContent: {
    gap: 10,
  },
  causeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  causeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  causeInfo: {
    flex: 1,
  },
  causeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  causeDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  voteInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voteCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  voteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storiesContainer: {
    gap: 20,
  },
  storyCard: {
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  storyImage: {
    width: '100%',
    height: 150,
  },
  storyContent: {
    padding: 20,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storyDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  storyAmount: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionSection: {
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  actionButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
});