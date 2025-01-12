const BASE_URL: string = "http://localhost:7000/";

const LogOutBtn = document.getElementById("LogOut") as HTMLElement | null;
const BookDisplayLocation = document.getElementById("bookDisplay") as HTMLElement | null;
const editProfile = document.getElementById("addBookForm") as HTMLFormElement | null;

if (editProfile) {
    editProfile.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        const ProfileData = new FormData(editProfile);
        const ProfileObjectData = Object.fromEntries(ProfileData);
        const bodyStr = JSON.stringify(ProfileObjectData);

        fetch(`${BASE_URL}auth/update/`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json", // Adding Content-Type for PATCH request.
            },
            body: bodyStr,
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    });
}

if (LogOutBtn) {
    LogOutBtn.addEventListener("click", () => {
        localStorage.removeItem("Token");
        window.location.href = "./home.html";
    });
}

function handleBookClick(productId: string): void {
    fetch(`${BASE_URL}products/${productId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("Token")}`,
        },
    })
        .then(async res => {
            const jsonData = await res.json();
            console.log(jsonData);
            if (jsonData.book) {
                window.location.href = `${BASE_URL}static/${jsonData.book}`;
            }
        })
        .catch(err => console.error(err));
}

function listBooks(): void {
    if (!BookDisplayLocation) return;

    BookDisplayLocation.innerHTML = "";
    fetch(`${BASE_URL}products/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("Token")}`,
        },
    })
        .then(async res => {
            if (res.status === 200) {
                const jsonData = await res.json();
                jsonData.forEach((product: { _id: string; image: string; bookName: string; name: string }) => {
                    const tempElement = `
                        <div id="product_${product._id}" class="book-item" onclick="handleBookClick('${product._id}')">
                            <img class="" src="${BASE_URL}static/${product.image}" alt="Book Title 6">
                            <h3>${product.bookName}</h3>
                            <p>by ${product.name}</p>
                        </div>
                    `;
                    BookDisplayLocation.innerHTML += tempElement;
                });
            }
            if (BookDisplayLocation.innerHTML.trim() === "") {
                BookDisplayLocation.innerHTML = `
                    <div class="alert alert-success p-5">
                        <h3 class="text-center"> There is No Book available right now</h3>
                    </div>`;
            }
        })
        .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", listBooks);
