const express = require('express');
const Rating = require('./models/rating');

const app = express();

app.post('/ratings', async (req, res) => {
  const { userId, rating } = req.body;

  // Check if user has already rated the item
  const existingRating = await Rating.findOne({ userId });
  if (existingRating) {
    return res.status(400).json({ error: 'User has already rated this item.' });
  }

  // Save the new rating to the database
  const newRating = new Rating({ userId, rating });
  await newRating.save();

  res.json({ message: 'Rating saved successfully.' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
