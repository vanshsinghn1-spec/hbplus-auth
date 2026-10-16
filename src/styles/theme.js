import { StyleSheet } from 'react-native';

// ── Design Tokens (light, neutral, professional SaaS aesthetic) ──────────────────────
export const colors = {
  // Core
  background: '#FFFFFF',
  foreground: '#1A1A1A',
  card: '#FFFFFF',
  cardForeground: '#1A1A1A',

  // Primary (dark, near-black — like the reference)
  primary: '#1A1A1A',
  primaryForeground: '#FAFAFA',
  primaryGlow: 'rgba(26, 26, 26, 0.08)',

  // Secondary / Muted
  secondary: '#F5F5F5',
  secondaryForeground: '#1A1A1A',
  muted: '#F5F5F5',
  mutedForeground: '#737373',

  // Accent
  accent: '#16A34A',
  accentForeground: '#FFFFFF',
  accentGlow: 'rgba(22, 163, 74, 0.1)',

  // Border & Inputs
  border: '#E5E5E5',
  borderLight: 'rgba(0,0,0,0.06)',
  input: '#E5E5E5',

  // Destructive / Error
  destructive: '#DC2626',
  destructiveBg: 'rgba(220,38,38,0.05)',
  destructiveBorder: 'rgba(220,38,38,0.2)',
  error: '#DC2626',
  errorBg: 'rgba(220,38,38,0.05)',

  // Success
  success: '#16A34A',
  successBg: 'rgba(22,163,74,0.1)',

  // Warning
  warning: '#F59E0B',
  warningBg: 'rgba(245,158,11,0.1)',

  // Google
  googleBlue: '#4285F4',
  googleGreen: '#34A853',
  googleYellow: '#FBBC05',
  googleRed: '#EA4335',

  // Compatibility aliases
  bgPrimary: '#FFFFFF',
  bgSecondary: '#FAFAFA',
  bgCard: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceBorder: '#E5E5E5',
  surfaceLight: '#F9F9F9',
  textPrimary: '#1A1A1A',
  textSecondary: '#737373',
  textMuted: '#A3A3A3',
  divider: '#E5E5E5',

  // Misc
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.25)',

  // Gradient-like subtle tints (for background)
  tintGreen: 'rgba(134,239,172,0.18)',
  tintBlue: 'rgba(147,197,253,0.15)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const typography = {
  hero: {
    fontSize: 38,
    fontWeight: '600',
    letterSpacing: -1.5,
    lineHeight: 44,
  },
  h1: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.8,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  overline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: 14,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  elevated: {
    shadowColor: 'rgba(0,80,60,0.12)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 6,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
