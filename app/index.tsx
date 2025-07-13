import { useCustomTextStyle, useTextStyle, useTheme } from '@/hooks/useTheme';
import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image,
    Animated,
} from 'react-native';
import { FontSizes, FontWeights } from '@/constants/Typography';

// Importa tus SVGs
import BackgroundShape from '@/assets/svg/login/background-shape.svg';
import ShapeIcon from '@/assets/svg/login/shape-icon.svg';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface OnboardingData {
    id: number;
    title: string;
    description: string;
    image: any;
}

const onboardingData: OnboardingData[] = [
    {
        id: 1,
        title: 'Protege tu futuro',
        description: 'Asegura hoy el bienestar económico de tu familia ante cualquier eventualidad',
        image: require('@/assets/images/onboarding/1.png'),
    },
    {
        id: 2,
        title: 'Tecnología Avanzada',
        description: 'Gestiona todo desde tu móvil',
        image: require('@/assets/images/onboarding/2.png'),
    },
];

export default function OnboardingScreen() {
    const colors = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    // Estilos de texto personalizados
    const buttonTextStyle = useTextStyle('button');

    const customTitleStyle = useCustomTextStyle('h2', {
        color: colors.background,
        textAlign: 'center',
        fontSize: FontSizes['4xl'],
        fontFamily: FontWeights.bold,
    });

    const customDescriptionStyle = useCustomTextStyle('bodyLarge', {
        color: colors.textSecondary,
        textAlign: 'center',
        fontSize: FontSizes.md,
        lineHeight: FontSizes.md * 1.6,
    });

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        } else {
            router.push('/onboarding')
        }
    };

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    };

    const renderDots = () => {
        return (
            <View style={styles.dotsContainer}>
                {onboardingData.map((_, index) => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                    const dotScale = scrollX.interpolate({
                        inputRange,
                        outputRange: [1, 1.2, 1],
                        extrapolate: 'clamp',
                    });

                    const dotOpacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: colors.primary,
                                    transform: [{ scale: dotScale }],
                                    opacity: dotOpacity,
                                },
                            ]}
                        />
                    );
                })}
            </View>
        );
    };

    const renderItem = ({ item }: { item: OnboardingData }) => {
        return (
            <View style={styles.slide}>
                {/* Header con título */}
                <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
                    <Text style={customTitleStyle}>
                        {item.title}
                    </Text>
                </View>

                {/* Contenedor del contenido principal */}
                <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
                    {/* SVG de fondo */}
                    <BackgroundShape
                        style={styles.backgroundShape}
                        width={width}
                        height="100%"
                    />

                    {/* Contenedor de la imagen con ShapeIcon */}
                    <View style={styles.illustrationContainer}>
                        <View style={styles.shapeIconContainer}>
                            <ShapeIcon
                                width={250}
                                height={250}
                                style={styles.shapeIcon}
                            />
                            <Image
                                source={item.image}
                                style={styles.onboardingImage}
                                resizeMode="contain"
                            />
                        </View>
                        {/* Descripción */}
                        <Text style={[customDescriptionStyle, styles.description]}>
                            {item.description}
                        </Text>

                    </View>


                    {/* Button that shows "Next" on first screen and "Get Started" on last screen */}
                    <TouchableOpacity
                        style={[styles.nextButton, { marginTop: -100, backgroundColor: colors.primary }]}
                        onPress={handleNext}
                        activeOpacity={0.8}
                    >
                        <Text style={[buttonTextStyle, { color: colors.white }]}>
                            {currentIndex === onboardingData.length - 1 ? 'Comienza ahora' : 'Siguiente'}
                        </Text>
                    </TouchableOpacity>

                    {/* Indicadores de puntos animados */}
                    {renderDots()}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary, marginBottom: -40 }]}>


            {/* FlatList horizontal */}
            <FlatList
                ref={flatListRef}
                data={onboardingData}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                }}
                keyExtractor={(item) => item.id.toString()}
                bounces={false}
                scrollEventThrottle={16}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    slide: {
        width: width,
        flex: 1,
    },

    headerContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 80,
    },
    contentContainer: {
        flex: 3,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    },
    backgroundShape: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        bottom: -50,
        width: width,
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    shapeIconContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shapeIcon: {
        position: 'absolute',
        zIndex: 1,
    },
    onboardingImage: {
        width: 200,
        height: 200,
        zIndex: 2,
    },
    description: {
        paddingHorizontal: 10,
        marginVertical: 40,
        zIndex: 1,
    },
    nextButton: {
        width: width * 0.8,
        height: 55,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
        zIndex: 1,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
        zIndex: 1,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});