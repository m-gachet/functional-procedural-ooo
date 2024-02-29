const form = document.querySelector('form')
const logs = []

form.addEventListener('submit', e => {
  e.preventDefault()
  const username = e.target.elements.username.value
  const password = e.target.elements.password.value

  let error = ''

  if (username.trim().length < 3)
    error = 'Username must be at least 3 characters long'
  else if (!password.match(/[0-9]/))
    error = 'Password must contain at least one digit'

  if (error) {
    logs.push(error)
    alert(error)
    return
  }

  const user = {
    username,
    password,
  }

  console.log(user)
  console.log(logs)
});