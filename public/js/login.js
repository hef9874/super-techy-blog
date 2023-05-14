userLoginHandler = async (event) => {
  event.preventDefault()

  const email = document.getElementById('email-input').value.trim()
  const password = document.getElementById('password-input').value.trim()
  console.log(email, password)

  if (email && password) {
      const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({
              email,
              password
          }),
          headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
          document.location.replace('/dashboard')
      } else {
          alert(response.statusText)
      }
  }
}
  
  document
    .getElementById('login-form')
    .addEventListener('submit', userLoginHandler);