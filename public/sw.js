// install event
self.addEventListener('install', (e) => {
  console.log('[Service Worker] installed');
});

// activate event
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] actived', e);
});

// fetch event
self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] fetched resource ' + e.request.url);
});

self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close(); // 알림 닫기
  const major = event.notification.title.split(' ')[0];

  event.waitUntil(
    self.clients.openWindow(
      'https://main.d1xmrqbiduo1fa.amplifyapp.com/announcement/' + major,
    ),
  );
});
