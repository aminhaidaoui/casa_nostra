
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
$("#startBtn").onclick=()=>$("#febbraio").scrollIntoView({behavior:"smooth"});
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.08});
$$(".reveal").forEach(x=>obs.observe(x));
$$("[data-answer]").forEach(b=>b.onclick=()=>{
  $("#answerText").textContent="La verità? Non c’è stato un solo istante. È successo piano, mentre diventavi sempre più importante senza chiedere permesso.";
});
$("#secretHeart").onclick=()=>$(".secret").classList.add("found");
$("#unlockJuly").onclick=()=>{
  $("#luglio").classList.remove("hidden");
  setTimeout(()=>$("#luglio").scrollIntoView({behavior:"smooth"}),50);
  $$("#luglio .reveal").forEach(x=>obs.observe(x));
};
const modal=$("#modal"), content=$("#modalContent");
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-open]"); if(!b)return;
  const src=b.dataset.open, type=b.dataset.type;
  content.innerHTML=type==="video"?`<video src="${src}" controls autoplay playsinline></video>`:`<img src="${src}" alt="Ricordo">`;
  modal.classList.remove("hidden");
});
function close(){modal.classList.add("hidden");content.innerHTML=""}
$("#closeModal").onclick=close; modal.onclick=e=>{if(e.target===modal)close()}; addEventListener("keydown",e=>{if(e.key==="Escape")close()});
$("#continueBtn").onclick=()=>{$("#future").classList.remove("hidden");$("#continueBtn").style.display="none"};
