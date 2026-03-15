// controllers/ticketController.js — Help Queue management

const Ticket = require('../models/Ticket');

// GET /api/tickets?event=...
const getTickets = async (req, res) => {
  try {
    const { event } = req.query;
    const filter = event ? { event } : {};
    const tickets = await Ticket.find(filter)
      .populate('team', 'name')
      .populate('mentor', 'name email')
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/tickets
const createTicket = async (req, res) => {
  try {
    const { team, issue, event } = req.body;
    const ticket = await Ticket.create({
      team,
      issue,
      event,
      status: 'Open'
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH /api/tickets/:id/claim
const claimTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    
    ticket.status = 'Claimed';
    ticket.mentor = req.user._id;
    await ticket.save();
    
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PATCH /api/tickets/:id/resolve
const resolveTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    
    ticket.status = 'Resolved';
    await ticket.save();
    
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getTickets, createTicket, claimTicket, resolveTicket };
