# Notes Application (MERN-style with Vanilla JS)

A simple **Notes Application** with **User Authentication** where users can **Register, Login, Add, Edit, Pin, and Delete notes** securely using **JWT authentication**.

## Features

- User Registration & Login
- JWT-based Authentication
- Add Notes
- Edit Notes
- Pin / Unpin Notes
- Delete Notes
- Protected Routes
- Clean & Responsive UI
- Persistent Login using LocalStorage

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Vanilla JS)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

##  Project Structure
notes-app/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── package.json
│
└── frontend/
|    ├── login.html
|    ├── register.html
|    ├── notes.html
|    ├── style.css
|   └── script.js
|
│
└── README.md
