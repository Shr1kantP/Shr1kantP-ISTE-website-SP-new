document.addEventListener("DOMContentLoaded", function () {
    // Parallax effect for background images
    const parallaxImages = document.querySelectorAll(".parallax-layer img");
    const firstImage = parallaxImages[0];
    const secondImage = parallaxImages[1];
    const copyrightFooter = document.querySelector(".copyright-footer");

    // Check if required elements exist
    if (!firstImage || !secondImage || !copyrightFooter) {
        console.warn("Parallax elements or footer not found. Skipping parallax effect.");
        return;
    }

    // Set initial position of second image below the first
    const initialTop = firstImage.offsetHeight;
    secondImage.style.top = `${initialTop}px`;

    // Variables to track scroll position and lock point
    let lastScrollPosition = window.scrollY;
    let scrollLockPosition = null;
    let isScrolling = false;

    // Detect mobile screens (based on CSS breakpoints: <=858px)
    const isMobile = () => window.innerWidth <= 858;

    // Adjust parallax speeds for mobile
    const getParallaxSpeeds = () => {
        if (isMobile()) {
            return { speed1: 0.2, speed2: 0.1 }; // Slower speeds for mobile
        }
        return { speed1: 0.5, speed2: 0.3 }; // Original speeds for desktop
    };

    // Optimized scroll handler with requestAnimationFrame
    function handleScroll() {
        if (isScrolling) return;
        isScrolling = true;

        requestAnimationFrame(() => {
            const currentScrollPosition = window.scrollY;
            const footerRect = copyrightFooter.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const { speed1, speed2 } = getParallaxSpeeds();

            // Calculate the scroll position where the footer's bottom reaches the viewport's bottom
            const footerBottomPosition = currentScrollPosition + footerRect.bottom;

            // Determine scroll direction
            const scrollingDown = currentScrollPosition > lastScrollPosition;

            // If scrolling down and footer's bottom reaches or passes the viewport's bottom, set the lock position
            if (scrollingDown && footerRect.bottom <= windowHeight && scrollLockPosition === null) {
                scrollLockPosition = currentScrollPosition;
            }

            // If scroll lock is active and scrolling down, prevent going past lock position
            if (scrollLockPosition !== null && scrollingDown && currentScrollPosition > scrollLockPosition) {
                window.scrollTo({ top: scrollLockPosition, behavior: "smooth" });
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
            isScrolling = false;
        });
    }

    // Add scroll event listener with passive option
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Gallery slider functionality
    const slides = document.querySelectorAll(".slide");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const prevArrow = document.querySelector(".prev-arrow");
    const nextArrow = document.querySelector(".next-arrow");
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoSlideInterval = null;

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === currentIndex);
        });
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle("active", index === currentIndex);
        });
    }

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    }

    if (slides.length > 0 && thumbnails.length > 0) {
        startAutoSlide();

        prevArrow?.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
            startAutoSlide();
        });

        nextArrow?.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
            startAutoSlide();
        });

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener("click", () => {
                currentIndex = index;
                updateSlider();
                startAutoSlide();
            });
        });
    }

    // Scroll animation for sections using IntersectionObserver
    const sections = document.querySelectorAll(".welcome-section, .stats, .site-footer");
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px",
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                sectionObserver.unobserve(entry.target); // Unobserve after animation
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(50px)";
        section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        sectionObserver.observe(section);
    });

    // Navigation link handlers
    const galleryLink = document.getElementById("gallery-page");
    if (galleryLink) {
        galleryLink.addEventListener("click", () => {
            window.location.assign("gallery-page.html");
        });
    }

    // Objective dropdown functionality
    const objectiveToggles = document.querySelectorAll(".objective-toggle");
    objectiveToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const content = toggle.nextElementSibling;
            if (content?.classList.contains("objective-content")) {
                toggle.classList.toggle("active");
                content.classList.toggle("active");
            }
        });
    });

    // Cleanup event listeners on page unload
    window.addEventListener("unload", () => {
        window.removeEventListener("scroll", handleScroll);
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    });
});