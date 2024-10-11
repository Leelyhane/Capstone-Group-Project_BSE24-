require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const client = require('prom-client'); // Add Prometheus client
const logger = require('./logger'); // Import your logger

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

// Create a Registry for Prometheus metrics
const register = new client.Registry();

// Collect default Node.js process metrics and HTTP request metrics
client.collectDefaultMetrics({ register });

// Define custom metrics, such as request duration for /signup and /login
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 500],
});

// Register custom metrics
register.registerMetric(httpRequestDurationMicroseconds);

// Middleware to log requests and track HTTP request duration
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`); // Log incoming requests
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({
      method: req.method,
      route: req.route ? req.route.path : req.originalUrl,
      status_code: res.statusCode,
    });
    logger.info(`Request completed: ${req.method} ${req.originalUrl} - ${res.statusCode}`); // Log completed requests
  });
  next();
});

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
    logger.error(`Signup error: ${e.message}`); // Log errors
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
    logger.error(`Login error: ${e.message}`); // Log errors
    return res.status(e.response.status).json(e.response.data);
  }
});

// Metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Export the app for testing
module.exports = app;

// Listen on port 3001 or the port specified in the environment
const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`); // Log server start
  });
}
