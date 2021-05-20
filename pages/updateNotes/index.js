// let params = new URLSearchParams(document.location.search);
// let noteId = params.get("noteId");

const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");

console.log(noteId);

const updateNoteButton = document.querySelector(".create-note-button");
const deleteNoteButton = document.querySelector(".delete-note-button");

const apiUrl = "http://localhost:8000";

const token = localStorage.getItem("jwt");

updateNoteButton.addEventListener("click", () => {
  const content = document.querySelector(".create-note-input").value;
  const heading = document.querySelector(".create-note-heading").value;

  if (token) {
    fetch(`${apiUrl}/note/update/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ content, heading }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          location.href = "/pages/dashboard/dashboard.html";
        }
      })
      .catch((err) => {
        alert("Error Creating Note!! Re-try....");
        console.log(err);
      });
  }
});

deleteNoteButton.addEventListener("click", () => {

  if (token) {
    fetch(`${apiUrl}/note/delete/${noteId}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json();
        console.log(res);
      })
      .then((data) => {
        // if (data.message) {
        //   location.href = "/pages/dashboard/dashboard.html";
        // }
        console.log(data);
      })
      .catch((err) => {
        alert("Error Deleting Note!! Re-try....");
        console.log(err);
      });
  }
});

