document.getElementById('createPostForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Запобігаємо стандартній відправці форми

    // Збираємо дані з форми
    const title = document.getElementById('title').value;
    const text = document.getElementById('text').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const imageURL = document.getElementById('imageURL').value;

    // Формуємо об'єкт для відправки на сервер
    const newPost = {
        title: title,
        text: text,
        tags: tags,
        imageURL: imageURL || null  // Якщо URL не введено, передаємо null
    };

    try {
        // Відправляємо дані на сервер
        const response = await fetch('http://localhost:4444/api/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Якщо є токен для аутентифікації
            },
            body: JSON.stringify(newPost),
        });

        if (response.ok) {
            alert('Post created successfully!');
            window.location.href = '/posts'; // Перенаправлення на  сторінку зі списком постів
        } else {
            alert('Failed to create post');
        }
    } catch (err) {
        console.error('Error creating post:', err);
        alert('Error creating post');
    }
});

window.onload = function() {
    const token = localStorage.getItem('token'); // Отримуємо токен з localStorage

    if (!token) {
        // Якщо токен відсутній, перенаправляємо на сторінку логіну
        window.location.href = '/login';  // Змінюємо на правильну сторінку логіну
    } else {
        // Якщо токен є, перевіряємо його на сервері (це необов'язково, якщо сервер все одно проводить перевірку)
        fetch('http://localhost:4444/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                window.location.href = '/login'; // Якщо токен недійсний, редіректимо на логін
            }
        })
        .catch(err => {
            console.error('Token verification failed:', err);
            window.location.href = '/login';  // Перенаправляємо на логін при помилці
        });
    }
}

