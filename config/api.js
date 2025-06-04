// API configuration for different environments
const ENV = {
  dev: {
    apiUrl: 'https://mtka-api.vercel.app/',
  },
  staging: {
    apiUrl: 'http://192.168.1.2:3000/',
  },
  prod: {
    apiUrl: 'https://mtka-api.vercel.app/api',
  }
};

// Set the active environment
const getEnvironment = () => {
  // You can change this based on build configuration or env variables
  return ENV.dev;
};

// Export the active configuration
export default {
  apiUrl: getEnvironment().apiUrl,
};