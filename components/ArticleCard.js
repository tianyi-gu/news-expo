import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ArticleCard = ({ article }) => {
    const navigation = useNavigation();

    // Destructure article properties with defaults for safety
    const {
        title = '',
        summary = '',
        publishDate = '',
        author = '',
        imageUrl = null,
        id = '',
    } = article;

    const handlePress = () => {
        navigation.navigate('Article', { articleId: id });
    };

    // Format date
    const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <TouchableOpacity 
            style={styles.card} 
            onPress={handlePress}
            activeOpacity={0.7}
        >
            {imageUrl && (
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <Text style={styles.summary} numberOfLines={3}>
                    {summary}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.author}>{author}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a1a1a',
    },
    summary: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    author: {
        fontSize: 12,
        color: '#888888',
    },
    date: {
        fontSize: 12,
        color: '#888888',
    },
});

export default ArticleCard;
