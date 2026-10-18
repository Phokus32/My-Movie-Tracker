/* Blackwood Movie Log V7.8.9: avoid stale HTML and unsolicited reloads. */
const CACHE='blackwood-v7.8.9-assets';
self.addEventListener('install',event=>{event.waitUntil(Promise.resolve())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>k.startsWith('blackwood-')&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
})())});
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);if(url.origin!==self.location.origin)return;
 if(req.mode==='navigate'||req.destination==='document'){
  event.respondWith(fetch(new Request(req,{cache:'no-store'})));
  return;
 }
 event.respondWith(fetch(req).catch(()=>caches.match(req)));
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
