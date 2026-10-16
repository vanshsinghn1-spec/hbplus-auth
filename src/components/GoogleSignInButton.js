import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, borderRadius, typography, shadows } from '../styles/theme';

/* Google 4-Color Icon */
const GoogleIcon = () => (
  <View style={iconStyles.container}>
    <View style={[iconStyles.segment, { backgroundColor: colors.googleBlue, top: 0, right: 0, borderTopRightRadius: 9 }]} />
    <View style={[iconStyles.segment, { backgroundColor: colors.googleRed, top: 0, left: 0, borderTopLeftRadius: 9 }]} />
    <View style={[iconStyles.segment, { backgroundColor: colors.googleYellow, bottom: 0, left: 0, borderBottomLeftRadius: 9 }]} />
    <View style={[iconStyles.segment, { backgroundColor: colors.googleGreen, bottom: 0, right: 0, borderBottomRightRadius: 9 }]} />
    <View style={iconStyles.center} />
    <View style={iconStyles.notch} />
  </View>
);

const iconStyles = StyleSheet.create({
  container: { width: 18, height: 18, position: 'relative' },
  segment: { position: 'absolute', width: 9, height: 9 },
  center: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  notch: {
    position: 'absolute',
    top: 6,
    right: 0,
    width: 6,
    height: 6,
    backgroundColor: colors.googleBlue,
    borderTopRightRadius: 1,
  },
});

/**
 * Google Sign-In Button with Hb+ clean styling
 */
const GoogleSignInButton = ({ onPress, disabled, loading }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.primaryForeground} />
      ) : (
        <GoogleIcon />
      )}
      <Text style={styles.buttonText}>
        {loading ? 'Verifying your account…' : 'Continue with Google'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.lg,
    width: '100%',
    ...shadows.sm,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...typography.button,
    color: colors.primaryForeground,
  },
});

export default GoogleSignInButton;
