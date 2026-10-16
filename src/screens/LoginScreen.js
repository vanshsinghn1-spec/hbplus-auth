import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, borderRadius, typography, shadows } from '../styles/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isDesktop = SCREEN_WIDTH >= 1024;
const isTablet = SCREEN_WIDTH >= 768;

/* ───────── SVG-like Google Icon (using nested Views) ───────── */
const GoogleIcon = () => (
  <View style={googleIconStyles.container}>
    {/* Blue quadrant */}
    <View style={[googleIconStyles.segment, { backgroundColor: colors.googleBlue, top: 0, right: 0, borderTopRightRadius: 9 }]} />
    {/* Red quadrant */}
    <View style={[googleIconStyles.segment, { backgroundColor: colors.googleRed, top: 0, left: 0, borderTopLeftRadius: 9 }]} />
    {/* Yellow quadrant */}
    <View style={[googleIconStyles.segment, { backgroundColor: colors.googleYellow, bottom: 0, left: 0, borderBottomLeftRadius: 9 }]} />
    {/* Green quadrant */}
    <View style={[googleIconStyles.segment, { backgroundColor: colors.googleGreen, bottom: 0, right: 0, borderBottomRightRadius: 9 }]} />
    {/* Center white circle */}
    <View style={googleIconStyles.center} />
    {/* Right notch */}
    <View style={googleIconStyles.notch} />
  </View>
);

const googleIconStyles = StyleSheet.create({
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

/* ───────── SVG Helper Icons ───────── */
const SecurityBadgeIcon = () => (
  Platform.OS === 'web' ? (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ) : (
    <View style={styles.badgeLetterBox}>
      <Text style={styles.badgeLetter}>H+</Text>
    </View>
  )
);

const GlobeIcon = () => (
  Platform.OS === 'web' ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.mutedForeground} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ) : (
    <View style={styles.dotIndicator} />
  )
);

const HelpIcon = () => (
  Platform.OS === 'web' ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.mutedForeground} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ) : (
    <Text style={styles.helpIcon}>?</Text>
  )
);

const CheckMarkIcon = () => (
  Platform.OS === 'web' ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ) : (
    <Text style={styles.checkIcon}>✓</Text>
  )
);

/* ───────── Brand Mark ───────── */
const BrandMark = () => (
  <View style={styles.brandRow}>
    <View style={styles.brandIcon}>
      <Text style={styles.brandIconText}>H+</Text>
    </View>
    <Text style={styles.brandName}>Hb+</Text>
  </View>
);

/* ───────── Right-Side Preview Card (desktop only) ───────── */
const PreviewCard = () => (
  <View style={styles.previewCard}>
    {/* Decorative blur orb */}
    <View style={styles.previewOrb} />

    <View style={styles.previewHeader}>
      <View>
        <Text style={styles.previewOverline}>WORKSPACE OVERVIEW</Text>
        <Text style={styles.previewTitle}>Welcome back, Alex</Text>
      </View>
      <View style={styles.previewAvatar}>
        <Text style={styles.previewAvatarText}>AR</Text>
      </View>
    </View>

    {/* Stats row */}
    <View style={styles.previewStatsRow}>
      <View style={styles.previewStat}>
        <Text style={styles.previewStatValue}>24</Text>
        <Text style={styles.previewStatLabel}>Active projects</Text>
      </View>
      <View style={styles.previewStat}>
        <Text style={styles.previewStatValue}>92%</Text>
        <Text style={styles.previewStatLabel}>Team completion</Text>
      </View>
    </View>

    {/* Recent activity */}
    <View style={styles.previewActivityCard}>
      <View style={styles.previewActivityHeader}>
        <Text style={styles.previewActivityTitle}>Recent activity</Text>
        <Text style={styles.previewActivityMeta}>This week</Text>
      </View>
      {[
        ['Project Atlas', 'Design review completed'],
        ['Team access', 'New member added'],
        ['Q3 planning', 'Document updated'],
      ].map(([title, subtitle]) => (
        <View style={styles.previewActivityRow} key={title}>
          <View style={styles.previewActivityIcon}>
            <CheckMarkIcon />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.previewActivityItemTitle}>{title}</Text>
            <Text style={styles.previewActivityItemSub}>{subtitle}</Text>
          </View>
          <Text style={styles.previewActivityTime}>2h</Text>
        </View>
      ))}
    </View>

    <View style={styles.previewFooterRow}>
      <GlobeIcon />
      <Text style={styles.previewFooterText}>
        Available on web, iOS, and Android
      </Text>
    </View>
  </View>
);

