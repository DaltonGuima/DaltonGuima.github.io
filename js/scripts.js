/* ===================================================
   Dalton Guimarães — Portfolio Scripts
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---- AOS Init ----
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
    });

    // ---- Navbar scroll effect ----
    const nav = document.getElementById('mainNav');
    const handleScroll = () => {
        if (!nav) return;
        nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---- Custom ScrollSpy (manual) ----
    const navLinks = document.querySelectorAll('#mainNav .nav-link');
    const sections = [];
    navLinks.forEach(link => {
        const id = link.getAttribute('href');
        if (id && id.startsWith('#')) {
            const section = document.querySelector(id);
            if (section) sections.push({ el: section, link });
        }
    });

    function updateActiveNav() {
        const scrollY = window.scrollY;
        const navHeight = nav ? nav.offsetHeight : 70;
        let current = null;

        for (const { el, link } of sections) {
            const top = el.offsetTop - navHeight - 80;
            if (scrollY >= top) {
                current = link;
            }
        }

        navLinks.forEach(l => l.classList.remove('active'));
        if (current) current.classList.add('active');
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ---- Collapse navbar on link click (mobile) ----
    const toggler = document.querySelector('.navbar-toggler');
    document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (toggler && window.getComputedStyle(toggler).display !== 'none') {
                toggler.click();
            }
        });
    });

    // ---- Typing Animation ----
    const phrases = [
        'Full Stack Developer',
        'Spring Boot & Angular',
        'React Native',
        'Sempre aprendendo...',
        'Clean Code enthusiast',
    ];
    const typingEl = document.getElementById('typingText');
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const TYPE_SPEED = 80;
    const DELETE_SPEED = 40;
    const PAUSE_END = 2000;
    const PAUSE_START = 400;

    function typeLoop() {
        if (!typingEl) return;
        const current = phrases[phraseIndex];

        if (!deleting) {
            typingEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(typeLoop, PAUSE_END);
                return;
            }
            setTimeout(typeLoop, TYPE_SPEED);
        } else {
            typingEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeLoop, PAUSE_START);
                return;
            }
            setTimeout(typeLoop, DELETE_SPEED);
        }
    }
    typeLoop();

    // ---- Portfolio Filter ----
    const filterBtns = document.querySelectorAll('.btn-filter');
    const cards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            if (href === '#' || href === '#page-top') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('mainNav')?.offsetHeight || 70;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
