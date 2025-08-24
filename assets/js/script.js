/* scripts.js
*/

/* -------- helpers ------------ */
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

/* ---------- NAV / HAMBURGER ---------- */
const hamburger = $('.hamburger');
const navLinks = $('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('active');
        // toggle icon
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // close nav when link clicked (mobile)
    $$('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const icon = hamburger.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
        });
    });
    }

    /* ---------- SMOOTH SCROLL FOR ANCHORS ---------- */
    $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return; // allow default if href="#"
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = 70; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
    });

    /* ---------- HEADER SCROLL EFFECT ---------- */
    window.addEventListener('scroll', () => {
    const header = $('header');
    if (!header) return;
    if (window.scrollY > 90) {
        header.style.padding = '12px 0';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.12)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '';
    }
    });

    /* ---------- CONTACT FORM (demo client-side) ---------- */
    const contactForm = $('#contactForm');
    if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = $('#name').value.trim();
        const email = $('#email').value.trim();
        const subject = $('#subject').value.trim();
        const message = $('#message').value.trim();

        if (!name || !email || !subject || !message) {
        alert('Silakan lengkapi semua field!');
        return;
        }

        // Demo: hanya alert dan reset form (tidak mengirim ke server)
        alert(`Terima kasih ${name}! Pesan Anda telah terkirim.`);
        contactForm.reset();
    });
    }

    /* ---------- ANIMATION ON SCROLL (simple) ---------- */
    const animateOnScroll = () => {
    const elements = $$('.section-title, .project-card, .contact-item, .about-stats');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const trigger = window.innerHeight / 1.25;
        if (rect.top < trigger) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        }
    });
    };

    // set initial state
    $$('.section-title, .project-card, .contact-item, .about-stats').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    /* ---------- TYPING EFFECT for #profession ---------- */
    const professionElement = $('#profession');
    const professions = [
    "Web Developer",
    "Cybersecurity Enthusiast",
    "Future Leader",
    "Long-life Learner",
    "Critical Thinker",
    "Problem Solver",
    "Tech Innovation"
    ];

    let pIdx = 0;
    let cIdx = 0;
    let deleting = false;

    function typeLoop() {
    if (!professionElement) return;

    const current = professions[pIdx];
    if (!deleting) {
        cIdx++;
        professionElement.textContent = current.slice(0, cIdx);
    } else {
        cIdx--;
        professionElement.textContent = current.slice(0, cIdx);
    }

    let delay = deleting ? 50 : 100;

    if (!deleting && cIdx === current.length) {
        delay = 1800;
        deleting = true;
    } else if (deleting && cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % professions.length;
        delay = 600;
    }

    setTimeout(typeLoop, delay);
    }

    // start typing after load
    window.addEventListener('load', () => {
    setTimeout(typeLoop, 800);
    });

    /* ---------- LOCAL PROFILE IMAGE UPLOAD (preview only) ---------- */
    const profileContainer = $('#profileContainer');
    const profileImg = $('#profilePhoto');
    const profileUpload = $('#profileUpload');

    if (profileContainer && profileImg && profileUpload) {
    // klik container -> buka dialog file
    profileContainer.addEventListener('click', () => profileUpload.click());

    // handle selection
    profileUpload.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        // validate basic type
        if (!file.type.startsWith('image/')) {
        alert('Silakan pilih file gambar (jpg, png, webp, dll).');
        profileUpload.value = '';
        return;
        }

        // preview via FileReader (data URL). Tidak meng-upload ke server.
        const reader = new FileReader();
        reader.onload = () => {
        profileImg.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

/* ---------- small UX: tahun otomatis di footer ---------- */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
