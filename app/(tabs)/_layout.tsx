import { Tabs } from 'expo-router';
import { View, StyleSheet, Dimensions } from 'react-native';

// Importa íconos SVG para el tema claro
import HomeIconLight from '@/assets/svg/tabs/home.svg';
import StatsIconLight from '@/assets/svg/tabs/stats.svg';
import ExchangeIconLight from '@/assets/svg/tabs/exchange.svg';
import LayersIconLight from '@/assets/svg/tabs/layers.svg';
import ProfileIconLight from '@/assets/svg/tabs/profile.svg';

// Importa íconos SVG para el tema oscuro

import HomeIconDark from '@/assets/svg/tabs/home-dark.svg'; 
import StatsIconDark from '@/assets/svg/tabs/stats-dark.svg'; 
import ExchangeIconDark from '@/assets/svg/tabs/exchange-dark.svg'; 
import LayersIconDark from '@/assets/svg/tabs/layers-dark.svg'; 
import ProfileIconDark from '@/assets/svg/tabs/profile-dark.svg'; 
import Shield from '@/assets/svg/tabs/shield.svg'
import Help from '@/assets/svg/tabs/help.svg'


import { useColorScheme, useTheme } from '@/hooks/useTheme';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


// Define la configuración de los íconos, incluyendo versiones claras y oscuras
const TAB_ICONS_CONFIG = [
  { name: 'index', light: HomeIconLight, dark: HomeIconDark },
  { name: 'policies', light: Shield, dark: StatsIconDark },
  { name: 'help', light: Help, dark: ExchangeIconDark },
  { name: 'profile', light: ProfileIconLight, dark: ProfileIconDark },
];

// Las rutas de las pestañas se derivan de la configuración para asegurar el orden
const TAB_ROUTES = TAB_ICONS_CONFIG.map(config => config.name);
const TAB_COUNT = TAB_ROUTES.length;
const SCREEN_WIDTH = Dimensions.get('window').width;


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = false;
  const colors = useTheme();
  const activeIndex = useSharedValue(0);

  /**
   * Renders the appropriate icon based on the current theme and focus state.
   * @param {number} index - The index of the current tab.
   * @param {boolean} focused - True if the tab is currently focused.
   * @returns {JSX.Element} The icon component.
   */

  const renderIcon = (index: number, focused: boolean) => {
    // Update the activeIndex shared value for animation
    if (focused) {
      activeIndex.value = withTiming(index, { duration: 250 });
    }

    // Select the correct SVG component based on the current theme (light or dark)
    const IconComponent = isDark ? TAB_ICONS_CONFIG[index].dark : TAB_ICONS_CONFIG[index].light;

    return (
      <View style={styles.iconWrapper}>
        <View
          style={[
            styles.iconContainer,
            // Apply active background color if focused
            focused && {
              backgroundColor: colors.tabActive,
            },
          ]}
        >
          {/* Render the selected SVG component */}
          <IconComponent
            width={22}
            height={22}
          />
        </View>
      </View>
    );
  };

  /**
   * Defines the animated style for the active tab's background indicator.
   * The translateX property moves the indicator based on the activeIndex.
   */
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: (SCREEN_WIDTH / TAB_COUNT) * activeIndex.value,
        },
      ],
    };
  });


  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [
            styles.tabBarStyle,
            {
              backgroundColor: colors.tabBackground, 
              borderTopColor: colors.border, 
            },
          ],
        }}
      >
        {/* Map over TAB_ROUTES to explicitly define each Tabs.Screen, ensuring order */}
        {TAB_ROUTES.map((routeName, index) => (
          <Tabs.Screen
            key={routeName} 
            name={routeName} 
            options={{
              tabBarIcon: ({ focused }) => renderIcon(index, focused),
            }}
          />
        ))}
      </Tabs>
      {/* Animated background indicator for the active tab */}
      <Animated.View
        style={[
          styles.animatedActiveBackground, 
          animatedBackgroundStyle, 
          {
            width:1, 
            backgroundColor: colors.tabActive, 
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 90,
    paddingHorizontal: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    position: 'absolute',
    borderTopWidth: 0, 
  },

  iconWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    padding: 12,
    borderRadius: 24,
  },

  iconActive: {
    borderRadius: 55,
    backgroundColor: '#34d399', 
  },

  animatedActiveBackground: {
    height: 10,
    position: 'absolute',
    bottom: 20, 
    borderRadius: 24,
    alignSelf: 'center', 
    zIndex: -1, 
    marginHorizontal: 4,
  },
});
