const logout = async function() {
  // Wait for the fetch to occur before we proceed with the next portion of the code relating to logging out.
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // Once the promise is resolved, we return the user back to the starting page
    document.location.replace('/');
  } else {
    // We will be using our own alert, normally we would just do "alrert('error message here')"
    showAlert(`Failed to Logout`);
  }
};

let logoutlink = document.querySelector('#logout-link');
if (logoutlink) logoutlink.addEventListener('click', logout);