async function commentFormHandler(e) {
    e.preventDefault();

    const commentText = document.getElementById('comment-text');
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    if(commentText) {
        const input = await fetch ('api/comment', {
            method: 'POST',
          body: JSON.stringify({
            post_id,
            commentText
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(input.ok) {
            document.location.reload();
        } else {
            alert(input.statusText);
        }
     };
};

document.querySelector('.comments').addEventListener('submit', commentFormHandler);