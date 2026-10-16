import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { colors, borderRadius, shadows } from '../styles/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/* ───────── SVG Helper Icons (Dashboard) ───────── */
const OverviewIcon = ({ active }) => (
  Platform.OS === 'web' ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? colors.primaryForeground : colors.mutedForeground} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ) : (
    <Text style={[styles.navIcon, active && styles.navIconActive]}>■</Text>
  )
);

const ProjectsIcon = ({ active }) => (
  Platform.OS === 'web' ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? colors.primaryForeground : colors.mutedForeground} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ) : (
    <Text style={[styles.navIcon, active && styles.navIconActive]}>✓</Text>
  )
);

const TeamIcon = ({ active }) => (
  Platform.OS === 'web' ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? colors.primaryForeground : colors.mutedForeground} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ) : (
    <Text style={[styles.navIcon, active && styles.navIconActive]}>●</Text>
  )
);

const SparkleIcon = () => (
  Platform.OS === 'web' ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ) : (
    <Text style={styles.tipIconText}>*</Text>
  )
);

const LogoutIcon = () => (
  Platform.OS === 'web' ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.mutedForeground} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  ) : (
    <Text style={styles.logoutIconText}>→</Text>
  )
);

const HamburgerIcon = () => (
  Platform.OS === 'web' ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.foreground} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ) : (
    <Text style={styles.hamburgerIconText}>≡</Text>
  )
);

const ClockIcon = () => (
  Platform.OS === 'web' ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.foreground} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ) : (
    <Text style={styles.clockIconText}>⏱</Text>
  )
);

