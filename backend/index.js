// index.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());

// Updated CORS configuration
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || 'https://main.dys46hwmlisn3.amplifyapp.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.post('/signup', async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  try {
    const r = await axios.post(
      'https://api.chatengine.io/users/',
      { username, secret, email, first_name, last_name },
      { headers: { 'Private-Key': process.env.CHAT_ENGINE_PRIVATE_KEY } },
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post('/login', async (req, res) => {
  const { username, secret } = req.body;

  try {
    const r = await axios.get('https://api.chatengine.io/users/me/', {
      headers: {
        'Project-ID': process.env.CHAT_ENGINE_PROJECT_ID,
        'User-Name': username,
        'User-Secret': secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

// Export the app for testing
module.exports = app;

// Listen on port 3001 or the port specified in the environment
const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
