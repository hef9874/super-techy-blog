//edit post function
async function editFormHandler(e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-text').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const input = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (input.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler)

//delete post function
async function deleteFormHandler(e) {
    e.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

      const input = await fetch(`api/post/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
      });

      if(input.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(input.statusText);
      }

    }

    document.querySelector('.delete-button').addEventListener('click', deleteFormHandler);