const express = require('express');
require('./connection'); // MongoDB connection
const UserModel = require('./model/user'); // User model
// const JobModel = require('./model/job'); // Job model
const JobApplication = require('./model/JobApplication'); // JobApplication model
const cors = require('cors');
const bodyParser = require("body-parser");
const Job = require("./model/job"); // Your Mongoose model
const router = express.Router();
const multer = require("multer");
const path = require("path");


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    res.setHeader('Content-Type', 'application/pdf');  // You can add other MIME types here based on file types
  }
}));


// Signup API
app.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required!' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match!' });
  }

  try {
    const existingUser = await UserModel.findOne({ Email: email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists!' });
    }

    const newUser = new UserModel({ Name: name, Email: email, Password: password });
    await newUser.save();
    return res.status(201).json({ success: true, message: 'User created successfully!' });
  } catch (err) {
    console.error('Error saving user:', err);
    return res.status(500).json({ success: false, message: 'Server error!' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required!' });
    }

    const user = await UserModel.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    if (user.Password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password!' });
    }

    res.status(200).json({ success: true, message: 'Login successful!', userId: user._id });
  } catch (err) {
    console.error('Login route error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
  }
});


// Fetch all job applications
app.get('/view-applications', async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications', error });
  }
});

// Add a job
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

// Add a new job
app.post("/api/jobs", async (req, res) => {
  const { JobTitle, Company, Location } = req.body;

  try {
    // Validate input
    if (!JobTitle || !Company || !Location) {
      return res.status(400).json({ success: false, message: "Title, company, and location are required" });
    }

    // Add new job to the database
    const newJob = new Job({
      JobTitle,
      Company,
      Location,
      
    });

    const savedJob = await newJob.save();
    res.status(201).json({ success: true, job: savedJob });
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ success: false, message: "Failed to add job" });
  }
});

// Update a job
app.put('/api/jobs/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update job' });
  }
});

// Delete a job
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job' });
  }
});

router.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); // Query MongoDB for jobs
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});


module.exports = router;


// File upload configuration

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Validate file type
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, DOC, and DOCX are allowed."));
    }
  },
});

module.exports = upload;

app.post("/api/apply", upload.fields([{ name: "coverLetter" }, { name: "resume" }]), async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const { fullName, email, jobId, jobTitle, company, locationName } = req.body;
    if (!req.files || !req.files.coverLetter || !req.files.resume) {
      console.error("Missing required files.");
      return res.status(400).json({ message: "Cover letter and resume are required." });
    }

    const coverLetter = req.files.coverLetter[0].filename;
    const resume = req.files.resume[0].filename;

    const application = new JobApplication({
      fullName,
      email,
      coverLetter,
      resume,
      jobId,
      jobTitle,
      company,
      locationName,
    });

    await application.save();
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error in POST /api/apply:", error);
    res.status(500).json({ message: "Error submitting application" });
  }
});
 // To  view applied jobs
router.get('/applied-jobs/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const applications = await JobApplication.find({ email });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ message: 'Error fetching applied jobs' });
  }
});



app.get("/api/applications", async (req, res) => {
  try {
    const applications = await JobApplication.find(); // Fetch all applications
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/uploads/:file', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.file);
  console.log(`Request for file: ${filePath}`);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('File not found or unable to send:', err);
      res.status(404).send('File not found');
    }
  });
});

module.exports = router;



// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
