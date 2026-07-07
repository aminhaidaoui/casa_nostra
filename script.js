
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const M=window.MEMORIES;
const info={
 febbraio:["L’inizio di noi","La prima costellazione. Piccola, vicina, impossibile da dimenticare.","#6a3d7050"],
 marzo:["Sempre più vicini","Le distanze hanno iniziato a sembrare più piccole.","#4b477f50"],
 aprile:["La nostra normalità","Anche un giorno normale poteva diventare speciale.","#7b3f6b50"],
 maggio:["Noi, ovunque","Romantici, scemi, in giro. Sempre noi.","#5f3f7950"],
 giugno:["Sempre più casa","Meno rumore. Più vicini.","#78415450"],
 luglio:["Il nostro mondo","E poi l’universo ha smesso di stare dentro una sola orbita.","#8a3f705d"]
};
const order=["febbraio","marzo","aprile","maggio","giugno"];
const allByMonth={...M};
let currentList=[], currentIndex=0;

function setGreeting(){
 const h=new Date().getHours();
 $("#greeting").innerHTML=(h<12?"Buongiorno":h<18?"Buon pomeriggio":"Buonasera")+' patatina <span>♥</span>';
}
setGreeting();
const start=new Date("2026-02-07T00:00:00");
$("#days").textContent=Math.max(0,Math.floor((Date.now()-start)/86400000));

$("#enterBtn").onclick=()=>{
 $("#landing").classList.add("is-hidden");
 $("#app").classList.remove("is-hidden");
 window.scrollTo({top:0,behavior:"instant"});
};
$("#homeBtn").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});

function makeUniverse(month,items){
 const sec=document.createElement("section");
 sec.className="universe"; sec.id=month;
 sec.style.setProperty("--monthGlow",info[month][2]);
 sec.innerHTML=`<div class="universe-head">
   <p class="eyebrow">${month.toUpperCase()}</p>
   <h2>${info[month][0]}</h2><p>${info[month][1]}</p>
 </div>
 <div class="space">
   <div class="orbit o1"></div><div class="orbit o2"></div><div class="orbit o3"></div>
   <div class="core">♡</div>
 </div>`;
 const space=sec.querySelector(".space");
 items.forEach((it,i)=>{
   const b=document.createElement("button");
   const ring=i%3, base=[17,29,42][ring];
   const angle=(i*137.508+ring*29)*Math.PI/180;
   const jitter=((i*19)%9)-4;
   const x=50+(base+jitter)*Math.cos(angle);
   const y=50+(base*.72+jitter*.25)*Math.sin(angle);
   const planet=i%11===0, comet=i%17===0;
   const size=planet?18:4+(i%5);
   b.className="memory-star "+(planet?"planet ":"")+(comet?"comet ":"");
   b.style.cssText=`left:${x}%;top:${y}%;width:${size}px;height:${size}px`;
   b.dataset.month=month;b.dataset.index=i;
   b.setAttribute("aria-label","Apri ricordo");
   space.appendChild(b);
 });
 return sec;
}

order.forEach(m=>{
 $("#universes").appendChild(makeUniverse(m,M[m]));
 const b=document.createElement("button");
 b.textContent=m[0].toUpperCase()+m.slice(1);
 b.onclick=()=>$("#"+m).scrollIntoView({behavior:"smooth"});
 $("#monthNav").appendChild(b);
});

$("#unlockJuly").onclick=()=>{
 if(!$("#luglio")) $("#julyMount").appendChild(makeUniverse("luglio",M.luglio));
 setTimeout(()=>$("#luglio").scrollIntoView({behavior:"smooth"}),30);
};

const captions=["Un pezzo di noi.","Questo momento vive ancora qui.","Una piccola luce nel nostro universo.","Vorrei poter tornare qui per cinque minuti.","Noi, esattamente così."];
function renderViewer(){
 const it=currentList[currentIndex];
 $("#viewerBody").innerHTML=it.type==="video"
   ? `<video src="${it.src}" controls autoplay playsinline></video>`
   : `<img src="${it.src}" alt="Un nostro ricordo">`;
 $("#viewerCaption").textContent=captions[currentIndex%captions.length];
}
document.addEventListener("click",e=>{
 const b=e.target.closest(".memory-star"); if(!b)return;
 const month=b.dataset.month;
 currentList=allByMonth[month];currentIndex=Number(b.dataset.index);
 $("#viewerMonth").textContent=month;
 renderViewer();$("#viewer").classList.remove("is-hidden");
});
function closeViewer(){
 const v=$("#viewerBody video");if(v)v.pause();
 $("#viewer").classList.add("is-hidden");$("#viewerBody").innerHTML="";
}
$("#viewerClose").onclick=closeViewer;
$("#viewer").onclick=e=>{if(e.target.id==="viewer")closeViewer()};
$("#prevBtn").onclick=()=>{currentIndex=(currentIndex-1+currentList.length)%currentList.length;renderViewer()};
$("#nextBtn").onclick=()=>{currentIndex=(currentIndex+1)%currentList.length;renderViewer()};
addEventListener("keydown",e=>{
 if($("#viewer").classList.contains("is-hidden"))return;
 if(e.key==="Escape")closeViewer();
 if(e.key==="ArrowLeft")$("#prevBtn").click();
 if(e.key==="ArrowRight")$("#nextBtn").click();
});

const mood={
 felice:"Allora voglio aggiungere un’altra risata a questa galassia.",
 nostalgia:"Puoi tornare qui ogni volta che ti manca un pezzo di noi.",
 coccole:"Messaggio ricevuto. Questa vale come richiesta ufficiale di coccole. ♥",
 noi:"La mia risposta preferita. Sempre."
};
$$("[data-mood]").forEach(b=>b.onclick=()=>$("#moodAnswer").textContent=mood[b.dataset.mood]);
$("#continueBtn").onclick=()=>{
 $("#future").classList.remove("is-hidden");
 $("#continueBtn").classList.add("is-hidden");
};
