 const slides = document.querySelectorAll('.slide');
 let currentSlide = 0;

const { response } = require("express");

function showSlide(slideIndex) {
slides.forEach((slide, index) => {
         if (index === slideIndex) {
       slide.style.display = 'block';
     } else {
       slide.style.display = 'none';
     }
   });
 }

 function nextSlide() {
   currentSlide = (currentSlide + 1) % slides.length;
   showSlide(currentSlide);
 }

 function previousSlide() {
   currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Automatic slideshow
setInterval(nextSlide, 3000);

 //Keyboard navigation
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    nextSlide();
  } else if (event.key === 'ArrowLeft') {
    previousSlide();
  }
});

  function submitForm(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
  
    // Validate form data
    if (name === "" || email === "" || phone === "") {
      showError("Please fill in all the fields.");
    } else {
      // Process form data (e.g., submit to server)
      console.log("Form submitted successfully!");
      // You can add additional code here to handle form submission, such as making an AJAX request to save the data.
      window.location.href = "menu.html";
    }
  }
  
  function showError(message) {
    const errorElement = document.getElementById("error");
    errorElement.textContent = message;
  }
  let tablesAvailable = 139; // Number of tables available

function bookTable(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const name = document.getElementById("name").value;
  const time = document.getElementById("time").value;

  // Calculate expiration time
  const currentTime = new Date();
  const bookingTime = new Date(currentTime.toDateString() + " " + time);
  const expirationTime = new Date(bookingTime.getTime() + 60 * 60 * 1000); // Add one hour in milliseconds

  // Check if booking time has expired
  if (currentTime > expirationTime) {
    showMessage("Sorry, but your table has expired.", "error");
  } else {
    // Subtract one tablefrom the available count
    tablesAvailable--;
    updateTableCount();

    showMessage("Successfully booked for the next one hour.", "success");

    setTimeout(() => {
      // Add one table back to the available count
      tablesAvailable++;
      updateTableCount();

      showMessage("Sorry, but your table has expired.", "error");
    }, expirationTime - currentTime);
  }
}

function showMessage(message, messageType) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.className = "message " + messageType;
}

function updateTableCount() {
  const tableCountElement = document.getElementById("tableCount");
  tableCountElement.textContent = tablesAvailable;
}
function scrollToOtherContents() {
    const otherContentsElement = document.getElementById("menu");
    menuElement.scrollIntoView({ behavior: 'smooth' });
  }
  // Assuming you have stored the user's data in variables
const username = "JohnDoe";
const name = "John Doe";
const email = "johndoe@example.com";
const profilePhoto = "path/to/profile/photo.jpg";

// Updating the profile section with user's data
document.getElementById("username").textContent = username;
document.getElementById("name").textContent = name;
document.getElementById("email").textContent = email;
document.getElementById("profile-photo").src = profilePhoto;
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
app.post('/register', (req, res) => {
     const { username, name, email, profilePhoto } = req.body;
    
  // Create an object with the user's data
 const user = {
       username,
       name,
       email,
       profilePhoto
     };
    
     // Read the existing data from the db.json file
     fs.readFile('db.json', 'utf8', (err, data) => {
       if (err) {
        console.error(err);
         res.status(500).send('Internal Server Error');
       } else {
         let users = JSON.parse(data);
        
         // Add the new user to the existing data
         users.push(user);
        
         // Write the updated data back to the db.json file
         fs.writeFile('db.json', JSON.stringify(users), (err) => {
           if (err) {
             console.error(err);
             res.status(500).send('Internal Server Error');
           } else {
             res.status(200).send('Registration successful');
           }
         });
       }
     });
   });
   app.listen(3000, () => {
     console.log('Server is running on port 3000');
   });
   document.getElementById('registration-form').addEventListener('submit', (e) => {
     e.preventDefault();
    
     const form = e.target;
    const formData = new FormData(form);
    
     // Make a POST request to the server
     fetch('/register', {
      method: 'POST',
       body: JSON.stringify(Object.fromEntries(formData)),
       headers: {
        'Content-Type': 'application/json'
       }
     })
    .then((response) => response.text())
     .then((message) => {
       // Display a success message
      console.log(message);
       form.reset();
     })
     .catch((error) => {
       console.error(error);
     });
  });   // Assuming this JavaScript code is in a separate file and loaded after the HTML
 fetch('http://localhost:3000/food')
 .then((response) => response.json())
 .then((data) => {
    console.log (data)
   const user = data[data.length - 1]; // Retrieve the latest registered user
  
   // Update the profile section with user's data
   document.getElementById('username').textContent = user.username;
   document.getElementById('name').textContent = user.name;
   document.getElementById('email').textContent = user.email;
   document.getElementById('profile-photo').src = user.profilePhoto;
 })
 .catch((error) => {
  console.error(error);
 });
 