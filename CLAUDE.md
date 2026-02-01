# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Tour Guide Booking Platform** monorepo built with Better-T-Stack, combining a Next.js fullstack web application and a React Native mobile application with shared packages for database, authentication, and environment configuration.

**Domain**: Tour guide clients (admins) organize group tours and manage bookings from users through the platform.

**Package Manager**: Bun (v1.3.2)
**Build System**: Turborepo
**Linting/Formatting**: Oxlint + Oxfmt

## Development Commands

### Starting Development

```bash
# Install dependencies
bun install

# Start all applications in development mode
bun run dev

# Start only web app (runs on http://localhost:3001)
bun run dev:web

# Start only native app (Expo)
bun run dev:native
```

### Database Operations

```bash
# Start local SQLite database (Turso)
bun run db:local

# Push schema changes to database
bun run db:push

# Generate migrations
bun run db:generate

# Run migrations
bun run db:migrate

# Open Drizzle Studio (database GUI)
bun run db:studio
```

### Building and Type Checking

```bash
# Build all applications
bun run build

# Type check all workspaces
bun run check-types
```

### Linting and Formatting

```bash
# Run Oxlint and Oxfmt with auto-fix
bun run check

# Git hooks (runs lint-staged on commit)
bun run prepare
```

### Native App Specific

```bash
# Start Expo development server
cd apps/native && bun run start

# Run on Android
cd apps/native && bun run android

# Run on iOS
cd apps/native && bun run ios

# Prebuild native projects
cd apps/native && bun run prebuild
```

## Architecture

### Monorepo Structure

```
apps/
├── web/          # Next.js 16 App Router (fullstack, port 3001)
└── native/       # Expo/React Native mobile app

packages/
├── db/           # Drizzle ORM + SQLite/Turso database layer
├── auth/         # Better-Auth configuration (shared between web/native)
├── env/          # Type-safe environment variables (server, web, native)
└── config/       # Shared TypeScript configurations
```

### Key Technology Decisions

**Database**:

- SQLite/Turso with Drizzle ORM
- Database client configured in `packages/db/src/index.ts`
- Schema defined in `packages/db/src/schema/`
- Drizzle config points to `apps/web/.env` for credentials

**Authentication**:

- Better-Auth with email/password enabled
- Shared auth instance in `packages/auth/src/index.ts`
- Uses Drizzle adapter with SQLite provider
- Expo plugin for native app support
- Next.js cookies plugin for web
- Auth schema in `packages/db/src/schema/auth.ts`
- Trusted origins include web app and Expo deep links

**Admin & Organization Plugins**:

- **Admin Plugin**: Tour guides have admin role to manage all user bookings
  - User roles: `user` (default), `admin` (tour guides)
  - Admin capabilities: view all users, ban/unban users, assign roles
  - Fields: `role`, `banned`, `banReason`, `banExpires` on user table
- **Organization Plugin**: Group tours together using organizations
  - Organizations represent tour groups with members and invitations
  - Tables: `organization`, `member`, `invitation`
  - Members can have different roles within a tour group
  - Invitation system for adding users to tour groups
- Client exports:
  - Web: `packages/auth/src/client.ts`
  - Native: `packages/auth/src/native-client.ts`
  - Both export `organizationMethods` and `adminMethods` for respective features

**Environment Variables**:

- Type-safe environment validation using @t3-oss/env
- Three separate entry points: `server`, `web`, `native`
- Server env used by database and auth packages
- Environment variables defined in `apps/web/.env`

**Web App (Next.js)**:

- App Router with React Server Components
- TailwindCSS v4 with shadcn/ui components
- React 19 with React Compiler enabled
- Base UI components from @base-ui/react
- Tanstack Form for form handling
- Routes in `apps/web/src/app/`

**Native App (Expo)**:

- Expo SDK 54 with expo-router for file-based routing
- React Native 0.81.5 with React 19
- HeroUI Native for UI components
- Tailwind integration via uniwind + tailwind-variants
- Bottom sheet navigation (@gorhom/bottom-sheet)
- Drawer navigation (@react-navigation/drawer)
- Routes in `apps/native/app/`

### Workspace Dependencies

All workspaces reference shared packages using `workspace:*` protocol. Common dependencies are managed via workspace catalog in root `package.json`:

- `dotenv`, `zod`, `typescript`, `@libsql/client`, `libsql`, `better-auth`, `@better-auth/expo`

### Turborepo Configuration

Build tasks have dependency chains (`dependsOn: ["^build"]`). Development servers run persistently with cache disabled. Database operations bypass cache for data integrity.

## Important Notes

- The web app runs on port **3001**, not the default Next.js port 3000
- Database credentials are stored in `apps/web/.env` and used by Drizzle config
- Oxlint and Oxfmt run automatically on git commits via Husky + lint-staged
- All packages use TypeScript with shared config from `@rnadventure/config`
- The auth system supports both web (Next.js cookies) and native (Expo) platforms with appropriate plugins
