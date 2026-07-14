document.addEventListener("DOMContentLoaded", () => {

    /*==========================
      PHANTOM WALLET
    ==========================*/

    const connectBtn = document.getElementById("connectWallet");
    const walletInfo = document.getElementById("walletInfo");

    let wallet = null;

    function getProvider() {
        if ("solana" in window) {
            const provider = window.solana;

            if (provider.isPhantom) {
                return provider;
            }
        }

        window.open("https://phantom.app/", "_blank");
        return null;
    }

    async function connectWallet() {

        try {

            const provider = getProvider();

            if (!provider) return;

            const response = await provider.connect();

            wallet = response.publicKey.toString();

            const span = connectBtn.querySelector("span");

            if (span) {
                span.textContent =
                    wallet.substring(0, 4) +
                    "..." +
                    wallet.substring(wallet.length - 4);
            }

            walletInfo.innerHTML = `
                <strong style="color:#3b82f6;">
                    Wallet Connected
                </strong>
                <br>
                <small>${wallet}</small>
            `;

        } catch (err) {

            console.error(err);

            alert("Wallet connection cancelled.");

        }

    }

    connectBtn?.addEventListener("click", connectWallet);



    /*==========================
      COUNTDOWN
    ==========================*/

    const launchDate = new Date("July 20, 2026 00:00:00").getTime();

    const countdown = document.querySelector(".countdown");

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    function updateCountdown() {

        const now = Date.now();

        const distance = launchDate - now;

        if (distance <= 0) {

            countdown.style.display = "none";

            clearInterval(timer);

            return;

        }

        days.textContent = String(
            Math.floor(distance / (1000 * 60 * 60 * 24))
        ).padStart(2, "0");

        hours.textContent = String(
            Math.floor(
                (distance % (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            )
        ).padStart(2, "0");

        minutes.textContent = String(
            Math.floor(
                (distance % (1000 * 60 * 60))
                /
                (1000 * 60)
            )
        ).padStart(2, "0");

        seconds.textContent = String(
            Math.floor(
                (distance % (1000 * 60))
                /
                1000
            )
        ).padStart(2, "0");

    }

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);
        /*==========================
      HAMBURGER MENU
    ==========================*/

    const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function closeMenu() {

        menuBtn?.classList.remove("active");
        sideMenu?.classList.remove("active");
        menuOverlay?.classList.remove("active");

    }

    if (menuBtn && sideMenu && menuOverlay) {

        menuBtn.addEventListener("click", () => {

            menuBtn.classList.toggle("active");
            sideMenu.classList.toggle("active");
            menuOverlay.classList.toggle("active");

        });

        menuOverlay.addEventListener("click", closeMenu);

        document.querySelectorAll(".side-links a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

    }


    /*==========================
      BUY / SELL BUTTONS
    ==========================*/

    const buyBtn = document.querySelector(".trade-btn.buy");
    const sellBtn = document.querySelector(".trade-btn.sell");

    buyBtn?.addEventListener("click", () => {

        alert("The Buy option will be enabled after launch.");

    });

    sellBtn?.addEventListener("click", () => {

        alert("The Sell option will be enabled after launch.");

    });



    /*==========================
      SWAP BUTTON
    ==========================*/

    const swapBtn = document.querySelector(".swap-btn");

    swapBtn?.addEventListener("click", () => {

        alert("Swap will be available after token launch.");

    });
        /*==========================
      EXTRA
    ==========================*/

    console.log("✅ ALPHA APP LOADED");

});