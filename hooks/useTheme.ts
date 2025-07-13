import { useTheme as useNavigationTheme } from '@react-navigation/native';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { ThemeColors, ColorName } from '@/constants/Colors';
import { TextStyles, TextStyleName } from '@/constants/Typography';

// Hook personalizado para obtener el tema actual
export function useTheme() {
  const theme = useNavigationTheme();
  return theme.colors as ThemeColors;
}

// Hook para obtener el esquema de color actual
export function useColorScheme(): 'light' | 'dark' {
  const scheme = useRNColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}

// Hook para obtener un color específico con override opcional
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
): string {
  const scheme = useColorScheme();
  const colors = useTheme();
  
  // Asegurar que scheme no sea null/undefined y usar solo 'light' o 'dark'
  const currentScheme = scheme === 'dark' ? 'dark' : 'light';
  const colorFromProps = props[currentScheme];
  
  if (colorFromProps) {
    return colorFromProps;
  }
  
  return colors[colorName];
}

// Hook para obtener estilos de texto
export function useTextStyle(styleName: TextStyleName) {
  return TextStyles[styleName];
}

// Hook para obtener múltiples estilos de texto
export function useTextStyles(styleNames: TextStyleName[]) {
  return styleNames.map(name => TextStyles[name]);
}

// Hook para crear estilos de texto personalizados combinando estilos base
export function useCustomTextStyle(
  baseStyle: TextStyleName,
  customStyles: object = {}
) {
  const baseTextStyle = TextStyles[baseStyle];
  return { ...baseTextStyle, ...customStyles };
}