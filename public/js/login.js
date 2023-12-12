const loginFormHandler = async function(event) {
  // Remember, we had to add prevent default, because otherwise, each time there was a change in the form, the whole page would refresh! We want to prevent this default attribute!
  event.preventDefault();

  const usernameElement = document.querySelector('#username-login');
  const passwordElement = document.querySelector('#password-login');

  const response = await fetch('/api/user/login', {
    method: 'POST',
    // When saving data, we have to stringify it to store it
    body: JSON.stringify({
      username: usernameElement.value,
      password: passwordElement.value,
    }),
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    showAlert(`Login Fail!`);
  }
};

let loginform = document.querySelector('#login-form');
if (loginform) loginform.addEventListener('submit', loginFormHandler);