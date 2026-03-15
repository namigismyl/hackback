// controllers/teamController.js — CRUD operations for teams

const Team = require('../models/Team');

// POST /api/teams
const createTeam = async (req, res) => {
  try {
    const { name, event } = req.body;

    const team = await Team.create({
      name,
      event,
      leader: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/teams
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('leader', 'name email').populate('members', 'name email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/teams/:id
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'name email')
      .populate('members', 'name email');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /api/teams/:id
const updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/teams/:id
const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTeam, getTeams, getTeamById, updateTeam, deleteTeam };
