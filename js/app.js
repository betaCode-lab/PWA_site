if('serviceWorker' in navigator){
    console.log('It has service worker');
    navigator.serviceWorker.register('./js/sw.js')
        .then(res => console.log('serviceWorker loaded successfully'))
        .catch(err => console.log('something wents wrong loading sw', err));
} else {
    console.log('No existe');
}