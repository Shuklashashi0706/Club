import React, { useState } from 'react';
import axios from 'axios';

const ClubRecommendation = () => {
  const [interests, setInterests] = useState('');
  const [recommendedClubs, setRecommendedClubs] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/recommend', { interests: interests.split(',') });
      setRecommendedClubs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Club Recommendation</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your interests (comma-separated):
          <input type="text" value={interests} onChange={(event) => setInterests(event.target.value)} />
        </label>
        <button onSubmit={handleSubmit} type="submit">Recommend</button>
      </form>
      {recommendedClubs.length > 0 && (
        <div>
          <h2>Recommended Clubs:</h2>
          <ul>
            {recommendedClubs.map((club) => (
              <li key={club.id}>
                <h3>{club.name}</h3>
                <p>{club.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClubRecommendation;
