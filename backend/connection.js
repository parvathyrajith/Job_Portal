const mongoose = require('mongoose');

// MongoDB URI (replace credentials and database name)
const mongoURI = "mongodb+srv://anjanapradeesh:anjanamongo123@cluster0.93gov.mongodb.net/jobportal?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { serverSelectionTimeoutMS: 50000 }) // Adjust timeout as needed
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

// Export mongoose for use in other files
module.exports = mongoose;
