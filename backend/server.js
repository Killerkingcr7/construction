const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let services = [];

// Post service
app.post('/api/services', (req, res) => {
  const { type, description } = req.body;
  if (!type || !description) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const service = { type, description, id: Date.now() };
  services.push(service);
  res.status(201).json(service);
});

// Get services (for client)
app.get('/api/services', (req, res) => {
  res.json(services);
});

// Auth routes
const authRoutes = require('./auth');
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
