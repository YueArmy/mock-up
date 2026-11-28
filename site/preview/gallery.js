'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();});
const inquiryLink=document.querySelector('#google-form-link');
if(inquiryLink){
 const productNames={general:'商品全般',obi:'高級黒帯ポシェット3点セット',bag:'バッグインバッグ',shorts:'人工肛門ストーマ用ショーツ'};
 const chosen=new URLSearchParams(location.search).get('product');
 if(Object.prototype.hasOwnProperty.call(productNames,chosen)){
  const url=new URL(inquiryLink.href);
  url.searchParams.set('usp','pp_url');
  url.searchParams.set('entry.1781206770',productNames[chosen]);
  inquiryLink.href=url.toString();
 }
}

// Keep all products readable without JavaScript; enhance with hash-addressable selection.
const catalogChoices=[...document.querySelectorAll('[data-product-choice]')];
if(catalogChoices.length){
 const entries=[...document.querySelectorAll('.product-entry')];
 document.body.classList.add('catalog-enabled');
 function showProduct(){
  const id=decodeURIComponent(location.hash.slice(1));
  if(id && !entries.some(e=>e.id===id) && entries.some(e=>e.hidden))return;
  const selected=entries.some(e=>e.id===id)?id:entries[0].id;
  entries.forEach(e=>{e.hidden=e.id!==selected;});
  catalogChoices.forEach(a=>{if(a.dataset.productChoice===selected)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
  if(id===selected)requestAnimationFrame(()=>document.getElementById(selected).scrollIntoView({block:'start'}));
 }
 window.addEventListener('hashchange',showProduct);
 showProduct();
}

// トップの写真枠：URLに ?hero=movie があるときだけ動画に切り替える。読めない・再生できないときは写真のまま。
(function(){
 const fig=document.querySelector('.hero-photo[data-movie]');
 if(!fig||new URLSearchParams(location.search).get('hero')!=='movie')return;
 const img=fig.querySelector('img'),cap=fig.querySelector('figcaption span');
 const v=document.createElement('video');
 v.muted=true;v.defaultMuted=true;v.loop=true;v.autoplay=true;v.playsInline=true;
 ['muted','loop','autoplay','playsinline'].forEach(a=>v.setAttribute(a,''));
 v.preload='auto';v.poster=fig.dataset.moviePoster;v.setAttribute('aria-label',fig.dataset.movieLabel||'');
 const back=()=>{v.remove();img.hidden=false;};
 v.addEventListener('error',back);
 v.addEventListener('loadeddata',()=>{img.hidden=true;if(cap&&fig.dataset.movieCaption)cap.textContent=fig.dataset.movieCaption;const p=v.play();if(p&&p.catch)p.catch(()=>{});});
 v.src=fig.dataset.movie;fig.insertBefore(v,img);
})();
