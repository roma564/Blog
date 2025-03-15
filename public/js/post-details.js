window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id'); // Отримуємо ID з URL
    
    if (!postId) {
        alert('Post ID is missing');
        return;
    }

    try {
        const response = await fetch(`http://localhost:4444/api/posts/${postId}`);
        
        // Логуємо відповідь сервера
        const responseText = await response.text();
        console.log('Response:', responseText);  // Перевірте, що саме повертає сервер

        const post = JSON.parse(responseText);  // Спробуємо вручну парсити JSON

        if (response.ok) {
            const postDetailsContainer = document.getElementById('postDetailsContainer');
            
            // Виводимо деталі поста на сторінку
            postDetailsContainer.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.text}</p>
                <p class="tags">Tags: ${post.tags.join(', ')}</p>
                ${post.imageURL ? `<img src="${post.imageURL}" alt="Post Image">` : ''}
            `;
        } else {
            alert('Failed to load post details');
        }
    } catch (err) {
        console.error('Error fetching post details:', err);
        alert('Error fetching post details');
    }
};
