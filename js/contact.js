"use strict";

/* ==========================================================
   DRAINLY — CONTACT PAGE SCRIPT
   File: /js/contact.js
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initContactAos();
    initContactForm();
    refreshContactIcons();
});

function initContactAos() {
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

function initContactForm() {
    const forms = document.querySelectorAll(".contact-form, .mini-request-form");

    forms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const button = form.querySelector('button[type="submit"]');
            const originalText = button ? button.innerHTML : "";

            if (button) {
                button.innerHTML = `Request noted <i data-lucide="check"></i>`;
                button.disabled = true;
                button.classList.add("is-submitted");
            }

            if (window.DRAINLY && typeof window.DRAINLY.refreshIcons === "function") {
                window.DRAINLY.refreshIcons();
            }

            setTimeout(() => {
                if (button) {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.classList.remove("is-submitted");

                    if (window.DRAINLY && typeof window.DRAINLY.refreshIcons === "function") {
                        window.DRAINLY.refreshIcons();
                    }
                }

                form.reset();
            }, 2200);
        });
    });
}

function refreshContactIcons() {
    if (window.DRAINLY && typeof window.DRAINLY.refreshIcons === "function") {
        window.DRAINLY.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}