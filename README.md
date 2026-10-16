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
- [Installation and Local Setup](#installation-and-local-setup)
- [Authentication and Domain Restriction Flow](#authentication-and-domain-restriction-flow)
- [Assignment Evaluation and Testing Modes](#assignment-evaluation-and-testing-modes)
- [Role-Based Access Control](#role-based-access-control)
- [Code Quality and Verification](#code-quality-and-verification)

---

## Features

- **Google OAuth 2.0 Integration**: Authentication handled via Expo AuthSession.
- **Domain Restriction**: Enforces access exclusively for emails ending in `@hbplus.fit`.
- **Restricted Domain Handling**: Non-allowed domains (e.g., `@gmail.com`) trigger an informative error alert with access denied.
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
| Session Storage | AsyncStorage | 2.2.0 | Encrypted persistent client-side state storage |
| State Management | React Context API | React 19 | Global authentication state and session handlers |
| Type Safety | TypeScript | 6.0.3 | Strict type definitions and compile checks |
| Code Quality | ESLint (Flat Config) | 9.0.0 | Code quality, hook verification, and linting |

---

## Project Structure

```
hb_ass/
├── App.js                          # Root navigator implementing protected routing
├── app.json                        # Expo application manifest and configuration
├── package.json                    # Project dependencies and operational scripts
├── tsconfig.json                   # Strict TypeScript compiler configuration
├── eslint.config.js                # Flat ESLint configuration file
├── public/
│   └── _redirects                  # Single-page application (SPA) web routing redirect rules
└── src/
    ├── config/
    │   └── constants.js            # OAuth client IDs, allowed domain, and role lists
    ├── context/
    │   └── AuthContext.js          # Authentication provider, session lifecycle, and domain validator
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

## Installation and Local Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/vanshsinghn1-spec/hbplus-auth.git
cd hbplus-auth
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server

To run on Web:
```bash
npx expo start --web
```
Or specify a custom port:
```bash
npx expo start --web --port 8081
```

To run on Mobile (requires Android Studio emulator or Xcode simulator):
```bash
npx expo run:android   # Android
npx expo run:ios       # iOS
```

Alternatively, run `npx expo start` and scan the terminal QR code with the Expo Go mobile application.

---

## Authentication and Domain Restriction Flow

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
                                         └─────────────────────┘               └─────────────────────┘
```

The domain validation check is executed in `src/context/AuthContext.js`:

```javascript
const validateDomain = (email) => {
  if (!email) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  return domain === AUTH_CONFIG.ALLOWED_DOMAIN.toLowerCase(); // 'hbplus.fit'
};
```

If the domain matches, the user object is stored in AsyncStorage and global state transitions to authenticated. If the domain does not match, state updates to show the restriction message and no protected routes are unlocked.

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
