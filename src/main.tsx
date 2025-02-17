import React, {useEffect} from 'react'
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import {createRoot} from 'react-dom/client'
import * as Sentry from '@sentry/react';
import ReactGA from "react-ga4";
import App from './App.tsx'

import './index.css'

if (process.env.NODE_ENV === 'production') {
  // Initialize Sentry
  Sentry.init({
    dsn: 'https://6bc23830d5b174c223efcd1261f17571@o4506213122965504.ingest.sentry.io/4506241198718976',
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration(),
    ],
    allowUrls: [/(http|ws)s?:\/\/((cdn|www)\.)?sidematch\.com/],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    tracePropagationTargets: ['localhost', /^https:\/\/sidematch\.com\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });

  // initialize Google Analytics
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
}


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
