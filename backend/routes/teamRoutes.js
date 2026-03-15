// routes/teamRoutes.js — Team CRUD routes

const express = require('express');
const router = express.Router();
const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getTeams).post(createTeam);
router.route('/:id').get(getTeamById).put(updateTeam).delete(deleteTeam);

module.exports = router;
