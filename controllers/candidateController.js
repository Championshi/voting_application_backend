const Candidate = require('../models/candidate.js');
const User = require('../models/user.js');

// Create a new candidate (Admin only)
exports.createCandidate = async (req, res) => {
  try {
    const { name, party, age } = req.body;

    const candidate = new Candidate({ name, party, age });
    await candidate.save();

    res.status(201).json({ message: 'Candidate created successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Vote for a candidate
exports.voteForCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { userId } = req.user; // Extracted from token

    const user = await User.findById(userId);
    if (user.isVoted) return res.status(400).json({ message: 'You have already voted.' });

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found.' });

    candidate.votes.push({ user: userId });
    candidate.voteCount += 1;
    await candidate.save();

    user.isVoted = true;
    await user.save();

    res.status(200).json({ message: 'Vote cast successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ name: 1 });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get vote counts sorted by vote count
exports.getVoteCounts = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ voteCount: -1 });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a candidate's details (Admin only)
exports.updateCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { name, party, age } = req.body;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found.' });

    // Update candidate fields
    if (name) candidate.name = name;
    if (party) candidate.party = party;
    if (age) candidate.age = age;

    await candidate.save();

    res.status(200).json({ message: 'Candidate updated successfully.', candidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a candidate (Admin only)
exports.deleteCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found.' });

    await Candidate.findByIdAndDelete(candidateId);

    res.status(200).json({ message: 'Candidate deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


