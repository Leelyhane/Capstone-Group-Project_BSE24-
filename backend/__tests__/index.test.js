const request = require('supertest');
const app = require('../index'); // Adjust the path based on your project structure

describe('API Tests', () => {
  it('should return a response for the root endpoint', async () => {
    const response = await request(app).get('/');

    expect(response).toBeDefined();
  });
});
