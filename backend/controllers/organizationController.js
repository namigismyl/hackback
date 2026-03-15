// controllers/organizationController.js — CRUD operations for organizations

const Organization = require('../models/Organization');

// POST /api/organizations
const createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;

    const org = await Organization.create({
      name,
      description,
      owner: req.user._id,
      members: [{ user: req.user._id, role: 'owner' }],
    });

    res.status(201).json(org);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/organizations
const getOrganizations = async (req, res) => {
  try {
    const orgs = await Organization.find({ 'members.user': req.user._id });
    res.json(orgs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/organizations/:id
const getOrganizationById = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id).populate('members.user', 'name email');
    if (!org) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(org);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /api/organizations/:id
const updateOrganization = async (req, res) => {
  try {
    const org = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!org) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(org);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/organizations/:id
const deleteOrganization = async (req, res) => {
  try {
    const org = await Organization.findByIdAndDelete(req.params.id);
    if (!org) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json({ message: 'Organization deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};
