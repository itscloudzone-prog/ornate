(() => {
  'use strict';
  const visual=document.getElementById('hero-visual');
  const hero=document.getElementById('hero');
  const track=document.getElementById('hero-scroll-track');
  const visualTrack=document.getElementById('hero-visual-track');
  const estate=document.getElementById('estate-stage');
  const toggle=document.getElementById('gate-toggle');
  const hint=document.getElementById('gate-scroll-hint');
  const caption=document.getElementById('gate-scene-status');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const mobile=matchMedia('(max-width:760px)');
  const clamp=v=>Math.max(0,Math.min(1,v));
  let sheet, progress=0, scrollStart=0, scrollDistance=600;
  let scrollFrame=0, manualFrame=0, lastState='';

  // Wireframe shares each photographic leaf's hinge and responds to the existing study toggle.
  const L=(a,b,c,d)=>`<line pathLength="1" x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`;
  const P=d=>`<path pathLength="1" d="${d}"/>`;
  let lines=P('M8 450V155Q200 155 392 15V450Z')+P('M18 438V164Q200 164 382 34V438Z')+L(8,375,392,375)+L(8,402,392,402);
  for(let i=0;i<9;i++) {const x=28+i*43,top=160-120*(x/400)**2;lines+=L(x,top,x,399)+P(`M${x} 270C${x-35} 225 ${x-35} 300 ${x} 285C${x+35} 300 ${x+35} 225 ${x} 270`);}
  const svg=`<svg viewBox="0 0 400 460" preserveAspectRatio="none">${lines}</svg>`;
  document.getElementById('gate-linework-left').innerHTML=svg;
  document.getElementById('gate-linework-right').innerHTML=svg;

  function applyGate(value) {
    progress=clamp(value.progress);
    visual.style.setProperty('--gate-progress',progress);
    visual.style.setProperty('--left-angle',`${value.leftAngle}deg`);
    visual.style.setProperty('--right-angle',`${value.rightAngle}deg`);
    visual.dataset.gateProgress=progress.toFixed(3);
    const state=progress<.04?'closed':progress>.96?'open':'opening';
    toggle.setAttribute('aria-pressed',String(progress>.5));
    toggle.textContent=progress>.5?'Close gate':'Open gate';
    if(state!==lastState) {
      lastState=state;
      caption.textContent=state==='closed'?'A beautiful beginning.':state==='open'?'Welcome home.':'Your arrival unfolds.';
      hint.textContent=state==='open'?'SCROLL BACK TO CLOSE':'SCROLL TO OPEN THE GATE';
      estate.setAttribute('aria-label',`A ${state==='opening'?'partly open':state} custom iron gate in front of a warmly lit Ontario home`);
    }
  }
  function seek(value) {
    const amount=clamp(value);
    if(sheet) sheet.sequence.position=amount;
    else applyGate({progress:amount,leftAngle:amount*96,rightAngle:amount*-96});
  }
  function updateFromScroll() {
    scrollFrame=0;
    if(document.body.classList.contains('intro-active')) {seek(0);return;}
    const raw=clamp((window.scrollY-scrollStart)/scrollDistance);
    // Reduced motion uses discrete states while preserving the explicit gate control.
    const amount=reduced.matches?(raw>.3?1:0):raw;
    if(Math.abs(amount-progress)>.0005) seek(amount);
  }
  function onScroll() {
    if(manualFrame) {cancelAnimationFrame(manualFrame);manualFrame=0;}
    if(!scrollFrame) scrollFrame=requestAnimationFrame(updateFromScroll);
  }
  function measure() {
    const size=Math.max(visual.clientWidth,Math.min(visual.clientHeight,visual.clientWidth/.72));
    visual.style.setProperty('--estate-size',`${size}px`);
    const distance=mobile.matches?Math.max(380,innerHeight*.58):Math.max(500,Math.min(850,innerHeight*.72));
    scrollDistance=distance;
    if(mobile.matches) {
      track.style.height='auto';
      visualTrack.style.height=`${visual.offsetHeight+distance}px`;
      scrollStart=visualTrack.getBoundingClientRect().top+scrollY;
    } else {
      visualTrack.style.height='';
      track.style.height=`${hero.offsetHeight+distance}px`;
      scrollStart=track.getBoundingClientRect().top+scrollY;
    }
    if(reduced.matches) scrollDistance=Math.max(300,(mobile.matches?visual.offsetHeight:hero.offsetHeight)*.55);
    updateFromScroll();
  }
  toggle.addEventListener('click',()=>{
    if(manualFrame) cancelAnimationFrame(manualFrame);
    const from=progress,target=progress>.5?0:1;
    if(reduced.matches) {seek(target);return;}
    const start=performance.now();
    function animate(now) {
      const t=clamp((now-start)/1350),ease=t*t*(3-2*t);
      seek(from+(target-from)*ease);
      if(t<1) manualFrame=requestAnimationFrame(animate);else manualFrame=0;
    }
    manualFrame=requestAnimationFrame(animate);
  });
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',measure,{passive:true});
  mobile.addEventListener('change',measure);reduced.addEventListener('change',measure);
  new ResizeObserver(measure).observe(hero);
  document.fonts.ready.then(measure);
  // Reset immediately when the intro is replayed and the page is returned to the top.
  new MutationObserver(()=>{if(document.body.classList.contains('intro-active')) seek(0);}).observe(document.body,{attributes:true,attributeFilter:['class']});
  try {
    const core=window.Theatre?.core;
    if(core && window.ORNATE_MOTION_STATE) {
      const project=core.getProject('Ornate Home Three');
      sheet=project.sheet('Scroll Gate');
      sheet.object('Estate Gate',{leftAngle:0,rightAngle:0,progress:0}).onValuesChange(applyGate);
      project.ready.then(measure);
    }
  } catch(error) {
    console.warn('Using the accessible native gate controls.',error);
  }
  measure();
})();
