const commentHandler = async (event) => {
    event.preventDefault();
  
    const commentText = document.getElementById('comment-text').value.trim();
    const postId = document.getElementById('post-id').textContent.trim();
    console.log('this is post-id', postId)
  
    if (commentText && postId) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          post_id: postId,
          comment_text: commentText
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("this is the response", response);
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add comment');
      }
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('comment-form').addEventListener('submit', commentHandler);
  });  