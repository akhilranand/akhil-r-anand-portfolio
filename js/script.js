document.addEventListener('DOMContentLoaded', () => {
    // Reveal on Scroll logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            // Close mobile menu on link click
            closeMobileMenu();
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const hamburgerSpans = document.querySelectorAll('.hamburger span');

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1062.22) {
                closeMobileMenu();
            }
        });
    }

    // Minimal fire spark pointer trail effect
    const sparkContainer = document.createElement('div');
    sparkContainer.className = 'mouse-spark-container';
    document.body.appendChild(sparkContainer);

    const maxSparks = 20;
    document.addEventListener('mousemove', (e) => {
        const spark = document.createElement('span');
        spark.className = 'mouse-spark';

        const size = Math.floor(Math.random() * 4) + 2;
        const xOffset = Math.random() * 8 - 4;
        const yOffset = Math.random() * 8 - 4;

        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.left = `${e.clientX + xOffset}px`;
        spark.style.top = `${e.clientY + yOffset}px`;
        spark.style.animationDuration = `${Math.random() * 0.15 + 0.35}s`;

        sparkContainer.appendChild(spark);

        if (sparkContainer.childElementCount > maxSparks) {
            sparkContainer.removeChild(sparkContainer.firstChild);
        }

        spark.addEventListener('animationend', () => {
            if (spark.parentElement) spark.parentElement.removeChild(spark);
        });
    });
});

