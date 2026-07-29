const scenes=[
  [0,15,'THE CURRENT REALITY','Competitive gaming lost the plot.','Five tools. Four identities. Zero shared context.'],
  [15,27,'MEET STAGECORE','The operating system for competitive gaming.','One platform. One identity. One ecosystem.'],
  [27,99,'DASHBOARD DEEP DIVE','Your competitive life. One view.','Profiles · tournaments · brackets · teams · rankings · communications · analytics'],
  [99,110,'ORGANIZER CONTROL','Run the arena. Not the busywork.','Creation · approvals · seeding · verification · moderation · growth'],
  [110,116,'ONE CONNECTED GRAPH','Every action strengthens the ecosystem.','Players · teams · tournaments · organizers · rankings · communities'],
  [116,121,'STAGECORE','Compete. Connect. Conquer.','Join the future of competitive gaming.'],
];
const $=id=>document.getElementById(id),range=$('timeline'),play=$('play');let timer=null;
function draw(){const t=+range.value,s=scenes.find(x=>t>=x[0]&&t<x[1])||scenes.at(-1);$('kicker').textContent=s[2];$('title').textContent=s[3];$('detail').textContent=s[4];$('time').textContent=`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`;$('cards').innerHTML=Array.from({length:s[0]===27?8:4},()=>'<i></i>').join('')}
range.addEventListener('input',draw);play.addEventListener('click',()=>{if(timer){clearInterval(timer);timer=null;play.textContent='PLAY';return}play.textContent='PAUSE';timer=setInterval(()=>{range.value=(+range.value+.05)%120;draw()},50)});draw();
