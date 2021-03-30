Notification.requestPermission().then((result) =>{
    if (result == 'granted') {
        testNotification('first');
    } else if (result == 'denied') {
        console.log('notificatin denied');
    } else if (result == 'default'){
        console.log('notificatin ignored');
    } else {
        testNotification('else');
    }
    console.log('request permission run');
});

function testNotification(params) {
    const title = "New Notification!!";

    const option = {
        body: 'Test '+params+' notification desu!!',
        icon: 'icons/icon-192x192.png'
    }

    new Notification(title,option);
}