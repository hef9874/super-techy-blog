const userLogin = async function(event) {
    event.preventDefault();
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
  
    const input = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (input.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Please try to login again');
    }
  };
  
  document
    .querySelector('.form-login')
    .addEventListener('submit', userLogin);