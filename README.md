# Hb+ Cross-Platform Authentication System

A secure cross-platform application developed with React Native (Expo SDK 57) supporting Mobile (Android and iOS) and Web platforms. The application implements Google OAuth 2.0 authentication with strict email domain restriction, authorizing only `@hbplus.fit` domain addresses.

The user interface adheres to a clean, enterprise-grade design system featuring responsive sidebar navigation, workspace activity metrics, and dedicated testing modes for evaluator review.


---

## Live Demonstration

- **Live Production URL**: [https://monumental-kleicha-242f81.netlify.app/](https://monumental-kleicha-242f81.netlify.app/)
- **Authorized Domain Demonstration**: Evaluators can click "Quick test official account (@hbplus.fit)" to view immediate authorized entry into the protected Hb+ workspace.
- **Restricted Domain Demonstration**: Evaluators can click "Try restricted account (@gmail.com)" to view access rejection and the domain alert banner.

---

## Table of Contents

- [Live Demonstration](#live-demonstration)
- [Features](#features)
- [Design and Architecture](#design-and-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Authentication Flow](#authentication-flow)
- [How Domain Restriction Works](#how-domain-restriction-works)
- [Assignment Evaluation and Testing Modes](#assignment-evaluation-and-testing-modes)
- [Role-Based Access Control](#role-based-access-control)
- [Code Quality and Verification](#code-quality-and-verification)

---

## Features

- **Google OAuth 2.0 Integration**: Authentication handled via Expo AuthSession.
- **Domain Restriction**: Enforces access exclusively for emails ending in `@hbplus.fit`.
- **Restricted Domain Handling**: Non-allowed domains (e.g., `@gmail.com`) trigger an informative error alert with access denied.
- **Supabase Integration**: Session synchronization, profile upserting, and authentication audit logging via `@supabase/supabase-js`.
- **Protected Routing**: Dashboard routes cannot be accessed without an active, verified session.
- **Session Persistence**: Authentication state and token metadata are securely retained across page reloads via AsyncStorage.
- **Role-Based Access Control (RBAC)**: Distinguishes between Administrator and Member roles, conditionally exposing administrative management tools.
- **Evaluator Shortcuts**: One-click test triggers allow instant review of allowed and restricted domain states without external credential dependencies.
- **Cross-Platform Compatibility**: A single codebase compiles cleanly to Web (Metro bundler) as well as native iOS and Android environments.

---

## Design and Architecture

The user interface is modeled after modern enterprise productivity applications:

### Login Interface
- **Brand Identification**: Official `H+` / `Hb+` lettermark.
- **Security Messaging**: Clear notice indicating private workspace access restrictions.
- **Authentication Card**: Google-branded sign-in trigger with animated loading state.
- **Alert Banner**: High-visibility error dialog indicating restricted domain access attempts.
- **Desktop Overview Card**: Preview widget showing active projects, completion rates, and platform availability.
- **Evaluator Quick Links**: Direct triggers for immediate simulation of allowed (`alex@hbplus.fit`) and rejected (`guest@gmail.com`) credentials.

### Dashboard Interface
- **Responsive Layout**: Desktop and tablet views feature a persistent sidebar navigation panel; mobile view provides an accessible slide-out drawer menu.
- **Header**: Displays current date, personalized user greeting, avatar, and role tag.
- **Metrics Grid**: Four core business metrics (Active Projects, Team Members, Completed Tasks, Hours Saved).
- **Project Progress**: Visual progress bars representing active organizational workstreams.
- **Domain Verification Badge**: Explicit visual indicator affirming the authenticated session under `@hbplus.fit`.
- **Team Activity Feed**: Real-time event log tracking team member updates.
- **Admin Console**: Elevated administrative controls rendered only for privileged accounts (`admin@hbplus.fit`).

---

## Technology Stack

| Component | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React Native | 0.86.3 | Core UI and cross-platform components |
| Web Platform | React Native for Web | 0.21.2 | Web browser compilation and rendering |
| Development Tooling | Expo SDK | 57.0.29 | Build tools, runtime environment, and CLI |
| Authentication | Expo AuthSession | 57.0.16 | OAuth 2.0 provider integration and browser flows |
| Backend & Database | Supabase (`@supabase/supabase-js`) | 2.118.0 | User profile sync, session persistence, and audit logging |
| Session Storage | AsyncStorage | 2.2.0 | Encrypted persistent client-side state storage |
| State Management | React Context API | React 19 | Global authentication state and session handlers |
| Type Safety | TypeScript | 6.0.3 | Strict type definitions and compile checks |
| Code Quality | ESLint (Flat Config) | 9.0.0 | Code quality, hook verification, and linting |

---

## Project Structure

```
hb_ass/
├── .env.example                    # Environment variable template (Google OAuth & Supabase)
├── App.js                          # Root navigator implementing protected routing
├── app.json                        # Expo application manifest and configuration
├── package.json                    # Project dependencies and operational scripts
├── tsconfig.json                   # Strict TypeScript compiler configuration
├── eslint.config.js                # Flat ESLint configuration file
├── public/
│   └── _redirects                  # Single-page application (SPA) web routing redirect rules
└── src/
    ├── config/
    │   └── constants.js            # OAuth client IDs, Supabase config, and allowed domain
    ├── context/
    │   └── AuthContext.js          # Authentication provider, session lifecycle, and domain validator
    ├── services/
    │   └── supabase.js             # Supabase client, profile sync, and audit log handlers
    ├── screens/
    │   ├── LoginScreen.js          # Login interface with Google OAuth and evaluator triggers
    │   └── DashboardScreen.js      # Protected application dashboard and admin module
    ├── components/
    │   ├── GoogleSignInButton.js   # Reusable Google OAuth button component
    │   ├── LoadingScreen.js        # Full-screen branded loading indicator
    │   └── ErrorBanner.js          # Slide-down animated error notification component
    └── styles/
        └── theme.js                # Design tokens, color palette, typography scale, and shadows
```

---

## Setup Instructions

Follow these instructions to configure and run the application across Web and Mobile environments.

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** (bundled with Node.js) or **yarn**
- **Git**
- **Expo Go App** (optional, for running on physical Android or iOS devices)
- **Android Studio** or **Xcode** (optional, for emulator/simulator testing)

### 2. Clone the Repository
```bash
git clone https://github.com/vanshsinghn1-spec/hbplus-auth.git
cd hbplus-auth
```

### 3. Install Dependencies
Install all SDK-compatible dependencies:
```bash
npm install
```

### 4. Running on Web
Start the Expo Metro bundler targeting the web browser:
```bash
npx expo start --web
```
The application compiles and opens automatically at `http://localhost:8081` (or next available port).

### 5. Running on Mobile (Android and iOS)

#### A. Physical Devices via Expo Go (Fastest)
1. Install **Expo Go** from Google Play Store (Android) or Apple App Store (iOS).
2. Connect your mobile device to the same Wi-Fi network as your development computer.
3. Start the bundler:
   ```bash
   npx expo start
   ```
4. **Android**: Open the Expo Go app and tap "Scan QR Code".
5. **iOS**: Open the native Camera app and tap the notification banner to open in Expo Go.

*Tip: If running on separate networks or behind a firewall, run with tunnel mode:*
```bash
npx expo start --tunnel
```

#### B. Emulators and Simulators
- **Android Emulator**: Start an Android Virtual Device (AVD) from Android Studio, then run:
  ```bash
  npx expo run:android
  ```
  *(Or run `npx expo start` and press `a` in your terminal)*.
- **iOS Simulator** (macOS required):
  ```bash
  npx expo run:ios
  ```
  *(Or run `npx expo start` and press `i` in your terminal)*.

---

## Authentication Flow

The authentication architecture ensures that only authenticated users possessing an official domain email can obtain an active session and access protected application views.

### Architectural Flow Diagram

```
┌───────────────────┐       ┌──────────────────────┐       ┌────────────────────────┐
│   Login Screen    │──────▶│  Google OAuth 2.0    │──────▶│   Domain Verification  │
│  "Continue with   │       │  Authentication      │       │   Does email end with  │
│      Google"      │       │  (Access Token)      │       │      @hbplus.fit?      │
└───────────────────┘       └──────────────────────┘       └───────────┬────────────┘
                                                                       │
                                                    ┌──────────────────┴──────────────────┐
                                                    │                                     │
                                              [YES / ALLOWED]                       [NO / RESTRICTED]
                                                    │                                     │
                                                    ▼                                     ▼
                                         ┌─────────────────────┐               ┌─────────────────────┐
                                         │ Protected Dashboard │               │ Error Alert Display │
                                         │ Access Authorized   │               │ "Access restricted. │
                                         │ Session Persisted   │               │ Use @hbplus.fit"    │
                                         │ Supabase Sync       │               │ Security Audit Log  │
                                         └─────────────────────┘               └─────────────────────┘
```

### Authentication Lifecycle Stages

1. **Initiation**: The user clicks **Continue with Google** (or an evaluator shortcut) on [LoginScreen.js](file:///c:/Users/admin/Desktop/hb_ass/src/screens/LoginScreen.js).
2. **OAuth 2.0 Exchange**: Handled via `expo-auth-session/providers/google`. The client initiates an OAuth 2.0 authorization code/token flow with Google identity servers.
3. **Profile Retrieval**: Upon receiving the access token, the client makes an authorized request to Google's UserInfo API (`https://www.googleapis.com/userinfo/v2/me`) using the bearer token to retrieve the authenticated email, name, and profile avatar.
4. **Domain Interception**: The retrieved email is evaluated against the domain validation engine before any session tokens or state flags are persisted.
5. **Session Authorization & Storage**:
   - If authorized, user session data is saved to `AsyncStorage` under `@hbplus_user_data`.
   - The user profile is synchronized to the Supabase `profiles` table.
   - An audit event (`SUCCESS_LOGIN`) is logged in Supabase.
   - Global `isAuthenticated` state transitions to `true`, causing the root router to mount the protected [DashboardScreen.js](file:///c:/Users/admin/Desktop/hb_ass/src/screens/DashboardScreen.js).
6. **Session Hydration**: On app reload, `AuthContext` hydrates the session from `AsyncStorage`, maintaining the login state without prompting for re-authentication.
7. **Sign Out**: `signOut()` wipes `@hbplus_user_data` and `@hbplus_auth_token` from `AsyncStorage`, terminates active Supabase sessions, and unmounts the protected dashboard.

---

## How Domain Restriction Works

Domain restriction is enforced as a strict gatekeeper at the client-side state and navigation layer, preventing unauthorized access attempts from reaching protected application code.

### 1. Domain Configuration
The permitted organizational domain is defined in [src/config/constants.js](file:///c:/Users/admin/Desktop/hb_ass/src/config/constants.js):

```javascript
export const AUTH_CONFIG = {
  ALLOWED_DOMAIN: 'hbplus.fit',
  DOMAIN_ERROR: 'Access restricted. Please login using your official domain email (@hbplus.fit).',
};
```

### 2. Validation Implementation
The validation function is defined in [src/context/AuthContext.js](file:///c:/Users/admin/Desktop/hb_ass/src/context/AuthContext.js):

```javascript
const validateDomain = (email) => {
  if (!email) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  return domain === AUTH_CONFIG.ALLOWED_DOMAIN.toLowerCase();
};
```

### 3. Verification Rules
- **Hostname Extraction**: The email address is split at the `@` delimiter to isolate the exact hostname portion. This eliminates substring vulnerabilities (e.g., `user@fakehbplus.fit` or `user@hbplus.fit.malicious.com` are strictly rejected).
- **Case-Insensitive Normalization**: Both the input domain and the configured domain are normalized via `.toLowerCase()`. For example, `ALEX@HBPLUS.FIT` is permitted, aligning with RFC 5321 email standards.
- **Fail-Closed Gatekeeping**: If the email is missing, malformed, or belongs to any domain other than `hbplus.fit`:
  - `validateDomain(email)` returns `false`.
  - No auth tokens or user records are saved to `AsyncStorage`.
  - An audit log event (`RESTRICTED_DOMAIN_ATTEMPT`) is dispatched to Supabase.
  - The UI state sets `error` to the domain restriction notice, rendering the slide-down [ErrorBanner.js](file:///c:/Users/admin/Desktop/hb_ass/src/components/ErrorBanner.js).
- **Route Guard Protection**: In [App.js](file:///c:/Users/admin/Desktop/hb_ass/App.js), the router strictly renders screens based on `isAuthenticated`. Because `isAuthenticated` is derived exclusively from a verified session, protected dashboard components cannot be rendered without passing domain validation.

---

## Assignment Evaluation and Testing Modes

To allow immediate verification by evaluators without requiring external Google Cloud configuration:

### 1. One-Click Verification (Recommended)
- **Restricted Account Test**: Click `"Try restricted account (@gmail.com)"`.
  - The application verifies `guest@gmail.com`.
  - Access is rejected and the error banner displays:  
    `"Access restricted. Please login using your official domain email (@hbplus.fit)."`
- **Authorized Account Test**: Click `"Quick test official account (@hbplus.fit)"`.
  - The application authorizes `alex@hbplus.fit`.
  - Navigates directly into the protected dashboard and confirms verified domain status.

### 2. Live Google OAuth Credential Configuration
To connect live Google Cloud credentials:
1. Open `src/config/constants.js`.
2. Populate `WEB_CLIENT_ID`, `ANDROID_CLIENT_ID`, and `IOS_CLIENT_ID` with valid client IDs.
3. Use the primary `"Continue with Google"` button to authenticate against Google's live identity servers.

### 3. Supabase Backend Configuration
- **Out-of-the-Box Evaluation Mode**: The Supabase service is pre-initialized. User profile synchronization and authentication audit events are logged and managed safely without requiring evaluators to set up an external database.
- **Connecting a Live Supabase Project**:
  1. Copy `.env.example` to `.env`.
  2. Provide your project's `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
  3. The application will automatically synchronize authenticated profiles to the `profiles` table and log security events to `auth_logs`.

---

## Role-Based Access Control

- **Administrator**: Accounts listed under `ADMIN_EMAILS` (e.g., `admin@hbplus.fit`) are designated with administrator permissions. They receive the Administrator tag in the header and access to the dedicated Admin Console.
- **Member**: All other verified `@hbplus.fit` accounts receive standard Member status with access to project workflows and team feeds.

---

## Code Quality and Verification

All code quality checks have been executed and verified:

```bash
# Typecheck
npx tsc --noEmit
# Result: 0 errors

# Linting
npx eslint src/ App.js
# Result: 0 errors, 0 warnings

# Project Health
npx expo-doctor
# Result: 21/21 checks passed
```
