import React, { useState } from 'react';

const NoteForm = ({ onAdd }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || !author) return;
    onAdd({ content, author });
    setContent('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Your name"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="What's happening?"
        value={content}
        onChange={e => setContent(e.target.value)}
        maxLength={280}
        required
      />
      <button type="submit">Tweet</button>
    </form>
  );
};

export default NoteForm;