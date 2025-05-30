const Note = require('../models/note');


exports.createNote = async (req, res) => {
  try {
    const { content, author } = req.body;
    const note = new Note({ content, author });
    await note.save();
    res.status(201).json({ message: `Note created by ${author}`, note });
  } catch (err) {
    res.status(400).json({ message: `Error: ${err.message}` });
  }
};


exports.getNotes = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  Note.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ message: `Error: ${err.message}` }));
};


exports.likeNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
  res.json({ message: `Liked!`, likes: note?.likes ?? 0 });
};


exports.unlikeNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  note.likes = Math.max(0, note.likes - 1);
  await note.save();
  res.json({ message: `Unliked!`, likes: note.likes });
};


exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.json({ message: `Note deleted!` });
};