
// Savanna Bites - Interactive JS
// Handles:
// 1. Mobile menu behavior
// 2. Reservation form validation
// 3. Confirmation message



// Run script only after full HTML has loaded
document.addEventListener("DOMContentLoaded", () => {

  // MOBILE MENU LOGIC


  // Select important elements
  const menuToggle = document.getElementById("menu-toggle"); // Hidden checkbox
  const navLinks = document.querySelector(".nav-links");     // Navigation container
  const hamburger = document.querySelector('label[for="menu-toggle"]'); // Hamburger icon


  // Function to close mobile menu
  // (Unchecks checkbox which hides nav via CSS)
  const closeMenu = () => {
    if (menuToggle) {
      menuToggle.checked = false; // Uncheck checkbox
    }
  };


  // Close menu when any navigation link is clicked (mobile UX improvement)
  if (navLinks) {
    navLinks.addEventListener("click", (e) => {

      // Check if a link (<a>) was clicked
      const link = e.target.closest("a");

      if (link) {
        closeMenu(); // Close menu after navigation
      }
    });
  }


  // Close menu when clicking outside the navigation
  document.addEventListener("click", (e) => {

    // If menu is not open, do nothing
    if (!menuToggle || !menuToggle.checked) return;

    // Check if click happened inside nav or hamburger
    const clickedInsideNav = navLinks && navLinks.contains(e.target);
    const clickedHamburger = hamburger && hamburger.contains(e.target);

    // If clicked outside both, close menu
    if (!clickedInsideNav && !clickedHamburger) {
      closeMenu();
    }
  });


  // Close menu when Escape key is pressed)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });




  // RESERVATION FORM LOGIC

  // Select reservation form
  const form = document.querySelector(".form");

  // If form doesn't exist, stop execution
  if (!form) return;


  // Listen for form submission
  form.addEventListener("submit", (e) => {

    // Prevent page reload
    e.preventDefault();


    // Get input values
    const name = document.getElementById("name")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const date = document.getElementById("date")?.value;
    const people = document.getElementById("people")?.value;


  
    // BASIC VALIDATION
   

    // Check if required fields are empty
    if (!name || !phone || !date || !people) {
      alert("Please fill in: Full Name, Phone, Date, and Number of People.");
      return;
    }


    // PHONE NUMBER VALIDATION
  

    // Remove all non-digit characters (spaces, dashes, etc.)
    const digitsOnly = phone.replace(/\D/g, "");

    // Ensure phone has reasonable length
    if (digitsOnly.length < 9) {
      alert("Please enter a valid phone number.");
      return;
    }


   
    // SUCCESS CONFIRMATION
  

    // Create confirmation message
    const confirmationMessage = `
Reservation received ✅

Name: ${name}
Phone: ${phone}
Date: ${date}
People: ${people}

We will confirm your reservation by phone.
    `.trim();


    // Show confirmation popup
    alert(confirmationMessage);


    // Reset form fields after successful submission
    form.reset();


    // Ensure mobile menu closes if open
    closeMenu();
  });

});