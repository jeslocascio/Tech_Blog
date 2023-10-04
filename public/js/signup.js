// Function to handle user signup
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Get the username and password from the signup form
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // Check if both username and password are provided
  if (!username || !password) {
    alert("Please enter both a username and password.");
  }

  // If both username and password are provided
  if (username && password) {
    try {
      // Send a POST request to create a new user
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // If user signup is successful, redirect to the homepage
        document.location.replace("/");
      } else {
        // If signup fails, display an error message
        alert("Failed to sign up. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  }
};

// Add a submit event listener to the signup form
document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
