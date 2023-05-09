    const getText = () => {
      const commentText = document.getElementById("comment-text").value;
      return commentText;
    };
    
    const getId = () => {
      const post_id = document.getElementById("post-id").innerText;
      return post_id;
    };

    const createComment = async () => {
      try {
        const comment_text = await getText();
        const post_id = await getId();
        const input = await fetch("/api/user/comment", {
          method: "POST",
          body: JSON.stringify({ post_id, comment_text }),
          headers: { "Content-Type": "application/json" },
        });
        console.log("this is the response", input);
        if (response.ok) {
          alert("Comment Added!");
          document.location.replace(`/blog/${post_id}`);
        }
      } catch (err) {
        console.log(err);
      }
    };  

document.getElementById('comment-btn').addEventListener('click', createComment);