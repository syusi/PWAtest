Notification.requestPermission().then((result) =>{
    if (result == 'granted') {
        testNotification();
    } else if (result == 'denied') {
        console.log('notificatin denied');
    } else if (result == 'default'){
        console.log('notificatin ignored');
    }
});

function testNotification(params) {
    const title = "New Notification!!";

    const option = {
        body: 'Test notification desu!!',
        icon: 'icons/icon-192x192.png'
    }

    new Notification(title,option);
}