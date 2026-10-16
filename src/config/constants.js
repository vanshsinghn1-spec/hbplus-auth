// Configuration constants for the application
// Replace GOOGLE_CLIENT_ID with your actual Google Cloud Console OAuth 2.0 Client ID

export const AUTH_CONFIG = {
  // Google OAuth Client IDs
  // You need to create these in Google Cloud Console → APIs & Services → Credentials
  // Create an OAuth 2.0 Client ID for "Web application"
  EXPO_CLIENT_ID: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
  WEB_CLIENT_ID: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  ANDROID_CLIENT_ID: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  IOS_CLIENT_ID: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',

  // Allowed email domain (without @)
  ALLOWED_DOMAIN: 'hbplus.fit',

  // Error messages
  DOMAIN_ERROR: 'Access restricted. Please login using your official domain email (@hbplus.fit).',
  AUTH_ERROR: 'Authentication failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
};

// Role definitions for role-based access control
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// Admin email list — these users get the 'admin' role
export const ADMIN_EMAILS = [
  'admin@hbplus.fit',
  // Add more admin emails here
];

// Storage keys
export const STORAGE_KEYS = {
  USER_DATA: '@hbplus_user_data',
  AUTH_TOKEN: '@hbplus_auth_token',
};
