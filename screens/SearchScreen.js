import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ArticleCard from '../components/ArticleCard';
import { colors, typography, layout } from '../styles/common';
import { searchArticles } from '../services/api';

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setError(null);
        Keyboard.dismiss();

        try {
            const data = await searchArticles(searchQuery);
            setSearchResults(data.results || []);
        } catch (err) {
            console.error('Search error:', err);
            setError('Failed to perform search. Please try again.');
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons 
                name="search-outline" 
                size={50} 
                color={colors.text.tertiary} 
            />
            <Text style={styles.emptyStateText}>
                {searchQuery ? 'No results found' : 'Search our archive'}
            </Text>
            <Text style={styles.emptyStateSubtext}>
                {searchQuery 
                    ? 'Try different keywords or broaden your search'
                    : 'Enter keywords to find articles'
                }
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                        placeholderTextColor={colors.text.tertiary}
                    />
                    <TouchableOpacity 
                        style={styles.searchButton}
                        onPress={handleSearch}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={colors.background} />
                        ) : (
                            <Ionicons name="search" size={24} color={colors.background} />
                        )}
                    </TouchableOpacity>
                </View>

                {error && (
                    <Text style={styles.errorText}>{error}</Text>
                )}

                {searchResults.length > 0 ? (
                    <FlatList
                        data={searchResults}
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
                        contentContainerStyle={styles.resultsList}
                        keyboardShouldPersistTaps="handled"
                    />
                ) : (
                    renderEmptyState()
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...layout.container,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: layout.padding.medium,
        backgroundColor: colors.background,
        alignItems: 'center',
        marginHorizontal: layout.padding.medium,
        marginBottom: layout.padding.large,
    },
    searchInput: {
        flex: 1,
        height: 44,
        backgroundColor: colors.surface,
        borderRadius: layout.borderRadius.medium,
        paddingHorizontal: layout.padding.medium,
        marginRight: layout.padding.small,
        ...typography.body,
    },
    searchButton: {
        width: 44,
        height: 44,
        backgroundColor: colors.primary,
        borderRadius: layout.borderRadius.medium,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultsList: {
        padding: layout.padding.medium,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: layout.padding.large,
    },
    emptyStateText: {
        ...typography.subtitle,
        marginTop: layout.padding.medium,
    },
    emptyStateSubtext: {
        ...typography.caption,
        marginTop: layout.padding.small,
        textAlign: 'center',
        paddingHorizontal: layout.padding.large,
    },
    errorText: {
        ...typography.body,
        color: colors.error,
        textAlign: 'center',
        padding: layout.padding.medium,
        backgroundColor: `${colors.error}10`,
    },
});

export default SearchScreen;
