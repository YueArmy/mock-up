'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();});
const form=document.querySelector('#inquiry-form');
if(form){
 const product=document.querySelector('#product'),topic=document.querySelector('#topic'),message=document.querySelector('#message'),result=document.querySelector('#draft-result'),draft=document.querySelector('#draft-text'),copyStatus=document.querySelector('#copy-status');
 const chosen=new URLSearchParams(location.search).get('product');
 if([...product.options].some(option=>option.value===chosen))product.value=chosen;
 message.addEventListener('input',()=>message.setCustomValidity(''));
 form.addEventListener('submit',e=>{
  e.preventDefault();const body=message.value.trim();
  if(!body){message.setCustomValidity('お問い合わせ内容を入力してください。');message.reportValidity();return;}
  const item=product.selectedOptions[0].textContent;
  draft.textContent=`onlyyuuka ご担当者さま\n\n${item}について、質問があります。\nお問い合わせ項目：${topic.value}\n\n${body}\n\nよろしくお願いいたします。`;
  form.hidden=true;result.hidden=false;copyStatus.textContent='';result.focus();
 });
 document.querySelector('#edit-draft').addEventListener('click',()=>{result.hidden=true;form.hidden=false;message.focus();});
 document.querySelector('#copy-draft').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(draft.textContent);copyStatus.textContent='お問い合わせ文をコピーしました。送信はしていません。';}catch{copyStatus.textContent='コピーできませんでした。上の文章を選択してコピーしてください。';}});
}

// Keep all products readable without JavaScript; enhance with hash-addressable selection.
const catalogChoices=[...document.querySelectorAll('[data-product-choice]')];
if(catalogChoices.length){
 const entries=[...document.querySelectorAll('.product-entry')];
 document.body.classList.add('catalog-enabled');
 function showProduct(){
  const id=decodeURIComponent(location.hash.slice(1));
  if(id && !entries.some(e=>e.id===id))return;
  const selected=id||entries[0].id;
  entries.forEach(e=>{e.hidden=e.id!==selected;});
  catalogChoices.forEach(a=>{if(a.dataset.productChoice===selected)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
  if(id===selected)requestAnimationFrame(()=>document.getElementById(selected).scrollIntoView({block:'start'}));
 }
 window.addEventListener('hashchange',showProduct);
 showProduct();
}
