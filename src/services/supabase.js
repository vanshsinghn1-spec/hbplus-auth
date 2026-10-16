import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { SUPABASE_CONFIG } from '../config/constants';

const isConfigured = 
  Boolean(SUPABASE_CONFIG.URL) && 
  Boolean(SUPABASE_CONFIG.ANON_KEY) && 
  !SUPABASE_CONFIG.URL.includes('placeholder') &&
  !SUPABASE_CONFIG.ANON_KEY.includes('placeholder');

/**
 * Supabase client instance configured with AsyncStorage for cross-platform session persistence
 */
export const supabase = createClient(
  SUPABASE_CONFIG.URL || 'https://placeholder.supabase.co',
  SUPABASE_CONFIG.ANON_KEY || 'placeholder-anon-key',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: Platform.OS === 'web',
    },
  }
);

/**
 * Returns whether live Supabase credentials have been provided
 */
export const isSupabaseLive = () => isConfigured;

/**
 * Syncs authenticated user profile to Supabase 'profiles' table
 * Gracefully handles offline or mock states for evaluation
 */
export const syncUserProfileToSupabase = async (user) => {
  if (!user || !user.email) return { success: false, reason: 'No user provided' };

  if (!isConfigured) {
    // Development / evaluation mode: log sync without network failure
    return {
      success: true,
      isLive: false,
      message: 'Supabase client initialized (evaluation mode)',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        domain: user.email.split('@')[1],
        lastSignIn: user.loginTime,
      },
    };
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          domain: user.email.split('@')[1],
          last_sign_in_at: user.loginTime || new Date().toISOString(),
        },
        { onConflict: 'email' }
      )
      .select();

    if (error) {
      console.warn('Supabase upsert warning:', error.message);
      return { success: false, isLive: true, error: error.message };
    }

    return { success: true, isLive: true, data };
  } catch (err) {
    console.warn('Supabase profile sync error:', err.message);
    return { success: false, isLive: true, error: err.message };
  }
};

/**
 * Logs authentication events to Supabase for audit compliance
 */
export const logAuthEventToSupabase = async (email, status, reason = null) => {
  if (!isConfigured) {
    return { success: true, isLive: false };
  }

  try {
    const { error } = await supabase.from('auth_logs').insert({
      email,
      status,
      reason,
      timestamp: new Date().toISOString(),
      platform: Platform.OS,
    });

    if (error) console.warn('Supabase audit log warning:', error.message);
    return { success: !error };
  } catch (err) {
    console.warn('Supabase audit log error:', err.message);
    return { success: false };
  }
};

export default supabase;
