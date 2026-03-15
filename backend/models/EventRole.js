// models/EventRole.js — Defines roles users can hold within a specific event

const mongoose = require('mongoose');

const eventRoleSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['organizer', 'mentor', 'judge', 'participant'],
      required: [true, 'Event role is required'],
    },
  },
  { timestamps: true }
);

// Prevent duplicate role assignments for the same user in the same event
eventRoleSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('EventRole', eventRoleSchema);
