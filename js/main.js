"use strict";

/* ==========================================================
   DRAINLY — GLOBAL SCRIPT
   File: /js/main.js

   Responsibilities:
   - Apply config values from js/config.js
   - Render global header
   - Render fullscreen mobile menu
   - Render footer
   - Apply title/meta from config
   - Initialize consent banner
   - Initialize FAQ accordion
   - Refresh Lucide icons
   - Prevent common UX issues
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing. Make sure js/config.js loads before js/main.js.");
        return;
    }

    ensureSkipLink();
    applyPageMeta();
    renderHeader();
    renderFooter();
    injectConfigValues();
    initMobileMenu();
    initConsentBanner();
    initFaqAccordions();
    initRequestForms();
    setActiveLinks();
    refreshIcons();
});

/* =========================
   HELPERS
   ========================= */

function getConfig() {
    return window.SITE_CONFIG || {};
}

function getCurrentFileName() {
    const path = window.location.pathname;
    const fileName = path.split("/").pop();

    return fileName || "index.html";
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
        element.textContent = value;
    });
}

function setAttribute(selector, attribute, value) {
    document.querySelectorAll(selector).forEach((element) => {
        element.setAttribute(attribute, value);
    });
}

function normalizePath(url) {
    const anchor = document.createElement("a");
    anchor.href = url;

    return anchor.pathname.split("/").pop() || "index.html";
}

function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

/* =========================
   SKIP LINK
   ========================= */

function ensureSkipLink() {
    if (document.querySelector(".skip-link")) return;

    const skipLink = document.createElement("a");
    skipLink.className = "skip-link";
    skipLink.href = "#main";
    skipLink.textContent = "Skip to main content";

    document.body.prepend(skipLink);
}

/* =========================
   PAGE META
   ========================= */

function applyPageMeta() {
    const config = getConfig();
    const currentPage = getCurrentFileName();
    const meta = config.pageMeta?.[currentPage];

    if (!meta) {
        console.warn(`No page meta found for ${currentPage}`);
        return;
    }

    if (meta.title) {
        document.title = meta.title;
    }

    if (meta.description) {
        let description = document.querySelector('meta[name="description"]');

        if (!description) {
            description = document.createElement("meta");
            description.setAttribute("name", "description");
            document.head.appendChild(description);
        }

        description.setAttribute("content", meta.description);
    }

    updateMetaProperty("og:title", meta.title);
    updateMetaProperty("og:description", meta.description);
    updateMetaProperty("og:type", "website");
    updateMetaProperty("og:url", window.location.href);
}

function updateMetaProperty(property, content) {
    if (!content) return;

    let meta = document.querySelector(`meta[property="${property}"]`);

    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
    }

    meta.setAttribute("content", content);
}

/* =========================
   HEADER
   ========================= */

