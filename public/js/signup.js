const signupFormHandler = async function(event) {
  event.preventDefault();

  const usernameElement = document.querySelector('#username-sign');
  const passwordElement = document.querySelector('#password-sign');

  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameElement.value,
      password: passwordElement.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(`You were not able to signup!`);
    console.log(`Response Status Text`, response.statusText);
  }
};

document
  .querySelector('#sign-form')
  .addEventListener('submit', signupFormHandler);
