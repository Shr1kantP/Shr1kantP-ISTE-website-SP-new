// foreventpage.js

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Home page navigation
    const homeButton = document.getElementById("index");
    if (homeButton) {
        homeButton.onclick = () => location.href = "index.html";
    }

    // Gallery page navigation
    const galleryButton = document.getElementById("gallery-page");
    if (galleryButton) {
        galleryButton.onclick = () => location.href = "gallery-page.html";
    }

    // Events page navigation
    const eventsButton = document.getElementById("goEvent");
    if (eventsButton) {
        eventsButton.onclick = () => location.href = "event-page.html"; // Adjust to your events page URL
    }

    // Register buttons (use class instead of ID)
    const registerButtons = document.querySelectorAll(".register-button");
    registerButtons.forEach(button => {
        button.onclick = () => location.href = "register-page.html";
    });
});