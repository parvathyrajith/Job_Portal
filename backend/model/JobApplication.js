const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  coverLetter: { type: String, required: true }, // Store file names or URLs
  resume: { type: String, required: true },      // Store file names or URLs
  jobId: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  locationName: { type: String, required: true },
 
});

module.exports = mongoose.model("Application", applicationSchema);