const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const clubs = require('./clubs.json');

app.get('/', (req, res) => {
  res.send('Welcome to the Club Recommendation API');
});

app.post('/recommend', (req, res) => {
  const userInterests = req.body.interests.map((interest) => interest.toLowerCase());
  const recommendedClubs = clubs.filter((club) =>
    userInterests.every((interest) => club.interests.includes(interest))
  );
  res.json(recommendedClubs);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
