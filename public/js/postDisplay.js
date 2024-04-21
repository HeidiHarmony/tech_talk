document.addEventListener('DOMContentLoaded', () => {

  console.log('DOM loaded! 🚀');

async function fetchPosts() {
  const response = await fetch('/api/posts/getAllPosts');
  const data = await response.json();
  console.log('Posts found:', data);
  data.forEach(post => {
    console.log('Post title:', post.title);
    console.log('Author:', post.user.username);
    post.title = truncateText(post.title, 15);
    post.content = truncateText(post.content, 100);
  });
}

fetchPosts();

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
      return text;
  } else {
      return text.substring(0, maxLength) + '...';
  }
}

 
});

