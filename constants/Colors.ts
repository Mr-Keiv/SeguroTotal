import { DarkTheme as NavigationDarkTheme, DefaultTheme } from '@react-navigation/native';

// Paleta de colores base (extraída de tu imagen)
export const ColorPalette = {
  // Verdes
  honeydew: '#F0F8E8',
  lightGreen: '#C8E6C9',
  caribbeanGreen: '#00C896',
  cyprus: '#0E3E3E',
  fenceGreen: '#052224',
  letter: '#093030',

  // Azules
  lightBlue: '#64B5F6',
  vividBlue: '#2196F3',
  oceanBlue: '#1976D2',

  // Neutros
  void: '#031314',
  white: '#F1FFF3',

  // Grises (para complementar)
  lightGray: '#F5F5F5',
  mediumGray: '#9E9E9E',
  darkGray: '#424242',
} as const;

// Tema claro
const LightThemeColors = {
  // Colores principales
  primary: ColorPalette.caribbeanGreen,
  secondary: ColorPalette.oceanBlue,
  white: ColorPalette.white,

  // Fondos
  background: ColorPalette.white,
  surface: ColorPalette.lightGray,
  card: ColorPalette.white,

  // Textos
  text: ColorPalette.void,
  textSecondary: ColorPalette.darkGray,
  textLight: ColorPalette.mediumGray,

  // Estados
  success: ColorPalette.caribbeanGreen,
  warning: ColorPalette.vividBlue,
  error: '#FF5252',
  info: ColorPalette.lightBlue,

  // Elementos UI
  border: ColorPalette.lightGreen,
  shadow: ColorPalette.darkGray,
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Navegación
  tabBackground: ColorPalette.lightGreen,
  tabActive: ColorPalette.caribbeanGreen,
  tabInactive: ColorPalette.mediumGray,

  // Botones
  buttonPrimary: ColorPalette.caribbeanGreen,
  buttonSecondary: ColorPalette.oceanBlue,
  buttonDisabled: ColorPalette.mediumGray,

  // Inputs
  inputBackground: ColorPalette.lightGray,
  inputBorder: ColorPalette.lightGreen,
  inputFocus: ColorPalette.caribbeanGreen,

  // Específicos de React Navigation
  notification: '#FF5252',
} as const;

// Tema oscuro
const DarkThemeColors = {
  // Colores principales
  primary: ColorPalette.caribbeanGreen,
  secondary: ColorPalette.lightBlue,
  white: ColorPalette.white,

  // Fondos
  background: ColorPalette.void,
  surface: ColorPalette.fenceGreen,
  card: ColorPalette.cyprus,

  // Textos
  text: ColorPalette.white,
  textSecondary: ColorPalette.lightGreen,
  textLight: ColorPalette.mediumGray,

  // Estados
  success: ColorPalette.lightGreen,
  warning: ColorPalette.lightBlue,
  error: '#FF6B6B',
  info: ColorPalette.vividBlue,

  // Elementos UI
  border: ColorPalette.cyprus,
  shadow: ColorPalette.void,
  overlay: 'rgba(0, 0, 0, 0.8)',

  // Navegación
  tabBackground: ColorPalette.cyprus,
  tabActive: ColorPalette.caribbeanGreen,
  tabInactive: ColorPalette.mediumGray,

  // Botones
  buttonPrimary: ColorPalette.caribbeanGreen,
  buttonSecondary: ColorPalette.lightBlue,
  buttonDisabled: ColorPalette.darkGray,

  // Inputs
  inputBackground: ColorPalette.cyprus,
  inputBorder: ColorPalette.fenceGreen,
  inputFocus: ColorPalette.caribbeanGreen,

  // Específicos de React Navigation
  notification: '#FF6B6B',
} as const;

// Temas de React Navigation
export const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    primary: LightThemeColors.primary,
    background: LightThemeColors.background,
    card: LightThemeColors.card,
    text: LightThemeColors.text,
    border: LightThemeColors.border,
    notification: LightThemeColors.notification,

    // Resto de colores personalizados
    secondary: LightThemeColors.secondary,
    surface: LightThemeColors.surface,
    textSecondary: LightThemeColors.textSecondary,
    textLight: LightThemeColors.textLight,
    success: LightThemeColors.success,
    warning: LightThemeColors.warning,
    error: LightThemeColors.error,
    info: LightThemeColors.info,
    shadow: LightThemeColors.shadow,
    overlay: LightThemeColors.overlay,
    tabBackground: LightThemeColors.tabBackground,
    tabActive: LightThemeColors.tabActive,
    tabInactive: LightThemeColors.tabInactive,
    buttonPrimary: LightThemeColors.buttonPrimary,
    buttonSecondary: LightThemeColors.buttonSecondary,
    buttonDisabled: LightThemeColors.buttonDisabled,
    inputBackground: LightThemeColors.inputBackground,
    inputBorder: LightThemeColors.inputBorder,
    inputFocus: LightThemeColors.inputFocus,
  },
};

export const MyDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    primary: DarkThemeColors.primary,
    background: DarkThemeColors.background,
    card: DarkThemeColors.card,
    text: DarkThemeColors.text,
    border: DarkThemeColors.border,
    notification: DarkThemeColors.notification,

    // Resto de colores personalizados
    secondary: DarkThemeColors.secondary,
    surface: DarkThemeColors.surface,
    textSecondary: DarkThemeColors.textSecondary,
    textLight: DarkThemeColors.textLight,
    success: DarkThemeColors.success,
    warning: DarkThemeColors.warning,
    error: DarkThemeColors.error,
    info: DarkThemeColors.info,
    shadow: DarkThemeColors.shadow,
    overlay: DarkThemeColors.overlay,
    tabBackground: DarkThemeColors.tabBackground,
    tabActive: DarkThemeColors.tabActive,
    tabInactive: DarkThemeColors.tabInactive,
    buttonPrimary: DarkThemeColors.buttonPrimary,
    buttonSecondary: DarkThemeColors.buttonSecondary,
    buttonDisabled: DarkThemeColors.buttonDisabled,
    inputBackground: DarkThemeColors.inputBackground,
    inputBorder: DarkThemeColors.inputBorder,
    inputFocus: DarkThemeColors.inputFocus,
  },
};

// Tipos para TypeScript
export type ThemeColors = typeof LightThemeColors;
export type ColorName = keyof ThemeColors;