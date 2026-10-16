import React from 'react';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import LoadingScreen from './src/components/LoadingScreen';

/**
 * Navigation container that handles protected routing
 * Shows LoadingScreen during initial auth check,
 * LoginScreen if unauthenticated, DashboardScreen if authenticated
 */
const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Protected route: Dashboard only accessible when authenticated
  return isAuthenticated ? <DashboardScreen /> : <LoginScreen />;
};

/**
 * Root App component wrapping everything in AuthProvider
 */
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
