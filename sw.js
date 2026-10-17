/* Blackwood Movie Log service worker 7.7.24 - network-first HTML, offline fallback. */
const BW_SW_VERSION='7.7.24';
const SHELL='blackwood-shell-'+BW_SW_VERSION;
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(SHELL);
  try{const response=await fetch(new Request('./index.html',{cache:'reload'}));if(response.ok)await cache.put('./index.html',response.clone())}catch(e){}
  await self.skipWaiting();
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith('blackwood-shell-')&&k!==SHELL).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 if(request.mode==='navigate'||url.pathname.endsWith('/index.html')){
  event.respondWith((async()=>{
   try{
    const response=await fetch(new Request(request,{cache:'no-store'}));
    if(response.ok){const cache=await caches.open(SHELL);await cache.put('./index.html',response.clone())}
    return response;
   }catch(e){const cache=await caches.open(SHELL);return await cache.match('./index.html')||Response.error()}
  })());
 }
});
