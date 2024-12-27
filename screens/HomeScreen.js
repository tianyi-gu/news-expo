import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { colors, typography, layout } from '../styles/common';
import { fetchArticles } from '../services/api';

const HomeScreen = ({ navigation }) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const loadArticles = async (refresh = false) => {
        if (refresh) {
            setIsRefreshing(true);
        } else {
            setIsLoading(true);
        }
        setError(null);

        try {
            const data = await fetchArticles();
            setArticles(data.articles || []);
        } catch (err) {
            console.error('Error loading articles:', err);
            setError('Failed to load articles. Pull to refresh.');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        loadArticles();
    }, []);

    const handleRefresh = () => {
        loadArticles(true);
    };

    const renderEmptyState = () => {
        if (isLoading) {
            return <LoadingSpinner text="Loading articles..." />;
        }

        if (error) {
            return (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            );
        }

        return (
            <View style={styles.centerContainer}>
                <Text style={styles.emptyStateText}>No articles found</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={articles}
                renderItem={({ item }) => (
                    <ArticleCard 
                        article={item}
                        onPress={() => navigation.navigate('Article', {
                            articleId: item.id,
                            title: item.title
                        })}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={renderEmptyState()}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...layout.container,
    },
    listContainer: {
        padding: layout.padding.medium,
        flexGrow: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: layout.padding.large,
    },
    emptyStateText: {
        ...typography.subtitle,
        color: colors.text.secondary,
        textAlign: 'center',
    },
    errorText: {
        ...typography.body,
        color: colors.error,
        textAlign: 'center',
        padding: layout.padding.medium,
        backgroundColor: `${colors.error}10`, // 10% opacity
    },
});

export default HomeScreen;
