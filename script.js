document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       Helpers
    =================================*/
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

    /* ================================
       Theme Toggle (Dark/Light Mode)
    =================================*/
    const themeToggle = $("#themeToggle");
    const htmlElement = document.documentElement;

    const initTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

        if (shouldUseDark) {
            htmlElement.classList.remove("light-mode");
        } else {
            htmlElement.classList.add("light-mode");
        }
        updateThemeIcon();
    };

    const updateThemeIcon = () => {
        if (themeToggle) {
            const isLightMode = htmlElement.classList.contains("light-mode");
            themeToggle.textContent = isLightMode ? "🌙" : "☀️";
            themeToggle.setAttribute("aria-label", isLightMode ? "Ativar modo escuro" : "Ativar modo claro");
        }
    };

    const toggleTheme = () => {
        htmlElement.classList.toggle("light-mode");
        const isLightMode = htmlElement.classList.contains("light-mode");
        localStorage.setItem("theme", isLightMode ? "light" : "dark");
        updateThemeIcon();
    };

    if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
    initTheme();

    /* ================================
       Mobile Menu
    =================================*/
    const hamburger = $("#hamburger");
    const mainNav = $("#mainNav");

    if (hamburger && mainNav) {
        const closeMenu = () => {
            mainNav.classList.remove("open");
            hamburger.classList.remove("open");
        };

        const toggleMenu = (e) => {
            mainNav.classList.toggle("open");
            hamburger.classList.toggle("open");
            e.stopPropagation();
        };

        hamburger.addEventListener("click", toggleMenu);
        $$("a", mainNav).forEach(link => link.addEventListener("click", closeMenu));
        document.addEventListener("click", (e) => {
            if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
        });
    }

    /* ================================
       Character Modal
    =================================*/
    const charModal = $("#charModal");
    if (charModal) {
        const modalTitle = $("#modalTitle");
        const modalText = $("#modalText");
        const closeBtn = $(".close-button", charModal);

        const openModal = (name, synopsis) => {
            modalTitle.textContent = name;
            modalText.textContent = synopsis;
            charModal.style.display = "block";
        };

        const closeModal = () => charModal.style.display = "none";

        $$(".personagens .card").forEach(card => {
            card.addEventListener("click", () => {
                const name = $("h3", card)?.innerText || "Arquivo Desconhecido";
                const synopsis = card.dataset.synopsis || "Dados não disponíveis.";
                openModal(name, synopsis);
            });
        });

        closeBtn.addEventListener("click", closeModal);
        window.addEventListener("click", (e) => {
            if (e.target === charModal) closeModal();
        });
    }

    /* ================================
       Scroll Reveal Animation
    =================================*/
    const revealTargets = $$("section, .card, .plataforma, .cabin-character, #curiosidades li");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                }
            });
        }, { threshold: 0.15 });

        revealTargets.forEach(el => {
            el.classList.add("reveal");
            observer.observe(el);
        });
    }

    /* ================================
       Hero Entrance
    =================================*/
    const heroContent = $(".hero-content");
    if (heroContent) {
        setTimeout(() => heroContent.classList.add("in-view"), 300);
    }
});