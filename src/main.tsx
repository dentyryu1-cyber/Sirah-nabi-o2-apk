import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

if (import.meta.env.DEV) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        for (const reg of registrations) {
          const scriptUrl =
            reg.active?.scriptURL ||
            reg.installing?.scriptURL ||
            reg.waiting?.scriptURL ||
            '';
          if (scriptUrl.includes('dev-sw')) {
            reg.unregister().catch(() => {});
          }
        }
      })
      .catch(() => {});
  }
  if ('caches' in window) {
    caches
      .keys()
      .then((keys) => {
        for (const key of keys) {
          if (key.includes('workbox')) {
            caches.delete(key).catch(() => {});
          }
        }
      })
      .catch(() => {});
  }
} else if (import.meta.env.VITE_CAPACITOR !== 'true') {
  if ('serviceWorker' in navigator) {
    const hadController = Boolean(navigator.serviceWorker.controller);
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  }
  registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        registration.update().catch(() => {});
      }
    },
  });
}

createRoot(document.getElementById('root')!).render(<App />);
