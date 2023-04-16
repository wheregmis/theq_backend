import mongoose from "mongoose";

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;