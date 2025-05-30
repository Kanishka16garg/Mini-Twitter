import React from 'react';

const NoteItem = ({ note, onLike, onUnlike, onDelete }) => (
  <div className="tweet-item">
    <strong>{note.author}</strong>
    <p>{note.content}</p>
    <small>{new Date(note.createdAt).toLocaleString()}</small>
    <div style={{ marginTop: '8px' }}>
      <button onClick={() => onLike(note._id)}>Like ({note.likes ?? 0})</button>
      <button onClick={() => onUnlike(note._id)} style={{ marginLeft: '8px' }}>Unlike</button>
      <button onClick={() => onDelete(note._id)} style={{ marginLeft: '8px', background: '#e74c3c' }}>Delete</button>
    </div>
  </div>
);

export default NoteItem;