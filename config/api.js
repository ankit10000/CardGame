// API configuration for different environments
const ENV = {
  dev: {
    apiUrl: 'https://mtka-api.vercel.app/api',
  },
  staging: {
    apiUrl: 'https://staging-mtka-api.vercel.app/api',
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