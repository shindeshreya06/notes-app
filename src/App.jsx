import { useEffect, useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Auth from './components/Auth';
import { apiRequest } from './api';
import './App.css';

// Backend uses _id / createdAt; the UI components expect id / date
function normalizeNote(note) {
  return {
    ...note,
    id: note._id,
    date: new Date(note.createdAt).toLocaleDateString(),
  };
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('notes_app_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('notes');

  const token = currentUser?.token;

  const filteredNotes = notes
    .filter((note) =>
      !note.archived &&
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      }
      return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
    });

  // Load this user's notes from the backend when they log in / page refreshes
  useEffect(() => {
    if (!currentUser) return;
    apiRequest('/notes', { token: currentUser.token })
      .then((data) => setNotes(data.map(normalizeNote)))
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  function handleError(err) {
    if (err.status === 401) {
      handleLogout(); // token expired or invalid
    } else {
      alert(err.message);
    }
  }

  function handleLogin(user) {
    setCurrentUser(user);
    localStorage.setItem('notes_app_current_user', JSON.stringify(user));
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

  // Swap one note in state with the updated version from the server
  function replaceNote(updated) {
    setNotes((prev) =>
      prev.map((n) => (n.id === updated._id ? normalizeNote(updated) : n))
    );
  }

  async function addNote(note) {
    try {
      const created = await apiRequest('/notes', { method: 'POST', body: note, token });
      setNotes((prev) => [...prev, normalizeNote(created)]);
    } catch (err) {
      handleError(err);
    }
  }

  // The backend's archive route toggles, so it handles both archive and restore
  async function toggleArchive(id) {
    try {
      const updated = await apiRequest(`/notes/${id}/archive`, { method: 'PATCH', token });
      replaceNote(updated);
    } catch (err) {
      handleError(err);
    }
  }

  function deleteNote(id) {
    toggleArchive(id);
  }

  function restoreNote(id) {
    toggleArchive(id);
  }

  async function permanentDelete(id) {
    try {
      await apiRequest(`/notes/${id}`, { method: 'DELETE', token });
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      handleError(err);
    }
  }

  async function editNote(id, updatedNote) {
    try {
      const updated = await apiRequest(`/notes/${id}`, {
        method: 'PUT',
        body: updatedNote,
        token,
      });
      replaceNote(updated);
      setEditIndex(null);
    } catch (err) {
      handleError(err);
    }
  }

  async function togglePinNote(id) {
    try {
      const updated = await apiRequest(`/notes/${id}/pin`, { method: 'PATCH', token });
      replaceNote(updated);
    } catch (err) {
      handleError(err);
    }
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