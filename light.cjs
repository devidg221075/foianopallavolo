const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const dir=process.argv[2];const M={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.xml':'text/xml','.txt':'text/plain'};
const s=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(dir,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':M[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)}).listen(8811,async()=>{
const pages=['/','/squadre.html','/serie-c-maschile.html','/prima-divisione-femminile.html','/giovanili-maschili.html','/giovanili-femminili.html','/minivolley.html','/dal-1976.html','/partite-risultati.html','/galleria.html','/galleria.html?album=torneo-cesenatico-femminile','/il-club.html','/sponsor.html','/contatti.html'];
const b=await chromium.launch();let bad=0;
for(const w of [1440,390]){for(const u of pages){const pg=await b.newPage({viewport:{width:w,height:900}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('response',r=>{if(r.status()>=400&&!r.url().includes('/api/'))errs.push(r.status()+' '+r.url())});
await pg.goto('http://127.0.0.1:8811'+u,{waitUntil:'networkidle'});
await pg.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}});await pg.waitForTimeout(300);
const ov=await pg.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
const broken=await pg.evaluate(()=>[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src));
const hid=await pg.evaluate(()=>[...document.querySelectorAll('img[src*="logo-50"],img[src*="mascotte"],img[src*="giocatore"]')].filter(i=>{const b=i.getBoundingClientRect();const c=getComputedStyle(i);return b.width<5||c.display==='none'}).length);
const n=await pg.evaluate(()=>document.querySelectorAll('img[src*="logo-50"],img[src*="mascotte"],img[src*="giocatore"]').length);
if(errs.length||ov>0||broken.length||hid){bad++;console.log('PROBLEMA',w,u,ov,errs.slice(0,3),broken.slice(0,3),hid)}
if(w===1440&&n)console.log(u.padEnd(48),'immagini speciali presenti:',n);
await pg.close()}}
console.log(bad?bad+' problemi':'TUTTO OK: nessun errore, nessuna immagine rotta o nascosta');await b.close();s.close()});
