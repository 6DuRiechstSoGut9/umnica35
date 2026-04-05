// ==========================================
// ТЕМНАЯ ТЕМА
// ==========================================
const themeBtn = document.getElementById('theme-toggle');
// Проверяем, есть ли сохраненная тема в localStorage
const currentTheme = localStorage.getItem('theme');

// Если тема была сохранена, применяем её
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

themeBtn.addEventListener('click', () => {
    // Получаем текущую тему
    let theme = document.documentElement.getAttribute('data-theme');
    
    // Переключаем
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        // Фильтруем только те элементы, которые вошли в кадр
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        visibleEntries.forEach((entry, index) => {
            entry.target.style.willChange = 'transform, opacity'; // Подсказали браузеру подготовить GPU

            setTimeout(() => {
                entry.target.classList.add('is-visible');
                // После окончания анимации (например, через 800мс) убираем will-change
                setTimeout(() => {
                    entry.target.style.willChange = 'auto';
                }, 800); 
            }, index * 100);
            
            observer.unobserve(entry.target);
        });
    }, { 
        rootMargin: '0px 0px -80px 0px', // Увеличим отступ, чтобы анимация начиналась чуть позже
        threshold: 0.15 
    });

    fadeElements.forEach(el => observer.observe(el));
});


// ==========================================
// КНОПКА "НАВЕРХ" И ЧИСТЫЙ URL ПРИ КЛИКАХ
// ==========================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Показываем/прячем кнопку при скролле
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) { // Показываем после 500px скролла
        scrollTopBtn.classList.add('is-visible');
    } else {
        scrollTopBtn.classList.remove('is-visible');
    }
});

// Плавный скролл наверх
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Останавливаем стандартный переход с добавлением # в URL
        const targetId = this.getAttribute('href');
        
        // Если это просто ссылка наверх (логотип)
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Очищаем адресную строку от хэша без перезагрузки
            history.pushState("", document.title, window.location.pathname);
            return;
        }

        // Для ссылок на разделы
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Рассчитываем отступ (например, высота твоей липкой шапки)
            const headerOffset = 80; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            history.pushState(null, null, window.location.pathname); 
        }
    });
});


