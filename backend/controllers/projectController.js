// controllers/projectController.js — CRUD operations for projects

const Project = require('../models/Project');

// POST /api/projects
const createProject = async (req, res) => {
  try {
    const { title, description, team, event, repositoryUrl } = req.body;

    const project = await Project.create({
      title,
      description,
      team,
      event,
      repositoryUrl,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('team', 'name')
      .populate('event', 'title');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('team', 'name')
      .populate('event', 'title');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /api/projects/:id
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };
