document.getElementById('createPostForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Запобігаємо стандартній відправці форми

    const formData = new FormData();  // Створюємо об'єкт FormData

    // Додаємо всі дані з форми в FormData
    formData.append('title', document.getElementById('title').value);
    formData.append('text', document.getElementById('text').value);
    formData.append('tags', document.getElementById('tags').value.split(',').map(tag => tag.trim()));

    // Додаємо файл зображення (якщо є)
    const imageFile = document.getElementById('image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        // Відправляємо дані на сервер через POST-запит з FormData
        const response = await fetch('http://localhost:4444/api/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Токен для аутентифікації
            },
            body: formData,
        });

        if (response.status === 200) {
            alert('Post created successfully!');
            window.location.href = '/posts'; // Перенаправлення на сторінку зі списком постів
        } else if (response.status === 401) {
            alert('You need to login first');
            window.location.href = '/login'; // Перенаправлення на сторінку з логіном
        } else {
            const errorData = await response.json(); // Читаємо JSON з помилкою
            alert(`Failed to create post: ${errorData.message || 'Unknown error'}`);
        }
    } catch (err) {
        console.error('Error creating post:', err);
        alert('Error creating post');
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