const $ = s => document.querySelector(s);
const app = $("#app"), intro = $("#intro"), line = $("#introLine"), enter = $("#enterBtn");
const music = $("#bgMusic"), musicBtn = $("#musicBtn");

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

async function runIntro(){
  for(const t of SITE_CONTENT.intro){
    line.style.opacity=0; await sleep(350); line.textContent=t; line.style.opacity=1; await sleep(1900);
  }
  enter.classList.remove("hidden");
}
runIntro();

enter.addEventListener("click", async ()=>{
  intro.style.opacity=0; intro.style.transition="opacity .8s";
  try{ await music.play(); musicBtn.textContent="Ⅱ"; }catch(e){}
  setTimeout(()=>{intro.remove(); app.classList.remove("hidden");},800);
});

musicBtn.addEventListener("click", async ()=>{
  if(music.paused){ try{await music.play(); musicBtn.textContent="Ⅱ";}catch(e){} }
  else {music.pause(); musicBtn.textContent="♪";}
});

const now = new Date();
const h = now.getHours();
$("#greeting").textContent = h<10 ? "buongiorno patatina" : h>=23 || h<5 ? "ancora sveglia amore?" : h<18 ? "ciao patatina" : "buonasera amore";
const start = new Date(SITE_CONTENT.coupleSince);
const days = Math.floor((now-start)/86400000);
$("#daysTogether").textContent = `${days} giorni di noi — e siamo solo all’inizio`;
$("#liveMessage").textContent = SITE_CONTENT.liveMessage;

document.querySelectorAll("[data-scroll]").forEach(b=>b.onclick=()=>$(b.dataset.scroll).scrollIntoView({behavior:"smooth"}));

const galaxy=$("#galaxy");
SITE_CONTENT.memories.forEach((m,i)=>{
  const s=document.createElement("button"); s.className="star";
  s.style.left=(8+((i*37)%84))+"%"; s.style.top=(10+((i*53)%78))+"%";
  s.style.animationDelay=(i*.37)+"s"; s.onclick=()=>openMemory(m); galaxy.appendChild(s);
});
function openMemory(m){
  $("#memoryDate").textContent=m.date; $("#memoryText").textContent=m.text;
  $("#memoryModal").classList.remove("hidden");
}
$("#closeModal").onclick=()=>$("#memoryModal").classList.add("hidden");

const moods=$("#moods");
Object.entries(SITE_CONTENT.moods).forEach(([k,v])=>{
  const b=document.createElement("button"); b.textContent=k;
  b.onclick=()=>{const a=$("#moodAnswer");a.textContent=v;a.classList.remove("hidden")};
  moods.appendChild(b);
});

let doorClicks=0;
$("#doorBtn").onclick=()=>{
  const secret=new Date(SITE_CONTENT.secretDate);
  if(new Date()>=secret){
    $("#doorTitle").textContent="ora puoi entrare";
    $("#doorText").textContent="quindi è arrivato davvero questo giorno… qui costruiremo l’esperienza della partenza";
    $("#doorBtn").classList.add("hidden");
  } else {
    doorClicks++;
    const replies=["non ancora amore","ho detto non ancora curiosona","camilla giuro che cambio la password del sito 😭"];
    $("#doorText").textContent=replies[Math.min(doorClicks-1,replies.length-1)];
  }
};

const tl=$("#timeline");
SITE_CONTENT.timeline.forEach(([a,b])=>{
  const d=document.createElement("div");d.className="timeline-item";
  d.innerHTML=`<h3>${a}</h3><p>${b}</p>`;tl.appendChild(d);
});

$("#randomBtn").onclick=()=>{
  const m=SITE_CONTENT.memories[Math.floor(Math.random()*SITE_CONTENT.memories.length)];
  $("#randomText").textContent=`${m.date} — ${m.text}`;
};
$("#dontOpenBtn").onclick=()=>{
  $("#dontOpenContent").classList.remove("hidden");
  $("#dontOpenBtn").textContent="ovviamente l’hai aperto";
};

const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));
