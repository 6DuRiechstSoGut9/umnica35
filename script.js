document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        // Фильтруем только те элементы, которые вошли в кадр
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        visibleEntries.forEach((entry, index) => {
            // Добавляем небольшую задержку в зависимости от порядкового номера в очереди
            // 100мс (0.1s) — идеальный интервал, чтобы глаз заметил последовательность
            setTimeout(() => {
                entry.target.classList.add('is-visible');
            }, index * 100); 
            
            observer.unobserve(entry.target);
        });
    }, { 
        rootMargin: '0px 0px -80px 0px', // Увеличим отступ, чтобы анимация начиналась чуть позже
        threshold: 0.15 
    });

    fadeElements.forEach(el => observer.observe(el));
});