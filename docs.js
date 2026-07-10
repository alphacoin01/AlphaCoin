document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function openMenu() {

        menuBtn.classList.add("active");
        sideMenu.classList.add("active");
        menuOverlay.classList.add("active");

    }

    function closeMenu() {

        menuBtn.classList.remove("active");
        sideMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

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

});