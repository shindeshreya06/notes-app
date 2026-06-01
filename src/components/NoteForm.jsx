/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import './NoteForm.css'

function NoteForm({ onAddNote, editIndex, notes, onEditNote }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
    if (editIndex !== null) {
        const noteToEdit = notes.find((note) => note.id === editIndex)
        if (noteToEdit) {
            setTitle(noteToEdit.title)
            setContent(noteToEdit.content)
        }
    }
}, [editIndex])

    function handleSubmit() {
        if (title === '') {
            alert("Please enter a title")
            return
        }
        if (editIndex !== null) {
            onEditNote(editIndex, { title, content })
        } else {
            onAddNote({ title, content })
        }
        setTitle('')
        setContent('')
    }

    return (
        <div className='note-form'>
            <input type="text" placeholder="Note Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Write about your note here...." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <button onClick={handleSubmit}>{editIndex !== null ? 'Save' : 'Add Note'}</button>
        </div>
    )
}
export default NoteForm