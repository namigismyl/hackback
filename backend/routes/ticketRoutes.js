const express = require('express');
const router = express.Router();
const { getTickets, createTicket, claimTicket, resolveTicket } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', protect, getTickets);
router.post('/', protect, createTicket);
router.patch('/:id/claim', protect, authorize('mentor', 'volunteer', 'admin', 'staff'), claimTicket);
router.patch('/:id/resolve', protect, authorize('mentor', 'volunteer', 'admin', 'staff'), resolveTicket);

module.exports = router;
