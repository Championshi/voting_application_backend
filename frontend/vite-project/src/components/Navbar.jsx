import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-bold">Voting App</h1>
        <div>
          <Link to="/" className="px-3">Home</Link>
          <Link to="/login" className="px-3">Login</Link>
          <Link to="/register" className="px-3">Register</Link>
          <Link to="/vote" className="px-3">Vote</Link>
          <Link to="/candidates" className="px-3">Candidates</Link>
          <Link to="/admin" className="px-3">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
