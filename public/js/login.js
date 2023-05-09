const userLoginHandler = async function(event) {
    event.preventDefault();
    const email = document.getElementById('email-input');
    const password = document.getElementById('password-input');
  
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
      console.log('Input Not Okay, Input Bad')
      alert('Please try to login again');
    }
  };
  
  document
    .getElementById('login-btn')
    .addEventListener('click', userLoginHandler);