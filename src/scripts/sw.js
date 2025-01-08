import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, NetworkOnly } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);
registerRoute(
  ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev',
  new NetworkFirst({
    cacheName: 'restaurant-api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  })
);


registerRoute(
  ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev/images',
  new CacheFirst({
    cacheName: 'restaurant-image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);


const bgSyncPlugin = new BackgroundSyncPlugin('restaurant-review-sync', {
  maxRetentionTime: 24 * 60,
});

registerRoute(
  ({ url }) => url.pathname.startsWith('/review'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

registerRoute(
  ({ request }) =>
    request.destination === 'style' || request.destination === 'script',
  new CacheFirst({
    cacheName: 'static-assets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);


registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: 'page-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);
