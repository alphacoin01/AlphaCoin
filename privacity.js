document.addEventListener("DOMContentLoaded", () => {

    const privacyModal = document.getElementById("privacyModal");

    const acceptBtn = document.getElementById("acceptPrivacy");
    const rejectBtn = document.getElementById("rejectPrivacy");
    const readBtn = document.getElementById("readPrivacy");

    /*=========================
        ALREADY ACCEPTED
    =========================*/

    if(localStorage.getItem("alpha_privacy") === "true"){

        privacyModal.style.display = "none";

    }

    /*=========================
        ACCEPT
    =========================*/

    acceptBtn?.addEventListener("click", () => {

        localStorage.setItem("alpha_privacy","true");

        privacyModal.style.display = "none";

    });

    /*=========================
        READ POLICY
    =========================*/

    readBtn?.addEventListener("click", () => {

        window.location.href = "privacy.html";

    });

    /*=========================
        REJECT
    =========================*/

    rejectBtn?.addEventListener("click", () => {

        window.location.href = "https://google.com";

    });

});