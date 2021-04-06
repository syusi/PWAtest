
// 愚直に実装するならこっちhttps://mdn.github.io/pwa-examples/js13kpwa/
// ファイブラリのインポート
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// ファイルのキャッシュ
workbox.precaching.precacheAndRoute([
  {
    url: 'index.html',
    revision: '2'
  },
  {
    url: 'style.css',
    revision: '1'
  },
  { 
　  url: 'color.js',
    revision: '2'
  },
  {
    url: 'notification.js',
    revision: '1'
  }
]);

//インストール時のイベント、キャッシュとか色々ここで確保できる。
self.addEventListener('install',(event)=>{
  console.log('[Service Worker] Install');

  //キャッシュを手動で行うならこんな感じ
  // event.waitUntil(
  //   caches.open('testcache-v1').then((cache)=>{
  //       console.log('Service Worker] caching all; app shell and content');
  //       return cache.addAll(contentCachelist);
  //   })
  // )
});

//アクティベーション
self.addEventListener('activate',(event) =>{
  console.log('[Service worker] Activate');
});

//ここでのselfは自分自身、つまりsw.jsの事らしい。登録するとそのままオブジェクトになる？
//何かを取りに行こうとするときに呼ばれる。ここで加工が可能になる。
self.addEventListener('fetch',function(e) {
  //空でもokらしい
  console.log('fetch URL'+e.request.url);
});

// プッシュ通知を受け取った時
// そのままnotificationはダメ見たいですね。どうやらregistrationが必要みたい。
self.addEventListener('push',function (event) {
  console.log(`[Service worker] push Received. Data: "${event.data.text()}"`);

  try {
    payload = JSON.parse(event.data.text());    
  } catch (error) {
    console.log(error.toString());
  }

  event.waitUntil(
    self.registration.showNotification(payload.title,{
      body: payload.body,
      icon: payload.icon,
      url: payload.url
    })

  );
});

// 通知をクリックしたとき(serviceworker経由の奴でないと発火しないらしい)
self.addEventListener('notificationclick',function(event) {
  console.log('[Service worker] Notification click Received');

  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://www.google.com")
  );
});