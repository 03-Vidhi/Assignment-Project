const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  isVeg: { type: Boolean, required: true },
  pictures: [{ type: String }],
  ingredients: [{ type: String }],
  
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  pictures: [{ type: String }],
  title: { type: String },
  subtitle: { type: String },
  isAvailable: { type: Boolean, default: true },
  cuisines: [cuisineSchema],
 
});

module.exports = mongoose.model('Restaurant', restaurantSchema);