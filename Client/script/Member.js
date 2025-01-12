let profile = {
  name: "John Doe",
  email: "john.doe@example.com",
  picture: "", 
};

const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const profilePicture = document.getElementById("profile-picture"); 
const profileModal = document.getElementById("profile-modal");

// Profile Modal Elements
const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const profileImageInput = document.getElementById("profileImageInput"); 
const saveProfileBtn = document.getElementById("saveProfileBtn");

// Display Profile
function displayProfile() {
  profileName.textContent = profile.name;
  profileEmail.textContent = profile.email;
  if (profile.picture) {
    profilePicture.src = profile.picture; 
  } else {
    profilePicture.src = ""; 
  }
}

// Open Profile Modal
document.getElementById("editProfileBtn").addEventListener("click", () => {
  editName.value = profile.name;
  editEmail.value = profile.email;
  profileModal.style.display = "flex";
});

// Profile Image Upload
profileImageInput.addEventListener("change", (event) => {
  const uploadedFile = event.target.files[0];
  if (uploadedFile) {
    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(uploadedFile.type)) {
      alert("Please upload a valid image file (JPEG or PNG)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      // Update profile.picture with the data URL from the uploaded image
      profile.picture = e.target.result; 
      // Immediately call displayProfile() to update the displayed image
      displayProfile(); 
    };
    reader.readAsDataURL(uploadedFile);
  }
});

// Save Profile
saveProfileBtn.addEventListener("click", () => {
  profile.name = editName.value;
  profile.email = editEmail.value;
  displayProfile(); // Call displayProfile() here to update after saving (optional)
  profileModal.style.display = "none"; 
});

// Initialize
displayProfile();

// Close Modals on Outside Click
window.addEventListener("click", (e) => {
  if (e.target === profileModal) profileModal.style.display = "none";
});


// Function to validate email address format
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}

// Example usage:
const email = "example@domain.com";
if (validateEmail(email)) {
  console.log("Valid email address.");
} else {
  console.log("Invalid email address.");
}

// // Menu toggle
// const menu = document.querySelector('.menu-toggle');
// const navLinks = document.querySelector('.nav-links');
// menu.addEventListener('click', function () {
//   navLinks.classList.toggle('active');
// });

// Sidebar links
const sidebarLinks = document.querySelectorAll('.nav-links a');
const sidebar = document.querySelector('.nav-links');
sidebarLinks.forEach(link => {
  link.addEventListener('click', function () {
    sidebar.classList.remove('active');
  });
});

const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenBooks = document.querySelectorAll('.book-item-hidden');

showMoreBtn.addEventListener('click', () => {
  if (showMoreBtn.textContent === 'Show More') {
    hiddenBooks.forEach(book => {
      book.classList.remove('hidden'); 
    });
    showMoreBtn.textContent = 'Show Less';
  } else {
    hiddenBooks.forEach(book => {
      book.classList.add('hidden'); 
    });
    showMoreBtn.textContent = 'Show More';
  }
});

// Close modals when clicking outside of them
window.addEventListener('click', (e) => {
  if (registerModal && e.target === registerModal) {
    hideModal(registerModal);
  }
  if (loginModal && e.target === loginModal) {
    hideModal(loginModal);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const bookItems = document.querySelectorAll(".book-item");

  bookItems.forEach((book) => {
      book.addEventListener("click", () => {
          const pdfUrl = book.getAttribute("data-pdf");
          if (pdfUrl) {
              window.open(pdfUrl, "_blank"); // Open PDF in a new tab
          } else {
              console.error("No PDF URL found for this book.");
          }
      });
  });
});


