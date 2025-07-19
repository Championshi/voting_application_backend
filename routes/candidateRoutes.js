const express = require('express');
const router = express.Router();
const { 
  createCandidate, 
  updateCandidate, 
  deleteCandidate, 
  getCandidates, 
  voteForCandidate, 
  getVoteCounts 
} = require('../controllers/candidateController');
const { authenticateToken } = require('../jwt'); // Import authenticateToken middleware

// Admin Candidate Management
router.post('/register', createCandidate); // Create a new candidate
router.put('/:candidateId', updateCandidate); // Update a candidate
router.delete('/:candidateId', deleteCandidate); // Delete a candidate

// Voting & Candidate Info
router.get('/', getCandidates); // List all candidates
router.post('/vote/:candidateId', authenticateToken, voteForCandidate); // Vote for a candidate (authentication added)
router.get('/vote/counts', getVoteCounts); // Get live vote counts sorted by voteCount

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { 
//   createCandidate, 
//   updateCandidate, 
//   deleteCandidate, 
//   getCandidates, 
//   voteForCandidate, 
//   getVoteCounts 
// } = require('../controllers/candidateController');

// // Admin Candidate Management
// router.post('/register', createCandidate); // Create a new candidate
// router.put('/:candidateId', updateCandidate); // Update a candidate
// router.delete('/:candidateId', deleteCandidate); // Delete a candidate

// // Voting & Candidate Info
// router.get('/', getCandidates); // List all candidates
// router.post('/vote/:candidateId', voteForCandidate); // Vote for a candidate
// router.get('/vote/counts', getVoteCounts); // Get live vote counts sorted by voteCount

// module.exports = router;
