document.addEventListener("DOMContentLoaded", () => {


    const RPC = "https://api.mainnet-beta.solana.com";
    const JUPITER_API = "https://lite-api.jup.ag/swap/v1";

    const TOKENS = {
        SOL: {
            mint: "So11111111111111111111111111111111111111112",
            decimals: 9
        },
        USDC: {
            mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            decimals: 6
        }
    };

    let wallet = null;
    let quote = null;
    let debounce;

    const connection = new solanaWeb3.Connection(RPC);

    console.log("APP LOADED");

    const connectBtn = document.getElementById("connectWallet");
    const walletInfo = document.getElementById("walletInfo");

    const fromToken = document.getElementById("fromToken");
    const toToken = document.getElementById("toToken");

    const fromAmount = document.getElementById("fromAmount");
    const toAmount = document.getElementById("toAmount");

    const swapBtn = document.getElementById("swapBtn");
    const swapDirection = document.getElementById("swapDirection");

    const themeToggle = document.getElementById("themeToggle");

    function getProvider() {
        if (window.solana?.isPhantom) return window.solana;
        window.open("https://phantom.app/", "_blank");
        return null;
    }

    async function connectWallet() {
        try {
            const provider = getProvider();
            if (!provider) return;

            const res = await provider.connect();
            wallet = res.publicKey.toString();

            const span = connectBtn.querySelector("span");

            if (span) {
                span.textContent =
                    wallet.slice(0, 4) + "..." + wallet.slice(-4);
            }

            walletInfo.innerHTML = `
                <div style="text-align:center">
                    <h3 style="color:#31D7D5;">Wallet Connected</h3>
                    <p style="font-size:13px;opacity:.8;">
                        ${wallet}
                    </p>
                </div>
            `;

        } catch (err) {
            console.error(err);
        }
    }

    connectBtn?.addEventListener("click", connectWallet);

    async function fetchQuote(inputMint, outputMint, amount) {
        try {
            const url =
                `${JUPITER_API}/quote` +
                `?inputMint=${inputMint}` +
                `&outputMint=${outputMint}` +
                `&amount=${amount}` +
                `&slippageBps=50`;

            const res = await fetch(url);

            if (!res.ok) return null;

            return await res.json();

        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async function updateQuote() {

        const amountUI = parseFloat(fromAmount.value);

        if (!amountUI || amountUI <= 0) {
            toAmount.value = "";
            quote = null;
            return;
        }

        const from = TOKENS[fromToken.value];
        const to = TOKENS[toToken.value];

        const amount = Math.floor(amountUI * (10 ** from.decimals));

        const q = await fetchQuote(from.mint, to.mint, amount);

        if (!q || !q.outAmount) {
            toAmount.value = "No route";
            quote = null;
            return;
        }

        quote = q;

        const out = Number(q.outAmount) / (10 ** to.decimals);
        toAmount.value = out.toFixed(6);
    }

    fromAmount?.addEventListener("input", () => {
        clearTimeout(debounce);
        debounce = setTimeout(updateQuote, 300);
    });

    fromToken?.addEventListener("change", updateQuote);
    toToken?.addEventListener("change", updateQuote);

    swapDirection?.addEventListener("click", () => {

        const temp = fromToken.value;
        fromToken.value = toToken.value;
        toToken.value = temp;

        swapDirection.classList.add("rotating");

        setTimeout(() => {
            swapDirection.classList.remove("rotating");
        }, 200);

        updateQuote();
    });

    swapBtn?.addEventListener("click", async () => {

        if (!wallet) {
            alert("Connect wallet first");
            return;
        }

        if (!quote || !quote.outAmount) {
            alert("No quote yet");
            return;
        }

        try {

            const res = await fetch(`${JUPITER_API}/swap`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    quoteResponse: quote,
                    userPublicKey: wallet,
                    wrapAndUnwrapSol: true
                })
            });

            const data = await res.json();

            if (!data.swapTransaction) {
                throw new Error("No transaction returned");
            }

            const txBuf = Uint8Array.from(
                atob(data.swapTransaction),
                c => c.charCodeAt(0)
            );

            const tx = solanaWeb3.VersionedTransaction.deserialize(txBuf);

            const signed = await window.solana.signTransaction(tx);

            const sig = await connection.sendRawTransaction(signed.serialize());

            alert("Swap success:\n" + sig);

        } catch (err) {
            console.error(err);
            alert("Swap failed");
        }
    });

    function setTheme(mode) {

        if (mode === "light") {
            document.body.classList.add("light");
            if (themeToggle) themeToggle.textContent = "☀️";
        } else {
            document.body.classList.remove("light");
            if (themeToggle) themeToggle.textContent = "🌙";
        }

        localStorage.setItem("theme", mode);
    }

    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    themeToggle?.addEventListener("click", () => {

        const isLight = document.body.classList.contains("light");
        setTheme(isLight ? "dark" : "light");

    });

    const modal = document.getElementById("privacyModal");
    const accept = document.getElementById("acceptPrivacy");
    const reject = document.getElementById("rejectPrivacy");

    if (modal) {

        const accepted = localStorage.getItem("alpha_privacy");

        if (accepted === "true") {
            modal.style.display = "none";
        }

        accept?.addEventListener("click", () => {
            localStorage.setItem("alpha_privacy", "true");
            modal.style.display = "none";
        });

        reject?.addEventListener("click", () => {
            window.location.href = "https://www.google.com";
        });
    }

    const launchDate = new Date("July 10, 2026 00:00:00").getTime();

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

   /* ===========================
   MOBILE MENU
=========================== */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

if (menuBtn && mobileMenu && menuOverlay) {

    menuBtn.addEventListener("click", () => {

        menuBtn.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");

    });

    menuOverlay.addEventListener("click", () => {

        menuBtn.classList.remove("active");
        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            menuBtn.classList.remove("active");
            mobileMenu.classList.remove("active");
            menuOverlay.classList.remove("active");

        });

    });

}

});