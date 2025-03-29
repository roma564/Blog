window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id'); // Отримуємо ID з URL
    
    if (!postId) {
        alert('Post ID is missing');
        return;
    }

    try {
        const response = await fetch(`http://localhost:4444/api/posts/${postId}`);
        
        const post = await response.json();

        if (response.ok) {
            const postDetailsContainer = document.getElementById('postDetailsContainer');
            
            // Виводимо деталі поста на сторінку
            postDetailsContainer.innerHTML = `
                <h2>${post.title}</h2>
                 ${post.imageURL ? `<img id="postImage" src="http://localhost:4444${post.imageURL}" alt="Post Image">` : ''}
                <p>${post.text}</p>
                <p class="tags">Tags: ${post.tags.join(', ')}</p>
               
            `;
        } else {
            alert('Failed to load post details');
        }
    } catch (err) {
        console.error('Error fetching post details:', err);
        alert('Error fetching post details');
    }
};
