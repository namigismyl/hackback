const express = require('express');
const router = express.Router();
const { getAnnouncements, createAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', protect, getAnnouncements);
router.post('/', protect, authorize('admin', 'staff'), createAnnouncement);
router.delete('/:id', protect, authorize('admin', 'staff'), deleteAnnouncement);

module.exports = router;
