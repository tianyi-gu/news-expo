import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    Image, 
    TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { colors, typography, layout } from '../styles/common';
import { fetchArticleById } from '../services/api';

const ArticleScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);
    
    // Get article data from navigation params
    const { articleId, title } = route.params || {};

    useEffect(() => {
        loadArticle();
    }, [articleId]);

    const loadArticle = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchArticleById(articleId);
            setArticle(data);
        } catch (err) {
            console.error('Error loading article:', err);
            setError('Failed to load article. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSummarize = async () => {
        navigation.navigate('Summary', { 
            articleId,
            title: article?.title || title
        });
    };

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Ionicons 
                    name="alert-circle-outline" 
                    size={50} 
                    color={colors.error} 
                />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                    style={styles.retryButton}
                    onPress={loadArticle}
                >
                    <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <LoadingSpinner text="Loading article..." />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {article?.imageUrl && (
                    <Image
                        source={{ uri: article.imageUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                )}
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {article?.title || title}
                    </Text>
                    
                    <View style={styles.metadata}>
                        <Text style={styles.author}>
                            By {article?.author}
                        </Text>
                        <Text style={styles.date}>
                            {article?.publishDate && new Date(article.publishDate)
                                .toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                        </Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.summaryButton}
                        onPress={handleSummarize}
                    >
                        <Ionicons 
                            name="bulb-outline" 
                            size={20} 
                            color={colors.background} 
                        />
                        <Text style={styles.summaryButtonText}>
                            Generate AI Summary
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.articleContent}>
                        {article?.content}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...layout.container,
    },
    scrollView: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: layout.padding.large,
    },
    image: {
        width: '100%',
        height: 250,
    },
    content: {
        padding: layout.padding.medium,
    },
    title: {
        ...typography.title,
        marginBottom: layout.padding.small,
    },
    metadata: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: layout.padding.medium,
    },
    author: {
        ...typography.caption,
        color: colors.text.secondary,
    },
    date: {
        ...typography.caption,
        color: colors.text.secondary,
    },
    summaryButton: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: layout.padding.small,
        borderRadius: layout.borderRadius.medium,
        marginBottom: layout.padding.large,
    },
    summaryButtonText: {
        color: colors.background,
        ...typography.body,
        fontWeight: '600',
        marginLeft: layout.padding.small,
    },
    articleContent: {
        ...typography.body,
        color: colors.text.primary,
        lineHeight: 24,
    },
    errorText: {
        ...typography.body,
        color: colors.error,
        textAlign: 'center',
        marginTop: layout.padding.medium,
    },
    retryButton: {
        marginTop: layout.padding.medium,
        backgroundColor: colors.primary,
        paddingVertical: layout.padding.small,
        paddingHorizontal: layout.padding.medium,
        borderRadius: layout.borderRadius.medium,
    },
    retryButtonText: {
        color: colors.background,
        ...typography.body,
        fontWeight: '600',
    },
});

export default ArticleScreen;
