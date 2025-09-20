// backend/server.js
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Movie = require('./models/Movies');

const app = express();
const PORT = 3000;
// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));
// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/movie-watchlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes

// Get all movies
app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Add a movie
app.post('/movies', async (req, res) => {
  const { title } = req.body;
  const movie = new Movie({ title });
  await movie.save();
  res.json(movie);
});

// Update movie status
app.put('/movies/:id', async (req, res) => {
  const { status } = req.body;
  const movie = await Movie.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(movie);
});

// Delete a movie
app.delete('/movies/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
