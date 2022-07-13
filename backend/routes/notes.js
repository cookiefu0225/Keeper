import express from "express";
import Note from "../models/note.model.js";

const   router = express.Router();

router.route("/").get((req, res) => {
    Note.find()
        .then(notes => res.send(notes))
        .catch(err => res.status(400).json("Error " + err));
});


export default router;