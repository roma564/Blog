// Перевірка наявності даних користувача в localStorage
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
                     ${post.imageURL ? `<img src="${post.imageURL}" alt="Post Image">` : ''}
                    <p>${post.text}</p>
                    <p class="tags">Tags: ${post.tags.join(', ')}</p>
                   
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
    // Функція для відкриття сторінки з деталями поста
    function viewPost(postId) {
        // Перенаправлення на сторінку з деталями поста
        window.location.href = `/post-details.html?id=${postId}`;
    }

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

    
};

function viewPost(postId) {
    // Перенаправлення на сторінку з деталями поста
    window.location.href = `/post-details.html?id=${postId}`;
}