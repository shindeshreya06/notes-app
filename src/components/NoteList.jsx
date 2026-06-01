import NoteCard from './NoteCard';
import './NoteList.css'

function NoteList({ notes, onDeleteNote, onSetEditIndex, isArchive, onRestoreNote, onTogglePin }) {
    return (
        <div className='note-list'>
            {notes.length === 0
            ? <p>{isArchive ? 'No archived notes!' : 'No notes yet. Add one!'}</p>
            : notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onDeleteNote={onDeleteNote}
                    onSetEditIndex={onSetEditIndex}
                    isArchive={isArchive}
                    onRestoreNote={onRestoreNote}
                    onTogglePin={onTogglePin}
                />
            ))
            }
        </div>
    )
}
export default NoteList