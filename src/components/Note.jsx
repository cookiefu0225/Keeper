import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

function Note(props) {
    const       [note, setNote] = useState({
        title: props.title,
        content: props.content
    });

    // Patch edited data to the database while texting in the note
    async function typeRespond(event) {
        const   {name, value} = event.target;
        try {
            await setNote(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            });  
            axios.patch("http://localhost:8000/" + props._id, note);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="note">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={note.title}
                onChange={typeRespond}
            />
            <textarea
                type="text"
                name="content"
                placeholder="Take a note"
                value={note.content}
                onChange={typeRespond}
            />
            <button onClick={() => {
                props.deleter(props._id);
            }}>
                <DeleteIcon />
            </button>
        </div>
        
    );
}

export default Note;