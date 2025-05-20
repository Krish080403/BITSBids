````markdown
# BITSBids – Frontend

This React application is the user-facing interface for BITSBids.

## Tech Stack & Versions

- **Node.js:** 18+  
- **npm:** 9+  
- **React:** 18.x (Create-React-App with React Router v6)  

## Prerequisites

1. Node.js 18+ and npm 9+ installed.  
2. Access to the Backend API (default: `http://localhost:8080/api`).

## Setup

1. **Clone and install dependencies**  
   ```bash
   cd Frontend
   npm install
````

2. **Create your environment file**

   ```bash
   cp .env.example .env
   ```

   In `.env`, set the API base URL:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   ```

### Google OAuth 2.0 Setup

1. In Google Cloud Console, create an OAuth 2.0 Client ID.
2. In `src/index.js`, locate the Google OAuth initialization and replace with your credentials:

   ```js
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import { GoogleOAuthProvider } from '@react-oauth/google';
   import App from './App';

   const clientId = 'YOUR_GOOGLE_OAUTH_CLIENT_ID';

   ReactDOM.createRoot(document.getElementById('root')).render(
     <GoogleOAuthProvider clientId={clientId}>
       <App />
     </GoogleOAuthProvider>
   );
   ```
3. Restart the app after saving.

## Running the Frontend

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000) and proxy API calls to port 8080 by default.

## Building for Production

```bash
npm run build
# Deploy the contents of build/ on Netlify, S3, or serve via Spring Boot
```

## Troubleshooting

* **Port in use:**

  ```bash
  PORT=3001 npm start
  ```
* **Failed OAuth login:**
  Ensure your Google OAuth Client ID matches and your redirect URIs include `http://localhost:3000`.

```
```
