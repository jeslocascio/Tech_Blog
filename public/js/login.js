// Function to handle the login form submission
const loginHandler = async (event) => {
  event.preventDefault();

  // Get the username and password from the form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  try {
    // Check if either the username or password is missing
    if (!username || !password) {
      alert("Please enter your username and password");
      return; // Exit the function early if either field is missing
    }

    // Send a POST request to the login endpoint with the username and password
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If login is successful, redirect to the homepage
      document.location.replace("/");
    } else {
      // If login fails, display an error message
      alert("Failed to log in! Please check your credentials.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while attempting to log in.");
  }
};

// Add a submit event listener to the login form
document.querySelector(".login-form").addEventListener("submit", loginHandler);
