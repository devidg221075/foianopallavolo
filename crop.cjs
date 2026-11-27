const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const dir=process.argv[2],out=process.argv[3];const M={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
const s=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(dir,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':M[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)}).listen(8813,async()=>{
const b=await chromium.launch();
for(const w of [1440,390]){const pg=await b.newPage({viewport:{width:w,height:900}});await pg.goto('http://127.0.0.1:8813/serie-c-maschile.html',{waitUntil:'networkidle'});
await pg.addStyleTag({content:'*{animation:none!important;transition:none!important}[data-reveal]{opacity:1!important;transform:none!important}.site-header{position:static!important}.teams-section-nav{position:static!important}'});
await pg.locator('.teams-hero').screenshot({path:`${out}/scH-${w}.png`});
await pg.locator('.detail-editorial').scrollIntoViewIfNeeded();await pg.waitForTimeout(300);await pg.locator('.detail-editorial').screenshot({path:`${out}/scE-${w}.png`});await pg.close()}
await b.close();s.close()});
