// controllers/announcementController.js — Announcement management

const Announcement = require('../models/Announcement');

// GET /api/announcements?event=...
const getAnnouncements = async (req, res) => {
  try {
    const { event } = req.query;
    const filter = event ? { event } : {};
    const announcements = await Announcement.find(filter)
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/announcements
const createAnnouncement = async (req, res) => {
  try {
    const { title, event, color } = req.body;
    const announcement = await Announcement.create({
      title,
      event,
      author: req.user._id,
      color: color || '#8B5CF6'
    });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/announcements/:id
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    res.json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAnnouncements, createAnnouncement, deleteAnnouncement };
