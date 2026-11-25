gsap.registerPlugin(ScrollTrigger);
document.body.classList.add('lock');
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const L=(a,b,c,d)=>`<line pathLength="1" x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`;
const P=d=>`<path pathLength="1" d="${d}"/>`;
const C=(x,y,r)=>`<circle pathLength="1" cx="${x}" cy="${y}" r="${r}"/>`;
const rep=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join('');
/* gate leaves */
function leaf(){let s='<svg viewBox="0 0 400 800" preserveAspectRatio="none" fill="none" stroke="#9aa3af" stroke-width="1.4"><rect x="6" y="6" width="394" height="788"/>';
s+=rep(9,i=>{const x=i*42+30;return L(x,120,x,794)+P(`M${x-8} 120 L${x} 84 L${x+8} 120Z`)});
s+=rep(5,i=>C(30+i*84+42,170,26)+C(30+i*84+42,170,12));
s+=L(6,230,400,230)+L(6,470,400,470)+L(6,700,400,700)+P('M6 120H400')+rep(8,i=>P(`M${i*42+30} 250q21 -20 42 0`));
return s+'</svg>'}
$$('.leaf').forEach(l=>l.innerHTML=leaf());
/* product art */
const art={
drive:()=>rep(2,s=>{const o=s?100:0;return P(`M${8+o} 130V50Q${50+o} 10 ${96+o} 40V130Z`)+rep(5,i=>L(22+i*15+o,128,22+i*15+o,38+Math.abs(2-i)*-1*-6))}).replace(/$/,L(0,130,200,130)),
ped:()=>P('M60 130V30Q100 0 140 30V130Z')+rep(6,i=>L(60,50+i*16,140,10+i*16+50))+L(0,130,200,130),
laser:()=>P('M30 10H170V130H30Z')+rep(5,r=>rep(4,c=>C(55+c*30,30+r*20,3+((r+c)%3)*3)))+P('M30 70Q100 20 170 70'),
rail:()=>L(10,45,190,45)+L(10,125,190,125)+rep(8,i=>L(14+i*24,45,14+i*24,125))+rep(3,i=>L(10,70+i*20,190,70+i*20)).slice(0,0)+L(10,85,190,85),
fence:()=>rep(10,i=>L(14+i*19,130,14+i*19,40)+P(`M${8+i*19} 40 L${14+i*19} 14 L${20+i*19} 40Z`))+L(0,70,200,70)+L(0,112,200,112),
priv:()=>P('M20 10H180V130H20Z')+rep(11,i=>L(20+i*16,10,20+i*16,130))+C(100,70,34)+C(100,70,18),
decor:()=>C(100,70,60)+C(100,70,42)+C(100,70,22)+rep(8,i=>{const a=i*Math.PI/4;return L(100+Math.cos(a)*22,70+Math.sin(a)*22,100+Math.cos(a)*60,70+Math.sin(a)*60)})};
const items=[['drive','Driveway gates','Swing and sliding gates in steel, iron and aluminum, sized to your entrance.','driveway-gates/'],['ped','Pedestrian gates','Metal, laser cut and composite gates for pool, garden and side access.','pedestrian-gates/'],['laser','Laser cut gates','Fiber-laser patterns cut into premium steel, from botanical to geometric.','pedestrian-gates/laser-cut-gates/'],['rail','Metal railings','Stair, porch, balcony and deck railings built to your measurements.','metal-railing/'],['fence','Metal fences','Iron, steel and aluminum fences made for your lot.','metal-fence/'],['priv','Privacy screens','Custom screens that close off a view without closing off the light.','privacy-screen/'],['decor','Wall art and decor','Laser-cut wall art, fire pits and coffee tables made to order.','our-products/']];
$('#track').innerHTML=items.map((x,i)=>`<div class="card"><em>${i+1} of 7</em><svg viewBox="0 0 200 140">${art[x[0]]()}</svg><div><h3>${x[1]}</h3><p>${x[2]}</p><a href="https://ornateirondecor.com/${x[3]}">EXPLORE</a></div></div>`).join('');
$('#frame').innerHTML=`<svg viewBox="0 0 200 140" fill="none" stroke="#aab2bd" stroke-width=".8">${art.drive()}</svg>`;
$('#tk').innerHTML=rep(2,()=>['Driveway gates','Pedestrian gates','Laser cut','Railings','Fences','Privacy screens','Wall art'].map(t=>`<span>${t}</span><i>◆</i>`).join('')).replace(/<\/i>$/,'</i>');
/* words */
$$('.split').forEach(h=>{h.innerHTML=h.textContent.split(' ').map(w=>`<span class="w"><b>${w}</b></span>`).join(' ')});
/* quotes */
const qs=[['The welding is so clean, and it feels like it’s built to last forever.','Alexey Alekseev'],['Great craftsmanship, great price, and excellent customer service.','Andrew'],['Staff were super professional, friendly, and easy to work with.','Marta Gentile'],['The best material and metal fences in the market.','Manny Singh']];
$('#q').innerHTML=qs.map(q=>`<blockquote><p>${q[0]}</p><span style="color:var(--steel);letter-spacing:.14em;font-size:13px">${q[1]}</span></blockquote>`).join('');
$('#dots').innerHTML=qs.map(()=>'<i></i>').join('');
const qb=$$('#q blockquote'),dt=$$('#dots i');let qi=0;
function showQ(n){gsap.to(qb[qi],{opacity:0,y:-20,duration:.6});dt[qi].classList.remove('on');qi=n;dt[qi].classList.add('on');gsap.fromTo(qb[qi],{opacity:0,y:30},{opacity:1,y:0,duration:.9,delay:.5,ease:'power3.out'})}
dt[0].classList.add('on');gsap.set(qb[0],{opacity:1});setInterval(()=>showQ((qi+1)%qs.length),5200);
dt.forEach((d,i)=>d.onclick=()=>showQ(i));
/* intro: gates open */
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
gsap.set('#hc>*',{opacity:0,y:40});gsap.set('#hc',{scale:1.12});
const intro=gsap.timeline({onComplete:()=>{$('#gate').style.display='none';document.body.classList.remove('lock');ScrollTrigger.refresh()}});
if(reduce){intro.set({},{},0);gsap.set('#hc>*',{opacity:1,y:0});gsap.set('#hc',{scale:1})}
else{
intro.from('.leaf svg *',{strokeDasharray:1,strokeDashoffset:1,duration:1.8,stagger:{amount:1.2},ease:'power2.inOut'},0)
.from('#lockm',{scale:0,opacity:0,duration:.8,ease:'back.out(2)'},.6)
.to('#lockm',{boxShadow:'0 0 90px 30px rgba(190,210,245,.65)',duration:.7},2.3)
.to('#beam',{opacity:1,duration:.4},2.9)
.to('#lockm',{scale:2.4,opacity:0,duration:.7,ease:'power2.in'},3)
.to('.leaf.l',{rotateY:-102,duration:2.6,ease:'power4.inOut'},3.1)
.to('.leaf.r',{rotateY:102,duration:2.6,ease:'power4.inOut'},3.1)
.to('#beam',{scaleX:60,opacity:0,duration:1.8,ease:'power2.out'},3.2)
.to('#hc',{scale:1,duration:3,ease:'power3.out'},3.2)
.to('#hc>*',{opacity:1,y:0,duration:1.1,stagger:.18,ease:'power3.out'},4.4)
.to('#gate',{opacity:0,duration:.8},5.6)}
/* scroll */
gsap.to('#bar',{scaleX:1,ease:'none',scrollTrigger:{scrub:.3,start:0,end:'max'}});
$$('section').forEach(s=>gsap.fromTo(s,{'--py':'-60px'},{'--py':'60px',ease:'none',scrollTrigger:{trigger:s,scrub:true}}));
$$('.split').forEach(h=>gsap.to(h.querySelectorAll('b'),{y:0,duration:1.1,stagger:.08,ease:'power4.out',scrollTrigger:{trigger:h,start:'top 85%'}}));
$$('.stats b').forEach(b=>{const o={v:0};gsap.to(o,{v:+b.dataset.n,duration:2.2,ease:'power2.out',scrollTrigger:{trigger:b,start:'top 90%'},onUpdate:()=>b.textContent=Math.round(o.v)+(b.dataset.s||'')})});
gsap.from('.why div',{y:60,opacity:0,stagger:.15,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.why',start:'top 85%'}});
gsap.from('#frame svg *',{strokeDasharray:1,strokeDashoffset:1,duration:2.4,stagger:.02,ease:'power2.inOut',scrollTrigger:{trigger:'#frame',start:'top 75%'}});
gsap.to('#frame svg',{yPercent:-8,ease:'none',scrollTrigger:{trigger:'#frame',scrub:true}});
const mm=gsap.matchMedia();
mm.add('(min-width:901px)',()=>{const t=$('#track');
gsap.to(t,{x:()=>-(t.scrollWidth-innerWidth+40),ease:'none',scrollTrigger:{trigger:'#coll',start:'top top',end:()=>'+='+(t.scrollWidth-innerWidth),pin:true,scrub:.6,invalidateOnRefresh:true}});
gsap.from('.card',{rotateY:35,y:80,opacity:0,transformOrigin:'0 50%',stagger:.1,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:'#coll',start:'top 60%'}})});
/* card hover: draw lines + tilt + spotlight */
$$('.card').forEach(c=>{const el=c.querySelectorAll('svg *');
const rx=gsap.quickTo(c,'rotateX',{duration:.5}),ry=gsap.quickTo(c,'rotateY',{duration:.5});
c.addEventListener('mouseenter',()=>gsap.fromTo(el,{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,duration:1.3,stagger:.012,ease:'power2.out',onComplete:()=>gsap.set(el,{strokeDasharray:'none'})}));
c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');ry((x-.5)*10);rx((.5-y)*10)});
c.addEventListener('mouseleave',()=>{rx(0);ry(0)})});
/* cursor */
const cur=$('#cur');const cx=gsap.quickTo(cur,'x',{duration:.35}),cy=gsap.quickTo(cur,'y',{duration:.35});
addEventListener('mousemove',e=>{cx(e.clientX);cy(e.clientY)});
$$('a,button,.card').forEach(a=>{a.addEventListener('mouseenter',()=>cur.classList.add('big'));a.addEventListener('mouseleave',()=>cur.classList.remove('big'))});
$('#f').addEventListener('submit',e=>{e.preventDefault();$('#send').textContent='Request received. We will call you soon.'});
