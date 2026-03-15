// app.js — Express application setup and middleware configuration

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const authRoutes = require('./routes/authRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const teamRoutes = require('./routes/teamRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'HackOS backend running' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);

module.exports = app;
