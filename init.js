// サーバーを提供してくれるらしい
// https://web-push-codelab.glitch.me/

// ServiceWorkerの登録
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then((reg) => {
        console.log('Service worker registered.',reg);
    });

    //サブスクリプションの検出？というか登録？
    navigator.serviceWorker.ready.then((registration)=>{
        return registration.pushManager.getSubscription().then(async(subscription)=>{

            if (subscription) {
                return subscription;
            }

            // const response = await fetch('./vapidPublicKey');
            // const vapidPublicKey = await response.text();
            const vapidPublicKey = 'BCt8XOH2NWG6wSvccyFu4XMjVR-9D64ZOrmXjnwrVc4UsP77ZiIUcvsvu8wZ3bvX4G3bBdwzsHIfGFi-pVKF2YQ';

            const convertedVapidKeu = urlBase64ToUint8Array(vapidPublicKey);

            return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKeu
            });
        });
    }).then((subscription)=>{

        console.log('subscription method');

    });
}
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4-base64String.lentgh %4) %4);
    const base64 = (base64String + padding)
        .replace(/\-/g,'+').replace(/\-/g,'+');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}