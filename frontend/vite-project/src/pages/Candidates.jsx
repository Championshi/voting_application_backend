import  { useEffect, useState } from 'react';
import axios from 'axios';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-2xl font-bold mb-4">Candidates</h1>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id} className="p-3 border-b">
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p>{candidate.party}</p>
            <p>{candidate.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Candidates;
