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

            const span = connectBtn?.querySelector("span");

            if (span) {

                span.textContent =
                    wallet.substring(0, 4) +
                    "..." +
                    wallet.substring(wallet.length - 4);

            }

            if (walletInfo) {

                walletInfo.innerHTML = `
                    <strong style="color:#3b82f6;">
                        Wallet Connected
                    </strong>
                    <br>
                    <small>${wallet}</small>
                `;

            }

        } catch (err) {

            console.error(err);

            alert("Wallet connection cancelled.");

        }

    }

    connectBtn?.addEventListener(
        "click",
        connectWallet
    );


    /*==========================
          HAMBURGER MENU
    ==========================*/

    const menuBtn =
        document.getElementById("menuBtn");

    const sideMenu =
        document.getElementById("sideMenu");

    const menuOverlay =
        document.getElementById("menuOverlay");


    function closeMenu() {

        menuBtn?.classList.remove("active");

        sideMenu?.classList.remove("active");

        menuOverlay?.classList.remove("active");

    }


    if (
        menuBtn &&
        sideMenu &&
        menuOverlay
    ) {

        menuBtn.addEventListener(
            "click",
            () => {

                const isOpen =
                    sideMenu.classList.contains("active");


                if (isOpen) {

                    closeMenu();

                } else {

                    menuBtn.classList.add("active");

                    sideMenu.classList.add("active");

                    menuOverlay.classList.add("active");

                }

            }
        );


        menuOverlay.addEventListener(
            "click",
            closeMenu
        );


        document
            .querySelectorAll(".side-links a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });

    }


    /*==========================
          COUNTDOWN
    ==========================*/

    const launchDate =
        new Date(
            "July 25, 2026 00:00:00"
        ).getTime();


    const countdown =
        document.querySelector(".countdown");


    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    let timer = null;


    function updateCountdown() {

        const now = Date.now();

        const distance =
            launchDate - now;


        if (distance <= 0) {

            if (countdown) {

                countdown.style.display =
                    "none";

            }

            if (timer) {

                clearInterval(timer);

            }

            return;

        }


        if (days) {

            days.textContent =
                String(
                    Math.floor(
                        distance /
                        (1000 * 60 * 60 * 24)
                    )
                ).padStart(2, "0");

        }


        if (hours) {

            hours.textContent =
                String(
                    Math.floor(
                        (
                            distance %
                            (1000 * 60 * 60 * 24)
                        )
                        /
                        (1000 * 60 * 60)
                    )
                ).padStart(2, "0");

        }


        if (minutes) {

            minutes.textContent =
                String(
                    Math.floor(
                        (
                            distance %
                            (1000 * 60 * 60)
                        )
                        /
                        (1000 * 60)
                    )
                ).padStart(2, "0");

        }


        if (seconds) {

            seconds.textContent =
                String(
                    Math.floor(
                        (
                            distance %
                            (1000 * 60)
                        )
                        /
                        1000
                    )
                ).padStart(2, "0");

        }

    }


    updateCountdown();


    timer =
        setInterval(
            updateCountdown,
            1000
        );


    /*==========================
        BUY / SELL BUTTONS
    ==========================*/

    const buyBtn =
        document.querySelector(
            ".trade-btn.buy"
        );

    const sellBtn =
        document.querySelector(
            ".trade-btn.sell"
        );


    buyBtn?.addEventListener(
        "click",
        () => {

            alert(
                "The Buy option will be enabled after launch."
            );

        }
    );


    sellBtn?.addEventListener(
        "click",
        () => {

            alert(
                "The Sell option will be enabled after launch."
            );

        }
    );


    /*==========================
            SWAP BUTTON
    ==========================*/

    const swapBtn =
        document.querySelector(
            ".swap-btn"
        );


    swapBtn?.addEventListener(
        "click",
        () => {

            alert(
                "Swap will be available after token launch."
            );

        }
    );


    /*==========================
        CONTRACT BUTTONS
    ==========================*/

    const contractAddress =
        "TU_CONTRACT_ADDRESS_AQUI";


    const copyContract =
        document.getElementById(
            "copyContract"
        );

    const chartContract =
        document.getElementById(
            "chartContract"
        );

    const solscanContract =
        document.getElementById(
            "solscanContract"
        );


    copyContract?.addEventListener(
        "click",
        () => {

            if (
                contractAddress ===
                "TU_CONTRACT_ADDRESS_AQUI"
            ) {

                alert(
                    "Contract not available yet"
                );

                return;

            }


            navigator.clipboard
                .writeText(contractAddress);


            alert(
                "Contract copied"
            );

        }
    );


    chartContract?.addEventListener(
        "click",
        () => {

            if (
                contractAddress ===
                "TU_CONTRACT_ADDRESS_AQUI"
            ) {

                alert(
                    "Chart available after launch"
                );

                return;

            }


            window.open(
                `https://dexscreener.com/solana/${contractAddress}`,
                "_blank"
            );

        }
    );


    solscanContract?.addEventListener(
        "click",
        () => {

            if (
                contractAddress ===
                "TU_CONTRACT_ADDRESS_AQUI"
            ) {

                alert(
                    "Contract available after launch"
                );

                return;

            }


            window.open(
                `https://solscan.io/token/${contractAddress}`,
                "_blank"
            );

        }
    );


    /*==========================
          PRIVACY POLICY
    ==========================*/

    const privacyModal =
        document.getElementById(
            "privacyModal"
        );


    const acceptBtn =
        document.getElementById(
            "acceptPrivacy"
        );


    const rejectBtn =
        document.getElementById(
            "rejectPrivacy"
        );


    if (privacyModal) {

        const privacyAccepted =
            localStorage.getItem(
                "alphaPrivacyAccepted"
            );


        if (
            privacyAccepted === "true"
        ) {

            privacyModal.style.display =
                "none";

            document.body.style.overflow =
                "auto";

        } else {

            privacyModal.style.display =
                "flex";

            document.body.style.overflow =
                "hidden";

        }


        acceptBtn?.addEventListener(
            "click",
            () => {

                localStorage.setItem(
                    "alphaPrivacyAccepted",
                    "true"
                );


                privacyModal.style.display =
                    "none";


                document.body.style.overflow =
                    "auto";

            }
        );


        rejectBtn?.addEventListener(
            "click",
            () => {

                window.location.href =
                    "https://www.google.com";

            }
        );

    }


    /*==========================
              EXTRA
    ==========================*/

    console.log(
        "✅ ALPHA APP LOADED"
    );


});