const loginForm = document.getElementById('login-form');
var modalCreateAccountBtn = document.querySelector("#modal-create-account-btn");
var modalCreateMusAccountBtn = document.querySelector("#modal-em-login-link");
const loginLogout = document.querySelector('.login')

if (loginLogout.innerHTML == 'Logout'){
  loginLogout.addEventListener('click', async function(e){
    console.log('clicked on logout')
    const response = await fetch('/api/employee/logout')
    if (response.ok) {
      window.location.href = '/';
    } else {
      const error = await response.json();
      alert(error.message);
    }
  })
}

if(loginLogout.innerHTML == 'Login'){
modalSubmitBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const username = document.getElementById('modal-body-id').elements["username"].value
  const password = document.getElementById('modal-body-id').elements["password"].value
  const isEmployee = document.querySelector('#employeeLogin').checked
  if(isEmployee){
    const response = await fetch('/api/employee/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({username, password }),
    })
    if (response.ok) { 
      window.location.href = '/catalogoptions';
    } else {
      const error = await response.json();
      alert(error.message);
    }
  }else{
    const response = await fetch('/api/visitor/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({username, password }),
    })
    if (response.ok) { 
      window.location.href = '/';
    } else {
      const error = await response.json();
      alert(error.message);
    }
  }
})
}

if(loginLogout.innerHTML == 'Login'){
modalCreateAccountBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const username = document.getElementById('modal-body-id').elements["username"].value
  const password = document.getElementById('modal-body-id').elements["password"].value
  const isEmployee = document.querySelector('#employeeLogin').checked
  if(isEmployee){
  const response = await fetch('/api/employee/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({username, password}),
  })
  if (response.ok) {
   console.log('created user')
   const successMessage = document.createElement('div');
   successMessage.textContent = 'Account created successfully!';
   successMessage.style.color = 'green';
  } else {
    const error = await response.json();
    alert(error.message);
  }
  }else{
    const response = await fetch('/api/visitor/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({username, password}),
    })
    if (response.ok) {
     console.log('created user')
    } else {
      const error = await response.json();
      alert(error.message);
    }
  }
});
}