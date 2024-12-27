// Color palette
export const colors = {
   primary: '#007AFF',
   background: '#ffffff',
   surface: '#f5f5f5',
   text: {
       primary: '#1a1a1a',
       secondary: '#666666',
       tertiary: '#999999',
   },
   border: '#eeeeee',
   error: '#ff3b30',
   success: '#34c759',
};

// Typography using system fonts
export const typography = {
   title: {
       fontSize: 24,
       fontWeight: 'bold',
       color: colors.text.primary,
   },
   subtitle: {
       fontSize: 18,
       fontWeight: '600',
       color: colors.text.secondary,
   },
   body: {
       fontSize: 16,
       lineHeight: 24,
       color: colors.text.primary,
       fontWeight: 'normal',
   },
   caption: {
       fontSize: 14,
       color: colors.text.secondary,
       fontWeight: 'normal',
   },
};

// Layout
export const layout = {
   container: {
       flex: 1,
       backgroundColor: colors.background,
   },
   padding: {
       small: 8,
       medium: 16,
       large: 24,
   },
   borderRadius: {
       small: 4,
       medium: 8,
       large: 12,
   },
};

// Common styles
export const common = {
   shadow: {
       shadowColor: '#000',
       shadowOffset: {
           width: 0,
           height: 2,
       },
       shadowOpacity: 0.1,
       shadowRadius: 3.84,
       elevation: 5,
   },
   card: {
       backgroundColor: colors.background,
       borderRadius: layout.borderRadius.medium,
       padding: layout.padding.medium,
       marginVertical: layout.padding.small,
       shadowColor: '#000',
       shadowOffset: {
           width: 0,
           height: 2,
       },
       shadowOpacity: 0.1,
       shadowRadius: 3.84,
       elevation: 5,
   },
};