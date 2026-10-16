import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Animated, Text, Platform } from 'react-native';
import { colors, borderRadius } from '../styles/theme';

/**
 * Full-screen loading screen with brand mark and sleek pulse
 */
const LoadingScreen = () => {
  const [pulseAnim] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.brandContainer, { opacity: pulseAnim }]}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandIconText}>H+</Text>
        </View>
        <Text style={styles.brandName}>Hb+</Text>
      </Animated.View>
      <ActivityIndicator size="small" color={colors.primary} style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.foreground,
    letterSpacing: -0.4,
  },
  spinner: {
    marginTop: 8,
  },
});

export default LoadingScreen;
