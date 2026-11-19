const C='expedition-v1';
self.addEventListener('install',e=>{e.waitUntil(self.skipWaiting())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const html=r.destination==='document';
  e.respondWith(html?fetch(r).then(x=>{caches.open(C).then(c=>c.put(r,x.clone()));return x}).catch(()=>caches.match(r).then(c=>c||caches.match('./index.html')))
  :caches.match(r).then(c=>c||fetch(r).then(x=>{if(x&&x.status===200)caches.open(C).then(c=>c.put(r,x.clone()));return x})));
});
