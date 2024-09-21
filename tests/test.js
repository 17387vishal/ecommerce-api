const request = require("supertest");
const { app, server } = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Product");

let authToken;

describe("API Endpoints Testing", () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI_TEST, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
    }
    await User.deleteMany();
    await Product.deleteMany();

    const res = await request(app).post("/api/auth/register").send({
      username: "TestUser", // Ensure this matches your User model
      email: "testuser@example.com",
      password: "password123",
    });
    authToken = res.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "TestUser_1",
      email: "testuser_1@example.com", // Ensure this is unique
      password: "password123",
    });

    console.log(res.body); // Log response body to check for error messages

    expect(res.statusCode).toEqual(201);
    // expect(res.body).toHaveProperty("token");
  });

  // Test User Login
  it("should login user and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    authToken = res.body.token;
  });

  // Test Create Product
  it("should create a new product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Test Product",
        price: 19.99,
        description: "A sample product",
        category: "electronics",
        stock: 10,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test Product");
  });

  // Test Get All Products
  it("should retrieve all products", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.products)).toBe(true);
    expect(res.body.products.length).toBeGreaterThan(0);
  });

  // Test Get Product by ID
  it("should retrieve a product by ID", async () => {
    const product = await Product.findOne({ name: "Test Product" });
    const res = await request(app).get(`/api/products/${product._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("Test Product");
  });

  // Test Update Product
  it("should update the product", async () => {
    const product = await Product.findOne({ name: "Test Product" });
    const res = await request(app)
      .put(`/api/products/${product._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Updated Product",
        price: 29.99,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("Updated Product");
  });

  // Test Delete Product
  it("should delete a product", async () => {
    const product = await Product.findOne({ name: "Updated Product" });
    const res = await request(app)
      .delete(`/api/products/${product._id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Product removed");
  });

  // Test User Logout
  it("should logout the user", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("User logged out successfully");
  });
});
