// Handle new post
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const body = document.querySelector("#post-body").value.trim();

  if (title && body) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

// Handle edit of post
const editFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const title = document.querySelector("#post-title").value;
  const body = document
    .querySelector('textarea[name="post-body"]')
    .value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, body }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to edit post");
  }
};

// Handle deletion of post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editButtonHandler);

document
  .querySelector("#delete-post-btn")
  .addEventListener("click", delButtonHandler);