function renderHeader() {
    const config = getConfig();
    const headerMount = document.querySelector("[data-site-header]");

    if (!headerMount) return;

    const services = config.services || [];
    const navigation = config.navigation || [];

    const navLinks = navigation
        .map((item) => {
            return `
                <a href="${escapeHtml(item.url)}">
                    <span>${escapeHtml(item.label)}</span>
                    <i data-lucide="arrow-up-right"></i>
                </a>
            `;
        })
        .join("");

    const serviceLinks = services
        .map((service) => {
            return `
                <a class="menu-service-card" href="${escapeHtml(service.url)}">
                    <i data-lucide="${escapeHtml(service.icon || "droplets")}"></i>
                    <strong>${escapeHtml(service.shortTitle || service.title)}</strong>
                    <span>${escapeHtml(service.cardText || service.description || "")}</span>
                </a>
            `;
        })
        .join("");

    headerMount.innerHTML = `
        <header class="site-header" aria-label="Site header">
            <div class="container-wide">
                <div class="header-inner">
                    <a class="logo" href="index.html" aria-label="${escapeHtml(config.brand?.logoLabel || config.companyName)}">
                        <span class="logo-mark" aria-hidden="true"></span>
                        <span class="logo-text">
                            <span class="logo-name" data-company-name>${escapeHtml(config.companyName)}</span>
                            <span class="logo-tagline" data-brand-short-tagline>${escapeHtml(config.brand?.shortTagline || "")}</span>
                        </span>
                    </a>

                    <div class="header-actions">
                        <a class="btn btn-primary header-phone" href="tel:${escapeHtml(config.phoneHref)}" data-phone-link>
                            <i data-lucide="phone"></i>
                            <span data-phone-label>${escapeHtml(config.phoneLabel || config.phone)}</span>
                        </a>

                        <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-controls="siteMenu" aria-expanded="false" data-menu-open>
                            <span class="menu-toggle-lines" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <nav class="site-menu" id="siteMenu" aria-label="Main navigation" data-site-menu>
            <div class="site-menu-panel" role="dialog" aria-modal="true" aria-label="Navigation menu">
                <div class="menu-panel-head">
                    <a class="logo" href="index.html" aria-label="${escapeHtml(config.brand?.logoLabel || config.companyName)}">
                        <span class="logo-mark" aria-hidden="true"></span>
                        <span class="logo-text">
                            <span class="logo-name">${escapeHtml(config.companyName)}</span>
                            <span class="logo-tagline">${escapeHtml(config.brand?.shortTagline || "")}</span>
                        </span>
                    </a>

                    <button class="menu-close" type="button" aria-label="Close navigation menu" data-menu-close>
                        <i data-lucide="x"></i>
                    </button>
                </div>

                <div class="menu-panel-body">
                    <div class="menu-group">
                        <p class="menu-group-title">Pages</p>
                        <div class="menu-nav">
                            ${navLinks}
                        </div>
                    </div>

                    <div class="menu-group">
                        <p class="menu-group-title">Gutter services</p>
                        <div class="menu-services">
                            ${serviceLinks}
                        </div>
                    </div>
                </div>

                <div class="menu-contact">
                    <a href="tel:${escapeHtml(config.phoneHref)}" data-phone-link>
                        <i data-lucide="phone"></i>
                        <span data-phone-text>${escapeHtml(config.phone)}</span>
                    </a>

                    <a href="mailto:${escapeHtml(config.email)}" data-email-link>
                        <i data-lucide="mail"></i>
                        <span data-email-text>${escapeHtml(config.email)}</span>
                    </a>

                    <span>
                        <i data-lucide="map-pin"></i>
                        <span data-service-area>${escapeHtml(config.serviceArea)}</span>
                    </span>
                </div>
            </div>
        </nav>
    `;
}

/* =========================
   FOOTER
   ========================= */

function renderFooter() {
    const config = getConfig();
    const footerMount = document.querySelector("[data-site-footer]");

    if (!footerMount) return;

    const navigation = config.navigation || [];
    const services = config.services || [];
    const legalLinks = config.legalLinks || [];

    const navigationLinks = navigation
        .map((item) => {
            return `<a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>`;
        })
        .join("");

    const serviceLinks = services
        .map((service) => {
            return `<a href="${escapeHtml(service.url)}">${escapeHtml(service.title)}</a>`;
        })
        .join("");

    const legalNavigation = legalLinks
        .map((item) => {
            return `<a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>`;
        })
        .join("");

    footerMount.innerHTML = `
        <footer class="site-footer">
            <div class="container-wide">
                <div class="footer-main">
                    <div class="footer-brand">
                        <a class="logo" href="index.html" aria-label="${escapeHtml(config.brand?.logoLabel || config.companyName)}">
                            <span class="logo-mark" aria-hidden="true"></span>
                            <span class="logo-text">
                                <span class="logo-name" data-company-name>${escapeHtml(config.companyName)}</span>
                                <span class="logo-tagline" data-brand-short-tagline>${escapeHtml(config.brand?.shortTagline || "")}</span>
                            </span>
                        </a>

                        <p class="footer-text" data-footer-text>${escapeHtml(config.footerText)}</p>

                        <div class="footer-contact">
                            <span>
                                <i data-lucide="map-pin"></i>
                                <span>
                                    <strong data-company-name>${escapeHtml(config.companyName)}</strong><br>
                                    <span data-company-id>${escapeHtml(config.companyId)}</span><br>
                                    <span data-address>${escapeHtml(config.address?.full || "")}</span>
                                </span>
                            </span>
                        </div>
                    </div>

                    <div class="footer-col">
                        <p class="footer-title">Navigation</p>
                        <div class="footer-links">
                            ${navigationLinks}
                        </div>
                    </div>

                    <div class="footer-col">
                        <p class="footer-title">Services</p>
                        <div class="footer-links">
                            ${serviceLinks}
                        </div>
                    </div>

                    <div class="footer-col">
                        <p class="footer-title">Contact</p>
                        <div class="footer-contact">
                            <a href="tel:${escapeHtml(config.phoneHref)}" data-phone-link>
                                <i data-lucide="phone"></i>
                                <span data-phone-text>${escapeHtml(config.phone)}</span>
                            </a>

                            <a href="mailto:${escapeHtml(config.email)}" data-email-link>
                                <i data-lucide="mail"></i>
                                <span data-email-text>${escapeHtml(config.email)}</span>
                            </a>

                            <span>
                                <i data-lucide="map"></i>
                                <span data-service-area>${escapeHtml(config.serviceArea)}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="footer-notes">
                    <p class="footer-legal-notice" data-legal-notice>${escapeHtml(config.legalNotice)}</p>
                    <p class="footer-disclaimer" data-disclaimer>${escapeHtml(config.disclaimer)}</p>
                </div>

                <div class="footer-bottom">
                    <p>
                        © <span data-current-year></span>
                        <span data-company-name>${escapeHtml(config.companyName)}</span>.
                        All rights reserved.
                    </p>

                    <div class="footer-bottom-links">
                        ${legalNavigation}
                    </div>
                </div>
            </div>
        </footer>
    `;
}

