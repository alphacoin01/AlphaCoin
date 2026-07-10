document.addEventListener("DOMContentLoaded", () => {

/*==========================
        MENU
==========================*/

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("menuOverlay");

function closeMenu(){

    menuBtn.classList.remove("active");
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");

}

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        menuBtn.classList.toggle("active");
        sideMenu.classList.toggle("active");
        overlay.classList.toggle("active");

    });

}

overlay?.addEventListener("click",closeMenu);

document.querySelectorAll(".side-links a").forEach(link=>{

    link.addEventListener("click",closeMenu);

});

/*==========================
     ACTIVE PAGE
==========================*/

document.querySelectorAll(".side-links a").forEach(link=>{

    if(link.href===window.location.href){

        link.classList.add("active");

    }

});

/*==========================
     SCROLL ANIMATION
==========================*/

const phases=document.querySelectorAll(".phase");

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

phases.forEach(card=>observer.observe(card));

/*==========================
      HOVER EFFECT
==========================*/

phases.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        phases.forEach(c=>c.classList.remove("focus"));

        card.classList.add("focus");

    });

});

document.querySelector(".timeline")?.addEventListener("mouseleave",()=>{

    phases.forEach(c=>c.classList.remove("focus"));

});

/*==========================
     PARALLAX HEADER
==========================*/

const header=document.querySelector(".roadmap-header");

window.addEventListener("scroll",()=>{

    const y=window.scrollY;

    if(header){

        header.style.transform=`translateY(${y*0.12}px)`;

    }

});

});