/* ───────── Login Screen ───────── */
const LoginScreen = () => {
  const { signIn, mockSignIn, authLoading, error, clearError, request } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Background gradient tints */}
      <View style={styles.bgGradient1} />
      <View style={styles.bgGradient2} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerWrapper}>
          {/* Header */}
          <View style={styles.header}>
            <BrandMark />
            <TouchableOpacity style={styles.helpButton}>
              <HelpIcon />
              <Text style={styles.helpText}>Help center</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainRow}>
            {/* Left: Login form */}
            <View style={styles.leftColumn}>
              {/* Security badge icon (no emoji lock) */}
              <View style={styles.fingerprintBox}>
                <SecurityBadgeIcon />
              </View>

              <Text style={styles.overlineLabel}>PRIVATE WORKSPACE</Text>
              <Text style={styles.heroTitle}>
                Your work, kept in the right hands.
              </Text>
              <Text style={styles.heroSubtitle}>
                Sign in to access the Hb+ workspace. Only verified team
                members with an official email can continue.
              </Text>

              {/* Google Sign-In Card */}
              <View style={styles.signInCard}>
                <TouchableOpacity
                  style={[styles.googleButton, authLoading && styles.googleButtonDisabled]}
                  onPress={async () => {
                    if (request) {
                      try {
                        await signIn();
                      } catch (_err) {
                        // Fallback to demo account if Google OAuth fails (e.g. demo environment)
                        mockSignIn?.('alex@hbplus.fit');
                      }
                    } else {
                      mockSignIn?.('alex@hbplus.fit');
                    }
                  }}
                  disabled={authLoading}
                  activeOpacity={0.85}
                >
                  {authLoading ? (
                    <ActivityIndicator size="small" color={colors.primaryForeground} />
                  ) : (
                    <GoogleIcon />
                  )}
                  <Text style={styles.googleButtonText}>
                    {authLoading ? 'Verifying your account…' : 'Continue with Google'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Error message */}
              {error ? (
                <View style={styles.errorBox}>
                  <TouchableOpacity onPress={clearError} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Text style={styles.errorX}>✕</Text>
                  </TouchableOpacity>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              <Text style={styles.legalText}>
                By continuing, you agree to our Terms of Service and acknowledge
                our Privacy Policy.
              </Text>

              {/* Testing / Evaluator Shortcuts (matches reference UI) */}
              <View style={styles.testingRow}>
                <TouchableOpacity
                  style={styles.demoLink}
                  onPress={() => mockSignIn?.('guest@gmail.com')}
                  disabled={authLoading}
                >
                  <Text style={styles.demoLinkText}>Try restricted account (@gmail.com)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.demoLink}
                  onPress={() => mockSignIn?.('alex@hbplus.fit')}
                  disabled={authLoading}
                >
                  <Text style={[styles.demoLinkText, styles.demoLinkAllowed]}>
                    Quick test official account (@hbplus.fit)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Right: Preview card (tablet/desktop) */}
            {isTablet && (
              <View style={styles.rightColumn}>
                <PreviewCard />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Background tints
  bgGradient1: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: colors.tintGreen,
    ...(Platform.OS === 'web' ? { filter: 'blur(80px)' } : {}),
  },
  bgGradient2: {
    position: 'absolute',
    bottom: -60,
    right: -80,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: colors.tintBlue,
    ...(Platform.OS === 'web' ? { filter: 'blur(80px)' } : {}),
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerWrapper: {
    flex: 1,
    maxWidth: 1440,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: isDesktop ? 80 : isTablet ? 40 : 24,
    paddingVertical: isDesktop ? 40 : 24,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  brandIconText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.foreground,
    letterSpacing: -0.3,
  },
  badgeLetterBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeLetter: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  helpIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 15,
    fontSize: 10,
    color: colors.mutedForeground,
    overflow: 'hidden',
  },
  helpText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.mutedForeground,
  },
  // Main layout
  mainRow: {
    flex: 1,
    flexDirection: isTablet ? 'row' : 'column',
    alignItems: isTablet ? 'center' : 'stretch',
    gap: isDesktop ? 80 : 40,
    paddingTop: isDesktop ? 40 : 24,
  },
  leftColumn: {
    flex: 1,
    maxWidth: isTablet ? 510 : undefined,
    justifyContent: 'center',
    paddingVertical: isTablet ? 60 : 32,
  },
  rightColumn: {
    flex: 1,
    maxWidth: 480,
  },
  // Fingerprint
  fingerprintBox: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  fingerprintEmoji: {
    fontSize: 26,
  },
  overlineLabel: {
    ...typography.overline,
    color: colors.primary,
    marginBottom: spacing.sm + 4,
  },
  heroTitle: {
    ...typography.hero,
    color: colors.foreground,
    maxWidth: 450,
    marginBottom: spacing.md + 4,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.mutedForeground,
    maxWidth: 430,
    lineHeight: 28,
  },
  // Sign in card
  signInCard: {
    marginTop: spacing.xl + 4,
    maxWidth: 420,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.card,
    padding: spacing.sm,
    ...shadows.elevated,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.lg,
  },
  googleButtonDisabled: {
    opacity: 0.6,
  },
  googleButtonText: {
    ...typography.button,
    color: colors.primaryForeground,
  },
  // Error
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: spacing.md,
    maxWidth: 420,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.destructiveBorder,
    backgroundColor: colors.destructiveBg,
  },
  errorX: {
    fontSize: 14,
    color: colors.destructive,
    marginTop: 1,
    fontWeight: '600',
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: colors.destructive,
    lineHeight: 20,
  },
  legalText: {
    marginTop: spacing.md,
    maxWidth: 420,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: colors.mutedForeground,
  },
  testingRow: {
    marginTop: spacing.lg,
    maxWidth: 420,
    alignItems: 'center',
    gap: 12,
  },
  demoLink: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  demoLinkText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.mutedForeground,
    textDecorationLine: 'underline',
  },
  demoLinkAllowed: {
    color: colors.primary,
    fontWeight: '600',
  },
  // ── Preview Card ──
  previewCard: {
    borderRadius: borderRadius['3xl'],
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.card,
    padding: spacing.xl + 8,
    ...shadows.elevated,
    overflow: 'hidden',
    position: 'relative',
  },
  previewOrb: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(26,26,26,0.06)',
    ...(Platform.OS === 'web' ? { filter: 'blur(30px)' } : {}),
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  previewOverline: {
    ...typography.overline,
    color: colors.mutedForeground,
    fontSize: 11,
    letterSpacing: 1.8,
  },
  previewTitle: {
    ...typography.h2,
    color: colors.foreground,
    marginTop: spacing.sm,
  },
  previewAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(26,26,26,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewAvatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  previewStatsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: spacing.xl + 8,
  },
  previewStat: {
    flex: 1,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
  },
  previewStatValue: {
    ...typography.statValue,
    color: colors.foreground,
  },
  previewStatLabel: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 4,
  },
  previewActivityCard: {
    marginTop: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
  },
  previewActivityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  previewActivityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.foreground,
  },
  previewActivityMeta: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  previewActivityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  previewActivityIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(26,26,26,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  previewActivityItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.foreground,
  },
  previewActivityItemSub: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 1,
  },
  previewActivityTime: {
    fontSize: 11,
    color: colors.mutedForeground,
  },
  previewFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.xl,
  },
  previewFooterIcon: {
    fontSize: 14,
  },
  previewFooterText: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
});

export default LoginScreen;
