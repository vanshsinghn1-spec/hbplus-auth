import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

/**
 * Error banner with slide-down animation and dismiss capability
 */
const ErrorBanner = ({ message, onDismiss }) => {
  const [slideAnim] = useState(() => new Animated.Value(-100));
  const [opacityAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (message) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 80,
          friction: 10,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }
  }, [message, slideAnim, opacityAnim]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start(() => onDismiss?.());
  };

  if (!message) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✕</Text>
        </View>
        <Text style={styles.message} numberOfLines={3}>
          {message}
        </Text>
        <TouchableOpacity onPress={handleDismiss} style={styles.dismissButton}>
          <Text style={styles.dismissText}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: spacing.md,
    paddingTop: Platform.OS === 'web' ? spacing.md : spacing.xxl,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.destructiveBg,
    borderWidth: 1,
    borderColor: colors.destructiveBorder,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  icon: {
    fontSize: 14,
    color: colors.destructive,
    fontWeight: '700',
  },
  message: {
    ...typography.bodySmall,
    color: colors.destructive,
    flex: 1,
    lineHeight: 20,
  },
  dismissButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
  dismissText: {
    color: colors.destructive,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ErrorBanner;
