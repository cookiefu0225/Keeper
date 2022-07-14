import mongoose from "mongoose";

const   Schema = mongoose.Schema;

const   noteSchema = new Schema({
    _id: Number,
    title: String,
    content: String
});

const   Note = mongoose.model("note", noteSchema);

export default Note;