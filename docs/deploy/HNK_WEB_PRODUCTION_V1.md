# HNK Web Production V1

**Status:** PRODUCTION WEB LIVE · PROOF MODE  
**Date:** 2026-09-03  
**Vercel project:** `codex-hnk-app`  
**Project ID:** `prj_mYZ4jhXE4nxDDrRziPraWKL7J1Aq`  
**Canonical production origin:** `https://codex-hnk-app.vercel.app`

## Verified production routes

The first real Next.js production surface replaced the static Release Candidate marker.

Verified HTTP 200:

- `/`
- `/day-001`
- `/boards/kether`

The production build used Next.js 16.3.3 and generated all three routes successfully.

## Current product state

### `/`
Real Kether entry surface with navigation to Day 001 and the Kether board.

### `/day-001`
Interactive Day 001 production proof implementing the progressive Kether sequence. The page explicitly identifies itself as:

`WEB PRODUCTION · PROOF MODE · SUPABASE LIVE ENV PENDING`

This is intentional. No private journal text is persisted and the web Vault completion remains blocked until the E2EE Web policy is frozen.

### `/boards/kether`
Published Kether chapter overview with seven cycles and Portal 036.

## Security boundary

The direct deployment connector rejected production promotion when the Supabase frontend publishable key was carried as a deployment file. The project therefore does **not** embed or disguise credentials in the production transport bundle.

The production web surface remains in proof/offline mode until Vercel project Environment Variables are configured through the platform's environment-variable mechanism:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Only the frontend publishable key is allowed. `service_role` is forbidden in web/mobile.

## Auth boundary

Supabase Auth still requires dashboard configuration:

- Site URL: `https://codex-hnk-app.vercel.app`
- Additional Redirect URL: `https://codex-hnk-app.vercel.app/day-001`
- Additional Redirect URL: `hnk://auth/callback`

Hosted Auth smoke remains open in issue #15 until a tester-controlled inbox completes the public confirmation flow.

## Deployment note

The Vercel project is not yet linked to GitHub (`link: null`). The first production deployment was performed through the connected Vercel deployment API using a transport bundle derived from the validated `apps/web` source.

GitHub remains the source of application code. A future deployment integration must remove the manual transport layer and deploy the monorepo reproducibly from `main` without weakening CI or workspace boundaries.
