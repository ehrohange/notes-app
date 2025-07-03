import Note from "../model/Note.js";

export async function getAllNotes (req, res) {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({message: "Internal server error while fetching notes."});
    }
}

export async function createNote (req, res) {
    try {
        const {title, content} = req.body;
        const note = new Note({title, content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);

    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({message: "Internal server error while creating note."});
    }
}

export function updateNote (req, res) {
    res.status(200).json({message: "You've successfully updated the note."});
}

export function deleteNote (req, res) {
    res.status(200).json({message: "You've successfully deleted the note."});
}