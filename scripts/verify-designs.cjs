const path=require('node:path');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..');
const output=path.join(root,'verification');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4197/designs/';
const concepts=process.argv.slice(2);if(!concepts.length)concepts.push('gallery');
(async()=>{const browser=await chromium.launch({headless:true});const results=[];const errors=[];const context=await browser.newContext();const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
for(const c of concepts){
 for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:width>720?1000:844});
  for(const p of ['index.html','about.html','works.html','contact.html']){
   const response=await page.goto(base+c+'/'+p);assert.equal(response.status(),200);await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
   assert.equal(await page.locator('h1').count(),1);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,c+'/'+p+' overflow '+width);
   const broken=await page.evaluate(async()=>{const urls=[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.href))];const issues=[];for(const url of urls){const u=new URL(url);if(u.origin!==location.origin)continue;const r=await fetch(u.href);if(!r.ok)issues.push(u.href);else if(u.hash){const doc=new DOMParser().parseFromString(await r.text(),'text/html');if(!doc.getElementById(decodeURIComponent(u.hash.slice(1))))issues.push(u.href+' missing anchor');}}return issues;});assert.deepEqual(broken,[],c+'/'+p+' broken links');
   if(p==='index.html'&&[1440,390].includes(width)){await page.screenshot({path:path.join(output,c+'-'+width+'.png'),fullPage:true});if(width===1440){await page.screenshot({path:path.join(root,'site/designs/assets',c+'-preview.jpg'),type:'jpeg',quality:88});}}
   results.push({page:c+'/'+p,width,images:'pass',overflow:'none',links:'pass'});
  }
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+c+'/works.html');await page.getByRole('button',{name:'バッグ・ポーチ'}).click();assert.equal(await page.locator('.work:visible').count(),1);assert.match(await page.locator('#filter-result').textContent(),/^1/);await page.locator('.work:visible .work-open').click();await page.waitForSelector('#work-dialog[open]');assert.equal(await page.locator('#work-title').textContent(),'黒帯のポシェットセット');await page.keyboard.press('Escape');assert.equal(await page.locator('#work-dialog[open]').count(),0);
 await page.getByRole('button',{name:'すべて'}).click();assert.equal(await page.locator('.work:visible').count(),3);await page.locator('[data-work="runner"]').click();await page.locator('#work-inquiry').click();await page.waitForURL('**/contact.html?work=runner');assert.match(await page.locator('#message').inputValue(),/テーブルランナー/);
 await page.locator('#name').fill('テスト 花子');await page.locator('#email').fill('test@example.com');await page.locator('.consent input').check();await page.getByRole('button',{name:'入力内容を確認する'}).click();await page.waitForSelector('#contact-result:not([hidden])');assert.match(await page.locator('#confirmation-values').textContent(),/テスト 花子/);await page.locator('#edit-contact').click();assert.equal(await page.locator('#name').inputValue(),'テスト 花子');
 await page.locator('#letter-email').fill('letter@example.com');await page.getByRole('button',{name:'ニュースレター登録の確認へ'}).click();assert.match(await page.locator('.form-status').textContent(),/登録・送信されません/);
 await page.goto(base+c+'/works.html');await page.locator('summary').first().click();assert.equal(await page.locator('details[open]').count(),1);
 await page.setViewportSize({width:390,height:844});await page.goto(base+c+'/index.html');await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');await page.locator('.menu-toggle').click();await page.locator('#navigation a[href="works.html"]').click();assert.match(page.url(),/works.html$/);await page.locator('.work-open').first().click();await page.waitForSelector('#work-dialog[open]');await page.locator('.dialog-close').click();assert.equal(await page.locator('#work-dialog[open]').count(),0);
 results.push({concept:c,interactions:'filters/detail/Escape/related-inquiry/contact-confirm-edit/newsletter/FAQ/mobile-menu/mobile-dialog pass'});
}
for(const p of ['index.html','preparation.html'])for(const width of [1440,390]){await page.setViewportSize({width,height:900});await page.goto(base+p);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,p+' overflow');results.push({page:p,width,overflow:'none'});}
assert.deepEqual(errors,[]);await browser.close();fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'checks-'+concepts.join('-')+'.json'),JSON.stringify({timestamp:new Date().toISOString(),base,errors,results},null,2));console.log('PASS: '+results.length+' page/viewport and interaction checks; no console errors.');})().catch(e=>{console.error(e);process.exit(1)});
