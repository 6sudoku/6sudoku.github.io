/* Cache offline: nessuna rete esterna richiesta per giocare. */
const CACHE='6-sudoku-v0112';
const ASSETS=['./','./index.html','./manifest.webmanifest','./assets/style.css','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable-512.png','./assets/apple-touch-icon.png','./js/sudoku.js','./js/app.js','./js/v011-i18n.js','./js/languages.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(name=>name!==CACHE).map(name=>caches.delete(name)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));return;}
event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request)));});
