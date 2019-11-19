if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('service worker register'))
        .catch((err) => console.log('service worker doesnt exist',err))
}
else{
    console.log('error')
}
