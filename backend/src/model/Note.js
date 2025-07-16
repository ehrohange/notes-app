import mongoose from "mongoose";

// 1 - Create a schema for the Note model
// 2 - Create a model using the schema

const noteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    collection: "notesCollection",
});

const Note = mongoose.model("Note", noteSchema);

export default Note;