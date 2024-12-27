import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from './styles/common';
import AppNavigator from './navigation/AppNavigator';

// Use DefaultTheme as base and override only what we need
const navigationTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.background,
        text: colors.text.primary,
        border: colors.border,
    },
};

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer theme={navigationTheme}>
                <StatusBar style="auto" />
                <AppNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
