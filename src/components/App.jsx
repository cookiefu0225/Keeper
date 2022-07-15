import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import InputForm from "./InputForm";
import axios from "axios";


function App() {
    const       [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000")
            .then(res => {
                res.data.map(oldNote => {
                    setNotes(prev => {
                        return [...prev, {
                            _id: oldNote._id,
                            title: oldNote.title,
                            content: oldNote.content
                        }]
                    })
                    return oldNote;
                });
            });
    }, []);

    function addNote(newNote) {
        axios.post("http://localhost:8000", newNote)
            .then(res => {
                setNotes((prev) => {
                    return [...prev, {
                        _id: res.data,
                        title: newNote.title,
                        content: newNote.content
                    }]
                });

                return;
            });
    }

    function deleteNote(id) {
        axios.delete("http://localhost:8000/" + id)

        setNotes((prev) => {
            return prev.filter(note => note._id !== id);
        });
    }

    return (
        <div>
            <Header />
            <InputForm 
                addNote={addNote}
            />
            {notes.map(note => (
                <Note 
                    key={note._id}
                    _id={note._id}
                    title={note.title}
                    content={note.content}
                    deleter={deleteNote}
                />
            ))}
            <Footer />
        </div>     
    );
}

export default App;