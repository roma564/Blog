document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Перешкоджаємо стандартній відправці форми

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4444/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = '/login'; // Перенаправлення на сторінку логіну
        } else {
            document.getElementById('errorMessage').innerText = data.message;
            document.getElementById('errorMessage').style.display = 'block'; // Виведення помилки
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Error during registration');
    }
});
