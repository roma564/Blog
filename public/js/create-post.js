

document.getElementById('createPostForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Запобігаємо стандартній відправці форми

    // Збираємо дані з форми'
    // const user = document.getElementById('user').value;
    const title = document.getElementById('title').value;
    const text = document.getElementById('text').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const imageURL = document.getElementById('imageURL').value;
    

    // Формуємо об'єкт для відправки на сервер
    const newPost = {
        // userId: user,
        title: title,
        text: text,
        tags: tags,
        imageURL: imageURL || null  // Якщо URL не введено, передаємо null
    };

    try {
        // Відправляємо дані на сервер
        const response = await fetch('http://localhost:4444/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') // Якщо є токен для аутентифікації
            },
            body: JSON.stringify(newPost),
        });

        if (response.status === 200) {
            alert('Post created successfully!');
            window.location.href = '/posts'; // Перенаправлення на  сторінку зі списком постів
        }else if(response.status === 401) {
            alert('You need to login first: checkAuthJS');
            window.location.href = '/login'; // Перенаправлення на  сторінку з логіном
        }
        else {
            const errorData = await response.json(); // Читаємо JSON з помилкою
            alert(`Failed to create post: ${errorData.message || 'Unknown error'}`);
        }
    } catch (err) {
        console.error('Error creating post:', err);
        alert('Error creating post');
    }
});


