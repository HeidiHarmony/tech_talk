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

const newPostButton = document.getElementById('new-post-button');
const savePostButton = document.getElementById('save-post-button');
const newPostDiv = document.getElementById('new-post-div');

newPostButton.addEventListener('click', () => {
  newPostDiv.classList.toggle('hiddendiv');
});

savePostButton.addEventListener('click', async () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const status = document.getElementById('status').value;
  const date_created = new Date().toLocaleDateString();
  const date_published = date_created;

  try {
    await savePost(title, content, status, date_created, date_published);
  } catch (error) {
    console.error('Error:', error);
  }

  console.log('Title:', title);
  console.log('Content:', content);
  console.log('Status:', status);
  console.log('Date created:', date_created);
});

async function savePost(title, content, status, date_created, date_published) {
  const url = status === 'publish' ? '/api/posts/savePublished' : '/api/posts/saveDraft';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ title, content, status, date_created, date_published }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);

  window.location.reload();
}});