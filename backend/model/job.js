const mongoose = require('mongoose');

// Job Schema
const jobSchema = new mongoose.Schema({
  JobTitle: { type: String, required: true },
  Company: { type: String, required: true },
  Location: { type: String, required: true },
});

// Create and export model
const JobModel = mongoose.model('Job', jobSchema);
module.exports = JobModel;
