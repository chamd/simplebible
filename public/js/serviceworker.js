const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',                     // 홈 페이지
  '/index.html',           // 메인 HTML 파일
  '/css/main.css',         // 메인 CSS 파일
  '/css/nav_main.css',     // 네비게이션 관련 CSS 파일
  '/css/nav_search.css',
  '/css/nav_setting.css',
  '/css/nav.css',
  '/data/bibles.js',       // 데이터 파일
  '/data/books.js',
  '/data/navs.js',
  '/font/NanumSquareNeo-bRg.ttf', // 폰트 파일
  '/font/NanumSquareNeo-dEb.ttf',
  '/font/Pretendard-Bold.ttf',
  '/font/Pretendard-ExtraBold.ttf',
  '/font/Pretendard-Medium.ttf',
  '/icon/icon-192x192.png', // PWA 아이콘 파일
  '/icon/icon-512x512.png',
  '/js/main.js',           // JavaScript 파일
  '/js/search.js',
  '/js/swipe.js'
];

// 설치 단계: 캐시할 파일들을 지정합니다.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 활성화 단계: 이전 버전의 캐시를 삭제합니다.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 네트워크 우선 전략: 네트워크에서 요청을 시도하고, 실패 시 캐시된 파일을 제공합니다.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => caches.match(event.request))
  );
});
