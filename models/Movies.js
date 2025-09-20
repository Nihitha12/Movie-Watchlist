
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['Watched', 'Want to Watch'], default: 'Want to Watch' },
});

module.exports = mongoose.model('Movie', movieSchema);
