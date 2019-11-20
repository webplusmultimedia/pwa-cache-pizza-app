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
        document.getElementById("id_token").innerHTML ='Vous avez déjà souscrit à cette Notification';
}

let deferredPrompt;
const addBtn = document.getElementById('add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});