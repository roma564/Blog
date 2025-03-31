document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4444/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            //  Зберігаємо токен і ім’я користувача в localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('fullName', data.fullName); // зберігаємо ім’я
            localStorage.setItem('email', data.email);       // за бажанням

            // Показуємо привітання
            document.getElementById('userInfo').textContent = `Welcome, ${data.fullName} (${data.email})`;
            document.getElementById('userInfo').style.display = 'block';

            // Ховаємо форму входу
            document.getElementById('loginForm').style.display = 'none';

        } else {
            document.getElementById('errorMessage').textContent = data.message;
            document.getElementById('errorMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorMessage').textContent = 'An error occurred';
        document.getElementById('errorMessage').style.display = 'block';
    }
});

const fullName = localStorage.getItem('fullName');
const email = localStorage.getItem('email');
const userLink = document.getElementById('userLink');



// Якщо користувач авторизований
if (fullName && email) {
    userLink.textContent = `Welcome, ${fullName}`; // Виводимо ім'я користувача
} else {
    // Якщо користувач не авторизований
    userLink.textContent = 'Welcome, Guest'; // Показуємо "Гість"
}
