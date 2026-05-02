"use strict";

/* ==========================================================
   DRAINLY — LEGAL PAGES SCRIPT
   File: /js/legal.js
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    refreshLegalIcons();
});

function refreshLegalIcons() {
    if (window.DRAINLY && typeof window.DRAINLY.refreshIcons === "function") {
        window.DRAINLY.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}