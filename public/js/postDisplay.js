const Handlebars = require('handlebars');

// API call to get all posts

document.addEventListener('DOMContentLoaded', () => {
  // API call to get all posts
  fetch('/api/posts/getAllPosts')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Render the posts using the Handlebars template
      const template = Handlebars.compile(document.getElementById('post-template').innerHTML);
      const html = template({ posts: data });
      document.getElementById('show-all-posts').innerHTML = html;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation to get all posts:', error);
    });
});