/* =========================
   CONFIG VALUE INJECTION
   ========================= */

function injectConfigValues() {
    const config = getConfig();

    setText("[data-company-name]", config.companyName);
    setText("[data-company-id]", config.companyId);
    setText("[data-brand-short-tagline]", config.brand?.shortTagline || "");
    setText("[data-brand-tagline]", config.brand?.tagline || "");
    setText("[data-brand-description]", config.brand?.description || "");

    setText("[data-phone-text]", config.phone);
    setText("[data-phone-label]", config.phoneLabel || config.phone);
    setAttribute("[data-phone-link]", "href", `tel:${config.phoneHref}`);

    setText("[data-email-text]", config.email);
    setAttribute("[data-email-link]", "href", `mailto:${config.email}`);

    setText("[data-address]", config.address?.full || "");
    setText("[data-service-area]", config.serviceArea || "");
    setText("[data-footer-text]", config.footerText || "");
    setText("[data-disclaimer]", config.disclaimer || "");
    setText("[data-legal-notice]", config.legalNotice || "");
    setText("[data-current-year]", new Date().getFullYear());

    document.querySelectorAll("[data-company-address-line]").forEach((element) => {
        element.textContent = [
            config.address?.line1,
            config.address?.city,
            config.address?.state,
            config.address?.zip,
            config.address?.country
        ]
            .filter(Boolean)
            .join(", ");
    });
}

/* =========================
   MOBILE MENU
   ========================= */

function initMobileMenu() {
    const openButton = document.querySelector("[data-menu-open]");
    const closeButton = document.querySelector("[data-menu-close]");
    const menu = document.querySelector("[data-site-menu]");

    if (!openButton || !closeButton || !menu) return;

    const focusableSelectors = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    function openMenu() {
        document.body.classList.add("menu-open");
        openButton.setAttribute("aria-expanded", "true");

        const firstFocusable = menu.querySelector(focusableSelectors);
        if (firstFocusable) firstFocusable.focus();
    }

    function closeMenu() {
        document.body.classList.remove("menu-open");
        openButton.setAttribute("aria-expanded", "false");
        openButton.focus();
    }

    openButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);

    menu.addEventListener("click", (event) => {
        const isOverlayClick = event.target === menu;
        const isMenuLink = event.target.closest("a");

        if (isOverlayClick || isMenuLink) {
            document.body.classList.remove("menu-open");
            openButton.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        if (!document.body.classList.contains("menu-open")) return;

        closeMenu();
    });
}

/* =========================
   ACTIVE LINKS
   ========================= */

