// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Carousel setup
function setupCarousel(root){
  const track = root.querySelector('.car-track');
  const prev = root.querySelector('.prev');
  const next = root.querySelector('.next');
  const dotsWrap = root.querySelector('.car-dots');

  function pages(){
    const total = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
    return total;
  }
  function indexFromScroll(){
    return Math.round(track.scrollLeft / track.clientWidth);
  }
  function renderDots(){
    dotsWrap.innerHTML = '';
    const total = pages();
    for(let i=0;i<total;i++){
      const b = document.createElement('button');
      if(i===indexFromScroll()) b.setAttribute('aria-current','true');
      b.addEventListener('click', ()=> track.scrollTo({left: i*track.clientWidth, behavior:'smooth'}));
      dotsWrap.appendChild(b);
    }
  }
  function go(dir){ track.scrollBy({left: dir*track.clientWidth, behavior:'smooth'}); }
  prev.addEventListener('click', ()=> go(-1));
  next.addEventListener('click', ()=> go(1));
  track.addEventListener('scroll', ()=> renderDots());
  window.addEventListener('resize', ()=> renderDots());

  let isDown=false, startX=0, scrollLeft=0;
  track.addEventListener('pointerdown', (e)=>{ isDown=true; startX=e.pageX; scrollLeft=track.scrollLeft; track.setPointerCapture(e.pointerId); });
  track.addEventListener('pointermove', (e)=>{ if(!isDown) return; const dx=e.pageX - startX; track.scrollLeft = scrollLeft - dx; });
  track.addEventListener('pointerup', ()=>{ isDown=false; });
  track.addEventListener('pointercancel', ()=>{ isDown=false; });

  renderDots();
}
document.querySelectorAll('.carousel').forEach(setupCarousel);

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href').slice(1);
    if(!id) return;
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Venus Versa–style SVG icons injection
const versaIcons = {
  "photorejuvenation": `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>`,
  "acne clearance": `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><circle cx="10" cy="11" r="1"/><circle cx="14" cy="9" r="1"/><circle cx="13.5" cy="14" r="1"/></svg>`,
  "rf skin": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12c2-4 6-4 8 0"/><path d="M6 12c1.5-3 4.5-3 6 0"/><path d="M8 12c1.1-2 2.9-2 4 0"/><line x1="12" y1="16" x2="12" y2="21"/><path d="M9 21h6"/></svg>`,
  "hair removal": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c-.8 3.5-3.5 4.8-3.5 8.2a4.5 4.5 0 1 0 9 0c0-3.4-2.7-4.7-3.5-8.2Z"/><line x1="16.5" y1="7.5" x2="21" y2="3"/><line x1="18.8" y1="5.2" x2="21" y2="3"/></svg>`,
  "texture": `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="0.9"/><circle cx="12" cy="9" r="0.9"/><circle cx="15" cy="9" r="0.9"/><circle cx="9" cy="12" r="0.9"/><circle cx="12" cy="12" r="0.9"/><circle cx="15" cy="12" r="0.9"/><circle cx="9" cy="15" r="0.9"/><circle cx="12" cy="15" r="0.9"/><circle cx="15" cy="15" r="0.9"/></svg>`
};
document.querySelectorAll('.treatment-card').forEach(card => {
  const en = (card.querySelector('.en')?.textContent || '').toLowerCase();
  const iconHost = card.querySelector('.t-icon');
  if(!iconHost) return;
  let key = null;
  if (en.includes('photorejuvenation')) key = 'photorejuvenation';
  else if (en.includes('acne clearance')) key = 'acne clearance';
  else if (en.includes('rf')) key = 'rf skin';
  else if (en.includes('hair removal')) key = 'hair removal';
  else if (en.includes('texture') || en.includes('scars')) key = 'texture';
  if (key && versaIcons[key]) {
    iconHost.innerHTML = versaIcons[key];
    iconHost.classList.add('has-svg');
  }
});

// Instagram embed process helper (if needed after DOM ready)
function processIgEmbed() {
  if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
    window.instgrm.Embeds.process();
  }
}
processIgEmbed();
setTimeout(processIgEmbed, 800);
