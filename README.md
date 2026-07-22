# Alumni Connect Portal web app

This repository contains the React frontend for the Alumni Connect Portal. It provides student, alumni, mentor, and administrator views backed by the portal's HTTP API.

## Current capabilities

- Student and alumni registration/login and profile management
- Alumni and student directories
- Job discovery, posting, management, applications, and applicant review
- Mentorship discovery, requests, responses, meeting details, and status tracking
- Student/mentor chat and notifications
- Administrator dashboard, alumni search/filtering, profile review, and Excel/PDF export

## Technology

- React 19
- React Router
- Create React App / `react-scripts`
- Fetch-based API client configuration in `src/api.js`
- React Testing Library

## Prerequisites

- Node.js and npm
- A compatible Alumni Connect Portal API instance

## Configure the API

Create a local environment file:

```bash
cp .env.example .env
```

Set `REACT_APP_API_URL` to the backend's base URL. Restart the development
server after changing environment variables. The committed example and API
fallbacks contain deployment-specific URLs, so review/override them for the
target environment. Do not commit a local `.env` file or any secrets.

## Install and run

```bash
npm ci
npm start
```

The development server opens at `http://localhost:3000` by default.

## Available commands

```bash
npm start
npm test
npm run build
```

`npm run build` creates an optimised production bundle in `build/`.

## Project layout

- `src/App.js` — route definitions
- `src/api.js` — API base URL resolution
- `src/components/` — authentication, profiles, jobs, mentorship, chat, and administrator screens
- `src/App.test.js` — current frontend test entry point
- `public/` — static application assets

## Current security limitations

Authentication state and role information are currently handled in browser storage, and the administrator login screen contains prototype-only client-side logic. Do not treat client-side role checks as authorization. A production deployment must enforce authentication and authorization in the backend and replace any demo login behaviour.

## Verification

Run the test suite and production build before submitting changes:

```bash
CI=true npm test -- --watchAll=false
npm run build
```

The checked-in `src/App.test.js` is still the Create React App placeholder and
asserts text that the current application does not render, so the non-watch test
command currently fails until that test is replaced with portal-specific
coverage. Treat this as a validation blocker, not a passing project check.

Also verify the changed role flows against a non-production API, including direct navigation and failed API responses.
