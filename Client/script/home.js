
const errorContainer = document.getElementById('errorContainer');
const errorContainerforRegistration = document.getElementById('errorContainerforRegistration');
function displayError(message, type) {
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-danger alert-dismissible fade show';
    errorAlert.role = 'alert';
    errorAlert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    if(type === "login") errorContainer.appendChild(errorAlert);
    else errorContainerforRegistration.appendChild(errorAlert);
}

const BASE_URL = "http://localhost:7000/"

const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

loginForm.addEventListener("submit", handelSubmit)
registerForm.addEventListener("submit", handelRegisteration)

async function handelSubmit(e) {
    e.preventDefault()
    errorContainer.innerHTML = '';
    let loginFormData = new FormData(loginForm)
    let loginObjectData = Object.fromEntries(loginFormData)
    let bodyStr = JSON.stringify(loginObjectData)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: bodyStr,
    }
    fetch(BASE_URL + 'auth/login/', options)
    .then(async response => {
        if(response.status === 200) return { statusCode:200, data: await response.json()}
        return await response.json()
    })
    .then(async res => {
        if(res.statusCode !== 200) {
            displayError(res.message, "login")
            loginForm.reset()
        } else {
            await localStorage.setItem('Token', res.data.token)

            await fetch(BASE_URL + 'auth/user/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('Token')}`,
                },
                body: JSON.stringify({
                    email: loginObjectData.email
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.role[0] === "Member") {
                    window.location.href = "./Member.html"
                } else {
                    window.location.href = "./Librarian.html"
                }
            })
        }
    })
    .catch((err) => {
        console.log(err)
        displayError("There is unexpected error!", "login")
    })
}

function handelRegisteration(e) {
    e.preventDefault()
    let registerFormData = new FormData(registerForm)
    // const role = document.getElementById('role').value;
    registerFormData.append('role',  "Member")
    let registerObjectData = Object.fromEntries(registerFormData)
    let bodyStr = JSON.stringify(registerObjectData)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: bodyStr
    }

    fetch(BASE_URL + 'auth/signup/', options)
    .then(async response => {
        if(response.status === 200) return { statusCode:200, data: await response.json()}
        return await response.json()
    })
    .then(async res => {
        if(res.statusCode !== 200) {
            displayError(res.message, "registration")
            loginForm.reset()
        } else {
            await localStorage.setItem('Token', res.data.token)
            window.location.href = "./Member.html"
        }
    })
    .catch((err) => {
        console.log(err)
        displayError("There is unexpected error!", "regestration")
    })  
}