const ShieldIcon = () => (
  Platform.OS === 'web' ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ) : (
    <View style={styles.adminBadgeShape} />
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

const DashboardScreen = () => {
  const { user, signOut, isAdmin, isSupabaseLive } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const email = user?.email || 'alex@hbplus.fit';
  const firstName = user?.givenName || user?.name?.split(' ')[0] || email.split('@')[0].split('.')[0] || 'Team';
  
  const getInitials = (name) => {
    if (!name) return 'AR';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const stats = [
    { label: 'Active projects', value: '24', delta: '+12.5%', detail: 'from last month' },
    { label: 'Team members', value: '18', delta: '+2', detail: 'new this month' },
    { label: 'Completed tasks', value: '156', delta: '+8.2%', detail: 'from last month' },
    { label: 'Hours saved', value: '42h', delta: '+16.4%', detail: 'from last month' },
  ];

  const projects = [
    { title: 'Project Atlas', subtitle: 'Product design system', progress: 82 },
    { title: 'Q3 Growth Plan', subtitle: 'Marketing & sales', progress: 64 },
    { title: 'Mobile experience', subtitle: 'Engineering', progress: 48 },
  ];

  const activities = [
    { initials: 'SR', name: 'Sam Reed', action: 'updated Project Atlas', time: '12 min ago' },
    { initials: 'ML', name: 'Maya Lin', action: 'joined the workspace', time: '2 hours ago' },
    { initials: 'JD', name: 'Jordan Diaz', action: 'completed a task', time: 'Yesterday' },
    { initials: getInitials(user?.name), name: user?.name || 'You', action: 'synced session to Supabase', time: 'Just now' },
  ];

  const renderSidebarContent = (isMobile = false) => (
    <View style={[styles.sidebarInner, isMobile && styles.mobileSidebarInner]}>
      <View style={styles.sidebarHeader}>
        <BrandMark />
        {isMobile && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setMobileMenuOpen(false)}
            accessibilityLabel="Close navigation"
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.navContainer}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'overview' && styles.navItemActive]}
          onPress={() => {
            setActiveTab('overview');
            if (isMobile) setMobileMenuOpen(false);
          }}
        >
          <OverviewIcon active={activeTab === 'overview'} />
          <Text style={[styles.navText, activeTab === 'overview' && styles.navTextActive]}>
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'projects' && styles.navItemActive]}
          onPress={() => {
            setActiveTab('projects');
            if (isMobile) setMobileMenuOpen(false);
          }}
        >
          <ProjectsIcon active={activeTab === 'projects'} />
          <Text style={[styles.navText, activeTab === 'projects' && styles.navTextActive]}>
            Projects
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'team' && styles.navItemActive]}
          onPress={() => {
            setActiveTab('team');
            if (isMobile) setMobileMenuOpen(false);
          }}
        >
          <TeamIcon active={activeTab === 'team'} />
          <Text style={[styles.navText, activeTab === 'team' && styles.navTextActive]}>
            Team
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tip Card */}
      <View style={styles.tipCard}>
        <View style={styles.tipHeader}>
          <SparkleIcon />
          <Text style={styles.tipTitle}>Workspace tip</Text>
        </View>
        <Text style={styles.tipText}>
          Invite your team to keep project updates in one place.
        </Text>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={signOut}
        activeOpacity={0.8}
      >
        <LogoutIcon />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Mobile Drawer Modal */}
      {Platform.OS !== 'web' ? (
        <Modal
          visible={mobileMenuOpen}
          animationType="fade"
          transparent
          onRequestClose={() => setMobileMenuOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={() => setMobileMenuOpen(false)}
            />
            <View style={styles.modalSidebarWrapper}>
              {renderSidebarContent(true)}
            </View>
          </View>
        </Modal>
      ) : (
        mobileMenuOpen && (
          <View style={styles.webModalOverlay}>
            <TouchableOpacity
              style={styles.webModalBackdrop}
              activeOpacity={1}
              onPress={() => setMobileMenuOpen(false)}
            />
            <View style={styles.modalSidebarWrapper}>
              {renderSidebarContent(true)}
            </View>
          </View>
        )
      )}

      <View style={styles.layoutWrapper}>
        {/* Desktop Sidebar (hidden on mobile) */}
        <View style={styles.desktopSidebar}>
          {renderSidebarContent(false)}
        </View>

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.hamburgerButton}
              onPress={() => setMobileMenuOpen(true)}
              accessibilityLabel="Open navigation menu"
            >
              <HamburgerIcon />
            </TouchableOpacity>

            <View style={styles.topBarGreetingBox}>
              <Text style={styles.topBarDate}>{formattedDate}</Text>
              <Text style={styles.topBarGreeting}>Good morning, {firstName}</Text>
            </View>

            <View style={styles.userProfilePill}>
              <View style={styles.userMetaText}>
                <Text style={styles.userNameText}>{user?.name || 'Alex Rivera'}</Text>
                <Text style={styles.userRoleText}>
                  {isAdmin ? 'Administrator' : 'Member'}
                </Text>
              </View>

              {user?.picture ? (
                <Image source={{ uri: user.picture }} style={styles.userAvatarImage} />
              ) : (
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>
                    {getInitials(user?.name)}
                  </Text>
                </View>
              )}
              <Text style={styles.chevronIcon}>▾</Text>
            </View>
          </View>

          {/* Scrollable Dashboard Body */}
          <ScrollView
            contentContainerStyle={styles.scrollBody}
            showsVerticalScrollIndicator={false}
          >
            {/* Mobile Header Greeting */}
            <View style={styles.mobileGreetingBox}>
              <Text style={styles.topBarDate}>{formattedDate}</Text>
              <Text style={styles.mobileGreetingTitle}>Good morning, {firstName}</Text>
            </View>

            {/* Overview Header */}
            <View style={styles.overviewHeaderRow}>
              <View>
                <Text style={styles.overviewOverline}>OVERVIEW</Text>
                <Text style={styles.overviewMainTitle}>Your workspace at a glance</Text>
              </View>
              <TouchableOpacity style={styles.viewActivityButton}>
                <ClockIcon />
                <Text style={styles.viewActivityText}>View activity</Text>
              </TouchableOpacity>
            </View>

            {/* 4 Metric Cards */}
            <View style={styles.statsGrid}>
              {stats.map((item) => (
                <View key={item.label} style={styles.statCard}>
                  <Text style={styles.statLabel}>{item.label}</Text>
                  <View style={styles.statValueRow}>
                    <Text style={styles.statValue}>{item.value}</Text>
                    <View style={styles.statBadge}>
                      <Text style={styles.statBadgeText}>{item.delta}</Text>
                    </View>
                  </View>
                  <Text style={styles.statDetail}>{item.detail}</Text>
                </View>
              ))}
            </View>

            {/* Two Column Grid */}
            <View style={styles.columnsGrid}>
              {/* Left Column: Project Progress */}
              <View style={styles.columnCard}>
                <View style={styles.cardHeaderRow}>
                  <View>
                    <Text style={styles.cardHeaderTitle}>Project progress</Text>
                    <Text style={styles.cardHeaderSub}>Keep momentum across your active work.</Text>
                  </View>
                  <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>View all →</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.projectsList}>
                  {projects.map((proj) => (
                    <View key={proj.title} style={styles.projectItem}>
                      <View style={styles.projectMetaRow}>
                        <View>
                          <Text style={styles.projectTitle}>{proj.title}</Text>
                          <Text style={styles.projectSub}>{proj.subtitle}</Text>
                        </View>
                        <Text style={styles.projectPercent}>{proj.progress}%</Text>
                      </View>
                      <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${proj.progress}%` }]} />
                      </View>
                    </View>
                  ))}
                </View>

                {/* Domain Verification Status Banner */}
                <View style={styles.authVerifyBanner}>
                  <View style={styles.authVerifyHeader}>
                    <View style={styles.checkCircle}>
                      <Text style={styles.checkCircleText}>✓</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.authVerifyTitle}>Official Domain Authenticated</Text>
                      <Text style={styles.authVerifySub}>
                        Connected as {email} with verified @hbplus.fit access
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Right Column: Team Activity */}
              <View style={styles.columnCard}>
                <View style={styles.cardHeaderRow}>
                  <View>
                    <Text style={styles.cardHeaderTitle}>Team activity</Text>
                    <Text style={styles.cardHeaderSub}>Latest workspace updates.</Text>
                  </View>
                  <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>See all</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.activityList}>
                  {activities.map((act, index) => (
                    <View key={`${act.name}-${index}`} style={styles.activityItem}>
                      <View style={styles.activityAvatar}>
                        <Text style={styles.activityAvatarText}>{act.initials}</Text>
                      </View>
                      <View style={styles.activityDetails}>
                        <Text style={styles.activitySentence} numberOfLines={1}>
                          <Text style={styles.activityNameBold}>{act.name}</Text> {act.action}
                        </Text>
                        <Text style={styles.activityTime}>{act.time}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Admin Panel (if user has admin role) */}
            {isAdmin && (
              <View style={styles.adminBanner}>
                <View style={styles.adminHeader}>
                  <ShieldIcon />
                  <View>
                    <Text style={styles.adminTitle}>Admin Console</Text>
                    <Text style={styles.adminDesc}>
                      You have full system administrator privileges for hbplus.fit.
                    </Text>
                  </View>
                </View>
                <View style={styles.adminActions}>
                  <TouchableOpacity style={styles.adminBtnPrimary}>
                    <Text style={styles.adminBtnPrimaryText}>Manage Organization</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.adminBtnSecondary}>
                    <Text style={styles.adminBtnSecondaryText}>Domain Policy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Footer */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>
                Hb+ Workspace • Restricted to @hbplus.fit • Backend: Supabase {isSupabaseLive ? '(Live)' : '(Connected)'}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  layoutWrapper: {
    flex: 1,
    flexDirection: 'row',
  },

  // ── Brand Mark ──
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

  // ── Desktop Sidebar ──
  desktopSidebar: {
    display: Platform.OS === 'web' && SCREEN_WIDTH >= 768 ? 'flex' : 'none',
    width: 280,
    backgroundColor: colors.card,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  sidebarInner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  navContainer: {
    gap: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: borderRadius.lg,
  },
  navItemActive: {
    backgroundColor: colors.primary,
  },
  navIcon: {
    fontSize: 16,
    color: colors.mutedForeground,
  },
  navIconActive: {
    color: colors.primaryForeground,
  },
  navText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.mutedForeground,
  },
  navTextActive: {
    color: colors.primaryForeground,
    fontWeight: '600',
  },
  tipCard: {
    marginTop: 'auto',
    marginBottom: 16,
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: borderRadius.xl,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  tipIcon: {
    fontSize: 14,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.foreground,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.mutedForeground,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: borderRadius.lg,
  },
  logoutIcon: {
    fontSize: 15,
    color: colors.mutedForeground,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.mutedForeground,
  },

  // ── Mobile Drawer ──
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.overlay,
  },
  webModalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: 'row',
  },
  webModalBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.overlay,
  },
  modalSidebarWrapper: {
    width: 280,
    height: '100%',
    backgroundColor: colors.card,
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  mobileSidebarInner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  closeButton: {
    padding: 6,
  },
  closeButtonText: {
    fontSize: 18,
    color: colors.mutedForeground,
    fontWeight: '600',
  },

  // ── Main Content Area ──
  mainContent: {
    flex: 1,
    minWidth: 0,
  },
  topBar: {
    height: 72,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hamburgerButton: {
    display: Platform.OS === 'web' && SCREEN_WIDTH >= 768 ? 'none' : 'flex',
    padding: 8,
    marginRight: 12,
  },
  hamburgerIcon: {
    fontSize: 20,
    color: colors.foreground,
  },
  topBarGreetingBox: {
    display: Platform.OS === 'web' && SCREEN_WIDTH >= 768 ? 'flex' : 'none',
  },
  topBarDate: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  topBarGreeting: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
    marginTop: 2,
  },
  userProfilePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 'auto',
  },
  userMetaText: {
    alignItems: 'flex-end',
    display: Platform.OS === 'web' && SCREEN_WIDTH < 500 ? 'none' : 'flex',
  },
  userNameText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.foreground,
  },
  userRoleText: {
    fontSize: 11,
    color: colors.mutedForeground,
  },
  userAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(26,26,26,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  userAvatarText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  chevronIcon: {
    fontSize: 12,
    color: colors.mutedForeground,
  },

  // ── Body Content ──
  scrollBody: {
    paddingHorizontal: Platform.OS === 'web' && SCREEN_WIDTH >= 1024 ? 36 : 20,
    paddingVertical: 28,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    gap: 24,
  },
  mobileGreetingBox: {
    display: Platform.OS === 'web' && SCREEN_WIDTH >= 768 ? 'none' : 'flex',
    marginBottom: 4,
  },
  mobileGreetingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.foreground,
    marginTop: 4,
  },
  overviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 12,
  },
  overviewOverline: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1.5,
  },
  overviewMainTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.foreground,
    marginTop: 4,
    letterSpacing: -0.5,
  },
  viewActivityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  viewActivityIcon: {
    fontSize: 13,
  },
  viewActivityText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.foreground,
  },

  // ── Stats Grid ──
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    padding: 20,
    ...shadows.sm,
  },
  statLabel: {
    fontSize: 13,
    color: colors.mutedForeground,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.foreground,
    letterSpacing: -0.5,
  },
  statBadge: {
    backgroundColor: 'rgba(26,26,26,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  statBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  statDetail: {
    fontSize: 11,
    color: colors.mutedForeground,
    marginTop: 8,
  },

  // ── Two Columns ──
  columnsGrid: {
    flexDirection: Platform.OS === 'web' && SCREEN_WIDTH >= 1024 ? 'row' : 'column',
    gap: 20,
  },
  columnCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    padding: 24,
    ...shadows.sm,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
  },
  cardHeaderSub: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  viewAllButton: {
    padding: 4,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },

  // ── Project Progress ──
  projectsList: {
    gap: 18,
  },
  projectItem: {
    gap: 8,
  },
  projectMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.foreground,
  },
  projectSub: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  projectPercent: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.foreground,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.secondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  authVerifyBanner: {
    marginTop: 24,
    backgroundColor: 'rgba(22,163,74,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(22,163,74,0.2)',
    borderRadius: borderRadius.lg,
    padding: 14,
  },
  authVerifyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  authVerifyTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.foreground,
  },
  authVerifySub: {
    fontSize: 11,
    color: colors.mutedForeground,
    marginTop: 2,
  },

  // ── Team Activity ──
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityAvatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.foreground,
  },
  activityDetails: {
    flex: 1,
  },
  activitySentence: {
    fontSize: 13,
    color: colors.foreground,
  },
  activityNameBold: {
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 11,
    color: colors.mutedForeground,
    marginTop: 2,
  },

  // ── Admin Banner ──
  adminBanner: {
    backgroundColor: 'rgba(245,158,11,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.25)',
    borderRadius: borderRadius.xl,
    padding: 20,
    gap: 16,
  },
  adminHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  adminIcon: {
    fontSize: 22,
  },
  adminTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#B45309',
  },
  adminDesc: {
    fontSize: 12,
    color: colors.foreground,
    marginTop: 2,
  },
  adminActions: {
    flexDirection: 'row',
    gap: 10,
  },
  adminBtnPrimary: {
    backgroundColor: '#B45309',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
  },
  adminBtnPrimaryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  adminBtnSecondary: {
    borderWidth: 1,
    borderColor: '#B45309',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
  },
  adminBtnSecondaryText: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Footer ──
  footerRow: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
});

export default DashboardScreen;
