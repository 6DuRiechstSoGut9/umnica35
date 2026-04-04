document.addEventListener('DOMContentLoaded', () => {

    // --- 1. МОБИЛЬНОЕ МЕНЮ ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active'); 
            menuToggle.classList.toggle('open'); 
        });

        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }

    // --- 2. ИНДИКАТОР ПРОГРЕССА СКРОЛЛА ---
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        if(progressBar) {
            progressBar.style.width = Math.round(scrollPercent * 100) + '%';
        }
    });

    // --- 3. ПРОВЕРКА УСТРОЙСТВА (Мышь vs Тач) ---
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;

    if (isPointerFine) {
        // --- ПЛАВНЫЙ КУРСОР ---
        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');
        
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        });

        const animateCursor = () => {
            outlineX += (mouseX - outlineX) * 0.2; // Сделал чуть отзывчивее
            outlineY += (mouseY - outlineY) * 0.2;
            outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Реакция курсора
        const interactables = document.querySelectorAll('a, button, .magnetic-btn, .gallery-item');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => outline.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => outline.classList.remove('cursor-hover'));
        });

        // --- МАГНИТНЫЕ ЭЛЕМЕНТЫ (Сдержанные) ---
        const magnetics = document.querySelectorAll('.magnetic-btn, .magnetic-link');
        magnetics.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Коэффициент уменьшен с 0.3 до 0.1 для более мягкого эффекта
                el.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0)`;
                
                const text = el.querySelector('.btn-text');
                if(text) text.style.transform = `translate3d(${x * 0.05}px, ${y * 0.05}px, 0)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = `translate3d(0, 0, 0)`;
                el.style.transition = `transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
                const text = el.querySelector('.btn-text');
                if(text) {
                    text.style.transform = `translate3d(0, 0, 0)`;
                    text.style.transition = `transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
                }
            });
            
            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
                const text = el.querySelector('.btn-text');
                if(text) text.style.transition = 'none';
            });
        });

        // --- ПАРАЛЛАКС ФОНА ---
        const shapes = document.querySelectorAll('.shape');
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 100;
            const y = (e.clientY - window.innerHeight / 2) / 100;
            shapes.forEach(shape => {
                const speed = shape.getAttribute('data-speed');
                shape.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
            });
        });

        // --- 3D НАКЛОН И БЛИК КАРТОЧЕК ---
        const tiltCards = document.querySelectorAll('.tilt-3d');
        tiltCards.forEach(card => {
            const glare = card.querySelector('.glare');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                if(glare) {
                    glare.style.opacity = '1';
                    glare.style.transform = `translate3d(${x - centerX}px, ${y - centerY}px, 0)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
                card.style.transition = `transform 0.5s ease`;
                if(glare) glare.style.opacity = '0';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }

    // --- 4. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (Работает везде) ---
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => observer.observe(reveal));
});