// server.js — Entry point: loads env, connects to MongoDB, and starts the server

const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`HackOS server running on port ${PORT}`);
  });
});
