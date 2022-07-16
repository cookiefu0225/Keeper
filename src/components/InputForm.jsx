import React, { useState } from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Zoom from '@mui/material/Zoom';

function InputForm(props) {
    const       [newNote, setNote] = useState({
        title: "",
        content: ""
    });

    const       [isExpand, setExpand] = useState(false);

    // Trigger the expanding input form effect
    function expand() {
        setExpand(true);
    }

    function typeRespond(event) {
        const   {name, value} = event.target;

        setNote(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    // Add new note
    function submitNote() {
        props.addNote(newNote);

        setNote({
            title: "",
            content: ""
        })
    }

    // Prevent refresh page when the add button is triggered
    function preventSubmit(event) {
        event.preventDefault();
    }

    return (
        <form className="create-note" onSubmit={preventSubmit}>
            {
                isExpand && (
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newNote.title}
                        onChange={typeRespond}
                    />
                )
            }
            
            <textarea
                type="text"
                name="content"
                placeholder="Take a note"
                value={newNote.content}
                onChange={typeRespond}
                onClick={expand}
                rows={isExpand ? 3 : 1}
            />
            <Zoom in={isExpand}>
                <button onClick={submitNote}>
                    <AddOutlinedIcon fontSize="large" />
                </button> 
            </Zoom>
        </form>
    )
}

export default InputForm;