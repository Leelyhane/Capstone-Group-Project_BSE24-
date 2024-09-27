const request = require("supertest");
const app = require("../index"); // Adjust the path based on your project structure

describe("API Tests", () => {
  const newUser = {
    username: `testuser_${Date.now()}`, // Unique username
    secret: "testsecret",
    email: "testuser@example.com",
    first_name: "Test",
    last_name: "User"
  };


  it("should sign up a new user", async () => {
    const response = await request(app).post("/signup").send(newUser);

    // Check if the username already exists
    if (response.body.message === "This username is taken.") {
      console.log("Username is already taken. Please try a different one.");
    } else {
      expect(response.body).toHaveProperty("username", newUser.username);
    }
  });
});
