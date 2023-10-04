// Function to handle the post creation
const postHandler = async (event) => {
  event.preventDefault();

  // Get the title and body of the post from the form
  const title = document.querySelector("#post-title").value.trim();
  const body = document.querySelector("#post-body").value.trim();

  // Check if the title and body are empty
  if (!title || !body) {
    alert("Please enter a title and body for the post.");
  }

  // If both title and body are provided
  if (title && body) {
    try {
      // Send a POST request to create a new post
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title: title, content: body }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // If post creation is successful, redirect to the homepage
        document.location.replace("/");
      } else {
        // If post creation fails, display an error message
        alert("Failed to create the post. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the post. Please try again.");
    }
  }
};

// Add a submit event listener to the form for creating a new post
document.querySelector(".new-post").addEventListener("submit", postHandler);
