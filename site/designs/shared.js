'use strict';
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){menuButton?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open');}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton?.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
const works={runner:{name:'帯のテーブルランナー',image:'runner-detail.jpg',material:'帯・織物',use:'食卓や花器の下に',text:'帯の織り柄を、テーブルの上へ。布の長さや柄の流れを活かして、花器を引き立てる一枚に仕立てた作品です。'},coasters:{name:'刺し子入り帯のコースター',image:'coasters.jpg',material:'刺し子入りの帯',use:'お茶の時間に',text:'小さく切り取った布にも、ひとつずつ違う表情があります。帯の色柄と針目を、お茶の時間に楽しむコースターです。'},obi:{name:'黒帯のポシェットセット',image:'obi-set.jpg',material:'黒帯・着物地',use:'日々の持ちものに',text:'身にまとう帯から、手に取るバッグと小物へ。外側の黒と内側の柄、その組み合わせを楽しめるポシェット・小物入れ・巾着のセットです。'}};
const workDialog=document.querySelector('#work-dialog');
document.querySelectorAll('[data-work]').forEach(b=>b.addEventListener('click',()=>{const w=works[b.dataset.work];if(!w)return;document.querySelector('#work-title').textContent=w.name;document.querySelector('#work-material').textContent=w.material;document.querySelector('#work-image').src='../assets/'+w.image;document.querySelector('#work-image').alt=w.name;document.querySelector('#work-description').textContent=w.text;document.querySelector('#work-spec-material').textContent=w.material;document.querySelector('#work-use').textContent=w.use;document.querySelector('#work-inquiry').href='contact.html?work='+encodeURIComponent(b.dataset.work);workDialog.showModal();}));
workDialog?.querySelector('.dialog-close').addEventListener('click',()=>workDialog.close());
workDialog?.addEventListener('click',e=>{if(e.target!==workDialog)return;const r=workDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)workDialog.close();});
const filterButtons=document.querySelectorAll('[data-filter]');
filterButtons.forEach(b=>b.addEventListener('click',()=>{filterButtons.forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});let count=0;document.querySelectorAll('.work[data-category]').forEach(w=>{w.hidden=b.dataset.filter!=='all'&&w.dataset.category!==b.dataset.filter;if(!w.hidden)count++;});document.querySelector('#filter-result').textContent=count+'作品を表示';}));
document.querySelectorAll('.newsletter-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();form.querySelector('.form-status').textContent='入力を確認しました。このサンプルでは登録・送信されません。';form.reset();}));
const form=document.querySelector('#contact-form');
const result=document.querySelector('#contact-result');
if(form){const selected=works[new URLSearchParams(location.search).get('work')];if(selected){form.elements.type.value='作品について';form.elements.message.value=selected.name+'について相談したいです。';}
form.addEventListener('submit',e=>{e.preventDefault();for(const key of ['name','message']){const input=form.elements[key];if(!input.value.trim()){input.setCustomValidity('空白以外の文字を入力してください。');input.reportValidity();input.addEventListener('input',()=>input.setCustomValidity(''),{once:true});return;}}
const dl=document.querySelector('#confirmation-values');dl.replaceChildren();[['お名前','name'],['メールアドレス','email'],['お問い合わせ種別','type'],['お問い合わせ内容','message']].forEach(([label,key])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=form.elements[key].value.trim();dl.append(dt,dd);});form.hidden=true;result.hidden=false;result.focus();result.scrollIntoView({block:'start'});});
document.querySelector('#edit-contact').addEventListener('click',()=>{result.hidden=true;form.hidden=false;form.elements.name.focus();});}