function setActiveLinks() {
    const currentPage = getCurrentFileName();

    document.querySelectorAll("a[href]").forEach((link) => {
        const linkPage = normalizePath(link.getAttribute("href"));

        if (linkPage === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });
}

/* =========================
   CONSENT BANNER
   ========================= */

function initConsentBanner() {
    const config = getConfig();
    const bannerConfig = config.consentBanner;

    if (!bannerConfig) return;

    const existingValue = localStorage.getItem(bannerConfig.storageKey);

    if (existingValue === "accepted" || existingValue === "declined") {
        return;
    }

    const banner = document.createElement("section");
    banner.className = "consent-banner is-visible";
    banner.setAttribute("aria-label", "Privacy and policy notice");
    banner.setAttribute("data-consent-banner", "");

    const legalLinks = (config.legalLinks || [])
        .map((item) => {
            return `<a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>`;
        })
        .join("");

    banner.innerHTML = `
        <div class="consent-inner">
            <div class="consent-content">
                <strong>${escapeHtml(bannerConfig.title)}</strong>
                <p>${escapeHtml(bannerConfig.text)}</p>

                <div class="consent-links">
                    ${legalLinks}
                </div>
            </div>

            <div class="consent-actions">
                <button class="btn btn-light" type="button" data-consent-decline>
                    ${escapeHtml(bannerConfig.declineText || "Decline")}
                </button>

                <button class="btn btn-primary" type="button" data-consent-accept>
                    ${escapeHtml(bannerConfig.acceptText || "Accept")}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    const acceptButton = banner.querySelector("[data-consent-accept]");
    const declineButton = banner.querySelector("[data-consent-decline]");

    acceptButton?.addEventListener("click", () => {
        localStorage.setItem(bannerConfig.storageKey, "accepted");
        banner.classList.remove("is-visible");
        banner.remove();
    });

    declineButton?.addEventListener("click", () => {
        localStorage.setItem(bannerConfig.storageKey, "declined");
        banner.classList.remove("is-visible");
        banner.remove();
    });
}

/* =========================
   FAQ ACCORDION
   ========================= */

function initFaqAccordions() {
    const accordions = document.querySelectorAll("[data-accordion]");

    accordions.forEach((accordion) => {
        const items = accordion.querySelectorAll(".faq-item");

        items.forEach((item, index) => {
            const button = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");

            if (!button || !answer) return;

            const answerId = answer.id || `faq-answer-${Date.now()}-${index}`;
            answer.id = answerId;

            button.setAttribute("aria-expanded", "false");
            button.setAttribute("aria-controls", answerId);

            answer.style.maxHeight = "0px";

            button.addEventListener("click", () => {
                const isOpen = item.classList.contains("is-open");

                items.forEach((otherItem) => {
                    const otherButton = otherItem.querySelector(".faq-question");
                    const otherAnswer = otherItem.querySelector(".faq-answer");

                    otherItem.classList.remove("is-open");

                    if (otherButton) {
                        otherButton.setAttribute("aria-expanded", "false");
                    }

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = "0px";
                    }
                });

                if (!isOpen) {
                    item.classList.add("is-open");
                    button.setAttribute("aria-expanded", "true");
                    answer.style.maxHeight = `${answer.scrollHeight}px`;
                }
            });
        });
    });
}

/* =========================
   SERVICE HELPERS
   ========================= */

function getCurrentService() {
    const config = getConfig();
    const currentPage = getCurrentFileName();

    return (config.services || []).find((service) => {
        return service.url === currentPage;
    });
}

function getServiceById(id) {
    const config = getConfig();

    return (config.services || []).find((service) => {
        return service.id === id;
    });
}


/* =========================
   REQUEST FORMS
   ========================= */

function initRequestForms() {
    const forms = document.querySelectorAll(".contact-form, .mini-request-form");

    forms.forEach((form) => {
        if (form.dataset.formReady === "true") return;

        form.dataset.formReady = "true";

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const submitButton = form.querySelector('button[type="submit"]');

            if (!submitButton) return;

            const originalHTML = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.classList.add("is-submitted");
            submitButton.innerHTML = `
                Request noted
                <i data-lucide="check"></i>
            `;

            refreshIcons();

            setTimeout(() => {
                form.reset();

                submitButton.disabled = false;
                submitButton.classList.remove("is-submitted");
                submitButton.innerHTML = originalHTML;

                refreshIcons();
            }, 2200);
        });
    });
}

/* =========================
   PUBLIC HELPERS FOR PAGE FILES
   ========================= */

window.DRAINLY = {
    getConfig,
    getCurrentFileName,
    getCurrentService,
    getServiceById,
    initFaqAccordions,
    injectConfigValues,
    refreshIcons
};