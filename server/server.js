require('dotenv').config(); // Load .env vars early
const express = require('express');
const cors = require('cors');
const path = require('path'); // Needed to serve static files
const connectDB = require('./config/db');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
connectDB();

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../client')));

// Fallback: serve index.html for any non-API route (SPA friendly)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server error:', err.message);
});