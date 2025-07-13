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
import EyeOpenIcon from '@/assets/svg/login/eyes-on.svg';
import EyeCloseIcon from '@/assets/svg/login/eyes-close.svg';
import ConfirmIcon from '@/assets/svg/login/accept.svg'; // Icono para confirmar (puedes usar Login.svg si no tienes este)

const { width } = Dimensions.get('window');

export default function ForgotCodeScreen() {
  const colors = useTheme();

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const titleStyle = useCustomTextStyle('h2', {
    color: colors.white,
    textAlign: 'center',
    fontSize: FontSizes['3xl'],
    fontFamily: FontWeights.bold,
  });

  const inputLabelStyle = useTextStyle('bodySmall');
  const linkTextStyle = useTextStyle('button');

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí va la lógica para validar el código y actualizar contraseña
    router.push('/login'); // redirige luego del éxito
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>
      <View style={styles.headerContainer}>
        <Text style={titleStyle}>Verifica tu código</Text>
      </View>

      <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
        <BackgroundShape style={styles.backgroundShape} width={width} height="100%" />

        <View style={styles.contentWrapper}>
          {/* Código */}
          <View style={styles.inputGroup}>
            <Text style={[inputLabelStyle, { color: colors.text }]}>Código recibido</Text>
            <View style={styles.inputWrapper}>
              <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="123456"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                value={code}
                onChangeText={setCode}
              />
            </View>
          </View>

          {/* Nueva contraseña */}
          <View style={styles.inputGroup}>
            <Text style={[inputLabelStyle, { color: colors.text }]}>Nueva contraseña</Text>
            <View style={styles.passwordInputWrapper}>
              <ShapeInput style={styles.shapeInputBackground} width="100%" height="100%" />
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.passwordInput, { color: colors.text }]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry={!showPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
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

          {/* Botón Confirmar */}
          <TouchableOpacity style={styles.loginButton} onPress={handleResetPassword} activeOpacity={0.8}>
            <ConfirmIcon width={180} height={60} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')} style={{ marginTop: 20 }}>
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
});
