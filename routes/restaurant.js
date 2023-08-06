// routes/restaurants.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const isAdmin = require('../middleware/adminMiddleware');
const jwtMiddleware = require('../middleware/jwtMiddleware'); // Custom JWT middleware

router.post('/', isAdmin, async (req, res) => {
  const { name, address, phone, title, subtitle, isAvailable, cuisines } = req.body;
  
  try {
    // Check if the required fields are provided
    if (!name || !address || !phone || !title || !subtitle || !isAvailable || !cuisines) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Create a new restaurant object
    const newRestaurant = new Restaurant({
      name,
      address,
      phone,
      title,
      subtitle,
      isAvailable,
      cuisines,
    });

    // Save the restaurant to the database
    const savedRestaurant = await newRestaurant.save();

    return res.status(201).json(savedRestaurant);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});






router.put('/:id', isAdmin, async (req, res) => {
    const restaurantId = req.params.id;
    const { name, address, phone, title, subtitle, isAvailable, cuisines } = req.body;
  
    try {
      // Check if the required fields are provided
      if (!name || !address || !phone || !title || !subtitle || !isAvailable || !cuisines) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }
  
      // Find the restaurant by ID
      const restaurant = await Restaurant.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      // Update the restaurant details
      restaurant.name = name;
      restaurant.address = address;
      restaurant.phone = phone;
      restaurant.title = title;
      restaurant.subtitle = subtitle;
      restaurant.isAvailable = isAvailable;
      restaurant.cuisines = cuisines;
  
      // Save the updated restaurant to the database
      const updatedRestaurant = await restaurant.save();
  
      return res.json(updatedRestaurant);
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

  router.delete('/:id', isAdmin, async (req, res) => {
    const restaurantId = req.params.id;
  
    try {
      // Find the restaurant by ID
      const restaurant = await Restaurant.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      // Delete the restaurant from the database
      await restaurant.remove();
  
      return res.json({ message: 'Restaurant deleted successfully' });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.get('/', async (req, res) => {
    const { name, cuisine } = req.query;
  
    try {
      let query = {};
  

      if (name) {
        query.name = { $regex: name, $options: 'i' }; 
      }
  
      
      if (cuisine) {
        query['cuisines.name'] = { $regex: cuisine, $options: 'i' }; 
      }
  
      // Perform the search based on the query
      const restaurants = await Restaurant.find(query);
  
      return res.json(restaurants);
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

  router.get('/:id/dishes', async (req, res) => {
    const restaurantId = req.params.id;
  
    try {
      // Find the restaurant by ID
      const restaurant = await Restaurant.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      // Get the dishes available in the restaurant
      const dishes = restaurant.cuisines.reduce((acc, cuisine) => acc.concat(cuisine.dishes), []);
  
      return res.json(dishes);
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
