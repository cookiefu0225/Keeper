import express from "express";
import Note from "../models/note.model.js";

const   router = express.Router();

router.route("/")
.get((req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json(err));
})
.post((req, res) => {
    const   title = String(req.body.title);
    const   content = String(req.body.content);

    let newNote = new Note({
        title: title,
        content: content
    })

    newNote.save()
        .then((note) => res.json(note._id))
        .catch(err => res.status(400).json(err));
})
.delete((req, res) => {
    Note.deleteMany()
        .then(() => res.json("Delete all notes"))
        .catch(err => res.status(400).json(err));
});

router.route("/:id")
.get((req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json(err));
})
.delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.json("Delete note successfully"))
        .catch(err => res.status(400).json(err));
})
.put((req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.title = String(req.body.title);
            note.content = String(req.body.content);
            note.save();
            return res.json("Note updated");
        })
        .catch(err => res.status(400).json(err));
})
.patch((req, res) => {
    Note.updateOne({_id: req.params.id}, {$set: req.body})
        .then(() => res.json("Note updated"))
        .catch(err => res.status(400).json(err));
});


export default router;