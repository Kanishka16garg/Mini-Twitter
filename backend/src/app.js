const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');
const fakeAuth = require('./middleware/fakeAuth');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fakeAuth);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mini-twitter';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/notes', noteRoutes);

module.exports = app;

