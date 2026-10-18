/* Blackwood Movie Log V7.8.8 */
const CACHE='blackwood-v7.8.8-assets';
self.addEventListener('install',e=>{e.waitUntil(Promise.resolve())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('blackwood-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;if(r.mode==='navigate'||r.destination==='document'){e.respondWith(fetch(new Request(r,{cache:'no-store'})).catch(()=>new Response('<h2>Offline</h2><p>Reconnect to load Blackwood Movie Log. Your local data has not been cleared.</p>',{headers:{'Content-Type':'text/html'}})));return}e.respondWith(fetch(r).catch(()=>caches.match(r)))});
