/*==========================
      PRIVACY POLICY
==========================*/

const privacyModal = document.getElementById("privacyModal");

const acceptBtn = document.getElementById("acceptPrivacy");
const rejectBtn = document.getElementById("rejectPrivacy");


// Si no existe el modal, no hacemos nada
if (privacyModal) {

    // Comprobar si el usuario ya aceptó
    const privacyAccepted =
        localStorage.getItem("alphaPrivacyAccepted");


    // Si ya aceptó, ocultar el modal
    if (privacyAccepted === "true") {

        privacyModal.style.display = "none";

        document.body.style.overflow = "auto";

    } else {

        // Si no ha aceptado, mostrar el modal
        privacyModal.style.display = "flex";

        document.body.style.overflow = "hidden";

    }


    // BOTÓN ACCEPT
    acceptBtn?.addEventListener("click", () => {

        // Guardar aceptación
        localStorage.setItem(
            "alphaPrivacyAccepted",
            "true"
        );

        // Ocultar modal
        privacyModal.style.display = "none";

        // Permitir volver a hacer scroll
        document.body.style.overflow = "auto";

    });


    // BOTÓN REJECT
    rejectBtn?.addEventListener("click", () => {

        window.location.href = "https://www.google.com";

    });

}