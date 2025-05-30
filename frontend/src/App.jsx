import React, { useEffect, useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await fetch('http://localhost:5000/api/notes');
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (note) => {
    await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    fetchNotes();
  };

  const likeNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}/like`, { method: 'PATCH' });
    setNotes(notes => notes.map(n => n._id === id ? { ...n, likes: (n.likes ?? 0) + 1 } : n));
  };

  const unlikeNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}/unlike`, { method: 'PATCH' });
    setNotes(notes => notes.map(n => n._id === id ? { ...n, likes: Math.max(0, (n.likes ?? 0) - 1) } : n));
  };

  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, { method: 'DELETE' });
    setNotes(notes => notes.filter(n => n._id !== id));
  };

  return (
    <div className="app-container">
      <h1>Mini Twitter</h1>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onLike={likeNote} onUnlike={unlikeNote} onDelete={deleteNote} />
    </div>
  );
}

export default App;