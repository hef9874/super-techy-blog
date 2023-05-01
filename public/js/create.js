async function newFormHandler(e) {
    e.preventDefault();

    const title = document.getElementById('post-title');
    const content = document.getElementById('post-text');

    const input = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title, 
            content
        }),
        headers: { 
            'Content-Type': 'application/json' 
        },

    });
    if(input.ok){
        document.location.replace('/dashboard');
    } else {
        alert(input.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);