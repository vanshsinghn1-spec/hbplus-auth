import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { AUTH_CONFIG, ADMIN_EMAILS, ROLES, STORAGE_KEYS } from '../config/constants';

// Complete auth session for web redirect
WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext(null);

/**
 * Validates if the given email belongs to the allowed domain
 */
const validateDomain = (email) => {
  if (!email) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  return domain === AUTH_CONFIG.ALLOWED_DOMAIN.toLowerCase();
};

/**
 * Determines the user role based on email
 */
const getUserRole = (email) => {
  if (!email) return ROLES.USER;
  return ADMIN_EMAILS.includes(email.toLowerCase()) ? ROLES.ADMIN : ROLES.USER;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configure Google Auth Request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: AUTH_CONFIG.EXPO_CLIENT_ID,
    webClientId: AUTH_CONFIG.WEB_CLIENT_ID,
    androidClientId: AUTH_CONFIG.ANDROID_CLIENT_ID,
    iosClientId: AUTH_CONFIG.IOS_CLIENT_ID,
  });


  const handleGoogleAuth = useCallback(async (accessToken) => {
    try {
      setAuthLoading(true);
      setError(null);

      // Fetch user info from Google
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user information');
      }

      const userInfo = await userInfoResponse.json();

      // Validate domain
      if (!validateDomain(userInfo.email)) {
        setError(AUTH_CONFIG.DOMAIN_ERROR);
        setAuthLoading(false);
        return;
      }

      // Build user object with role
      const userData = {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        givenName: userInfo.given_name,
        familyName: userInfo.family_name,
        picture: userInfo.picture,
        role: getUserRole(userInfo.email),
        accessToken,
        loginTime: new Date().toISOString(),
      };

      // Persist user data
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);

      setUser(userData);
      setError(null);
    } catch (_err) {
      console.error('Auth error:', _err);
      setError(AUTH_CONFIG.AUTH_ERROR);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // Load persisted user data on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        if (isMounted && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (_err) {
        console.error('Failed to load stored user:', _err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Google auth response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setTimeout(() => {
        handleGoogleAuth(authentication.accessToken);
      }, 0);
    } else if (response?.type === 'error') {
      setTimeout(() => {
        setError(AUTH_CONFIG.AUTH_ERROR);
        setAuthLoading(false);
      }, 0);
    } else if (response?.type === 'dismiss') {
      setTimeout(() => {
        setAuthLoading(false);
      }, 0);
    }
  }, [response, handleGoogleAuth]);

  const signIn = useCallback(async () => {
    try {
      setError(null);
      setAuthLoading(true);
      await promptAsync();
    } catch (_err) {
      setError(AUTH_CONFIG.NETWORK_ERROR);
      setAuthLoading(false);
    }
  }, [promptAsync]);

  const mockSignIn = useCallback(async (testEmail) => {
    try {
      setError(null);
      setAuthLoading(true);

      // Simulate realistic OAuth delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (!validateDomain(testEmail)) {
        setError(AUTH_CONFIG.DOMAIN_ERROR);
        setAuthLoading(false);
        return false;
      }

      const cleanName = testEmail
        .split('@')[0]
        .split('.')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

      const userData = {
        id: `mock_${Date.now()}`,
        email: testEmail,
        name: cleanName || 'Alex Rivera',
        givenName: cleanName.split(' ')[0] || 'Alex',
        familyName: cleanName.split(' ')[1] || 'Rivera',
        picture: null,
        role: getUserRole(testEmail),
        accessToken: `mock_token_${Date.now()}`,
        loginTime: new Date().toISOString(),
      };

      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, userData.accessToken);

      setUser(userData);
      setError(null);
      return true;
    } catch (_err) {
      console.error('Demo auth error:', _err);
      setError(AUTH_CONFIG.AUTH_ERROR);
      return false;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER_DATA, STORAGE_KEYS.AUTH_TOKEN]);
      setUser(null);
      setError(null);
    } catch (_err) {
      console.error('Sign out error:', _err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const isAdmin = user?.role === ROLES.ADMIN;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        error,
        signIn,
        mockSignIn,
        signOut,
        clearError,
        isAdmin,
        isAuthenticated: !!user,
        request,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
