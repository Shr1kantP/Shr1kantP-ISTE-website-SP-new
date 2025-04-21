document.addEventListener("DOMContentLoaded", function () {
    // Parallax effect for background images
    const parallaxImages = document.querySelectorAll(".parallax-layer img");
    const firstImage = parallaxImages[0];
    const secondImage = parallaxImages[1];
    const copyrightFooter = document.querySelector(".copyright-footer");

    // Set initial position of second image below the first
    const initialTop = firstImage.offsetHeight;
    secondImage.style.top = `${initialTop}px`;

    // Variables to track scroll position and lock point
    let lastScrollPosition = window.scrollY;
    let scrollLockPosition = null;
    let lastScrollTime = 0;
    const scrollDebounceDelay = 16; // ~60fps

    // Detect mobile screens
    const isMobile = () => window.innerWidth <= 858;

    // Adjust parallax speeds for mobile
    const getParallaxSpeeds = () => {
        if (isMobile()) {
            return { speed1: 0.1, speed2: 0.05 }; // Even slower speeds for mobile
        }
        return { speed1: 0.5, speed2: 0.3 }; // Original speeds for desktop
    };

    // Optimized scroll handler with debounce
    function handleScroll() {
        const currentTime = performance.now();
        if (currentTime - lastScrollTime < scrollDebounceDelay) {
            return; // Skip if too soon
        }
        lastScrollTime = currentTime;

        const currentScrollPosition = window.scrollY;
        const footerRect = copyrightFooter.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const { speed1, speed2 } = getParallaxSpeeds();

        // Calculate the scroll position where the copyright footer's bottom reaches the viewport's bottom
        const footerBottomPosition = currentScrollPosition + footerRect.bottom;

        // Determine scroll direction
        const scrollingDown = currentScrollPosition > lastScrollPosition;

        // If scrolling down and footer's bottom reaches or passes the viewport's bottom, set the lock position
        if (scrollingDown && footerRect.bottom <= windowHeight && scrollLockPosition === null) {
            scrollLockPosition = currentScrollPosition;
        }

        // If scroll lock is active and scrolling down, prevent going past lock position
        if (scrollLockPosition !== null && scrollingDown && currentScrollPosition > scrollLockPosition) {
            window.scrollTo(0, scrollLockPosition);
            // Apply parallax at the locked position
            const offset1 = scrollLockPosition * speed1;
            const offset2 = scrollLockPosition * speed2;
            firstImage.style.transform = `translateY(${offset1}px)`;
            secondImage.style.transform = `translateY(${offset2}px)`;
        } else {
            // Normal parallax movement when not locked or scrolling up
            const offset1 = currentScrollPosition * speed1;
            firstImage.style.transform = `translateY(${offset1}px)`;

            // Calculate the maximum translateY for the second image to stop at the copyright footer
            const footerTop = footerRect.top + currentScrollPosition;
            const secondImageHeight = secondImage.offsetHeight;
            const maxOffset2 = footerTop - initialTop - secondImageHeight;
            const offset2 = Math.min(currentScrollPosition * speed2, maxOffset2);
            secondImage.style.transform = `translateY(${offset2}px)`;

            // Reset lock if scrolling back up
            if (currentScrollPosition < scrollLockPosition) {
                scrollLockPosition = null;
            }
        }

        // Update last scroll position
        lastScrollPosition = currentScrollPosition;
    }

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Navigation buttons with error checking
    const homeButton = document.getElementById("home");
    const contactButton = document.getElementById("goContact");
    const teamButton = document.getElementById("team");
    const galleryButton = document.getElementById("gallery");

    if (homeButton) {
        homeButton.onclick = function () {
            location.href = "index.html";
        };
    } else {
        console.warn("Home button with id='home' not found in the HTML.");
    }

    if (contactButton) {
        contactButton.onclick = function () {
            location.href = "contact-page.html";
        };
    } else {
        console.warn("Contact button with id='goContact' not found in the HTML.");
    }

    if (teamButton) {
        teamButton.onclick = function () {
            location.href = "team-page.html";
        };
    } else {
        console.warn("Team button with id='team' not found in the HTML.");
    }

    if (galleryButton) {

        galleryButton.onclick = function () {
            location.href = "gallery-page.html";
        };
    } else {
        console.warn("Gallery button with id='gallery' not found in the HTML.");
    }
});