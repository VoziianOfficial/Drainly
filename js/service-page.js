"use strict";

/* ==========================================================
   DRAINLY — SERVICE PAGE SCRIPT
   File: /js/service-page.js

   This file reads the current service page filename and
   replaces the template content with the correct service data
   from js/config.js.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const service = getCurrentServiceData();

    if (!service) {
        console.warn("No service data found for this page.");
        initServiceAos();
        refreshServiceIcons();
        return;
    }

    renderServicePage(service);
    injectServiceFaqSchema(service);
    initServiceAos();
    initServiceFaqAgain();
    renderRelatedServices(service);
    refreshServiceIcons();
    
});


function renderRelatedServices(currentService) {
    const config = window.SITE_CONFIG;
    const mount = document.querySelector("[data-related-services]");

    if (!config || !mount || !currentService) return;

    const relatedServices = (config.services || [])
        .filter((service) => service.id !== currentService.id)
        .slice(0, 3);

    mount.innerHTML = relatedServices
        .map((service) => {
            return `
                <a class="service-related-card" href="${escapeServiceHtml(service.url)}">
                    <img src="${escapeServiceHtml(service.image || service.heroImage || "")}"
                        alt="${escapeServiceHtml(service.title)} provider matching category">

                    <span class="service-related-card-icon">
                        <i data-lucide="${escapeServiceHtml(service.icon || "droplets")}"></i>
                    </span>

                    <div class="service-related-card-content">
                        <span>${escapeServiceHtml(service.eyebrow || service.shortTitle || "Gutter request")}</span>

                        <h3>${escapeServiceHtml(service.title)}</h3>

                        <p>
                            ${escapeServiceHtml(service.cardText || service.description || "")}
                        </p>

                        <strong class="service-related-card-link">
                            View category
                            <i data-lucide="arrow-right"></i>
                        </strong>
                    </div>
                </a>
            `;
        })
        .join("");

    refreshServiceIcons();
}

function escapeServiceHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* =========================
   GET CURRENT SERVICE
   ========================= */

function getCurrentServiceData() {
    if (window.DRAINLY && typeof window.DRAINLY.getCurrentService === "function") {
        return window.DRAINLY.getCurrentService();
    }

    const config = window.SITE_CONFIG;
    if (!config || !Array.isArray(config.services)) return null;

    const fileName = window.location.pathname.split("/").pop() || "index.html";

    return config.services.find((service) => service.url === fileName) || null;
}

/* =========================
   RENDER SERVICE PAGE
   ========================= */

function renderServicePage(service) {
    setText("[data-service-title]", service.title);
    setText("[data-service-eyebrow]", service.eyebrow);
    setText("[data-service-hero-title]", service.heroTitle);
    setText("[data-service-hero-text]", service.heroText);

    setText("[data-service-overview-title]", service.overviewTitle);
    setText("[data-service-overview-text]", service.overviewText);

    setText("[data-service-factors-title]", service.factorsTitle);
    setText("[data-service-questions-title]", service.questionsTitle);

    setText("[data-service-cta-title]", service.ctaTitle);
    setText("[data-service-cta-text]", service.ctaText);

    updateServiceIcon(service);
    updateServiceImage(service);
    renderServiceFactors(service);
    renderServiceQuestions(service);
    renderServiceFaq(service);
}

/* =========================
   SMALL HELPERS
   ========================= */

function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
        element.textContent = value || "";
    });
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* =========================
   ICON / IMAGE
   ========================= */

function updateServiceIcon(service) {
    const icons = document.querySelectorAll("[data-service-icon]");

    icons.forEach((icon) => {
        icon.setAttribute("data-lucide", service.icon || "droplets");
    });
}

function updateServiceImage(service) {
    const heroImages = document.querySelectorAll("[data-service-hero-image]");
    const overviewImages = document.querySelectorAll("[data-service-overview-image]");

    heroImages.forEach((image) => {
        image.setAttribute("src", service.heroImage || service.image || "");
        image.setAttribute("alt", `${service.title} provider matching request`);
    });

    overviewImages.forEach((image) => {
        image.setAttribute("src", service.heroImage || service.image || "");
        image.setAttribute("alt", `${service.title} service overview visual`);
    });
}

/* =========================
   FACTORS
   ========================= */

function renderServiceFactors(service) {
    const list = document.querySelector("[data-service-factors]");

    if (!list || !Array.isArray(service.factors)) return;

    list.innerHTML = service.factors
        .map((item) => {
            return `
                <li>
                    <i data-lucide="check"></i>
                    <span>${escapeHtml(item)}</span>
                </li>
            `;
        })
        .join("");
}

/* =========================
   QUESTIONS
   ========================= */

function renderServiceQuestions(service) {
    const list = document.querySelector("[data-service-questions]");

    if (!list || !Array.isArray(service.questions)) return;

    list.innerHTML = service.questions
        .map((item) => {
            return `
                <li>
                    <i data-lucide="check"></i>
                    <span>${escapeHtml(item)}</span>
                </li>
            `;
        })
        .join("");
}

/* =========================
   FAQ
   ========================= */

function renderServiceFaq(service) {
    const faqMount = document.querySelector("[data-service-faq]");

    if (!faqMount || !Array.isArray(service.faq)) return;

    faqMount.innerHTML = service.faq
        .map((faqItem, index) => {
            const answerId = `${service.id}-faq-${index + 1}`;

            return `
                <article class="faq-item">
                    <button class="faq-question" type="button" aria-expanded="false" aria-controls="${answerId}">
                        <span>${escapeHtml(faqItem.question)}</span>
                        <i data-lucide="plus"></i>
                    </button>

                    <div class="faq-answer" id="${answerId}">
                        <div class="faq-answer-inner">
                            <p>${escapeHtml(faqItem.answer)}</p>
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");
}

/* =========================
   FAQ SCHEMA
   ========================= */

function injectServiceFaqSchema(service) {
    if (!Array.isArray(service.faq) || service.faq.length === 0) return;

    const existingSchema = document.querySelector("[data-service-faq-schema]");
    if (existingSchema) existingSchema.remove();

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => {
            return {
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer
                }
            };
        })
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-service-faq-schema", "");
    script.textContent = JSON.stringify(schema, null, 2);

    document.body.appendChild(script);
}

/* =========================
   AOS / FAQ / ICONS
   ========================= */

function initServiceAos() {
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

function initServiceFaqAgain() {
    if (window.DRAINLY && typeof window.DRAINLY.initFaqAccordions === "function") {
        window.DRAINLY.initFaqAccordions();
    }
}

function refreshServiceIcons() {
    if (window.DRAINLY && typeof window.DRAINLY.refreshIcons === "function") {
        window.DRAINLY.refreshIcons();
        return;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}