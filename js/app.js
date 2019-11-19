if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('service worker register'))
        .catch((err) => console.log('service worker doesnt exist',err))
}
else{
    console.log('error')
}

async function subscribe() {
    if (Notification.permission !== 'granted') {
        let sw = await navigator.serviceWorker.ready;
        let push = await sw.pushManager.subscribe({
            applicationServerKey: 'BEf1IWsWxpYHwvd9uKZPjCSKUtja__vryjavo1j8wqZopNhm70kWhzb6olPzKt6X196gQCsDeYMgVDXq-HY2-A4',
            userVisibleOnly: true
        });
        document.getElementById("id_token").innerHTML =JSON.stringify(push);
        console.log(JSON.stringify(push));
    }
    else
        console.log('Vous avez déjà souscrit à cette Notification')
}