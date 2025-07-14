import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock job data for demonstration
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    salary: "$80,000 - $120,000",
    description: "We are looking for a skilled Frontend Developer to join our team...",
    posted: "2 days ago",
    type: "Full-time"
  },
  {
    id: 2,
    title: "React Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$70,000 - $100,000",
    description: "Join our dynamic team as a React Developer...",
    posted: "1 day ago",
    type: "Full-time"
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Innovation Labs",
    location: "Austin, TX",
    salary: "$90,000 - $130,000",
    description: "We need a Full Stack Developer with experience in modern web technologies...",
    posted: "3 days ago",
    type: "Full-time"
  },
  {
    id: 4,
    title: "JavaScript Developer",
    company: "WebSolutions Inc",
    location: "Seattle, WA",
    salary: "$75,000 - $110,000",
    description: "Looking for a JavaScript Developer to work on exciting projects...",
    posted: "1 week ago",
    type: "Contract"
  },
  {
    id: 5,
    title: "UI/UX Developer",
    company: "Design Studio",
    location: "Los Angeles, CA",
    salary: "$65,000 - $95,000",
    description: "Creative UI/UX Developer needed for innovative projects...",
    posted: "4 days ago",
    type: "Full-time"
  }
];

// Jobs API endpoint
app.get('/api/jobs', (req, res) => {
  try {
    const { query } = req.query;
    
    console.log('Received job search query:', query);
    
    if (!query) {
      return res.status(400).json({ 
        error: 'Query parameter is required',
        jobs: []
      });
    }

    // Filter jobs based on query (case-insensitive search)
    const filteredJobs = mockJobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.description.toLowerCase().includes(query.toLowerCase())
    );

    // Simulate API delay
    setTimeout(() => {
      res.json({
        success: true,
        query: query,
        count: filteredJobs.length,
        jobs: filteredJobs
      });
    }, 500);

  } catch (error) {
    console.error('Error in /api/jobs:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      jobs: []
    });
  }
});

// Email subscription endpoint
app.post('/api/subscribe', (req, res) => {
  try {
    const { email } = req.body;
    
    console.log('Received subscription request for:', email);
    
    if (!email) {
      return res.status(400).json({ 
        error: 'Email is required',
        success: false
      });
    }

    // Simulate subscription process
    setTimeout(() => {
      res.json({
        success: true,
        message: 'Successfully subscribed to job alerts!',
        email: email
      });
    }, 1000);

  } catch (error) {
    console.error('Error in /api/subscribe:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      success: false
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'JobTrack API'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 JobTrack API server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /api/jobs?query=<search_term>`);
  console.log(`   POST /api/subscribe`);
  console.log(`   GET  /api/health`);
});