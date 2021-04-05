// サーバーを提供してくれるらしい、出力されるjsonをendpointに張り付ける
// https://web-push-codelab.glitch.me/
const server_url = 'https://us-central1-deductive-reach-224309.cloudfunctions.net/test-function';
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
            let response = await (await fetch(server_url)).json();
            // const vapidPublicKey = 'BCt8XOH2NWG6wSvccyFu4XMjVR-9D64ZOrmXjnwrVc4UsP77ZiIUcvsvu8wZ3bvX4G3bBdwzsHIfGFi-pVKF2YQ';
            const vapidPublicKey = response['publicKey'];

            const convertedVapidKeu = urlBase64ToUint8Array(vapidPublicKey);

            return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKeu
            });
        });
    }).then((subscription)=>{
        //バックエンドに登録を送信するためのやつ
        console.log('subscription method');
        
        console.log(JSON.stringify(subscription));
        
        let headers = new Headers();
        headers.set('content-type','application/json');

        fetch(server_url,{
            headers,
            method: 'POST',
            body: JSON.stringify(subscription)
        });

    });
}
// https://gist.github.com/Klerith/80abd742d726dd587f4bd5d6a0ab26b6
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4-base64String.lentgh %4) %4);
    const base64 = (base64String + padding)
        .replace(/\-/g,'+').replace(/_/g,'/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}