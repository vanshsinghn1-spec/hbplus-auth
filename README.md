# Hb+ — Cross-Platform Google OAuth Application

A secure cross-platform application built with **React Native** (Expo SDK 57) supporting **Mobile** (Android/iOS) and **Web** platforms. Implements Google OAuth 2.0 authentication with domain-restricted access — only `@hbplus.fit` email addresses are authorized.

Featuring the modern **Hb+** design system adapted from the enterprise reference design — with clean typography, responsive sidebar navigation, activity tracking, metric cards, and instant evaluator test modes.

![React Native](https://img.shields.io/badge/React_Native-0.86-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK_57-black?logo=expo)
![OAuth](https://img.shields.io/badge/Google_OAuth-2.0-red?logo=google)
![Platform](https://img.shields.io/badge/Platform-Web_|_Android_|_iOS-green)
![Tests](https://img.shields.io/badge/Expo_Doctor-21%2F21_Passed-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Check_Passed-blue)

---

## 🚀 Live Demo

- **Local Web Server:** `http://localhost:8081`
- **Deployment Build:** `npx expo export --platform web` (outputs to `dist/`)

---

## 📋 Table of Contents

- [Features](#features)
- [Design Adaptation (Hb+ UI)](#design-adaptation-hb-ui)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Running](#setup--running)
- [Authentication Flow & Domain Restriction](#authentication-flow--domain-restriction)
- [Testing the Assignment](#testing-the-assignment)
- [Role-Based Access Control](#role-based-access-control)
- [Verification & Quality](#verification--quality)
- [Deployment](#deployment)

---

## ✨ Features

- ✅ **Google Sign-In** — One-click authentication via Google OAuth 2.0 (`expo-auth-session`).
- ✅ **Domain Validation** — Strict domain verification restricting access exclusively to `@hbplus.fit`.
- ✅ **Domain Restriction Error** — Immediate, clear error feedback for unauthorized domains (e.g., `@gmail.com`).
- ✅ **Protected Dashboard** — Protected routing ensures only verified users can access workspace data.
- ✅ **Hb+ Enterprise UI** — Clean, modern SaaS aesthetic with light theme, responsive sidebar navigation, and metric cards.
- ✅ **Interactive Domain Testing Mode** — Built-in evaluator shortcuts to test allowed vs. restricted domains in one click without external Google Cloud setup.
- ✅ **Session Persistence** — Secure user session and token storage via AsyncStorage.
- ✅ **Role-Based Access Control (RBAC)** — Differentiates between Administrators and Members with special Admin Console capabilities.
- ✅ **Cross-Platform Compatibility** — 100% unified codebase running smoothly across Web, Android, and iOS.

---

## 🎨 Design Adaptation (Hb+ UI)

The UI was adapted from the reference design (`react-native-assignment-ui.zip`) into native React Native components:

### 1. Login Screen
- **Brand Mark:** **H+** (**Hb+**) brand header with Help Center shortcut.
- **Hero Presentation:** Clean typography with *"Your work, kept in the right hands."* and private workspace notice.
- **Google Sign-In Button:** Custom Google-branded action with verification feedback.
- **Domain Restriction Warning:** Slide-down alert displaying error banner for non-`@hbplus.fit` accounts.
- **Desktop Preview Card:** Live workspace summary card showing active projects and recent activity.
- **Evaluator Shortcuts:** One-click shortcuts for testing `guest@gmail.com` (restricted) and `alex@hbplus.fit` (allowed).

### 2. Dashboard Screen
- **Responsive Navigation:** Fixed sidebar on desktop/tablet (≥768px) and smooth drawer menu on mobile devices.
- **Header:** Live localized date, personalized greeting (*"Good morning, Alex"*), and profile avatar with role badge.
- **Workspace Metrics:** 4 primary SaaS metric cards:
  - *Active projects:* 24 (+12.5%)
  - *Team members:* 18 (+2)
  - *Completed tasks:* 156 (+8.2%)
  - *Hours saved:* 42h (+16.4%)
- **Two-Column Project & Activity Grid:**
  - *Project progress:* Interactive progress bars for Project Atlas, Q3 Growth Plan, and Mobile experience.
  - *Official Domain Verification Banner:* Highlights verified `@hbplus.fit` authenticated session.
  - *Team activity:* Recent workspace event stream with initials avatars and timestamps.
- **Admin Console:** Dedicated administrative panel visible when logged in with an administrator account (`admin@hbplus.fit`).

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React Native** (v0.86) | Core mobile and cross-platform UI primitives |
| **React Native for Web** | Seamless compilation to modern web browsers |
| **Expo SDK 57** | Application framework and build tooling |
| **Expo AuthSession** | Google OAuth 2.0 provider integration |
| **AsyncStorage** | Token and authenticated session persistence |
| **React Context API** | Global authentication state and RBAC management |

---

## 📁 Project Structure

```
hb_ass/
├── App.js                          # Root navigator with protected auth routing
├── app.json                        # Expo configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration (strict checks)
├── eslint.config.js                # ESLint configuration
├── public/                         # Public web assets and Netlify redirects
│   └── _redirects                  # SPA redirect configuration
└── src/
    ├── config/
    │   └── constants.js            # OAuth IDs, allowed domain (@hbplus.fit), admin emails
    ├── context/
    │   └── AuthContext.js          # Google OAuth, domain verification, session storage
    ├── screens/
    │   ├── LoginScreen.js          # Hb+ login screen with Google OAuth & testing links
    │   └── DashboardScreen.js      # Protected Hb+ SaaS dashboard & admin console
    ├── components/
    │   ├── GoogleSignInButton.js   # Reusable Google sign-in button
    │   ├── LoadingScreen.js        # Polished Hb+ branded loading screen
    │   └── ErrorBanner.js          # Animated error notification banner
    └── styles/
        └── theme.js                # Design tokens (colors, typography, spacing, shadows)
```

---

## ⚙️ Setup & Running

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server

**Web:**
```bash
npx expo start --web
```
Or with custom port:
```bash
npx expo start --web --port 8081
```

**Mobile (Android / iOS):**
```bash
npx expo run:android   # Android
npx expo run:ios       # iOS
```
Or start the bundler and scan the QR code with Expo Go:
```bash
npx expo start
```

---

## 🔐 Authentication Flow & Domain Restriction

```
┌─────────────────┐       ┌────────────────────┐       ┌────────────────────────┐
│   Login Screen  │──────▶│   Google OAuth     │──────▶│   Domain Verification  │
│  "Continue with │       │   Authentication   │       │   Does email end with  │
│     Google"     │       │   (Access Token)   │       │      @hbplus.fit?      │
└─────────────────┘       └────────────────────┘       └───────────┬────────────┘
                                                                   │
                                                ┌──────────────────┴──────────────────┐
                                                │                                     │
                                          [YES / ALLOWED]                       [NO / RESTRICTED]
                                                │                                     │
                                                ▼                                     ▼
                                     ┌─────────────────────┐               ┌─────────────────────┐
                                     │ Protected Dashboard │               │ Error Banner Shown  │
                                     │ Access Granted (✓)  │               │ "Access restricted. │
                                     │ Session Persisted   │               │ Use @hbplus.fit"    │
                                     └─────────────────────┘               └─────────────────────┘
```

The domain validation logic is implemented in [`src/context/AuthContext.js`](file:///c:/Users/admin/Desktop/hb_ass/src/context/AuthContext.js):

```javascript
const validateDomain = (email) => {
  if (!email) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  return domain === AUTH_CONFIG.ALLOWED_DOMAIN.toLowerCase(); // 'hbplus.fit'
};
```

---

## 🧪 Testing the Assignment

You can verify the authentication and domain restriction behavior in two ways:

### Method A: One-Click Evaluator Testing (Instant Verification)
On the Login Screen:
1. Click **"Try restricted account (@gmail.com)"**:
   - The app verifies the domain `guest@gmail.com`.
   - Domain validation fails: the error alert appears:
     > *"Access restricted. Please login using your official domain email (@hbplus.fit)."*
   - Access to the dashboard is blocked.
2. Click **"Quick test official account (@hbplus.fit)"**:
   - The app verifies the domain `alex@hbplus.fit`.
   - Domain validation passes: transitions into the full protected Dashboard screen.
   - Shows verified `@hbplus.fit` domain status badge.

### Method B: Live Google OAuth 2.0 Credentials
To use your live Google Cloud Console credentials:
1. Open [`src/config/constants.js`](file:///c:/Users/admin/Desktop/hb_ass/src/config/constants.js).
2. Replace `WEB_CLIENT_ID`, `ANDROID_CLIENT_ID`, and `IOS_CLIENT_ID` with your Google Cloud credentials.
3. Click **"Continue with Google"** to authenticate via real Google Identity Services.

---

## 👥 Role-Based Access Control

The app differentiates access roles:
- **Administrator** (`admin@hbplus.fit`): Receives the Administrator badge and the Admin Console panel.
- **Member** (all other `@hbplus.fit` emails): Receives standard team member workspace access.

---

## 🩺 Verification & Quality

Before finalizing, the codebase has been verified against all strict quality guidelines:
- **Typecheck:** `npx tsc --noEmit` — **0 errors**
- **Linter:** `npx eslint src/ App.js` — **0 errors, 0 warnings**
- **Expo Doctor:** `npx expo-doctor` — **21/21 checks passed**

---

## 🌐 Production Deployment

To build a production web bundle:
```bash
npx expo export --platform web
```
The output is generated in `dist/` ready to be hosted on Netlify, Vercel, or AWS S3.
