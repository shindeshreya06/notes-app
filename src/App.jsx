import { useEffect, useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Auth from './components/Auth';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('notes_app_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [notes, setNotes] = useState(() => {
    const savedUser = localStorage.getItem('notes_app_current_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const userNotes = localStorage.getItem(`notes_${user.username}`);
      return userNotes ? JSON.parse(userNotes) : [];
    }
    return [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('notes');

  const filteredNotes = notes
    .filter((note) =>
      !note.archived &&
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      }
      return b.id - a.id; // Newest first
    });

  // Sync notes to local storage whenever notes or currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`notes_${currentUser.username}`, JSON.stringify(notes));
    }
  }, [notes, currentUser]);

  function handleLogin(user) {
    setCurrentUser(user);
    localStorage.setItem('notes_app_current_user', JSON.stringify(user));
    
    // Load notes for the logged in user
    const userNotes = localStorage.getItem(`notes_${user.username}`);
    setNotes(userNotes ? JSON.parse(userNotes) : []);
    
    // Reset states
    setEditIndex(null);
    setSearchQuery('');
    setActiveTab('notes');
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem('notes_app_current_user');
    setNotes([]);
    setEditIndex(null);
    setSearchQuery('');
    setActiveTab('notes');
  }

  function addNote(note) {
    setNotes([...notes, {
      ...note,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      archived: false,
      pinned: false
    }]);
  }

  function deleteNote(id) {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: true } : note
    );
    setNotes(updatedNotes);
  }

  function permanentDelete(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function restoreNote(id) {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: false } : note
    );
    setNotes(updatedNotes);
  }

  function editNote(id, updatedNote) {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, ...updatedNote } : note
    );
    setNotes(updatedNotes);
    setEditIndex(null);
  }

  function togglePinNote(id) {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
  }

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      <div className="sidebar">
        <div className="sidebar-logo">📝 MyNotes</div>
        
        {/* User Profile Section */}
        <div className="user-profile">
          <div className="user-avatar">
            {currentUser.username.slice(0, 2).toUpperCase()}
          </div>
          <div className="user-info">
            <div className="user-name" title={currentUser.username}>
              {currentUser.username}
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="sidebar-menu">
          <div
            className={`sidebar-item ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >All Notes</div>
          <div
            className={`sidebar-item ${activeTab === 'archive' ? 'active' : ''}`}
            onClick={() => setActiveTab('archive')}
          >Archive</div>
        </div>
      </div>
      <div className="main-content">
        <div className="top-header">
          <h1>My Notes</h1>
          <input
            className="search-bar"
            type="text"
            placeholder="🔍 Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="content-area">
          {activeTab === 'notes' ? (
            <>
              <NoteForm
                onAddNote={addNote}
                editIndex={editIndex}
                notes={notes}
                onEditNote={editNote}
              />

              {filteredNotes.length > 0 ? (
                <NoteList
                  notes={filteredNotes}
                  onDeleteNote={deleteNote}
                  onSetEditIndex={setEditIndex}
                  onTogglePin={togglePinNote}
                />
              ) : (
                <p className='no-notes-message'>No such note found!!</p>
              )}
            </>
          ) : (
            <NoteList
              notes={notes.filter(note => note.archived)}
              onDeleteNote={permanentDelete}
              onSetEditIndex={setEditIndex}
              isArchive={true}
              onRestoreNote={restoreNote}
              onTogglePin={togglePinNote}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;