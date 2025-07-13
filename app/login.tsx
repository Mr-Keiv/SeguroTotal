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

import Login from '@/assets/svg/login/login.svg';

// Importa tus SVGs
import GoogleIcon from '@/assets/svg/login/google.svg';
import FacebookIcon from '@/assets/svg/login/fb.svg';
import EyeOpenIcon from '@/assets/svg/login/eyes-on.svg';
import EyeCloseIcon from '@/assets/svg/login/eyes-close.svg';
import BackgroundShape from '@/assets/svg/login/background-shape.svg';
import ShapeInput from '@/assets/svg/login/inputShape.svg'; // Importar ShapeInput

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const colors = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Estilos de texto personalizados
  const welcomeTextStyle = useCustomTextStyle('h2', {
    color: colors.white,
    textAlign: 'center',
    fontSize: FontSizes['3xl'],
    fontFamily: FontWeights.bold,
  });

  const inputLabelStyle = useTextStyle('bodySmall');
  const linkTextStyle = useTextStyle('button');
  const orTextStyle = useTextStyle('bodySmall');

  const handleLogin = () => {
    router.push('/(tabs)')
  };

  const handleForgotPassword = () => {
    router.push('/forgot'); // Assuming a signup route

  };

  const handleSignUp = () => {
    router.push('/register'); // Assuming a signup route
  };


  const handleGoogleLogin = () => {
    router.push('/(tabs)')

  };

  const handleFacebookLogin = () => {
    router.push('/(tabs)')

  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <View style={styles.headerContainer}>
        <Text style={welcomeTextStyle}>Hola de nuevo</Text>
      </View>

      <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
        <BackgroundShape
          style={styles.backgroundShape}
          width={width}
          height="100%"
        />

        <View style={styles.contentWrapper}>
          <View style={styles.inputGroup}>
            <Text style={[inputLabelStyle, { color: colors.text }]}>Usuario o Correo</Text>
            <View style={styles.inputWrapper}>
              <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="example@example.com"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[inputLabelStyle, { color: colors.text }]}>Contraseña</Text>
            <View style={styles.passwordInputWrapper}>
              <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.passwordInput, { color: colors.text }]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  {showPassword ? (
                    <EyeOpenIcon width={24} height={24} />
                  ) : (
                    <EyeCloseIcon width={24} height={24} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Login />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
            <Text style={[linkTextStyle, { color: colors.textSecondary, marginTop: 20 }]}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <View style={styles.orSignInWithContainer}>
            <View style={styles.divider} />
            <Text style={[orTextStyle, { color: colors.textSecondary, marginHorizontal: 10 }]}>o iniciar con</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={[styles.socialButton, { borderColor: colors.border }]} onPress={handleFacebookLogin}>
              <FacebookIcon width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { borderColor: colors.border }]} onPress={handleGoogleLogin}>
              <GoogleIcon width={24} height={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.signUpPrompt}>
            <Text style={[orTextStyle, { color: colors.textSecondary }]}>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={[linkTextStyle, { color: colors.primary }]}>Registrate</Text>
            </TouchableOpacity>
          </View>
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
    flex: 0.2,
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
  inputWrapper: { // Nuevo estilo para el envoltorio del input normal
    position: 'relative',
    width: '100%',
    height: 50, // Misma altura que el input
    marginTop: 8,
    justifyContent: 'center', // Centra el TextInput verticalmente
  },
  passwordInputWrapper: { // Nuevo estilo para el envoltorio del input de contraseña
    position: 'relative',
    width: '100%',
    height: 50, // Misma altura que el input
    marginTop: 8,
    justifyContent: 'center', // Centra el TextInput verticalmente
  },
  shapeInputBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0, // Detrás del TextInput
  },
  input: {
    width: '100%',
    height: '100%', // Ocupa toda la altura del wrapper
    paddingHorizontal: 15,
    fontSize: FontSizes.md,
    backgroundColor: 'transparent', // Fondo transparente para ver el SVG
    zIndex: 1, // Encima del SVG
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%', // Ocupa toda la altura del wrapper
    paddingHorizontal: 15,
    backgroundColor: 'transparent', // Fondo transparente para ver el SVG
    zIndex: 1, // Encima del SVG
  },
  passwordInput: {
    flex: 1,
    fontSize: FontSizes.md,
    backgroundColor: 'transparent', // Fondo transparente para ver el SVG
  },
  eyeIcon: {
    paddingLeft: 10,
    zIndex: 2, // Asegura que el icono esté por encima de todo
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  forgotPasswordButton: {
    marginBottom: 50,
  },
  signUpButton: {
    width: '100%',
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  fingerprintAccess: {
    marginBottom: 30,
  },
  orSignInWithContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
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
  signUpPrompt: {
    flexDirection: 'row',
    marginTop: 10,
  },
});