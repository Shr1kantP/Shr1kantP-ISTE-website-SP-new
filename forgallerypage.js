document.addEventListener("DOMContentLoaded", function () {
    // ✅ Fix Navigation Buttons with Safety Checks
    const homeBtn = document.getElementById("home-page");
    const galleryBtn = document.getElementById("gallery-page");
      const eventBtn = document.getElementById("event-page");

    if (homeBtn) {
        homeBtn.onclick = function () {
            location.href = "index.html";
        };
    }

    if (galleryBtn) {
        galleryBtn.onclick = function () {
            location.href = "gallery-page.html";
        };
    }

    if (eventBtn) {
        eventBtn.onclick = function () {
            location.href = "event-page.html";
        };
    }

    // 🧹 Remove Parallax: Reset styles if needed
    const parallaxImages = document.querySelectorAll(".parallax-layer img");
    parallaxImages.forEach((img) => {
        img.style.transform = "translateY(0px)";
        img.style.top = "0px";
    });

    // foreventpage.js

    // Ensure the DOM is fully loaded before attaching event listeners
    document.addEventListener("DOMContentLoaded", () => {
        // Home page navigation
        const homeButton = document.getElementById("index");
        if (homeButton) {
            homeButton.onclick = () => location.href = "index.html";
        }

        // Register buttons (use class instead of ID)
        const eventButtons = document.getElementById("event-page");
        eventButtons.forEach(button => {
            button.onclick = () => location.href = "event-page.html";
        });
    });
    // 🛑 No scroll event listener - parallax fully disabled
});

