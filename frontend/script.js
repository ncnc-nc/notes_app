const API = "http://localhost:5000/api";

/* 🔐 PROTECT NOTES PAGE */
if (
  window.location.pathname.includes("notes.html") &&
  !localStorage.getItem("token")
) {
  window.location = "login.html";
}

/* ================= REGISTER ================= */
function register() {
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;

  if (!nameInput || !emailInput || !passwordInput) {
    alert("Please fill all fields");
    return;
  }

  fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput,
      email: emailInput,
      password: passwordInput
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.message === "Registration successful") {
        window.location = "login.html";
      }
    })
    .catch(() => alert("Server error"));
}

/* ================= LOGIN ================= */
function login() {
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;

  fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput
    })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.token) {
        alert("Invalid login");
        return;
      }
      localStorage.setItem("token", data.token);
      window.location = "notes.html";
    });
}

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("token");
  window.location = "login.html";
}

/* ================= NOTES ================= */

let editingNoteId = null;

/* ADD or UPDATE NOTE */
function addNote() {
  const titleInput = document.getElementById("title").value;
  const contentInput = document.getElementById("content").value;

  console.log("Editing ID:", editingNoteId);

  const url = editingNoteId
    ? `${API}/notes/${editingNoteId}`
    : `${API}/notes`;

  const method = editingNoteId ? "PUT" : "POST";

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify({
      title: titleInput,
      content: contentInput
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Response:", data);
      editingNoteId = null;
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      loadNotes();
    })
    .catch(err => console.error(err));
}

/* LOAD NOTES */
function loadNotes() {
  const notesDiv = document.getElementById("notes");
  if (!notesDiv) return;

  fetch(API + "/notes", {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .then(notes => {
      notesDiv.innerHTML = "";
      notes.forEach(n => {
        notesDiv.innerHTML += `
          <div>
            <h3>${n.title} ${n.pinned ? "📌" : ""}</h3>
            <p>${n.content}</p>

            <button onclick="editNote('${n._id}', '${n.title}', '${n.content}')">
              Edit
            </button>
            <button onclick="pinNote('${n._id}')">Pin</button>
            <button onclick="deleteNote('${n._id}')">Delete</button>
          </div>
        `;
      });
    });
}

/* EDIT NOTE */
function editNote(id, title, content) {
  document.getElementById("title").value = title;
  document.getElementById("content").value = content;
  editingNoteId = id;
}

/* PIN NOTE */
function pinNote(id) {
  fetch(API + "/notes/pin/" + id, {
    method: "PUT",
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  }).then(loadNotes);
}

/* DELETE NOTE */
function deleteNote(id) {
  fetch(API + "/notes/" + id, {
    method: "DELETE",
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  }).then(loadNotes);
}

/* AUTO LOAD NOTES */
if (window.location.pathname.includes("notes.html")) {
  loadNotes();
}
