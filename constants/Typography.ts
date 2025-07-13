import { TextStyle } from 'react-native';

// Pesos de fuente Poppins (basado en tu imagen)
export const FontWeights = {
  thin: 'Poppins-Thin',
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

// Tamaños de fuente base
export const FontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
  '6xl': 48,
} as const;

// Alturas de línea
export const LineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

// Espaciado de letras
export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;

// Estilos de texto predefinidos
export const TextStyles = {
  // Títulos
  h1: {
    fontFamily: FontWeights.bold,
    fontSize: FontSizes['5xl'],
    lineHeight: FontSizes['5xl'] * LineHeights.tight,
    letterSpacing: LetterSpacing.tight,
  } as TextStyle,
  
  h2: {
    fontFamily: FontWeights.bold,
    fontSize: FontSizes['4xl'],
    lineHeight: FontSizes['4xl'] * LineHeights.tight,
    letterSpacing: LetterSpacing.tight,
  } as TextStyle,
  
  h3: {
    fontFamily: FontWeights.semiBold,
    fontSize: FontSizes['3xl'],
    lineHeight: FontSizes['3xl'] * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  h4: {
    fontFamily: FontWeights.semiBold,
    fontSize: FontSizes['2xl'],
    lineHeight: FontSizes['2xl'] * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  h5: {
    fontFamily: FontWeights.medium,
    fontSize: FontSizes.xl,
    lineHeight: FontSizes.xl * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  h6: {
    fontFamily: FontWeights.medium,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  // Cuerpo de texto
  body: {
    fontFamily: FontWeights.regular,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * LineHeights.relaxed,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  bodyLarge: {
    fontFamily: FontWeights.regular,
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * LineHeights.relaxed,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  bodySmall: {
    fontFamily: FontWeights.regular,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  // Subtítulos
  subtitle1: {
    fontFamily: FontWeights.medium,
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  subtitle2: {
    fontFamily: FontWeights.medium,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  // Texto de interfaz
  button: {
    fontFamily: FontWeights.semiBold,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * LineHeights.tight,
    letterSpacing: LetterSpacing.wide,
    textTransform: 'uppercase',
  } as TextStyle,
  
  caption: {
    fontFamily: FontWeights.regular,
    fontSize: FontSizes.xs,
    lineHeight: FontSizes.xs * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  overline: {
    fontFamily: FontWeights.medium,
    fontSize: FontSizes.xs,
    lineHeight: FontSizes.xs * LineHeights.normal,
    letterSpacing: LetterSpacing.wider,
    textTransform: 'uppercase',
  } as TextStyle,
  
  // Texto especial
  label: {
    fontFamily: FontWeights.medium,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * LineHeights.normal,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  input: {
    fontFamily: FontWeights.regular,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * LineHeights.tight,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  placeholder: {
    fontFamily: FontWeights.light,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * LineHeights.tight,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  // Texto de navegación
  tabLabel: {
    fontFamily: FontWeights.medium,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * LineHeights.tight,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  
  headerTitle: {
    fontFamily: FontWeights.semiBold,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * LineHeights.tight,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
} as const;

// Tipos para TypeScript
export type FontWeight = keyof typeof FontWeights;
export type FontSize = keyof typeof FontSizes;
export type TextStyleName = keyof typeof TextStyles;