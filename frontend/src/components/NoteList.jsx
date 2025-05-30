import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onLike, onUnlike, onDelete }) => (
  <div className="tweet-list">
    {notes.map(note => (
      <NoteItem
        key={note._id}
        note={note}
        onLike={onLike}
        onUnlike={onUnlike}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default NoteList;