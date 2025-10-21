export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api',
    features: {
        enableAI: true,
        enableWhisper: true,
        enableDebugMode: true
    },
    openai: {
        maxTokens: 1000,
        temperature: 0.7
    }
};

