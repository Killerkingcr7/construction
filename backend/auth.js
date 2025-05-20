const express = require('express');
const router = express.Router();

// In-memory users store
const users = [];

// Signup route
router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Missing username or password' });

  const userExists = users.find(u => u.username === username);
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  users.push({ username, password }); // In real app, hash password!
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Missing username or password' });

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  // For now, just return success. Later add JWT or sessions.
  res.json({ message: 'Login successful' });
});

module.exports = router;
