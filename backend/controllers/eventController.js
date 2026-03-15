// controllers/eventController.js — CRUD operations for events

const Event = require('../models/Event');

// POST /api/events
const createEvent = async (req, res) => {
  try {
    const { title, description, organization, startDate, endDate } = req.body;

    const event = await Event.create({
      title,
      description,
      organization,
      startDate,
      endDate,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organization', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organization', 'name')
      .populate('createdBy', 'name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /api/events/:id
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/events/:id
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
