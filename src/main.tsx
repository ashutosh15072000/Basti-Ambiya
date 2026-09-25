import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { preloadCriticalWeddingAssets } from './utils/assetPreloader';

// Trigger instant background preloading and caching of wedding invitation assets
preloadCriticalWeddingAssets();

if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // Ignore worker registration errors in strict sandbox
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
