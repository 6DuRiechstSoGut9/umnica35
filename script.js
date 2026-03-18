document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы

    const formData = new FormData(e.target);
    const button = e.target.querySelector('button');
    const originalText = button.innerText;

    button.innerText = 'Отправляем...';
    button.disabled = true;

    try {
        const response = await fetch('./send.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert('Спасибо! Мы скоро свяжемся с вами.');
            e.target.reset(); // Очищаем форму
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        alert('Ошибка сети. Попробуйте позже.');
    } finally {
        button.innerText = originalText;
        button.disabled = false;
    }
});