"use strict";

/* ==========================================================
   DRAINLY — GLOBAL CONFIG
   This file controls shared company data, navigation,
   footer content, legal notices, services, and page meta.

   Change values here once — they update across the website
   through js/main.js and page-specific scripts.
   ========================================================== */

const companyName = "Drainly";
const defaultCompanyName = "Drainly";
const companySlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, "");

const companyPhone = "+1 888 740 2168";
const companyPhoneHref = "+18887402168";
const companyEmail = `hello@${companySlug}match.com`;

const companyAddress = {
    line1: "401 Congress Avenue",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "USA"
};

companyAddress.full = `${companyAddress.line1}, ${companyAddress.city}, ${companyAddress.state} ${companyAddress.zip}, ${companyAddress.country}`;

window.SITE_CONFIG = {
    companyName,
    defaultCompanyName,

    companyId: "DRN-GTR-7284",

    brand: {
        shortName: companyName,
        logoLabel: `${companyName} gutter provider matching platform`,
        tagline: "Compare local gutter providers with a cleaner request flow.",
        shortTagline: "Gutter provider matching",
        description:
            `${companyName} is an independent gutter matching platform that helps homeowners compare local providers for gutter installation, replacement, repair, and cleaning requests.`
    },

    phone: companyPhone,
    phoneHref: companyPhoneHref,
    phoneLabel: `Call ${companyName}`,

    email: companyEmail,

    address: companyAddress,

    serviceArea: "Independent gutter provider matching across the United States",

    footerText:
        `${companyName} is an independent gutter provider matching platform designed to help homeowners compare local provider options for gutter installation, replacement, repair, cleaning, and related rainwater management requests.`,

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        `${companyName} is an independent matching platform and does not perform gutter services directly. Provider availability, quote details, timing, and service scope may vary by location and by independent company.`,

    navigation: [
        {
            label: "Home",
            url: "index.html"
        },
        {
            label: "Services",
            url: "services.html"
        },
        {
            label: "About",
            url: "about.html"
        },
        {
            label: "Contact",
            url: "contact.html"
        }
    ],

    legalLinks: [
        {
            label: "Privacy Policy",
            url: "privacy-policy.html"
        },
        {
            label: "Cookie Policy",
            url: "cookie-policy.html"
        },
        {
            label: "Terms of Service",
            url: "terms-of-service.html"
        }
    ],

    services: [
        {
            id: "gutter-installation",
            title: "Gutter Installation",
            shortTitle: "Installation",
            url: "gutter-installation.html",
            icon: "corner-down-right",
            image: "./assets/images/services/gutter-installation.jpg",
            heroImage: "./assets/images/service-pages/installation-hero.jpg",
            eyebrow: "New gutter requests",
            description:
                "Compare local providers for new gutter installation requests, including standard gutter systems, downspouts, and rainwater routing options.",
            cardText:
                "Start a structured request for new gutter installation and compare provider options in your area.",
            heroTitle:
                "Compare gutter installation providers without a scattered search.",
            heroText:
                `${companyName} helps homeowners begin with a clear installation request, then connect with independent local providers who may fit the project scope, location, and timing.`,
            overviewTitle:
                "A cleaner way to begin a gutter installation request.",
            overviewText:
                `New gutter installation can depend on roofline shape, water flow, home size, material preference, downspout placement, and local provider availability. ${companyName} keeps the first step simple by helping homeowners organize the request before comparing independent providers.`,
            factorsTitle:
                "What may affect provider recommendations?",
            factors: [
                "Home size and roofline complexity",
                "Preferred gutter material and finish",
                "Downspout layout and drainage needs",
                "Local provider availability and timing"
            ],
            questionsTitle:
                "Helpful questions before choosing a provider",
            questions: [
                "Do they explain material and layout options clearly?",
                "Can they describe how water will be routed away from the home?",
                "Do they provide written quote details before work begins?",
                "Can they confirm license and insurance information?"
            ],
            ctaTitle:
                "Start comparing gutter installation options.",
            ctaText:
                "Submit a simple request and continue with independent providers that may serve your area.",
            faq: [
                {
                    question: `Does ${companyName} install gutters directly?`,
                    answer:
                        `No. ${companyName} is an independent matching platform. It helps homeowners connect with local gutter providers, but it does not perform installation work.`
                },
                {
                    question: "Can I compare more than one installation provider?",
                    answer:
                        "Yes. The platform is designed to help homeowners review provider options and continue with companies that may fit their project needs."
                },
                {
                    question: "What should I ask before choosing an installer?",
                    answer:
                        "Ask about license and insurance, material options, quote details, timeline, warranty information, and how downspouts will route water away from the home."
                }
            ]
        },

        {
            id: "gutter-replacement",
            title: "Gutter Replacement",
            shortTitle: "Replacement",
            url: "gutter-replacement.html",
            icon: "replace",
            image: "./assets/images/services/gutter-replacement.jpg",
            heroImage: "./assets/images/service-pages/replacement-hero.jpg",
            eyebrow: "Old or damaged gutter systems",
            description:
                "Connect with local providers for gutter replacement requests when existing gutters are worn, leaking, sagging, or no longer moving water correctly.",
            cardText:
                "Compare provider options for replacing aging, damaged, or poorly performing gutter systems.",
            heroTitle:
                "Find provider options for gutter replacement projects.",
            heroText:
                `${companyName} helps homeowners describe replacement needs clearly, compare local provider availability, and continue with independent companies suited to the request.`,
            overviewTitle:
                "Replacement requests often need better context.",
            overviewText:
                "Gutter replacement may involve removing damaged sections, reviewing fascia condition, choosing new materials, and improving downspout flow. A structured request helps providers understand the scope before homeowners compare quotes.",
            factorsTitle:
                "What can influence replacement options?",
            factors: [
                "Age and condition of existing gutters",
                "Visible sagging, leaks, rust, or separation",
                "Fascia or trim condition near gutter lines",
                "Preferred upgrade style or material"
            ],
            questionsTitle:
                "What to review before choosing a provider",
            questions: [
                "Will the quote include removal of old gutters?",
                "Are downspouts included in the replacement scope?",
                "Will they inspect fascia areas before final pricing?",
                "Can they explain material differences in simple terms?"
            ],
            ctaTitle:
                "Compare gutter replacement providers.",
            ctaText:
                "Share the basic project details and connect with independent providers that may serve your location.",
            faq: [
                {
                    question: "When should gutters be replaced instead of repaired?",
                    answer:
                        "Replacement may be considered when gutters are heavily damaged, frequently leaking, sagging, rusted, or no longer routing water effectively."
                },
                {
                    question: `Does ${companyName} recommend one specific provider?`,
                    answer:
                        `${companyName} helps homeowners compare available independent provider options. The homeowner is responsible for reviewing and choosing a provider.`
                },
                {
                    question: "Should I verify license and insurance?",
                    answer:
                        "Yes. Homeowners should always verify that any hired contractor has the necessary license and insurance for the work being performed."
                }
            ]
        },

        {
            id: "gutter-repair",
            title: "Gutter Repair",
            shortTitle: "Repair",
            url: "gutter-repair.html",
            icon: "wrench",
            image: "./assets/images/services/gutter-repair.jpg",
            heroImage: "./assets/images/service-pages/repair-hero.jpg",
            eyebrow: "Leaks, sagging, and loose sections",
            description:
                "Compare local gutter repair providers for issues such as leaks, loose joints, detached sections, drainage concerns, and minor damage.",
            cardText:
                "Start a repair request for gutter problems and compare local provider options.",
            heroTitle:
                "Compare local gutter repair provider options.",
            heroText:
                `${companyName} helps homeowners describe visible gutter concerns and connect with independent providers who may evaluate repair needs in their area.`,
            overviewTitle:
                "Repair requests work best with clear details.",
            overviewText:
                "Gutter repair needs can vary from small leaks to detached runs, blocked drainage points, or storm-related damage. Clear photos, visible symptoms, and location details can help providers better understand the request.",
            factorsTitle:
                "What may affect repair provider fit?",
            factors: [
                "Type and location of visible damage",
                "Whether water is overflowing or leaking",
                "Height and accessibility of the gutter area",
                "Whether the issue may require replacement instead"
            ],
            questionsTitle:
                "Useful questions for repair providers",
            questions: [
                "Can they inspect the problem before confirming repair scope?",
                "Will they explain whether repair or replacement makes more sense?",
                "Can they provide written pricing details?",
                "Do they handle the specific gutter material installed?"
            ],
            ctaTitle:
                "Start a gutter repair request.",
            ctaText:
                `Use ${companyName} to organize your request and compare independent provider options.`,
            faq: [
                {
                    question: "Can small gutter leaks be repaired?",
                    answer:
                        "In many cases, minor leaks or loose sections may be repairable. A local provider can evaluate whether repair or replacement is more appropriate."
                },
                {
                    question: "Should I upload photos when requesting repair quotes?",
                    answer:
                        "Photos may help providers understand visible symptoms, location, and possible scope, but final recommendations can vary after inspection."
                },
                {
                    question: `Does ${companyName} guarantee repair work?`,
                    answer:
                        `${companyName} does not perform or guarantee work. All contractors or providers are independent.`
                }
            ]
        },

        {
            id: "gutter-cleaning",
            title: "Gutter Cleaning",
            shortTitle: "Cleaning",
            url: "gutter-cleaning.html",
            icon: "sparkles",
            image: "./assets/images/services/gutter-cleaning.jpg",
            heroImage: "./assets/images/service-pages/cleaning-hero.jpg",
            eyebrow: "Overflow and debris concerns",
            description:
                "Connect with local providers for gutter cleaning requests involving leaves, debris buildup, overflow, and routine seasonal maintenance.",
            cardText:
                "Compare local provider options for gutter cleaning and seasonal maintenance requests.",
            heroTitle:
                "Find gutter cleaning providers with a simpler request flow.",
            heroText:
                `${companyName} helps homeowners start a gutter cleaning request and compare independent providers based on location, service category, and availability.`,
            overviewTitle:
                "Routine cleaning can help prevent bigger issues.",
            overviewText:
                `Gutter cleaning requests often involve clogged sections, overflowing water, leaf buildup, downspout blockages, or seasonal maintenance. ${companyName} helps homeowners present the request clearly before connecting with providers.`,
            factorsTitle:
                "What can affect cleaning provider availability?",
            factors: [
                "Home height and gutter accessibility",
                "Amount of debris or visible blockage",
                "Downspout condition",
                "Seasonal demand in the local area"
            ],
            questionsTitle:
                "What to ask before scheduling cleaning",
            questions: [
                "Is downspout clearing included?",
                "Do they remove debris from the property or bag it?",
                "Can they identify visible repair concerns?",
                "Do they carry appropriate insurance for ladder work?"
            ],
            ctaTitle:
                "Compare gutter cleaning options.",
            ctaText:
                "Submit a simple request and continue with independent local providers that may match your needs.",
            faq: [
                {
                    question: "How often should gutters be cleaned?",
                    answer:
                        "Frequency depends on trees, weather, roof shape, and local conditions. Many homeowners compare seasonal cleaning options, especially before heavy rain periods."
                },
                {
                    question: "Are gutter cleaning quotes usually free?",
                    answer:
                        "Quote practices vary by provider. Homeowners should confirm pricing, visit fees, and service scope directly with the independent provider."
                },
                {
                    question: "Can cleaning providers also identify repairs?",
                    answer:
                        "Some providers may notice visible issues during cleaning, but repair availability and recommendations vary by company."
                }
            ]
        }
    ],

    pageMeta: {
        "index.html": {
            title: `${companyName} | Compare Local Gutter Providers`,
            description:
                `${companyName} helps homeowners compare local gutter providers for installation, replacement, repair, and cleaning requests.`
        },
        "services.html": {
            title: `Gutter Services | ${companyName}`,
            description:
                `Explore gutter service categories and compare independent local providers through ${companyName}.`
        },
        "about.html": {
            title: `About ${companyName} | Gutter Provider Matching`,
            description:
                `Learn how ${companyName} helps homeowners connect with independent local gutter providers without acting as a contractor.`
        },
        "contact.html": {
            title: `Contact ${companyName} | Start a Gutter Request`,
            description:
                `Contact ${companyName} to begin a gutter provider matching request for installation, replacement, repair, or cleaning.`
        },
        "gutter-installation.html": {
            title: `Gutter Installation Providers | ${companyName}`,
            description:
                `Compare local gutter installation providers through ${companyName}, an independent gutter matching platform.`
        },
        "gutter-replacement.html": {
            title: `Gutter Replacement Providers | ${companyName}`,
            description:
                `Find provider options for gutter replacement requests with ${companyName}.`
        },
        "gutter-repair.html": {
            title: `Gutter Repair Providers | ${companyName}`,
            description:
                `Compare independent local providers for gutter repair requests through ${companyName}.`
        },
        "gutter-cleaning.html": {
            title: `Gutter Cleaning Providers | ${companyName}`,
            description:
                `Start a gutter cleaning request and compare provider options with ${companyName}.`
        },
        "privacy-policy.html": {
            title: `Privacy Policy | ${companyName}`,
            description:
                `Read the ${companyName} privacy policy.`
        },
        "cookie-policy.html": {
            title: `Cookie Policy | ${companyName}`,
            description:
                `Read the ${companyName} cookie policy.`
        },
        "terms-of-service.html": {
            title: `Terms of Service | ${companyName}`,
            description:
                `Read the ${companyName} terms of service.`
        }
    },

    consentBanner: {
        storageKey: `${companySlug}_policy_consent`,
        title: "Privacy and policy notice",
        text:
            `${companyName} uses essential site functionality and may use cookies or similar technologies to improve the request experience. Review our policies before continuing.`,
        acceptText: "Accept",
        declineText: "Decline"
    },

    contactForm: {
        title: "Start a gutter matching request",
        text:
            `Share a few details about your gutter project. ${companyName} does not perform work directly, but helps route requests toward independent provider options.`,
        projectTypes: [
            "Gutter installation",
            "Gutter replacement",
            "Gutter repair",
            "Gutter cleaning",
            "Not sure yet"
        ]
    }
};

console.log("CONFIG LOADED:", window.SITE_CONFIG.companyName, window.SITE_CONFIG.address.full);