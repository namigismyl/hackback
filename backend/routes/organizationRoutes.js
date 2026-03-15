// routes/organizationRoutes.js — Organization CRUD routes

const express = require('express');
const router = express.Router();
const {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} = require('../controllers/organizationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getOrganizations).post(createOrganization);
router.route('/:id').get(getOrganizationById).put(updateOrganization).delete(deleteOrganization);

module.exports = router;
