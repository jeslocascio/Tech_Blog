// Function to handle the logout
const logout = async () => {
  try {
    // Send a POST request to the logout endpoint
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If logout is successful, redirect to the homepage
      document.location.replace("/");
    } else {
      // If logout fails, display an error message
      alert("Failed to log out! Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while attempting to log out.");
  }
};

// Add a click event listener to the logout link
document.querySelector("#logout-link").addEventListener("click", logout);
