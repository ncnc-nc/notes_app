const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE NOTE
router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;

  const note = new Note({
    userId: req.userId,
    title,
    content
  });

  await note.save();
  res.json(note);
});

// GET ALL NOTES
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ userId: req.userId })
                          .sort({ pinned: -1, createdAt: -1 });
  res.json(notes);
});

// PIN / UNPIN NOTE
router.put("/pin/:id", auth, async (req, res) => {
  const note = await Note.findById(req.params.id);
  note.pinned = !note.pinned;
  await note.save();
  res.json(note);
});

// DELETE NOTE
router.delete("/:id", auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

// UPDATE NOTE
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    console.log("UPDATE ID:", req.params.id);
    console.log("USER ID:", req.user.userId);

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});



module.exports = router;
