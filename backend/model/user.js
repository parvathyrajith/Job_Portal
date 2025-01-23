const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});

// Create and export model
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
