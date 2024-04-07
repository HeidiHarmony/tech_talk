// Purpose: Handle the signin and signup forms

//  signinFormHandler: Collect values from the signin form and send a POST request to the API endpoint

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');
// Get the form element
const signinForm = document.querySelector('#signin-form');

// Add an event listener for the 'submit' event
signinForm.addEventListener('submit', signinFormHandler);
});
console.log('Awaiting submit event...');

const signinFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signin form
  const email = document.querySelector('#email-signin').value.trim();
  console.log('email:', email);
  const password = document.querySelector('#password-signin').value.trim();
  console.log('password collected');

  if (email && password) {
    console.log('fetching the signin route');
    // Send a POST request to the API endpoint
    const response = await fetch('/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('welcome back! Let\'s go to the dashboard!');
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
      console.log('you made it to the dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// signupFormHandler: Collect values from the signup form and send a POST request to the API endpoint

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const passwordConfirm = document.querySelector('#password-confirm').value.trim();

  if (password !== passwordConfirm) {
    alert('Passwords do not match');
    return;
  } else if (name && email && username && password) {
    const response = await fetch('/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Get the form element
  const signupForm = document.querySelector('#signup-form');
  
  // Add an event listener for the 'submit' event
  signupForm.addEventListener('submit', signupFormHandler);
  });
