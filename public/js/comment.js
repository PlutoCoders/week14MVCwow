const commentFormHandler = async function(event) {
  event.preventDefault();

  // creating variables to store the specific values within th elements of the form
  const postId = document.querySelector('input[name="post-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  // if the body exists, exececute the post method
  if (body) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // Reload to update the page with the recent changes from the post request
    document.location.reload();
  }
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
