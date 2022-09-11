const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: [true, 'Name Russian is required'],
  },
  nameEN: {
    type: String,
    required: [true, 'Name English is required'],
  },
  movieId: {
    type: Number,
    required: [true, 'ID is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Owner id is required'],
  },
  thumbnail: {
    type: String,
    required: [true, 'thumbnail is required'],
    validate: [validator.isURL, 'URL thumbnail is incorrect'],
  },
  trailerLink: {
    type: String,
    required: [true, 'trailerLink is required'],
    validate: [validator.isURL, 'URL trailerLink is incorrect'],
  },
  image: {
    type: String,
    required: [true, 'image is required'],
    validate: [validator.isURL, 'URL image is incorrect'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  year: {
    type: String,
    required: [true, 'year is required'],
    minlength: [2, 'Too short Name. Must be at least 2, got {VALUE}'],
    maxlength: [4, 'Too long Name. Must be max 4, got {VALUE}'],
  },
  duration: {
    type: Number,
    required: [true, 'duration is required'],
  },
  director: {
    type: String,
    required: [true, 'director is required'],
  },
  country: {
    type: String,
    required: [true, 'director is required'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
