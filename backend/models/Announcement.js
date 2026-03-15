// models/Announcement.js — Event announcements model

const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Announcement title is required'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    color: {
      type: String,
      default: '#8B5CF6', // Default HackOS purple
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement', announcementSchema);
