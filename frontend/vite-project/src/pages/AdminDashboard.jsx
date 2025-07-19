import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const candidatesResponse = await axios.get('http://localhost:5000/api/candidates');
        setCandidates(candidatesResponse.data);

        const usersResponse = await axios.get('http://localhost:5000/api/users');
        setUsers(usersResponse.data);
      } catch (error) {
        setError("Error fetching admin data.");
        console.error(error);
      }
    };

    fetchAdminData();
  }, []);

  const deleteCandidate = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/candidates/${id}`);
      setCandidates(candidates.filter(candidate => candidate._id !== id));
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {error && <p className="text-red-500">{error}</p>}

      <h2 className="text-xl font-semibold">Candidates</h2>
      <ul className="my-4">
        {candidates.map((candidate) => (
          <li key={candidate._id} className="p-3 border-b">
            <h3 className="text-lg">{candidate.name}</h3>
            <button
              onClick={() => deleteCandidate(candidate._id)}
              className="bg-red-600 text-white px-3 py-1 rounded mt-2"
            >
              Delete Candidate
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8">Users</h2>
      <ul className="my-4">
        {users.map((user) => (
          <li key={user._id} className="p-3 border-b">
            <h3 className="text-lg">{user.name}</h3>
            <button
              onClick={() => deleteUser(user._id)}
              className="bg-red-600 text-white px-3 py-1 rounded mt-2"
            >
              Delete User
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
