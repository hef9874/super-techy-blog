

async function signupHandler(e) {
    e.preventDefault();

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (!username.value || !email.value || !password.value) {
        alert('Please fill in all the required fields.');
        return;
    };

    let input = null;

    if (username && email && password) {
        input = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    };

    if (input.ok) {
        console.log('You are signed up!')
        document.location.replace('/dashboard');
    } else {
        alert(input.statusText);
    }
}

document
    .getElementById('form')
    .addEventListener('submit', signupHandler);

