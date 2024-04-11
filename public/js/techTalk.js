/* document.addEventListener('DOMContentLoaded', () => {
    const showAllPosts = () => {
        fetch('/api/posts/getAllPosts'),
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    }
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('show-all-posts');
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.author}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        });

showAllPosts = () => {
    fetch('/api/posts/getAllPosts'),
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' };
}
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('show-all-posts');
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.author}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        });


});
 */