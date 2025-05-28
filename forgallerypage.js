document.addEventListener("DOMContentLoaded", function () {
    // ✅ Fix Navigation Buttons with Safety Checks
    const homeBtn = document.getElementById("home-page");
    const galleryBtn = document.getElementById("gallery-page");

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

    // 🧹 Remove Parallax: Reset styles if needed
    const parallaxImages = document.querySelectorAll(".parallax-layer img");
    parallaxImages.forEach((img) => {
        img.style.transform = "translateY(0px)";
        img.style.top = "0px";
    });

    // 🛑 No scroll event listener - parallax fully disabled
});
