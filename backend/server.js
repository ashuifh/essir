<<<<<<< HEAD
import express from 'express';
import axios from 'axios';
const app = express();
const port = 3000;

app.get('/job-details', async (req, res) => {
  const job_id = req.query.job_id || 'n20AgUu1KG0BGjzoAAAAAA=='; // Get job_id from query params or default
  const country = req.query.country || 'us';

  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/job-details',
    params: {
      job_id: job_id,
      country: country
    },
    headers: {
        'x-rapidapi-key': '97ac430767mshbda8be4ec82efdfp1b9e09jsn2a89205a06c6',
    'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);  // Send back API response to client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
});
app.get('/api/jobs', async (req, res) => {
  const query = req.query.query || '';
  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: {
        query: query,
        page: '1',
        num_pages: '1'
      },
      headers: {
        'x-rapidapi-key': '97ac430767mshbda8be4ec82efdfp1b9e09jsn2a89205a06c6',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      }
    });
    res.json({ jobs: response.data.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch jobs', jobs: [] });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
=======
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We're looking for a skilled Frontend Developer to join our team. Experience with React, TypeScript, and modern web technologies required.",
    salary: "$80,000 - $120,000",
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "React Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    description: "Join our growing team as a React Developer. Build amazing user interfaces and work with cutting-edge technologies.",
    salary: "$90,000 - $130,000",
    posted: "1 day ago"
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "WebSolutions Inc",
    location: "Austin, TX",
    type: "Full-time",
    description: "Looking for a Full Stack Developer with experience in both frontend and backend technologies. Node.js and React experience preferred.",
    salary: "$85,000 - $125,000",
    posted: "3 days ago"
  },
  {
    id: 4,
    title: "JavaScript Developer",
    company: "CodeMasters",
    location: "Seattle, WA",
    type: "Contract",
    description: "Contract position for an experienced JavaScript Developer. Work on exciting projects with modern frameworks and libraries.",
    salary: "$70/hour",
    posted: "1 week ago"
  },
  {
    id: 5,
    title: "UI/UX Developer",
    company: "DesignHub",
    location: "Los Angeles, CA",
    type: "Full-time",
    description: "Creative UI/UX Developer needed to design and implement beautiful user interfaces. Strong design skills and frontend development experience required.",
    salary: "$75,000 - $110,000",
    posted: "4 days ago"
  },
  {
    id: 6,
    title: "Senior Frontend Engineer",
    company: "BigTech Solutions",
    location: "Boston, MA",
    type: "Full-time",
    description: "Senior Frontend Engineer position available. Lead frontend development initiatives and mentor junior developers. 5+ years experience required.",
    salary: "$120,000 - $160,000",
    posted: "5 days ago"
  }
];

// API Routes
app.get('/api/jobs', (req, res) => {
  const { q: query } = req.query;
  
  let filteredJobs = mockJobs;
  
  if (query) {
    const searchTerm = query.toLowerCase();
    filteredJobs = mockJobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.location.toLowerCase().includes(searchTerm)
    );
  }
  
  res.json({
    success: true,
    jobs: filteredJobs,
    total: filteredJobs.length
  });
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }
  
  // In a real application, you would save this to a database
  console.log(`New subscription: ${email}`);
  
  res.json({
    success: true,
    message: 'Successfully subscribed to job alerts!'
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
>>>>>>> aa85e29c7aeac4d148e9834642dd6af029d54aa5
