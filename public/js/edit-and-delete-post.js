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

const saveBlogEdit = async () => {
    const post_id = document.querySelector("#post-id").innerText;
    const postTitle = document.querySelector("#post-title");
    const postText = document.querySelector("#post-text");
  
    const input = await fetch(`/api/user/blog/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({
        post_title: postTitle.value,
        post_content: postText.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (input.ok) {
        document.location.replace("/dashboard");
        alert("Post Updated!");
      } else {
        alert("Failed to update post.");
      }
    };

document.getElementById('save-button').addEventListener('click', editFormHandler)

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