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


app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  // Configure your SMTP credentials here
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // replace with your SMTP host
    port: 587,
    secure: false,
    auth: {
      user: 'your@email.com',
      pass: 'yourpassword'
    }
  });
try {
    await transporter.sendMail({
      from: '"Dream Job" <your@email.com>',
      to: email,
      subject: "You've subscribed to job alerts!",
      text: "Thank you for subscribing to Dream Job alerts!"
    });
    res.json({ message: 'Subscription confirmed. Email sent.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
