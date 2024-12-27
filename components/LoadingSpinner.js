import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingSpinner = ({ 
    size = 'large',
    color = '#007AFF',
    text = 'Loading...',
    fullScreen = false,
    backgroundColor = 'rgba(255, 255, 255, 0.9)',
    showText = true
}) => {
    const containerStyle = fullScreen ? 
        [styles.container, styles.fullScreen, { backgroundColor }] : 
        styles.container;

    return (
        <View style={containerStyle}>
            <ActivityIndicator size={size} color={color} />
            {showText && <Text style={styles.text}>{text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        color: '#666666',
    },
});

export default LoadingSpinner;
