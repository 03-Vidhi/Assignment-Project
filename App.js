
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurant');
const jwtMiddleware = require('./middleware/jwtMiddleware'); 

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', jwtMiddleware, restaurantRoutes); 

// Start the server
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
