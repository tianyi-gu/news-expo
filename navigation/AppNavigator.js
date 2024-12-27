import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/common';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import QueryScreen from '../screens/QueryScreen';
import ArticleScreen from '../screens/ArticleScreen';
import SummaryScreen from '../screens/SummaryScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack navigator for articles and summaries
const ArticleStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.background,
            },
            headerTintColor: colors.text.primary,
            headerTitleStyle: {
                fontWeight: '600',
            },
        }}
    >
        <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Articles' }}
        />
        <Stack.Screen 
            name="Article" 
            component={ArticleScreen}
            options={({ route }) => ({ title: route.params?.title || 'Article' })}
        />
        <Stack.Screen 
            name="Summary" 
            component={SummaryScreen}
            options={{ title: 'AI Summary' }}
        />
    </Stack.Navigator>
);

// Main tab navigator
const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'ArticleStack':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Search':
                            iconName = focused ? 'search' : 'search-outline';
                            break;
                        case 'Query':
                            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                            break;
                        case 'About':
                            iconName = focused ? 'information-circle' : 'information-circle-outline';
                            break;
                        default:
                            iconName = 'help-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.text.secondary,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen 
                name="ArticleStack" 
                component={ArticleStack}
                options={{ title: 'Home' }}
            />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Query" component={QueryScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
    );
};

export default AppNavigator;
