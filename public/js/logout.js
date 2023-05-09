async function logoutHandler(e) {
    e.preventDefault();

    const input = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
    });

    if(input.ok){
        document.location.replace('/');
    } else {
        alert(input.statusText);
    }
}

document
.querySelector('#logout')
.addEventListener('click', logoutHandler);