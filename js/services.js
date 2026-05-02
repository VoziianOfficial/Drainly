"use strict";



document.addEventListener("DOMContentLoaded", () => {
    initServicesAos();
    refreshServicesIcons();
});

function initServicesAos() {
    if (window.AOS && typeof window.AOS.init === "function") {
        document.body.classList.add("aos-ready");

        window.AOS.init({
            duration: 700,
            easing: "ease-out-cubic",
            once: true,
            offset: 70
        });

        return;
    }

    document.body.classList.add("no-aos");
}

function refreshServicesIcons() {
    if (window.DRAINLY && typeof window.DRAINLY.refreshIcons === "function") {
        window.DRAINLY.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}