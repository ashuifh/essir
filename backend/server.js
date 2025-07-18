import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
app.use(cors({
  origin: 'https://essir-voxe.vercel.app',
  credentials: true,
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// MongoDB Schema
const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  query: { type: String, required: true },
  subscribedAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL, // ayushkalakoti3@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // Google App Password (2FA enabled)
  },
});

// Job Details Route
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

// Job Search Route
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

// Subscribe Route with Nodemailer
app.post('/api/subscribe', async (req, res) => {
  const { email, query } = req.body;
  if (!email || !query) return res.status(400).json({ error: 'Email and job query are required' });

  try {
    // Save subscription in DB
    await Subscription.create({ email, query });

    // Send confirmation email using Nodemailer
    await transporter.sendMail({
      from: '"Dream Job" <ayushkalakoti3@gmail.com>',
      to: email,
      subject: 'You’ve subscribed to job alerts!',
      text: `Thanks for subscribing to Dream Job alerts for "${query}". You'll be notified about future updates.`,
      html: `<p>Thanks for subscribing to Dream Job alerts for <strong>"${query}"</strong>. You'll be notified about future updates.</p>`,
    });

    res.json({ message: 'Subscription confirmed. Email sent and stored.' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ error: 'Failed to send email or store subscription' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Dream Job API is running!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
