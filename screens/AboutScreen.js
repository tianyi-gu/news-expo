import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, layout } from '../styles/common';

const AboutScreen = () => {
    const handleGithubPress = () => {
        Linking.openURL('https://github.com/tianyig');  // Replace with your GitHub URL
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Ionicons 
                        name="newspaper-outline" 
                        size={50} 
                        color={colors.primary} 
                    />
                    <Text style={styles.title}>About This App</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Overview</Text>
                    <Text style={styles.text}>
                        This app allows users to query a locally run AI model to retrieve answers
                        from archived documents. Built using React Native and Expo.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Technologies</Text>
                    <Text style={styles.text}>• React Native & Expo</Text>
                    <Text style={styles.text}>• Python Backend</Text>
                    <Text style={styles.text}>• Haystack Framework</Text>
                    <Text style={styles.text}>• DistilBERT Model</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Developer</Text>
                    <Text style={styles.text}>Tianyi Evans Gu</Text>
                    <TouchableOpacity 
                        style={styles.githubButton}
                        onPress={handleGithubPress}
                    >
                        <Ionicons 
                            name="logo-github" 
                            size={20} 
                            color={colors.background} 
                        />
                        <Text style={styles.githubButtonText}>
                            View on GitHub
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Version</Text>
                    <Text style={styles.text}>1.0.0</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...layout.container,
    },
    content: {
        padding: layout.padding.medium,
    },
    header: {
        alignItems: 'center',
        marginBottom: layout.padding.large,
    },
    title: {
        ...typography.title,
        marginTop: layout.padding.medium,
        textAlign: 'center',
    },
    section: {
        marginBottom: layout.padding.large,
        backgroundColor: colors.background,
        padding: layout.padding.medium,
        borderRadius: layout.borderRadius.medium,
        ...layout.shadow,
    },
    sectionTitle: {
        ...typography.subtitle,
        marginBottom: layout.padding.small,
        color: colors.primary,
    },
    text: {
        ...typography.body,
        marginBottom: layout.padding.small,
    },
    githubButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: layout.padding.small,
        borderRadius: layout.borderRadius.medium,
        marginTop: layout.padding.medium,
        justifyContent: 'center',
    },
    githubButtonText: {
        color: colors.background,
        ...typography.body,
        fontWeight: '600',
        marginLeft: layout.padding.small,
    },
});

export default AboutScreen;
