import './NoteCard.css'

function NoteCard({ note, onDeleteNote, onSetEditIndex, isArchive, onRestoreNote, onTogglePin }) {
    const themeClass = note.color ? `theme-${note.color}` : 'theme-default';

    return (
        <div className={`note-card ${themeClass} ${note.pinned ? 'pinned-card' : ''}`}>
            {!isArchive && (
                <button 
                    className={`pin-btn ${note.pinned ? 'pinned' : ''}`}
                    onClick={() => onTogglePin(note.id)}
                    title={note.pinned ? 'Unpin Note' : 'Pin Note'}
                >
                    📌
                </button>
            )}
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p className="note-timestamp">{note.date}</p>
            <div className="note-card-buttons">
                {isArchive ? (
                    <>
                        <button className="edit-btn" onClick={() => onRestoreNote(note.id)}>Restore</button>
                        <button className="delete-btn" onClick={() => onDeleteNote(note.id)}>Delete Forever</button>
                    </>
                ) : (
                    <>
                        <button className="edit-btn" onClick={() => onSetEditIndex(note.id)}>Edit</button>
                        <button className="delete-btn" onClick={() => onDeleteNote(note.id)}>Delete</button>
                    </>
                )}
            </div>
        </div>
    )
}
export default NoteCard