// Purpose: Handle the login and signup forms

//  signinFormHandler: Collect values from the signin form and send a POST request to the API endpoint

document.addEventListener('DOMContentLoaded', (event) => {
// Get the form element
const signinForm = document.querySelector('#signin-form');

// Add an event listener for the 'submit' event
signinForm.addEventListener('submit', signinFormHandler);
});

const signinFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signin form
  const email = document.querySelector('#email-signin').value.trim();
  const password = document.querySelector('#password-signin').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// signupFormHandler: Collect values from the signup form and send a POST request to the API endpoint

document.addEventListener('DOMContentLoaded', (event) => {
  // Get the form element
  const signupForm = document.querySelector('#signup-form');
  
  // Add an event listener for the 'submit' event
  signupForm.addEventListener('submit', signinFormHandler);
  });

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const passwordConfirm = document.querySelector('#password-confirm').value.trim();

  if (password !== passwordConfirm) {
    alert('Passwords do not match');
    return;
  } else if (name && email && password) {
    const response = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signin-form')
  .addEventListener('submit', signinFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
