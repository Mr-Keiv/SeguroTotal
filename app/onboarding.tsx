import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import Login from '@/assets/svg/login/login.svg';
import SignUP from '@/assets/svg/login/signup.svg';
import { FontSizes, FontWeights } from '@/constants/Typography';
import { router } from 'expo-router';


export default function WelcomeScreen() {
    const colors = useTheme();

    // Tipografías personalizadas
    const titleStyle = useTextStyle('h1');
    const bodyStyle = useTextStyle('body');

    const customSubtitleStyle = useCustomTextStyle('subtitle1', {
        color: colors.text,
        textAlign: 'center',
        fontSize: FontSizes.base,
    });

    const forgotPasswordStyle = useCustomTextStyle('body', {
        fontFamily: FontWeights.semiBold,
        color: colors.text,
        fontSize: FontSizes.base,
    });

    const handleLogin = () => {
        router.push('/login');

    };

    const handleSignUp = () => {
        router.push('/register')
    };

    const handleForgotPassword = () => {
        router.push('/forgot')
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/logo-bg.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    {/* Nombre de la App */}
                    <Text style={[styles.appName, titleStyle, { color: colors.primary }]}>
                       Seguro Total
                    </Text>

                    {/* Eslogan */}
                    <Text style={[styles.slogan, bodyStyle, customSubtitleStyle]}>
                        Tu vida asegurada, tu impacto amplificado.
                    </Text>
                </View>

                {/* Contenedor de Botones */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Login />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <SignUP />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={{ bottom: 100 }} onPress={handleForgotPassword}>
                    <Text style={forgotPasswordStyle}>¿Olvidaste tu contraseña?</Text>

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * 0.12,
    },
    logoImage: {
        width: 160,
        height: 160,
        marginBottom: 10,
    },
    appName: {
        fontSize: 42,
        fontWeight: 'bold',
        marginTop: 10,
        letterSpacing: -1,
    },
    slogan: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 20,
        paddingHorizontal: 30,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height * 0.2,
    },
    button: {
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgotPasswordText: {
        fontSize: 14,
        marginTop: 10,
    },
});
