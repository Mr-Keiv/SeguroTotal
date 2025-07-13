import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { MyLightTheme, MyDarkTheme } from '@/constants/Colors';
import { FontWeights } from '@/constants/Typography';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    [FontWeights.thin]: require('@/assets/fonts/Poppins-Thin.ttf'),
    [FontWeights.light]: require('@/assets/fonts/Poppins-Light.ttf'),
    [FontWeights.regular]: require('@/assets/fonts/Poppins-Regular.ttf'),
    [FontWeights.medium]: require('@/assets/fonts/Poppins-Medium.ttf'),
    [FontWeights.semiBold]: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    [FontWeights.bold]: require('@/assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  //        <ThemeProvider value={colorScheme === 'dark' ? MyDarkTheme : MyLightTheme}>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: MyLightTheme.colors.primary
          }}
          edges={['top']}
        >
          <ThemeProvider value={MyLightTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="register" />
              <Stack.Screen name="login" />
              <Stack.Screen name="forgot" />
              <Stack.Screen name="forgot-code" />
              <Stack.Screen name='onboarding.tsx' />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="rcv/vehicle-data" />
              <Stack.Screen name="rcv/driver-data" />
              <Stack.Screen name="rcv/comparison" />
              <Stack.Screen name="funeral/insured-data" />
              <Stack.Screen name="funeral/preferences" />
              <Stack.Screen name="funeral/comparison" />
              <Stack.Screen name="policy/details" />
              <Stack.Screen name="policy/review" />
              <Stack.Screen name="policy/payment" />
              <Stack.Screen name="policy/confirmation" />
              <Stack.Screen name="policy/view-details" />
              <Stack.Screen name="policy/manage" />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar
              style="auto"
              backgroundColor={Platform.OS === 'android' ? 'white' : 'transparent'}
              translucent={true}
            />

          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
