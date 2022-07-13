import mongoose from "mongoose";

const   Schema = mongoose.Schema;

const   noteSchema = new Schema({
    title: String,
    content: String
});

const   Note = mongoose.model("note", noteSchema);

export default Note;