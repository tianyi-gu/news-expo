import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { colors, typography, layout } from '../styles/common'; // Import shared styles

const SummaryScreen = ({ route, navigation }) => {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { articleId, title } = route.params || {};

    useEffect(() => {
        fetchSummary();
    }, [articleId]);

    const fetchSummary = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(
                `http://192.168.1.10:8000/summarize?articleId=${articleId}`
            );

            if (!response.ok) {
                throw new Error('Failed to generate summary');
            }

            const data = await response.json();
            setSummary(data.summary);
        } catch (err) {
            console.error('Summary generation error:', err);
            setError('Failed to generate summary. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `${title}\n\nSummary:\n${summary}`,
                title: 'Article Summary'
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleRetry = () => {
        fetchSummary();
    };

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <LoadingSpinner text="Generating AI Summary..." />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Ionicons name="alert-circle-outline" size={50} color={colors.error} />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                    style={styles.retryButton}
                    onPress={handleRetry}
                >
                    <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.summaryTitle}>AI-Generated Summary</Text>
                    <Text style={styles.summaryText}>{summary}</Text>
                </View>
            </ScrollView>
            
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.shareButton}
                    onPress={handleShare}
                >
                    <Ionicons 
                        name="share-outline" 
                        size={20} 
                        color={colors.background} 
                    />
                    <Text style={styles.shareButtonText}>Share Summary</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...layout.container, // Uses shared container style
    },
    scrollContainer: {
        flex: 1,
    },
    content: {
        padding: layout.padding.medium,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: layout.padding.large,
    },
    title: {
        ...typography.title, // Uses shared title typography
        marginBottom: layout.padding.medium,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: layout.padding.medium,
    },
    summaryTitle: {
        ...typography.subtitle, // Uses shared subtitle typography
        marginBottom: layout.padding.small,
    },
    summaryText: {
        ...typography.body, // Uses shared body typography
    },
    loadingText: {
        ...typography.caption, // Uses shared caption typography
        marginTop: layout.padding.medium,
    },
    errorText: {
        ...typography.body,
        marginTop: layout.padding.medium,
        color: colors.error,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: layout.padding.medium,
        paddingVertical: layout.padding.small,
        paddingHorizontal: layout.padding.medium,
        backgroundColor: colors.primary,
        borderRadius: layout.borderRadius.medium,
    },
    retryButtonText: {
        color: colors.background,
        ...typography.body,
        fontWeight: '600',
    },
    footer: {
        padding: layout.padding.medium,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.background,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: layout.padding.small,
        borderRadius: layout.borderRadius.medium,
    },
    shareButtonText: {
        color: colors.background,
        ...typography.body,
        fontWeight: '600',
        marginLeft: layout.padding.small,
    },
});

export default SummaryScreen;
