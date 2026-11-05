const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
    const themeLabel = themeToggle.querySelector(".theme-toggle-label");
    const savedTheme = localStorage.getItem("portfolio-theme");
    const isDark = savedTheme === "dark";

    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    if (themeLabel) {
        themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
    }

    themeToggle.addEventListener("click", () => {
        const enableDarkMode = document.documentElement.dataset.theme !== "dark";
        document.documentElement.dataset.theme = enableDarkMode ? "dark" : "light";
        themeToggle.setAttribute("aria-pressed", String(enableDarkMode));
        if (themeLabel) {
            themeLabel.textContent = enableDarkMode ? "Light mode" : "Dark mode";
        }
        localStorage.setItem("portfolio-theme", enableDarkMode ? "dark" : "light");
    });
}

if (navbar && menuToggle && menu) {
    const closeMenu = () => {
        navbar.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        navbar.classList.toggle("is-open", !isOpen);
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    });

    menu.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            closeMenu();
            menuToggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 992) {
            closeMenu();
        }
    });
}

document.querySelectorAll(".pic10, .pic20").forEach((row) => {
    const images = Array.from(row.querySelectorAll(":scope > .gallery-img"));
    if (images.length === 0) {
        return;
    }

    const track = document.createElement("div");
    track.className = "marquee-track";

    const group = document.createElement("div");
    group.className = "marquee-group";
    images.forEach((image) => group.append(image));

    const duplicate = group.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    duplicate.querySelectorAll("img").forEach((image) => image.setAttribute("alt", ""));

    track.append(group, duplicate);
    row.replaceChildren(track);
    row.classList.add("marquee-row");
});