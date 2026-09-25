import { getAssetPath } from './assets';

const CACHE_NAME = 'wedding-invitation-cache-v2';

const CRITICAL_IMAGES = [
  'assets/Basti&Ambiya11.webp',
  'assets/opening-circle-logo.webp',
  'assets/page 1.webp',
  'assets/Basit&Ambiya11.webp',
  'assets/Basit&Ambiya11.png',
  'assets/page2.webp',
  'assets/page 2(oct 29).webp',
  'assets/page3( 30 oct).webp',
  'assets/page 4 (2 Nov).webp',
  'assets/SSG09645-C19LQ60y.webp',
  'assets/SSG00440-Dz91S7X0.webp',
  'assets/012-B2BcXKfQ.webp',
];

/**
 * Preloads critical wedding images into the browser Cache API
 * and pre-decodes them in GPU memory for instantaneous opening.
 */
export async function preloadCriticalWeddingAssets(): Promise<void> {
  // Pre-decode with Image constructor for instant rendering in memory
  if (typeof window !== 'undefined') {
    CRITICAL_IMAGES.forEach((relPath) => {
      const fullUrl = getAssetPath(relPath);
      const img = new Image();
      img.src = fullUrl;
      if ('decode' in img) {
        img.decode().catch(() => {
          // Ignore non-fatal decode errors
        });
      }
    });

    // Populate Browser CacheStorage (Cache API) for instant zero-latency reloading
    if ('caches' in window) {
      try {
        const cache = await window.caches.open(CACHE_NAME);
        const urlsToCache = CRITICAL_IMAGES.map((p) => getAssetPath(p));
        // Cache in background without blocking main thread
        await Promise.allSettled(
          urlsToCache.map(async (url) => {
            const match = await cache.match(url);
            if (!match) {
              const res = await fetch(url, { cache: 'force-cache' });
              if (res.ok) {
                await cache.put(url, res);
              }
            }
          })
        );
      } catch {
        // Cache API fallback ignored safely
      }
    }
  }
}
