self.addEventListener('fetch',function(e) {
    //空でもokらしい
});

// 愚直に実装するならこっちhttps://mdn.github.io/pwa-examples/js13kpwa/
// ファイブラリのインポート
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

// ファイルのキャッシュ
workbox.precaching.precacheAndRoute([
  {
    url: 'index.html',
    revision: '1'
  },
  {
    url: 'style.css',
    revision: '1'
  },
  { 
　url: 'color.js',
    revision: '1'
  },
])