import express from "express";
import mongoose from "mongoose";
import notesModel from "./models/note.model.js";

const app = express();
app.use(express.json());

async function connectToDb() {
  await mongoose.connect("mongodb://localhost:27017/notesdb");
  console.log("connected");
}
connectToDb();

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const newNote = await notesModel.create({ title, description });
  res.status(201).json({
    message: "note created successfully",
    note: newNote,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await notesModel.find();
  res.status(200).json({
    message: "notes retrieved successfully",
    notes: notes,
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const updatedNote = await notesModel.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }, // returns the updated note document
  );

  res.status(200).json({
    message: "note updated successfully",
    note: updatedNote,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  await notesModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
