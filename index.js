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

    // Detect mobile screens (based on your CSS breakpoints: <=858px)
    const isMobile = () => window.innerWidth <= 858;

    // Adjust parallax speeds for mobile
    const getParallaxSpeeds = () => {
        if (isMobile()) {
            return { speed1: 0.3, speed2: 0.15 }; // Slower speeds for mobile
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
            const footerTop = footerRect.top + currentScrollPosition; // Absolute top position of footer
            const secondImageHeight = secondImage.offsetHeight; // Height of the second image
            const maxOffset2 = footerTop - initialTop - secondImageHeight; // Max translateY to keep image above footer
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

    // Add scroll event listener with passive option for better mobile performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Gallery slider functionality
    const slides = document.querySelectorAll('.slide');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }

    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 5000);

    prevArrow.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });

    nextArrow.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            currentIndex = index;
            updateSlider();
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlider();
            }, 5000);
        });
    });

    // Scroll animation for sections
    const sections = document.querySelectorAll('.welcome-section, .stats, .site-footer');
    function checkVisibility() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    window.addEventListener('scroll', checkVisibility, { passive: true });
    checkVisibility();

    // Navigation link handlers
    document.getElementById("gallery-page").onclick = function () {
        location.href = "gallery-page.html";
    };

    // Objective dropdown functionality
    const objectiveToggles = document.querySelectorAll('.objective-toggle');

    objectiveToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling; // Get the .objective-content div
            toggle.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
});