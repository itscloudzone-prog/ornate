(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));

  // The same line vocabulary runs from the opening leaves to the hero study.
  const line = (x1,y1,x2,y2) => `<line pathLength="1" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  const path = (d) => `<path pathLength="1" d="${d}"/>`;
  const circle = (cx,cy,r) => `<circle pathLength="1" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const repeat = (n, fn) => Array.from({length:n}, (_,i) => fn(i)).join('');
  function gateLeaf() {
    return `<svg viewBox="0 0 400 900" preserveAspectRatio="none">${
      path('M10 900V140Q190 10 390 140V900Z') + path('M24 900V150Q190 30 376 150V900') +
      line(10,235,390,235) + line(10,660,390,660) + line(10,780,390,780) + line(10,820,390,820) +
      repeat(10,i=>{const x=30+i*37;return line(x,200,x,900)+path(`M${x-7} 200L${x} 166L${x+7} 200`);}) +
      repeat(5,i=>circle(48+i*76,285,27)+circle(48+i*76,285,13)) +
      repeat(5,i=>{const x=48+i*76;return path(`M${x} 650V450C${x-56} 380 ${x-62} 515 ${x} 500C${x+62} 515 ${x+56} 380 ${x} 450V340`);}) +
      repeat(5,i=>{const x=48+i*76;return path(`M${x-26} 730Q${x} 675 ${x+26} 730Q${x} 785 ${x-26} 730Z`);})
    }</svg>`;
  }
  $('#door-left').innerHTML = gateLeaf();
  $('#door-right').innerHTML = gateLeaf();
  const heroBars = repeat(19,i=>{
    const x=40+i*40, top=110-Math.sin(i/18*Math.PI)*65;
    return line(x,top,x,440)+path(`M${x-7} ${top}L${x} ${top-23}L${x+7} ${top}`);
  });
  $('#hero-drawing').innerHTML = `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">${path('M25 445V115Q400 -30 775 115V445Z')+path('M40 430V125Q400 0 760 125V430Z')+heroBars+line(25,315,775,315)+line(25,390,775,390)+line(400,40,400,445)+repeat(8,i=>circle(75+i*92,240,28)+circle(75+i*92,240,13))+line(25,478,775,478)+line(25,466,25,490)+line(775,466,775,490)}</svg>`;

  let project, entranceSheet, heroSheet, drawingSheet, comparisonSheet;
  let drawingVisible = false;
  let revealDemoRunning = false;
  let introGeneration = 0;
  const intro = $('#entrance');
  const enterButton = $('#brand-entry');
  const skipButton = $('#skip-intro');
  const main = $('#main-content');
  const footer = $('.footer');

  function setIntroValues(value) {
    intro.style.setProperty('--draw',value.draw);
    intro.style.setProperty('--opening',value.open);
    intro.style.setProperty('--logo',value.logo);
    intro.style.setProperty('--latch',value.latch);
    intro.style.setProperty('--glow',value.glow);
  }
  function setHeroValues(value) {
    $$('.hero-reveal').forEach((element,index) => {
      const progress=clamp(value.reveal*1.35-index*.045);
      element.style.opacity=progress;
      element.style.transform=`translateY(${(1-progress)*28}px)`;
    });
    $('#hero-visual').style.setProperty('--arrival-zoom',value.camera);
  }
  function setDrawingValues(value) {
    const progress=clamp(value.reveal);
    $('#hero-visual').style.setProperty('--study',progress);
    $('#hero-drawing').style.opacity=progress;
    $('#hero-visual').style.setProperty('--study',progress);
    $('.hero-photo').style.opacity=1-progress*.6;
  }
  function setComparison(value) {
    const amount=clamp(value,0,100);
    $('#comparison').style.setProperty('--split',`${amount}%`);
    $('#comparison-range').value=amount;
    $('#comparison-range').setAttribute('aria-valuetext',`${Math.round(amount)} percent of the completed entrance revealed`);
  }

  async function startHero() {
    // A generation counter prevents an interrupted intro from reopening the logo screen.
    introGeneration++;
    entranceSheet?.sequence.pause();
    enterButton.disabled=true;
    main.inert=false;
    footer.inert=false;
    document.body.classList.remove('intro-active');
    intro.classList.add('is-leaving');
    window.scrollTo({top:0,behavior:'instant'});
    $('#hero-title').setAttribute('tabindex','-1');
    $('#hero-title').focus({preventScroll:true});
    if(heroSheet && !reduceMotion) {
      heroSheet.sequence.pause();
      heroSheet.sequence.position=0;
      heroSheet.sequence.play({range:[0,2.2]});
    } else setHeroValues({reveal:1,camera:1});
    setTimeout(() => {if(!document.body.classList.contains('intro-active')) intro.hidden=true;},reduceMotion?0:720);
  }
  async function startIntro() {
    const generation=++introGeneration;
    heroSheet?.sequence.pause();
    intro.hidden=false;
    intro.classList.remove('is-leaving');
    document.body.classList.add('intro-active');
    main.inert=true;
    footer.inert=true;
    enterButton.disabled=true;
    window.scrollTo({top:0,behavior:'instant'});
    skipButton.focus({preventScroll:true});
    $('#entrance-status').textContent='DRAWN WITH PURPOSE. BUILT TO BELONG.';
    if(entranceSheet) {
      entranceSheet.sequence.pause();
      entranceSheet.sequence.position=0;
      if(reduceMotion) entranceSheet.sequence.position=4.8;
      else await entranceSheet.sequence.play({range:[0,4.8]});
    } else setIntroValues({draw:1,open:1,logo:1,latch:0,glow:.25});
    if(generation!==introGeneration) return;
    enterButton.disabled=false;
    $('#entrance-status').textContent='YOUR ARRIVAL STARTS HERE.';
    enterButton.focus({preventScroll:true});
  }
  enterButton.addEventListener('click',startHero);
  skipButton.addEventListener('click',startHero);
  $('#replay-intro').addEventListener('click',startIntro);
  intro.addEventListener('keydown',event => {
    if(event.key==='Escape') {event.preventDefault();startHero();}
    if(event.key==='Tab') {
      const buttons=enterButton.disabled?[skipButton]:[enterButton,skipButton];
      const current=buttons.indexOf(document.activeElement);
      const next=(current+(event.shiftKey?-1:1)+buttons.length)%buttons.length;
      event.preventDefault();buttons[next].focus();
    }
  });

  $('#drawing-toggle').addEventListener('click',async() => {
    drawingVisible=!drawingVisible;
    $('#drawing-toggle').setAttribute('aria-pressed',String(drawingVisible));
    $('#drawing-toggle').textContent=drawingVisible?'See the finished gate':'See the linework';
    $('#hero-visual').classList.toggle('is-drawing',drawingVisible);
    if(drawingSheet && !reduceMotion) {
      drawingSheet.sequence.pause();
      // play() uses the requested endpoint direction without a competing CSS animation.
      drawingSheet.sequence.position=drawingVisible?0:1.6;
      await drawingSheet.sequence.play({range:[0,1.6],direction:drawingVisible?'normal':'reverse'});
    } else setDrawingValues({reveal:drawingVisible?1:0});
  });


  function stopComparisonDemo() {
    comparisonSheet?.sequence.pause();
    revealDemoRunning=false;
    $('#comparison-play').textContent='Watch the transformation';
  }
  $('#comparison-range').addEventListener('input',event => {
    stopComparisonDemo();
    const amount=Number(event.target.value);
    if(comparisonSheet) comparisonSheet.sequence.position=amount/100;
    else setComparison(amount);
  });
  $('#comparison-play').addEventListener('click',async() => {
    if(revealDemoRunning) {stopComparisonDemo();return;}
    if(reduceMotion || !comparisonSheet) {setComparison(100);if(comparisonSheet) comparisonSheet.sequence.position=1;return;}
    revealDemoRunning=true;
    $('#comparison-play').textContent='Pause transformation';
    comparisonSheet.sequence.position=0;
    const complete=await comparisonSheet.sequence.play({range:[0,1],rate:.22});
    if(complete) stopComparisonDemo();
  });

  const stages={
    measurement:{summary:'Every commission starts at your property, recording pier clearances, driveway slope and architectural sightlines. Your dimensions. Your design. No stock templates.',spec:'Site survey \u00b7 Elevation drawings \u00b7 Opening clearance check'},
    fabrication:{summary:'Our Woodbridge workshop combines CNC fiber-laser accuracy for modern geometric and botanical screens with traditional hand-forged scrollwork, collars and solid steel pickets.',spec:'In-house fiber laser \u00b7 Hand-formed scrolls \u00b7 Seamless welded joints'},
    hardware:{summary:'Structural hinges, lockboxes and weather-resistant architectural coatings are engineered to hold alignment through Ontario freeze-thaw cycles. The finish is considered as carefully as the form.',spec:'Barrel hinges \u00b7 Automation-ready frames \u00b7 Exterior matte and satin finishes'},
    installation:{summary:'We install the gates, railings and fences we fabricate, setting structural posts, balancing double-leaf swing geometry and testing every latch before handover.',spec:'Dedicated GTA installation crew \u00b7 Plumb and level verification'}
  };
  const tabs=$$('.craft-tabs [role="tab"]');
  function activateStage(tab) {
    tabs.forEach(item=>{const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;item.querySelector('span').textContent=selected?'\u2212':'+';});
    const stage=stages[tab.dataset.stage];
    $('#craft-summary').textContent=stage.summary;
    $('#craft-spec').textContent=stage.spec;
    $('#craft-panel').setAttribute('aria-labelledby',tab.id);
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click',()=>activateStage(tab));
    tab.addEventListener('keydown',event=>{
      let next=index;
      if(event.key==='ArrowDown') next=(index+1)%tabs.length;
      else if(event.key==='ArrowUp') next=(index-1+tabs.length)%tabs.length;
      else if(event.key==='Home') next=0;
      else if(event.key==='End') next=tabs.length-1;
      else return;
      event.preventDefault();tabs[next].focus();activateStage(tabs[next]);
    });
  });

  $('#enquiry-form').addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const subject=`Ornate project enquiry: ${data.get('project')}`;
    const body=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')||'Not provided'}\nInterested in: ${data.get('project')}\n\nProject details:\n${data.get('details')||'I would like to discuss a custom project.'}`;
    window.location.href=`mailto:connect@ornateirondecor.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $('#form-status').textContent='Your email app has been requested. Review and send your enquiry there, or email connect@ornateirondecor.com directly.';
  });
  $('#year').textContent=new Date().getFullYear();
  if(!reduceMotion && 'IntersectionObserver' in window) {
    document.body.classList.add('motion-ready');
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting) {entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    }),{threshold:.08,rootMargin:'0px 0px -20px 0px'});
    $$('.reveal').forEach(element=>observer.observe(element));
  }

  // A local production core bundle drives actual keyframed DOM/SVG values.
  async function initializeMotion() {
    try {
      const core=window.Theatre?.core;
      if(!core || !window.ORNATE_MOTION_STATE) {await startIntro();return;}
      project=core.getProject('Ornate Home Three',{state:window.ORNATE_MOTION_STATE});
      entranceSheet=project.sheet('Entrance');
      heroSheet=project.sheet('Hero');
      drawingSheet=project.sheet('Drawing');
      comparisonSheet=project.sheet('Transformation');
      entranceSheet.object('Gate',{draw:0,open:0,logo:0,latch:1,glow:0}).onValuesChange(setIntroValues);
      heroSheet.object('Arrival',{reveal:0,camera:1.12}).onValuesChange(setHeroValues);
      drawingSheet.object('Study',{reveal:0}).onValuesChange(setDrawingValues);
      comparisonSheet.object('Property',{reveal:50}).onValuesChange(v=>setComparison(v.reveal));
      await project.ready;
      comparisonSheet.sequence.position=.5;
      // Expose a harmless marker so production checks can confirm the real runtime is active.
      document.documentElement.dataset.motionEngine='theatre';
      await startIntro();
    } catch(error) {
      console.warn('The arrival animation is unavailable; the homepage remains accessible.',error);
      await startHero();
    }
  }
  initializeMotion();
})();
