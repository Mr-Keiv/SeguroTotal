import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { FontSizes, FontWeights } from '@/constants/Typography';
import { router } from 'expo-router';

// SVGs
import BackgroundShape from '@/assets/svg/login/background-shape.svg';
import ShapeInput from '@/assets/svg/login/inputShape.svg';
import GoogleIcon from '@/assets/svg/login/google.svg';
import FacebookIcon from '@/assets/svg/login/fb.svg';
import NextStepIcon from '@/assets/svg/login/accept.svg'; // Icono del botón "Siguiente paso" (puedes usar el de login si no tienes este)

const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const colors = useTheme();
  const [email, setEmail] = useState('');

  const titleStyle = useCustomTextStyle('h2', {
    color: colors.white,
    textAlign: 'center',
    fontSize: FontSizes['3xl'],
    fontFamily: FontWeights.bold,
  });

  const inputLabelStyle = useTextStyle('bodySmall');
  const orTextStyle = useTextStyle('bodySmall');
  const linkTextStyle = useTextStyle('button');

  const handleNextStep = () => {
    // Aquí deberías enviar el email y mostrar la pantalla de código
    if (!email) return alert('Ingresa tu correo');
    router.push('/forgot-code'); // o modal, o siguiente paso
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <View style={styles.headerContainer}>
        <Text style={titleStyle}>¿Olvidaste tu contraseña?</Text>
      </View>

      <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
        <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />

        <View style={styles.contentWrapper}>
          <View style={styles.inputGroup}>
            <Text style={[inputLabelStyle, { color: colors.text }]}>Correo electrónico</Text>
            <View style={styles.inputWrapper}>
              <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleNextStep} activeOpacity={0.8}>
            <NextStepIcon width={180} height={60} />
          </TouchableOpacity>

          <View style={styles.orSignInWithContainer}>
            <View style={styles.divider} />
            <Text style={[orTextStyle, { color: colors.textSecondary, marginHorizontal: 10 }]}>
              o ingresar con
            </Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialLoginContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: colors.border }]}
              onPress={() => console.log('Login with Facebook')}
            >
              <FacebookIcon width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: colors.border }]}
              onPress={() => console.log('Login with Google')}
            >
              <GoogleIcon width={24} height={24} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/onboarding')}>
            <Text style={[linkTextStyle, { color: colors.primary }]}>Volver al inicio de sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
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
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: 'center',
    zIndex: 1,
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
    fontSize: FontSizes.md,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  orSignInWithContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
