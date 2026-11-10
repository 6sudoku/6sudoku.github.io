/* 6 Sudoku ufficiale v0.12.4 — compatibilità PWA TEST, nessuna modifica ai dati. */
const CACHE='6-sudoku-v0124-compat1';
const FILES=['./','./index.html','./manifest.webmanifest','./css/style.css','./js/sudoku.js','./js/languages.js','./js/app.js','./assets/icon-192.png','./assets/icon-512.png','./assets/apple-touch-icon.png'];
const OWN_PATHS=new Set(['/','/index.html','/manifest.webmanifest','/css/style.css','/js/sudoku.js','/js/languages.js','/js/app.js','/assets/icon-192.png','/assets/icon-512.png','/assets/apple-touch-icon.png']);
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
 // La correzione può sostituire il worker vecchio senza attendere l'UI di aggiornamento.
 self.skipWaiting();
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(
  keys.filter(k=>k.startsWith('6-sudoku-')&&!k.startsWith('6-sudoku-test-')&&k!==CACHE).map(k=>caches.delete(k))
 )).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 // Fondamentale: lascia passare tutte le richieste della TEST, anche le navigazioni.
 if(!OWN_PATHS.has(url.pathname))return;
 if(event.request.mode==='navigate'){
  event.respondWith(caches.match('./index.html').then(cached=>cached||fetch(event.request)));
  return;
 }
 event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(hit=>hit||fetch(event.request)));
});
