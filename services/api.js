import axios from 'axios';

const API_BASE_URL = 'http://10.0.0.48:8000';

// Create axios instance with common config
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Articles
export const fetchArticles = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return {
            articles: data.results,
            total: data.total,
            page: data.page,
            limit: data.limit
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

// Search - for finding articles by keywords
export const searchArticles = async (query) => {
    try {
        const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Search failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching articles:', error);
        throw error;
    }
};

// Query - for asking AI questions about articles
export const queryArticles = async (question) => {
    try {
        const response = await fetch(`${API_BASE_URL}/query?query=${encodeURIComponent(question)}`);
        if (!response.ok) {
            throw new Error('Query failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error querying articles:', error);
        throw error;
    }
};

export default api;
