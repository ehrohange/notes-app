export function getAllNotes (req, res) {
    res.status(200).send("You just fetched the notes.");
}

export function createNote (req, res) {
    res.status(201).json({message: "You've successfully created a note."});
}

export function updateNote (req, res) {
    res.status(200).json({message: "You've successfully updated the note."});
}

export function deleteNote (req, res) {
    res.status(200).json({message: "You've successfully deleted the note."});
}