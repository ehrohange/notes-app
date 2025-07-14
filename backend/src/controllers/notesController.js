import Note from "../model/Note.js";

export async function getAllNotes (req, res) {
    try {
        const notes = await Note.find({userId: req.params.userId}).sort({createdAt: -1}); // Shows the newest notes first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({message: "Internal server error while fetching notes."});
    }
}

export async function getNoteById (req, res) {
    try {
        const note = await Note.findOne({userId: req.params.userId, _id: req.params.id});
        if (!note) {
            res.status(404).json({message: "Note not found."});
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note by ID: ", error);
        res.status(500).json({message: "Internal server error while fetching note by ID."});
    }
}

export async function createNote (req, res) {
    try {
        const userId = req.params.userId;
        const {title, content} = req.body;
        if (!userId || !title || !content) return res.status(404).json({message: "All fields are required."});

        const note = new Note({userId, title, content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);

    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({message: "Internal server error while creating note."});
    }
}

export async function updateNote (req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

        if (!updatedNote) {
            return res.status(404).json({message: "Note not found."});
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({message: "Internal server error while updating note."});
    }
}

export async function deleteNote (req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({message: "Note not found."});
        }
        res.status(200).json({message: "Note deleted successfully."});
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({message: "Internal server error while deleting note."});
    }
}