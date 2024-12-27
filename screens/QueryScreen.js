import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { colors, typography, layout } from '../styles/common';
import { queryArticles } from '../services/api';

const QueryScreen = () => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (!query.trim()) return;
        
        setIsLoading(true);
        setError(null);
        Keyboard.dismiss();

        try {
            const data = await queryArticles(query);
            setResult(data);
        } catch (error) {
            console.error('Query error:', error);
            setError('Failed to get an answer. Please try again.');
            setResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons 
                name="chatbubble-ellipses-outline" 
                size={50} 
                color={colors.text.tertiary} 
            />
            <Text style={styles.emptyStateText}>
                Ask me anything
            </Text>
            <Text style={styles.emptyStateSubtext}>
                I can help you find information from our article archive
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.queryInput}
                            placeholder="Ask a question..."
                            value={query}
                            onChangeText={setQuery}
                            onSubmitEditing={handleSubmit}
                            returnKeyType="send"
                            multiline
                            placeholderTextColor={colors.text.tertiary}
                        />
                        <TouchableOpacity 
                            style={styles.submitButton}
                            onPress={handleSubmit}
                            disabled={isLoading || !query.trim()}
                        >
                            <Ionicons 
                                name="send" 
                                size={24} 
                                color={colors.background} 
                            />
                        </TouchableOpacity>
                    </View>

                    {error && (
                        <Text style={styles.errorText}>{error}</Text>
                    )}
                </View>

                {isLoading ? (
                    <LoadingSpinner text="Thinking..." />
                ) : result ? (
                    <View style={styles.resultBox}>
                        <Text style={styles.answerText}>{result.answer}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.contextLabel}>Context:</Text>
                        <Text style={styles.contextText}>{result.context}</Text>
                    </View>
                ) : (
                    renderEmptyState()
                )}
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
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center', // Center content vertically
    },
    inputWrapper: {
        padding: layout.padding.medium,
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderRadius: layout.borderRadius.medium,
        ...layout.shadow,
    },
    queryInput: {
        flex: 1,
        minHeight: 44,
        maxHeight: 100,
        backgroundColor: colors.surface,
        borderRadius: layout.borderRadius.medium,
        paddingHorizontal: layout.padding.medium,
        paddingVertical: layout.padding.small,
        marginRight: layout.padding.small,
        ...typography.body,
    },
    submitButton: {
        width: 44,
        height: 44,
        backgroundColor: colors.primary,
        borderRadius: layout.borderRadius.medium,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    resultBox: {
        backgroundColor: colors.background,
        borderRadius: layout.borderRadius.medium,
        padding: layout.padding.medium,
        margin: layout.padding.medium,
        ...layout.shadow,
    },
    answerText: {
        ...typography.body,
        marginBottom: layout.padding.medium,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: layout.padding.medium,
    },
    contextLabel: {
        ...typography.subtitle,
        marginBottom: layout.padding.small,
    },
    contextText: {
        ...typography.caption,
        color: colors.text.secondary,
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
        marginTop: layout.padding.medium,
        backgroundColor: `${colors.error}10`,
        borderRadius: layout.borderRadius.medium,
    },
});

export default QueryScreen;
