const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/notesApp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 👉 ADD THIS LINE (Auth Routes)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


// Test Route
app.get("/", (req, res) => {
  res.send("Notes App Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});