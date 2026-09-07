// Render the downloaded Claude Design document without redesigning its pages.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const path = require('node:path');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({channel:'chrome'});
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve('output/claude-proposal-20260907/proposal.html'));
  await page.waitForFunction(() => customElements.get('doc-page'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth));
  fs.mkdirSync('output/pdf', {recursive:true});
  await page.pdf({path:'output/pdf/onlyyuuka-proposal.pdf', format:'A4', printBackground:true, preferCSSPageSize:true});
  console.log('Claude proposal PDF exported');
  await browser.close();
})().catch(e => {console.error(e);process.exit(1)});
