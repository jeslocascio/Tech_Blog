// Function to handle comment submission
const commentHandler = async (event) => {
  event.preventDefault();

  // Get the content and post_id from the form
  const content = document.querySelector("#comment-content").value.trim();
  const post_id = event.target.getAttribute("data-id");

  // Check if content is empty
  if (!content) {
    alert("Please enter a new comment");
    return; // Exit the function if content is empty
  }

  try {
    // Send a POST request to create a new comment
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment: content, post_id: post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Redirect to the post page if the comment is created successfully
      document.location.replace(`/post/${post_id}`);
    } else {
      alert("Failed to create a comment");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while creating the comment");
  }
};

// Add a click event listener to the submit-comment button
document
  .querySelector("#submit-comment")
  .addEventListener("click", commentHandler);
