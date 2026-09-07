'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){ menuButton.setAttribute('aria-expanded','false'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded',String(open)); navigation.classList.toggle('is-open',open); });
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeMenu();});
const products = {
 runner: { title:'帯のテーブルランナー', category:'OBI → TABLE RUNNER', image:'assets/runner-detail.jpg', description:'帯・織物の柄を活かして仕立てた飾り布。テーブルの中央や玄関、花器まわりに敷いて楽しめます。', specs:[['素材','帯・織物'],['色の例','シルバー系・赤色'],['用途','テーブル、玄関、花器まわり']] },
 coasters: { title:'刺し子入り帯のコースター', category:'OBI → COASTERS', image:'assets/coasters.jpg', description:'刺し子入りの帯から仕立てたコースター。柄の違いを楽しみながら、お茶やコーヒーの時間に使える作品です。', specs:[['素材','刺し子入りの帯'],['用途','コースター'],['セット構成','枚数・付属品は公開前に確認']] },
 obi: { title:'黒帯のポシェット3点セット', category:'OBI → BAGS & POUCHES', image:'assets/obi-set.jpg', description:'黒帯を使ったポシェット、小物入れ、巾着のセット。外側の黒と、内側に合わせた着物地の柄を楽しめる仕立てです。', specs:[['素材','黒帯・着物地'],['セット','ポシェット・小物入れ・巾着'],['用途','持ち歩くものの整理に']] }
};
const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{
 filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 let count=0;document.querySelectorAll('.work').forEach(work=>{work.hidden=button.dataset.filter!=='all'&&work.dataset.category!==button.dataset.filter;if(!work.hidden)count++;});
 document.querySelector('#filter-result').textContent=`${count}作品を表示`;
}));
let selectedProduct='作品全般';
const productDialog=document.querySelector('#product-dialog');
document.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>{
 const p=products[button.dataset.product];selectedProduct=p.title;
 document.querySelector('#product-title').textContent=p.title;
 document.querySelector('#product-category').textContent=p.category;
 document.querySelector('#product-image').src=p.image;document.querySelector('#product-image').alt=p.title;
 document.querySelector('#product-description').textContent=p.description;
 const specs=document.querySelector('#product-specs');specs.replaceChildren();
 p.specs.forEach(([key,value])=>{const dt=document.createElement('dt');dt.textContent=key;const dd=document.createElement('dd');dd.textContent=value;specs.append(dt,dd);});
 productDialog.showModal();
}));
const contactDialog=document.querySelector('#contact-dialog');
function openContact(work='作品全般'){document.querySelector('#inquiry-work').value=work;document.querySelector('#inquiry-result').hidden=true;document.querySelector('#copy-status').textContent='';contactDialog.showModal();}
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>button.dataset.open==='contact'?openContact():document.querySelector('#shop-dialog').showModal()));
document.querySelector('#product-inquiry').addEventListener('click',()=>{productDialog.close();openContact(selectedProduct);});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});});
document.querySelector('#inquiry-form').addEventListener('submit',e=>{e.preventDefault();const message=document.querySelector('#inquiry-message').value.trim();if(!message){document.querySelector('#inquiry-message').focus();return;}document.querySelector('#inquiry-draft').textContent=`onlyyuuka ご担当者さま\n\n${document.querySelector('#inquiry-work').value}についてのお問い合わせです。\n\n${message}\n\nよろしくお願いいたします。`;document.querySelector('#inquiry-result').hidden=false;document.querySelector('#copy-status').textContent='';document.querySelector('#inquiry-result').scrollIntoView({block:'nearest'});});
document.querySelector('#copy-draft').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.querySelector('#inquiry-draft').textContent);document.querySelector('#copy-status').textContent='コピーしました。送信はされていません。';}catch{document.querySelector('#copy-status').textContent='自動コピーが使えません。上の文章を選択してコピーしてください。';}});
