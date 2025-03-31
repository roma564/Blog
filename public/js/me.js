window.onload = async function() {
    try {
        const response = await fetch('http://localhost:4444/api/me', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token') // Токен користувача
            }
        });

        if (response.ok) {
            const userData = await response.json();

            const userDetailsContainer = document.getElementById('userDetails');
            userDetailsContainer.innerHTML = `
                <p><strong>Full Name:</strong> ${userData.fullName}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Avatar:</strong> <img src="${userData.avatarUrl || '/default-avatar.png'}" alt="User Avatar" style="width: 100px; height: 100px; border-radius: 50%;"></p>
            `;
        } else {
            alert('Error fetching user data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching user data');
    }
};

// Функція для логауту
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    window.location.href = '/'; // Перенаправляємо на головну сторінку після виходу
}
