/* Blackwood Movie Log V7.8.7
   Always fetch current app HTML. Never serve stale HTML from an old PWA cache.
   Do not force reload of an already open client or skipWaiting automatically.
*/
const CACHE='blackwood-v7.8.7-assets';
self.addEventListener('install',event=>{event.waitUntil(Promise.resolve())});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith('blackwood-')&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin)return;
 if(req.mode==='navigate'||req.destination==='document'||/\/(?:index\.html)?$/.test(url.pathname)){
  event.respondWith(fetch(new Request(req,{cache:'no-store'})).catch(()=>new Response(
   '<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><body style="background:#16191f;color:#fff;font:16px sans-serif;padding:24px"><h2>Blackwood Movie Log is offline</h2><p>Reconnect to load the latest version. Your saved library has not been cleared.</p></body></html>',
   {headers:{'Content-Type':'text/html;charset=utf-8'}})));
  return;
 }
 event.respondWith(fetch(req).catch(()=>caches.match(req)));
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
