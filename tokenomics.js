document.addEventListener("DOMContentLoaded", () => {

    /*=========================
        CONNECT WALLET
    =========================*/

    const connectBtn = document.getElementById("connectWallet");

    async function connectWallet() {

        if (!window.solana || !window.solana.isPhantom) {
            window.open("https://phantom.app/", "_blank");
            return;
        }

        try {

            const response = await window.solana.connect();

            const wallet = response.publicKey.toString();

            connectBtn.querySelector("span").textContent =
                wallet.slice(0,4) + "..." + wallet.slice(-4);

        } catch (err) {

            console.log(err);

        }

    }

    connectBtn?.addEventListener("click", connectWallet);


    /*=========================
        HAMBURGER MENU
    =========================*/

    const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function closeMenu(){

        menuBtn.classList.remove("active");
        sideMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

    }

    menuBtn?.addEventListener("click",()=>{

        menuBtn.classList.toggle("active");
        sideMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");

    });

    menuOverlay?.addEventListener("click",closeMenu);

    document.querySelectorAll(".side-links a").forEach(link=>{

        link.addEventListener("click",closeMenu);

    });


    /*=========================
        ACTIVE PAGE
    =========================*/

    document.querySelectorAll(".side-links a").forEach(link=>{

        if(link.href===window.location.href){

            link.classList.add("active");

        }

    });


    /*=========================
        SCROLL ANIMATION
    =========================*/

    const elements = document.querySelectorAll(
        ".stat-card,.distribution-card,.security-card"
    );

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{
        threshold:.15
    });

    elements.forEach(el=>observer.observe(el));

});