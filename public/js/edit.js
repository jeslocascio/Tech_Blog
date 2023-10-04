// Get references to HTML elements
const delLink = document.getElementById("delete-link");
const upLink = document.getElementById("update-link");

// Function to update a post
const updatePost = async (event) => {
  event.preventDefault();

  // Get the title, content, and post ID from the form
  const title = document.getElementById("edit-title").value;
  const content = document.getElementById("edit-content").value;
  const id = event.target.getAttribute("data-id");

  try {
    // Send a PUT request to update the post
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Display a success message and redirect to the dashboard if the update is successful
      alert("Your post was successfully updated");
      document.location.replace("/dashboard");
    } else {
      // Display an error message if the update fails
      alert("Something went wrong");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while updating the post");
  }
};

// Function to delete a post
const deletePost = async (event) => {
  event.preventDefault();

  // Get the post ID from the link's data attribute
  const id = event.target.getAttribute("data-id");

  try {
    // Send a DELETE request to delete the post
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Display a success message and redirect to the dashboard if the delete is successful
      alert("Your post was successfully deleted");
      document.location.replace("/dashboard");
    } else {
      // Display an error message if the delete fails
      alert("Something went wrong");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while deleting the post");
  }
};

// Add click event listeners to the update and delete links
upLink.addEventListener("click", updatePost);
delLink.addEventListener("click", deletePost);

