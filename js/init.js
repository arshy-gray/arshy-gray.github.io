const body=document.body,headerElement=document.querySelector(".page_hd"),sectElement=document.querySelectorAll("section"),sectLen=sectElement.length,gnbItemElement=document.querySelectorAll(".gnb_menu li"),timestamp=(new Date).getTime(),scrollEvent=new Event("scroll");let lastScrTop=window.scrollY,start=0,sectActiveTimer,scrTiggerTimer;document.querySelector("html").classList.remove("no-js"),document.querySelectorAll("link[rel=stylesheet]").forEach(e=>{e.setAttribute("href",e.getAttribute("href")+"?"+timestamp)}),document.querySelectorAll("script[class*=production]").forEach(e=>{e.setAttribute("src",e.getAttribute("src")+"?"+timestamp)}),window.addEventListener("scroll",()=>{const t=window.innerHeight;sectActiveTimer=sectActiveTimer||setTimeout(()=>{var e=window.scrollY+t;for(sectActiveTimer=null,0<window.scrollY?headerElement.classList.add("visible"):headerElement.classList.remove("visible"),i=0;i<sectLen;i++)sectElement[i].offsetTop+t/3*1<=e?(sectElement.forEach(e=>{e.classList.remove("on")}),sectElement[i].classList.add("active","on"),gnbItemElement.forEach(e=>{e.classList.remove("on")}),gnbItemElement[i].classList.add("on")):sectElement[i].classList.remove("active")},300)}),function(){const t=document.querySelector("#splash"),e=t.querySelector(".progress-bar"),s=t.querySelector(".progress-txt"),r=e.querySelector(".bar_R"),l=e.querySelector(".bar_L"),o=imagesLoaded(body),c=o.images.length;let n=0,i=0;o.on("progress",()=>{n++});const a=setInterval(()=>{var e=Math.floor(n/c*100);(i+=.1*(e-i))<=50?r.style.height=2*i+"%":(r.style.height="100%",l.style.height=2*(i-50)+"%"),s.textContent=Math.floor(i)+"%",100<=i&&(clearInterval(a),t.classList.add("progress-complete"),setTimeout(()=>{t.classList.add("off")},1e3)),99.9<i&&(i=100,document.querySelector("#wrapper").classList.add("on"),start=1,window.dispatchEvent(scrollEvent),lastScrTop=window.scrollY)},1e3/30)}();
//# sourceMappingURL=init.js.map