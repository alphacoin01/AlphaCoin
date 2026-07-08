document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
           MENU HAMBURGUESA
    ========================== */

    const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    if (menuBtn && sideMenu && menuOverlay) {

        function openMenu() {
            menuBtn.classList.add("active");
            sideMenu.classList.add("active");
            menuOverlay.classList.add("active");
            document.body.classList.add("menu-open");
        }

        function closeMenu() {
            menuBtn.classList.remove("active");
            sideMenu.classList.remove("active");
            menuOverlay.classList.remove("active");
            document.body.classList.remove("menu-open");
        }

        menuBtn.addEventListener("click", () => {

            if (sideMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        menuOverlay.addEventListener("click", closeMenu);

        document.querySelectorAll(".side-links a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeMenu();
            }
        });

    }

    /* ==========================
          BOTÓN CONNECT WALLET
    ========================== */

    const connectBtn = document.getElementById("connectWallet");

    if (connectBtn) {

        connectBtn.addEventListener("click", async () => {

            if (!window.solana || !window.solana.isPhantom) {

                window.open("https://phantom.app/", "_blank");
                return;

            }

            try {

                const response = await window.solana.connect();

                const wallet = response.publicKey.toString();

                const span = connectBtn.querySelector("span");

                if (span) {

                    span.textContent =
                        wallet.slice(0, 4) + "..." + wallet.slice(-4);

                }

            } catch (err) {

                console.log("Wallet connection cancelled.");

            }

        });

    }

});