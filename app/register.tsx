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
import RegisterIcon from '@/assets/svg/login/register.svg';
import GoogleIcon from '@/assets/svg/login/google.svg';
import FacebookIcon from '@/assets/svg/login/fb.svg';
import EyeOpenIcon from '@/assets/svg/login/eyes-on.svg';
import EyeCloseIcon from '@/assets/svg/login/eyes-close.svg';
import BackgroundShape from '@/assets/svg/login/background-shape.svg';
import ShapeInput from '@/assets/svg/login/inputShape.svg';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const colors = useTheme();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const titleStyle = useCustomTextStyle('h2', {
    color: colors.white,
    textAlign: 'center',
    fontSize: FontSizes['3xl'],
    fontFamily: FontWeights.bold,
  });

  const captioStyle = useTextStyle('caption')

  const inputLabelStyle = useTextStyle('bodySmall');
  const orTextStyle = useTextStyle('bodySmall');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    router.push('/(tabs)');
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <View style={styles.headerContainer}>
        <Text style={titleStyle}>Crea tu cuenta</Text>
      </View>

      <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
        <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />

        <View style={styles.contentWrapper}>
          {/* Nombre */}
          <View style={styles.inputGroup}>
            <Text style={[inputLabelStyle, { color: colors.text }]}>Nombre</Text>
            <View style={styles.inputWrapper}>
              <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Tu nombre"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Teléfono */}
          <View style={styles.inputGroup}>
            <Text style={[inputLabelStyle, { color: colors.text }]}>Teléfono</Text>
            <View style={styles.inputWrapper}>
              <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="0414-1234567"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          {/* Fecha de nacimiento */}
          <View style={styles.inputGroup}>
            <Text style={[inputLabelStyle, { color: colors.text }]}>Fecha de nacimiento</Text>
            <View style={styles.inputWrapper}>
              <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                value={birthDate}
                onChangeText={setBirthDate}
              />
            </View>
          </View>

          {/* Contraseña */}
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
                  {showPassword ? <EyeOpenIcon width={24} height={24} /> : <EyeCloseIcon width={24} height={24} />}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Confirmar contraseña */}
          <View style={styles.inputGroup}>
            <Text style={[inputLabelStyle, { color: colors.text }]}>Confirmar contraseña</Text>
            <View style={styles.passwordInputWrapper}>
              <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.passwordInput, { color: colors.text }]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  {showConfirmPassword ? (
                    <EyeOpenIcon width={24} height={24} />
                  ) : (
                    <EyeCloseIcon width={24} height={24} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={[captioStyle, { marginBottom: -10, color: colors.textSecondary, width: 200, textAlign: 'center', alignSelf: 'center' }]}>
            Al continuar, aceptas los Términos de uso y la Política de privacidad.
          </Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleRegister} activeOpacity={0.8}>
            <RegisterIcon />
          </TouchableOpacity>

          <View style={styles.orSignInWithContainer}>
            <View style={styles.divider} />
            <Text style={[orTextStyle, { color: colors.textSecondary, marginHorizontal: 10 }]}>
              o registrarse con
            </Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialLoginContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: colors.border }]}
              onPress={() => console.log('Register with Facebook')}
            >
              <FacebookIcon width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: colors.border }]}
              onPress={() => console.log('Register with Google')}
            >
              <GoogleIcon width={24} height={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.signUpPrompt}>
            <Text style={[captioStyle, { color: colors.textSecondary }]}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={handleLoginRedirect}>
              <Text style={[captioStyle, { color: colors.primary }]}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Usa los mismos estilos que ya tienes definidos para login
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
    paddingTop: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    height: 40,
    marginTop: 8,
    justifyContent: 'center',
  },
  passwordInputWrapper: {
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  passwordInput: {
    flex: 1,
    fontSize: FontSizes.md,
    backgroundColor: 'transparent',
  },
  eyeIcon: {
    paddingLeft: 10,
    zIndex: 2,
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
    marginTop: 10,
    marginBottom: 10,
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
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  signUpPrompt: {
    flexDirection: 'row',
    marginTop: -15,
  },
});
