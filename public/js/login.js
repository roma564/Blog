document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Надсилаємо запит до сервера
        const response = await fetch('http://localhost:4444/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        // Якщо вхід успішний
        if (response.ok) {
            // Зберігаємо токен в localStorage (або sessionStorage)
            localStorage.setItem('token', data.token);

            // Виводимо інформацію про користувача
            document.getElementById('userInfo').textContent = `Welcome, ${data.fullName} (${data.email})`;
            document.getElementById('userInfo').style.display = 'block';

            // Приховуємо форму логіну
            document.getElementById('loginForm').style.display = 'none';
        } else {
            // Якщо є помилка, показуємо повідомлення
            document.getElementById('errorMessage').textContent = data.message;
            document.getElementById('errorMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorMessage').textContent = 'An error occurred';
        document.getElementById('errorMessage').style.display = 'block';
    }
});
