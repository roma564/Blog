window.onload = async function() {
    try {
        const response = await fetch('http://localhost:4444/api/posts');
        
        // Логуємо відповідь сервера
        const responseText = await response.text();
        console.log('Response:', responseText);  // Перевірте, що саме повертає сервер
        
        // Якщо відповідь ок, пробуємо парсити як JSON
        const posts = JSON.parse(responseText);  // Спробуємо вручну парсити JSON

        if (response.ok) {
            const postsContainer = document.getElementById('postsContainer');
            
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post-item');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.text}</p>
                    <p class="tags">Tags: ${post.tags.join(', ')}</p>
                    ${post.imageURL ? `<img src="${post.imageURL}" alt="Post Image">` : ''}
                    <button onclick="viewPost('${post._id}')">View</button>
                `;
                postsContainer.appendChild(postElement);
            });
        } else {
            alert('Failed to load posts');
        }
    } catch (err) {
        console.error('Error fetching posts:', err);
        alert('Error fetching posts');
    }
};
