// a function that is called everytime a form is filled out then the submit button is pressed

// (creates the post, puts it at our end point, then redirects the user to the dashboard where the posts can be viewed.)

const newFormHandler = async function(event) {
  event.preventDefault();

   // dom manipulation to grab the specific text we need (that the user is filling out in the form)
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;
  // Sending data from the form via post request
  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    // Key-value pair, content being sent in request body is in JSON format
    headers: { 'Content-Type': 'application/json' },
  });
  // Redircting the user to another page to see the updated info (the new post)
  document.location.replace('/dashboard');
};

document
  .querySelector('#post-form')
  .addEventListener('submit', newFormHandler);
