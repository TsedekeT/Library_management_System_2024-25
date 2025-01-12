
    bsCustomFileInput.init()

    const myModal = new bootstrap.Modal(document.getElementById('addBook'));
    const updateModel = new bootstrap.Modal(document.getElementById('editBook'));
    const BASE_URL = "http://localhost:7000/"
    const pendingUsers = document.getElementById("pending-users");
    const errorContainer = document.getElementById('errorContainer');
    const LogOutBtn = document.getElementById("LogOut");
    const AddBookFrom = document.getElementById("addBookForm")
    const BookDisplayLocation = document.getElementById("bookDisplay")

    AddBookFrom.addEventListener('submit', handelBookSubmit)
    LogOutBtn.addEventListener("click", () => {
      localStorage.removeItem("Token")
      window.location.href = "./home.html"
    })

    async function handelDelete(productId) {
      await fetch(BASE_URL + `products/${productId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then(res => {
        if(res.status !== 200) {
          switch (res.status) {
            case 401:
              displayError("It seens your session has ended. Log again!")
              setTimeout(() => window.location.href = "./home.html", 1000)
              break;
            case 403:
              displayError("You Don't have permission to do these action")
              break
            default:
              displayError("There is un expected error!")
              break;
          }
        } else {
          const removableElement = document.getElementById(`product_${productId}`)
          removableElement.remove()
        }
      })
    }

    function listBooks() {
      BookDisplayLocation.innerHTML = ""
      fetch(BASE_URL + "products/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("Token")}`,
        }
        
      })
      .then(async res => {
        if(res.status === 200) {
          const jsonData = await res.json()
          jsonData.forEach((product)=>{
            let tempElement = `
            <div id="product_${product._id}" class="book-item">
              <img class="" src="${BASE_URL + "static/" + product.image}" alt="Book Title 6">
              <h3>${product.bookName}</h3>
              <p>by ${product.name}</p>
              <button class="btn bg-success" onclick="handelUpdate('${product._id}')">Edit</button>
              <button class="btn bg-danger" onclick="handelDelete('${product._id}')">Delete</button>
            </div>
            `
            BookDisplayLocation.innerHTML += tempElement
          })
        }
        if(BookDisplayLocation.innerHTML.length === 0) {
          BookDisplayLocation.innerHTML =  `
            <div class="alert alert-success p-5">
              <h3 class="text-center"> There is No Book avaliable right now</h3>
            </div>`
        }
      })
    }

    async function handelUpdate(productId) {
      updateModel.show()
      const updateForm = document.getElementById("updateForm")
      updateForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let BookFormData = new FormData()
        const name = document.getElementById('nameEdit')
        const price = document.getElementById('bookNameEdit')
        const description = document.getElementById('descriptionEdit')
        const category = document.getElementById('categoryEdit')
        const image = document.getElementById('ImageEdit').files[0]
        const book = document.getElementById('bookEdit').files[0]

        BookFormData.append("name", name.value)
        BookFormData.append("bookName", price.value)
        BookFormData.append("description", description.value)
        BookFormData.append("category", category.value)
        BookFormData.append("image", image)
        BookFormData.append("book", book)

        const options = {
            method: "PATCH",
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("Token")}`,
            },
            body: BookFormData,
        }

        fetch(BASE_URL + `products/${productId}`, options)
        .then(async res => {
          if(res.status !== 200) {
            switch (res.status) {
              case 401:
                displayError("It seens your session has ended. Log again!")
                setTimeout(() => window.location.href = "./home.html", 1000)
                break;
              case 403:
                displayError("You Don't have permission to do these action")
                break
              case 201:
                break;
              default:
                displayError("There is un expected error!")
                break;
            }
          }
          console.log(await res.json())
        })
        .then(() => {
          updateModel.hide()
          updateForm.reset()
          listBooks()
        })
      })
    }

    function displayError(message) {
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-danger alert-dismissible fade show';
        errorAlert.role = 'alert';
        errorAlert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        errorContainer.appendChild(errorAlert);
    }

    async function handelBookSubmit(e) {
      e.preventDefault()
      let BookFormData = new FormData()
      const name = document.getElementById('name')
      const price = document.getElementById('bookName')
      const description = document.getElementById('description')
      const category = document.getElementById('category')
      const image = document.getElementById('Image').files[0]
      const book = document.getElementById('book').files[0]

      BookFormData.append("name", name.value)
      BookFormData.append("bookName", price.value)
      BookFormData.append("description", description.value)
      BookFormData.append("category", category.value)
      BookFormData.append("image", image)
      BookFormData.append("book", book)

      const options = {
          method: "POST",
          headers: {
          "Authorization": `Bearer ${localStorage.getItem("Token")}`,
          },
          body: BookFormData,
      }

      fetch(BASE_URL + "products/create", options)
      .then(async res => {
        if(res.status !== 200) {
          switch (res.status) {
            case 401:
              displayError("It seens your session has ended. Log again!")
              setTimeout(() => window.location.href = "./home.html", 1000)
              break;
            case 403:
              displayError("You Don't have permission to do these action")
              break
            case 201:
              break;
            default:
              displayError("There is un expected error!")
              break;
          }
        }
        console.log(await res.json())
      })
      .then(() => {
        myModal.hide()
        AddBookFrom.reset()
        listBooks()
      })
    }
    async function approveUser(userId, isApproved) {
      const data = new FormData()
      data.append("userId", userId)
      data.append("isApproved", isApproved ? "true" : "false")
      const toSend = Object.fromEntries(data)

      const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('Token')}`,
        },
        body: JSON.stringify(toSend)
      }
      fetch(BASE_URL + 'auth/approve/', options)
      .then(async res => {
        if(res.status !== 200) {
          switch (res.status) {
            case 401:
              displayError("It seens your session has ended. Log again!")
              setTimeout(() => window.location.href = "./home.html", 1000)
              break;
            case 403:
              displayError("You Don't have permission to do these action")
              break
            default:
              displayError("There is un expected error!")
              break;
          }
        } else {
          const removableElement = document.getElementById(`user_${userId}`)
          removableElement.remove()
          collectUsers()
        }
      })
      .catch(err => console.log(err))
    }

    async function collectUsers() {
      const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("Token")}`,
        },
      }
      fetch(BASE_URL + 'auth/filter-by-approval/?isApproved=false', options)
      .then(async res => await res.json())
      .then(res => {
        res.forEach((user) => {
          if(!user.isApproved && !user.isReject) {
            pendingUsers.innerHTML = "";
            const userHTML = `
              <div class="alert alert-warning alert-dismissible fade show" id="user_${user._id}" role="alert">
                <strong>Name: ${user.name}</strong>
                <p>Email: ${user.email}</p>
                <p>Role: ${user.role.join(', ')}</p>
                <button type="button" class="btn btn-primary" onclick="approveUser('${user._id}', ${true})">Approve</button>
                <button type="button" class="btn btn-danger float-end" onclick="approveUser('${user._id}', ${false})">Reject</button>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              
            `;
            pendingUsers.innerHTML += userHTML;
          }
        });
        if(pendingUsers.innerHTML.length === 0) {
          pendingUsers.innerHTML += `
            <div class="alert alert-success p-5">
              <h3 class="text-center"> There Are No requestes at these times</h3>
            </div>
          `
        }
      })
      .catch(err => console.log(err))
    }

    document.addEventListener("DOMContentLoaded", 
      collectUsers(),
      listBooks()
    )
