import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import mongoose from 'mongoose';

dotenv.config(); // Load .env variables

const app = express();
const port = 3000;

app.use(express.json()); // For parsing JSON bodies

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ MongoDB Schema
const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  query: { type: String, required: true },
  subscribedAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

// GET job details
app.get('/job-details', async (req, res) => {
  const job_id = req.query.job_id || 'n20AgUu1KG0BGjzoAAAAAA==';
  const country = req.query.country || 'us';

  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/job-details', {
      params: { job_id, country },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
});

// GET jobs
app.get('/api/jobs', async (req, res) => {
  const query = req.query.query || '';
  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: {
        query,
        page: '1',
        num_pages: '1',
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    });
    res.json({ jobs: response.data.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch jobs', jobs: [] });
  }
});

// POST subscription (updated to store in MongoDB)
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/subscribe', async (req, res) => {
  const { email, query } = req.body;
  if (!email || !query) return res.status(400).json({ error: 'Email and job query are required' });

  try {
    // ✅ Save subscription in DB
    await Subscription.create({ email, query });

    // ✅ Send welcome email
    await resend.emails.send({
      from: 'Dream Job <onboarding@resend.dev>',
      to: email,
      subject: 'You’ve subscribed to job alerts!',
      text: `Thanks for subscribing to Dream Job alerts for "${query}". You'll be notified about future updates.`,
    });

    res.json({ message: 'Subscription confirmed. Email sent and stored.' });
  } catch (error) {
    console.error('Resend email error:', error);
    res.status(500).json({ error: 'Failed to send email or store subscription' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
